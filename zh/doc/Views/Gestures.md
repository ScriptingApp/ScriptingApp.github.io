# 手势

Scripting 提供了与 SwiftUI 类似的完整手势系统，可为任意视图（如 `<VStack>`、`<HStack>`、`<Text>` 等）添加点击、长按、拖动、缩放、旋转等交互行为。
开发者既可以使用简化的 `onTapGesture` / `onLongPressGesture` / `onDragGesture` 等直接属性，也可以使用新的 `Gesture` 类接口和 `gesture` 修饰符，以获得更灵活的组合方式。

***

## 一、直接手势属性（简化用法）

这些属性提供最直接的交互绑定方式，适合快速使用场景。

***

### 1. `onTapGesture`

在识别到点击手势时执行指定操作。

#### 类型

```ts
onTapGesture?: (() => void) | {
  count: number
  perform: () => void
}
```

#### 参数

| 参数        | 类型           | 默认值 | 说明                |
| --------- | ------------ | --- | ----------------- |
| `count`   | `number`     | `1` | 点击次数（1 为单击，2 为双击） |
| `perform` | `() => void` | —   | 识别到点击后执行的操作       |

#### 示例

```tsx
// 单击触发
<VStack onTapGesture={() => console.log('点击了')} />

// 双击触发
<HStack
  onTapGesture={{
    count: 2,
    perform: () => console.log('双击了')
  }}
/>
```

***

### 2. `onLongPressGesture`

在识别到长按手势时执行操作，可监听按压状态。

#### 类型

```ts
onLongPressGesture?: (() => void) | {
  minDuration?: number
  maxDuration?: number
  perform: () => void
  onPressingChanged?: (state: boolean) => void
}
```

#### 参数

| 参数                  | 类型                         | 默认值     | 说明             |
| ------------------- | -------------------------- | ------- | -------------- |
| `minDuration`       | `number`                   | `500`   | 触发长按所需最短时间（毫秒） |
| `maxDuration`       | `number`                   | `10000` | 长按的最长持续时间（毫秒）  |
| `perform`           | `() => void`               | —       | 长按触发时执行的操作     |
| `onPressingChanged` | `(state: boolean) => void` | —       | 按下或松开时的状态回调    |

#### 示例

```tsx
// 基本用法
<VStack onLongPressGesture={() => console.log('长按触发')} />

// 自定义参数
<HStack
  onLongPressGesture={{
    minDuration: 800,
    maxDuration: 3000,
    perform: () => console.log('长按成功'),
    onPressingChanged: isPressing =>
      console.log(isPressing ? '正在按压' : '已松开')
  }}
/>
```

***

### 3. `onDragGesture`

为视图添加拖动交互，支持实时位置变化与拖动结束事件。

#### 类型

```ts
onDragGesture?: {
  minDistance?: number
  coordinateSpace?: 'local' | 'global'
  onChanged?: (details: DragGestureDetails) => void
  onEnded?: (details: DragGestureDetails) => void
}
```

#### 参数

| 参数                | 类型                                      | 默认值       | 说明           |
| ----------------- | --------------------------------------- | --------- | ------------ |
| `minDistance`     | `number`                                | `10`      | 触发拖动的最小距离（点） |
| `coordinateSpace` | `'local' \| 'global'`                   | `'local'` | 坐标系类型        |
| `onChanged`       | `(details: DragGestureDetails) => void` | —         | 拖动过程中回调      |
| `onEnded`         | `(details: DragGestureDetails) => void` | —         | 拖动结束时回调      |

#### `DragGestureDetails` 类型

```ts
type DragGestureDetails = {
  time: number
  location: Point
  startLocation: Point
  translation: Size
  velocity: Size
  predictedEndLocation: Point
  predictedEndTranslation: Size
}
```

