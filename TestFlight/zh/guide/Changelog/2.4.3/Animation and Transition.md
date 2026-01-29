# 动画和过渡

Scripting 通过 `Observable` / `useObservable`、`Animation`、`Transition`、`withAnimation` 以及视图的 `animation` / `transition` 属性，基本对齐了 SwiftUI 的动画能力，包括：

- **属性动画**：数值、颜色、布局等属性随状态变化平滑过渡
- **过渡动画**：视图插入 / 移除时的进出效果（如淡入淡出、滑入滑出、翻转）
- **显式动画**：通过 `withAnimation` 包裹一段「状态更新代码」统一加动画

## Animation 类

`Animation` 用来描述「属性变化的时间曲线与节奏」，类似 SwiftUI 的 `Animation`。

### 工厂方法（创建动画）

#### `Animation.default()`

```ts
static default(): Animation
```

- 创建一个默认动画（通常是系统预设的 ease-in-out 曲线）
- 无需配置，适合「只想要一个普通的过渡效果」的场景

示例：

```tsx
<Text animation={{
  animation: Animation.default(),
  value: value
}}>默认动画</Text>
```

***

#### `Animation.linear(duration?)`

```ts
static linear(duration?: DurationInSeconds | null): Animation
```

- 匀速动画，整段时间内速度保持恒定
- `duration`：动画持续时间（秒），可选，不传时使用默认时长

适合：进度条数值增长、颜色线性变化等。

***

#### `Animation.easeIn(duration?)`

```ts
static easeIn(duration?: DurationInSeconds | null): Animation
```

- 开始慢、后面加速
- 适合：元素「加速进入」的感觉

***

#### `Animation.easeOut(duration?)`

```ts
static easeOut(duration?: DurationInSeconds | null): Animation
```

- 开始快、结尾慢
- 适合：元素「减速停止」的感觉，如卡片滑入后停在目标位置

***

#### `Animation.bouncy(options?)`

```ts
static bouncy(options?: {
  duration?: DurationInSeconds
  extraBounce?: number
}): Animation
```

- 带回弹效果的动画
- 参数：

  - `duration`：总时长（秒）
  - `extraBounce`：额外弹性，越大越明显

适合：按钮点击放大回弹、卡片弹出等「有趣」的动效。

***

#### `Animation.smooth(options?)`

```ts
static smooth(options?: {
  duration?: DurationInSeconds
  extraBounce?: number
}): Animation
```

- 相对柔和、过渡自然的动画
- 与 `bouncy` 相比，弹性感更弱，更偏「丝滑」

***

#### `Animation.snappy(options?)`

```ts
static snappy(options?: {
  duration?: DurationInSeconds
  extraBounce?: number
}): Animation
```

- 动作「干脆利落」，响应速度快
- 常见于触控反馈、选中高亮等瞬间反馈场景

***

#### `Animation.spring(options?)`

```ts
static spring(options?: {
  blendDuration?: number
} & ({
  duration?: DurationInSeconds
  bounce?: number
  response?: never
  dampingFraction?: never
} | {
  response?: number
  dampingFraction?: number
  duration?: never
  bounce?: never
})): Animation
```

支持两种配置方式（注意互斥）：

1. **基于时长的弹簧动画**

   - `duration`: 动画持续时间
   - `bounce`: 弹性大小

2. **物理参数模式**

   - `response`: 响应速度（值越小反馈越快）
   - `dampingFraction`: 阻尼系数（0\~1，越大越「稳」，越小越「弹」）

额外参数：

- `blendDuration`：动画混合时长，用于多动画衔接场景（可选）

示例：

```tsx
// 简单弹簧
const anim1 = Animation.spring({
  duration: 0.4,
  bounce: 0.3
})

// 高级弹簧
const anim2 = Animation.spring({
  response: 0.25,
  dampingFraction: 0.7
})
```

***

#### `Animation.interactiveSpring(options?)`

```ts
static interactiveSpring(options?: {
  response?: number
  dampingFraction?: number
  blendDuration?: number
}): Animation
```

- 面向「交互驱动」的弹簧动画，例如拖拽结束后的回弹
- 参数与 `spring` 的物理参数模式类似，语义更偏向手势交互

***

#### 0 `Animation.interpolatingSpring(options?)`