| 字段                        | 说明                  |
| ------------------------- | ------------------- |
| `time`                    | 当前事件时间戳（毫秒）         |
| `location`                | 当前触摸位置 `{x, y}`     |
| `startLocation`           | 拖动起始位置              |
| `translation`             | 从开始拖动至当前的偏移量        |
| `velocity`                | 当前速度（points/second） |
| `predictedEndLocation`    | 预测结束位置              |
| `predictedEndTranslation` | 预测总偏移量              |

#### 示例

```tsx
<VStack
  onDragGesture={{
    minDistance: 5,
    coordinateSpace: 'global',
    onChanged: details => {
      console.log('当前坐标:', details.location)
      console.log('偏移量:', details.translation)
    },
    onEnded: details => {
      console.log('预测结束位置:', details.predictedEndLocation)
    }
  }}
/>
```

***

## 二、Gesture 类接口（高级用法）

若需要更复杂的组合或同时识别多个手势，可使用 `Gesture` 类与 `gesture` 修饰符。

所有手势均返回一个 `GestureInfo` 实例，通过 `.onChanged()` 与 `.onEnded()` 注册事件。

***

### 1. GestureInfo 类

```ts
class GestureInfo<Options, Value> {
  type: string
  options: Options
  onChanged(callback: (value: Value) => void): this
  onEnded(callback: (value: Value) => void): this
}
```

| 方法                     | 说明                  |
| ---------------------- | ------------------- |
| `.onChanged(callback)` | 手势状态变化时调用（如拖动中、缩放中） |
| `.onEnded(callback)`   | 手势结束时调用             |

#### 示例

```tsx
<Text
  gesture={
    TapGesture()
      .onEnded(() => console.log('点击结束'))
  }
/>
```

***

### 2. TapGesture（点击手势）

```ts
declare function TapGesture(count?: number): GestureInfo<number | undefined, void>
```

| 参数      | 类型       | 默认值 | 说明   |
| ------- | -------- | --- | ---- |
| `count` | `number` | `1` | 点击次数 |

#### 示例

```tsx
<Text
  gesture={
    TapGesture(2)
      .onEnded(() => console.log('双击了'))
  }
/>
```

***

### 3. LongPressGesture（长按手势）

```ts
declare function LongPressGesture(options?: LongPressGestureOptions): GestureInfo<LongPressGestureOptions, boolean>

type LongPressGestureOptions = {
  minDuration?: number
  maxDuration?: number
}
```

| 参数            | 默认值   | 说明               |
| ------------- | ----- | ---------------- |
| `minDuration` | 500   | 触发所需的最短时间（毫秒）    |
| `maxDuration` | 10000 | 手指移动前的最长持续时间（毫秒） |

#### 示例

```tsx
<Text
  gesture={
    LongPressGesture({ minDuration: 800 })
      .onChanged(() => console.log('正在长按'))
      .onEnded(() => console.log('长按完成'))
  }
/>
```

***

### 4. DragGesture（拖动手势）

```ts
declare function DragGesture(options?: DragGestureOptions): GestureInfo<DragGestureOptions, DragGestureDetails>

type DragGestureOptions = {
  minDistance?: number
  coordinateSpace?: 'local' | 'global'
}
```

#### 示例

```tsx
<VStack
  gesture={
    DragGesture({ coordinateSpace: 'global' })
      .onChanged(d => console.log('偏移', d.translation))
      .onEnded(d => console.log('速度', d.velocity))
  }
/>
```

***

### 5. MagnifyGesture（缩放手势）

```ts
declare function MagnifyGesture(minScaleDelta?: number | null): GestureInfo<number | null | undefined, MagnifyGestureValue>

type MagnifyGestureValue = {
  time: Date
  magnification: number
  startAnchor: Point
  startLocation: Point
  velocity: number
}
```

#### 示例

```tsx
<Text
  gesture={
    MagnifyGesture(0.05)
      .onChanged(v => console.log('缩放倍率', v.magnification))
      .onEnded(() => console.log('缩放结束'))
  }
/>
```

***

### 6. RotateGesture（旋转手势）

```ts
declare function RotateGesture(minAngleDelta?: Angle | null): GestureInfo<Angle | null | undefined, RotateGestureValue>

type RotateGestureValue = {
  rotation: AngleValue
  velocity: AngleValue
  startAnchor: Point
  time: Date
}

type AngleValue = {
  radians: number
  degrees: number
  magnitude: number
  animatableData: number
}
```

#### 示例

```tsx
<ZStack
  gesture={
    RotateGesture()
      .onChanged(v => console.log('旋转角度', v.rotation.degrees))
      .onEnded(() => console.log('旋转完成'))
  }
/>
```

***

## 三、手势修饰符（Gesture Modifiers）

以下属性可添加在任何视图上，用于控制手势识别行为。

```ts
type GesturesProps = {
  gesture?: GestureProps
  simultaneousGesture?: GestureProps
  highPriorityGesture?: GestureProps
  defersSystemGestures?: EdgeSet
}
```

***

### 1. `gesture`

为视图添加一个手势。

```tsx
<Text
  gesture={
    TapGesture()
      .onEnded(() => console.log('点击'))
  }
/>
```

***

### 2. `highPriorityGesture`

使该手势的识别优先于同视图上的其他手势。

```tsx
<Text
  highPriorityGesture={
    TapGesture(2)
      .onEnded(() => console.log('双击优先'))
  }
/>
```

***

### 3. `simultaneousGesture`

允许多个手势同时识别。

```tsx
<Text
  simultaneousGesture={
    LongPressGesture()
      .onEnded(() => console.log('长按'))
  }
  gesture={
    TapGesture()
      .onEnded(() => console.log('点击'))
  }
/>
```

***

### 4. `defersSystemGestures`

设置屏幕边缘的优先权，使自定义手势优先于系统手势（如返回手势）。

```tsx
<VStack defersSystemGestures="all">
  <Text>边缘手势优先</Text>
</VStack>
```

| 值              | 说明           |
| -------------- | ------------ |
| `'top'`        | 顶部边缘         |
| `'leading'`    | 左边缘（RTL 时为右） |
| `'trailing'`   | 右边缘          |
| `'bottom'`     | 底部边缘         |
| `'horizontal'` | 左右两侧         |
| `'vertical'`   | 上下两侧         |
| `'all'`        | 所有边缘         |

***

## 四、GestureMask（手势优先级控制）

定义当添加多个手势时的优先策略。

```ts
type GestureMask = "all" | "gesture" | "subviews" | "none"
```

| 值            | 说明              |
| ------------ | --------------- |
| `"all"`      | 启用所有手势（默认）      |
| `"gesture"`  | 仅启用当前手势，禁用子视图手势 |
| `"subviews"` | 启用子视图手势，禁用当前手势  |
| `"none"`     | 禁用所有手势          |

#### 示例

```tsx
<VStack
  gesture={{
    gesture: TapGesture().onEnded(() => console.log('Tapped')),
    mask: 'gesture'
  }}
>
  <Text>Tap me</Text>
</VStack>
```

***

## 五、总结对比表

| 手势类型 | 描述      | 对应类函数              | 直接属性                 | 常用回调                          |
| ---- | ------- | ------------------ | -------------------- | ----------------------------- |
| 点击   | 检测单击或多击 | `TapGesture`       | `onTapGesture`       | `.onEnded()`                  |
| 长按   | 检测持续按压  | `LongPressGesture` | `onLongPressGesture` | `.onChanged()` / `.onEnded()` |
| 拖动   | 检测移动轨迹  | `DragGesture`      | `onDragGesture`      | `.onChanged()` / `.onEnded()` |
| 缩放   | 双指缩放    | `MagnifyGesture`   | —                    | `.onChanged()` / `.onEnded()` |
| 旋转   | 双指旋转    | `RotateGesture`    | —                    | `.onChanged()` / `.onEnded()` |