```ts
static interpolatingSpring(options?: {
  mass?: number
  stiffness: number
  damping: number
  initialVelocity?: number
} | {
  duration?: DurationInSeconds
  bounce?: number
  initialVelocity?: number
  mass?: never
  stiffness?: never
  damping?: never
}): Animation
```

两种配置方式（互斥）：

1. **物理参数模式**

   - `mass`: 质量
   - `stiffness`: 刚度
   - `damping`: 阻尼
   - `initialVelocity`: 初速度（可选）

2. **时长 + 弹性模式**

   - `duration`: 动画时长
   - `bounce`: 弹性
   - `initialVelocity`: 初速度（可选）

适合对动态效果「非常在意手感」的高级场景。

***

### 修改已有动画（链式 API）

#### `delay(time)`

```ts
delay(time: DurationInSeconds): Animation
```

- 使动画延迟 `time` 秒后再开始
- 返回一个新的 `Animation` 实例（原动画不变）

示例：

```tsx
const [animValue, setAnimValue] = useState(0)
const anim = Animation
  .spring({ duration: 0.4, bounce: 0.3 })
  .delay(0.2)

<Text animation={{
  animation: anim,
  value: animValue
}>延迟弹簧</Text>
```

***

#### `repeatCount(count, autoreverses?)`

```ts
repeatCount(count: number, autoreverses?: boolean): Animation
```

- 重复执行动画 `count` 次
- `autoreverses`（默认 `true`）：是否来回反向播放

示例：

```tsx
const pulse = Animation
  .easeIn(0.6)
  .repeatCount(3, true)

<Text animation={{
  animation: pulse,
  value: value
}}>闪烁三次</Text>
```

***

#### `repeatForever(autoreverses?)`

```ts
repeatForever(autoreverses?: boolean): Animation
```

- 无限次重复动画
- 适合加载动画、呼吸灯效果等

***

### Animation 实战示例

#### 示例 1：基本大小动画

```tsx
import { VStack, Button, Rectangle, useObservable, } from "scripting"

export function Demo() {
  const size = useObservable(80)

  return <VStack spacing={16}>
    <Rectangle
      frame={{ width: size.value, height: size.value }}
      backgroundColor="blue"
      animation={{
        animation: Animation.spring({ duration: 0.3, bounce: 0.2 }),
        value: size.value
      }}
    />

    <Button
      title="Toggle Size"
      action={() => {
        withAnimation(() => {
          size.setValue(size.value === 80 ? 140 : 80)
        })
      }}
    />
  </VStack>
}
```

***

## Transition 类（视图过渡）

`Transition` 描述的是**视图插入与移除**时的「进场 / 退场效果」，对应 SwiftUI 的 `AnyTransition`。

> 注意：只有当视图在 JSX 中「存在与否」发生变化（如 `{visible.value && <Text ... />}`）时，`transition` 才会生效。

### 实例方法

#### `animation(animation?)`

```ts
animation(animation?: Animation): Transition
```

- 为当前过渡指定（或覆盖）使用的 `Animation`
- 不传时使用默认动画

示例：

```tsx
const t = Transition
  .move("bottom")
  .animation(Animation.spring({ duration: 0.4 }))
```

***

#### `combined(other)`

```ts
combined(other: Transition): Transition
```

- 组合两个过渡效果，类似 SwiftUI 的 `.combined`
- 如：向下滑入 + 淡入

示例：

```tsx
const t = Transition
  .move("bottom")
  .combined(Transition.opacity())
```

在视图中使用：

```tsx
<Text transition={t}>组合过渡</Text>
```

***

### 静态方法（构造不同类型的过渡）

#### `Transition.identity()`

```ts
static identity(): Transition
```

- 「没有任何过渡」，视图插入 / 移除时不会做动画
- 通常用于禁用某些分支的过渡效果

***

#### `Transition.move(edge)`

```ts
static move(edge: Edge): Transition
```

- 从某个边缘移入 / 移出
- `edge` 通常是 `"leading" | "trailing" | "top" | "bottom"` 等（和 SwiftUI 对齐）

示例：

```tsx
<Text transition={Transition.move("leading")}>
  从左侧滑入 / 滑出
</Text>
```

***

#### `Transition.offset(position?)`

```ts
static offset(position?: Point): Transition
```

- 通过偏移实现过渡
- `position`: `{ x: number, y: number }`，默认 `{ x: 0, y: 0 }`

例如：

```tsx
<Text
  transition={Transition.offset({ x: 0, y: 40 })}
>
  从下方位移进出
</Text>
```

***

#### `Transition.pushFrom(edge)`

```ts
static pushFrom(edge: Edge): Transition
```

- 类似导航 push 的效果，从某个边缘推入并把旧内容推走
- 适合做「页面切换」类效果

***

#### `Transition.opacity()`

```ts
static opacity(): Transition
```

- 单纯的淡入 / 淡出
- 与 `Animation` 搭配可以控制淡入淡出的节奏

***

#### `Transition.scale(scale?, anchor?)`

```ts
static scale(
  scale?: number,
  anchor?: Point | KeywordPoint
): Transition
```

- 缩放过渡
- `scale`：缩放比（默认 1）
- `anchor`：缩放基准点，支持：

  - `Point`：如 `{ x: 0.5, y: 0.5 }`
  - `KeywordPoint`：如 `"center"`、`"top"`, `"bottom"` 等（具体值与 Scripting 内部对齐）

示例：

```tsx
<Text
  transition={Transition.scale(0.8, "center")}
>
  缩放进出
</Text>
```

***

#### `Transition.slide()`

```ts
static slide(): Transition
```

- 类似 SwiftUI 的 `.slide`，通常是从一侧滑入 / 滑出（具体方向由系统决定）
- 常用于列表项、简单出现 / 消失效果

***

#### `Transition.fade(duration?)`

```ts
static fade(duration?: DurationInSeconds): Transition
```

- 带时长配置的淡入 / 淡出
- 与 `Transition.opacity()` 类似，但可以直接指定过渡时间

***

#### Flip 系列（翻转过渡）

```ts
static flipFromLeft(duration?: DurationInSeconds): Transition
static flipFromBottom(duration?: DurationInSeconds): Transition
static flipFromRight(duration?: DurationInSeconds): Transition
static flipFromTop(duration?: DurationInSeconds): Transition
```

- 类似卡片翻转的 3D 过渡

示例：

```tsx
<Text
  transition={Transition.flipFromLeft(0.4)}
>
  左侧翻入 / 翻出
</Text>
```

***

#### 0 `Transition.asymmetric(insertion, removal)`

```ts
static asymmetric(
  insertion: Transition,
  removal: Transition
): Transition
```

- 插入和移除使用不同的过渡效果
- 典型用法：进入时从下方滑入，离开时淡出

示例：

```tsx
const appear = Transition
  .move("bottom")
  .combined(Transition.opacity())

const disappear = Transition.opacity()

const t = Transition.asymmetric(appear, disappear)

<Text transition={t}>不对称过渡</Text>
```

***

### Transition 实战示例

#### 示例：多种过渡效果对比

```tsx
const visible = useObservable(true)

return <VStack spacing={12}>
  {visible.value &&
    <Text
      transition={Transition.slide().combined(Transition.opacity())}
    >
      Slide + Fade
    </Text>
  }

  {visible.value &&
    <Text
      transition={Transition.move("leading")}
    >
      Move leading
    </Text>
  }

  {visible.value &&
    <Text
      transition={Transition.scale()}
    >
      Scale
    </Text>
  }

  <Button
    title="Toggle"
    action={() => {
      withAnimation(() => {
        visible.setValue(!visible.value)
      })
    }}
  />
</VStack>
```

***

## withAnimation：显式动画入口

`withAnimation` 用来「显式」地将一段状态更新包裹在动画上下文中，类似 SwiftUI 的 `withAnimation`。
它返回 `Promise<void>`，方便在异步逻辑中等待动画完成。

### 重载签名

```ts
function withAnimation(body: () => void): Promise<void>
function withAnimation(animation: Animation, body: () => void): Promise<void>
function withAnimation(
  animation: Animation,
  completionCriteria: "logicallyComplete" | "removed",
  body: () => void
): Promise<void>
```

- 第一个重载：使用默认动画
- 第二个重载：指定动画曲线 / 弹性等
- 第三个重载：额外指定**完成条件**：

  - `"logicallyComplete"`：动画在时间轴上播放完成时视为完成（典型属性动画）
  - `"removed"`：通常用于涉及过渡的场景，等待相关视图被移出 / 动画结束后再继续逻辑（具体行为依赖底层 SwiftUI）

> 实际等待的精确时机由内部动画系统决定，一般可理解为「该动画相关的视图不再处于动画中」。

***

### 基本用法

#### 默认动画

```tsx
const size = useObservable(100)

<Button
  title="Toggle"
  action={() => {
    withAnimation(() => {
      size.setValue(size.value === 100 ? 200 : 100)
    })
  }}
/>
```

***

#### 指定动画

```tsx
const visible = useObservable(true)

<Button
  title="Toggle Panel"
  action={() => {
    withAnimation(
      Animation.spring({ duration: 0.3, bounce: 0.2 }),
      () => {
        visible.setValue(!visible.value)
      }
    )
  }}
/>
```

***

#### 在异步函数中等待动画结束

```ts
async function hideThenRunTask() {
  await withAnimation(Animation.easeOut(0.25), () => {
    visible.setValue(false)
  })

  // 此处可以认为相关动画已经结束，再继续耗时任务或导航
  await doSomethingHeavy()
}
```

***

## 视图上的 animation / transition 属性

在 Scripting 的视图组件上，可以通过 props 的形式配置动画相关行为：

- `animation?: Animation`（属性动画）
- `transition?: Transition`（插入 / 移除过渡）

### 属性动画（animation）

属性动画的核心逻辑：

- 当某个视图依赖的 `Observable` 的 `value` 发生变化时
- 如果该视图设置了 `animation={...}` 或更新发生在 `withAnimation` 中
- 则 SwiftUI 会对这些属性差异进行插值，从原值平滑过渡到新值

示例：

```tsx
const size = useObservable(80)

<Rectangle
  frame={{
    width: size.value,
    height:size.value
  }}
  backgroundColor="green"
  animation={{
    animation: Animation.spring({ duration: 0.3, bounce: 0.25 }),
    value: size.value
  }}
/>
```

配合 `withAnimation`：

```tsx
<Button
  title="Grow"
  action={() => {
    withAnimation(() => {
      size.setValue(size.value + 20)
    })
  }}
/>
```

***

### 过渡动画（transition）

过渡动画只在「视图从无到有 / 从有到无」时生效。

关键点：

- 通常通过条件渲染控制：

  ```tsx
  {visible.value && <Text transition={...}>Hello</Text>}
  ```

- 状态变化本身需要动画上下文（`withAnimation` 或默认动画）

- `Transition.animation(...)` 可为过渡指定特定 `Animation`

示例：条件面板的进出过渡

```tsx
const visible = useObservable(false)

<VStack>
  {visible.value &&
    <Text
      transition={Transition
        .move("bottom")
        .combined(Transition.opacity())
        .animation(Animation.spring({ duration: 0.35, bounce: 0.3 }))
      }
    >
      Panel
    </Text>
  }

  <Button
    title="Toggle Panel"
    action={() => {
      withAnimation(() => {
        visible.setValue(!visible.value)
      })
    }}
  />
</VStack>
```

***

## 综合示例：列表增删带过渡与属性动画

```tsx
import {
  VStack,
  HStack,
  Text,
  Button,
  useObservable,
} from "scripting"

type Item = { id: string; title: string }

export function AnimatedList() {
  const items = useObservable<Item[]>([
    { id: "1", title: "First" },
    { id: "2", title: "Second" }
  ])

  function addItem() {
    withAnimation(Animation.spring({ duration: 0.3 }), () => {
      const next = items.value.length + 1
      items.setValue([
        ...items.value,
        { id: String(next), title: `Item ${next}` }
      ])
    })
  }

  function removeLast() {
    if (items.value.length === 0) return
    withAnimation(Animation.easeOut(0.25), () => {
      items.setValue(items.value.slice(0, -1))
    })
  }

  return <VStack spacing={12}>
    {items.value.map(item =>
      <HStack
        key={item.id}
        transition={Transition
          .move("trailing")
          .combined(Transition.opacity())
        }
      >
        <Text>{item.title}</Text>
      </HStack>
    )}

    <HStack spacing={12}>
      <Button title="Add" action={addItem} />
      <Button title="Remove Last" action={removeLast} />
    </HStack>
  </VStack>
}
```

这个示例中：

- 使用 `Observable<Item[]>` 作为列表数据源
- `transition` 负责列表项插入 / 删除时的滑动 + 淡入淡出
- `withAnimation` 包裹增删操作，确保这些更新被动画化
