# 可拖拽的 ForEach (ReorderableForEach)

`ReorderableForEach` 是 Scripting 提供的一个支持 **拖拽排序（Drag to Reorder）** 的高级渲染组件。
它在保持 `ForEach` 使用方式的同时，内置了拖拽手势识别、激活态管理、排序回调等能力，使开发者可以非常低成本地实现 **可拖拽排序的列表或网格布局**。

该组件特别适用于以下场景：

- 拖拽调整排序的卡片布局
- 拖拽调整顺序的网格（`LazyVGrid` / `LazyHGrid`）
- 脚本驱动的可交互功能模块编排界面

***

## 一、组件定义

```ts
type ReorderableForEachProps<T extends {
  id: string
}> = {
  active: Observable<T | null>
  data: T[]
  builder: (item: T, index: number) => VirtualNode
  onMove: (indices: number[], newOffset: number) => void
}

interface ReorderableForEachComponent {
  <T extends {
    id: string
  }>(props: ReorderableForEachProps<T>): VirtualNode
}

declare const ReorderableForEach: ReorderableForEachComponent
```

***

## 二、泛型约束说明

### 必须包含 `id` 字段

`ReorderableForEach` 的泛型参数 `T` 必须满足：

```ts
T extends { id: string }
```

也就是说，每一项数据必须具备：

- 唯一的 `id` 值
- 稳定不变的标识

该 `id` 用于：

- 识别当前被拖拽的元素
- 维持拖拽过程中的元素一致性
- 正确计算排序变更位置

如果 `id` 不唯一或在拖拽过程中发生变化，将导致排序错乱。

***

## 三、Props 参数说明

### 1. `active`

```ts
active: Observable<T | null>
```

用于表示 **当前正在被拖拽的元素状态**。

行为说明：

- 拖拽开始时，当前项会被写入 `active.value`
- 拖拽结束时，`active.value` 会恢复为 `null`
- 你可以利用它实现：

  - 拖拽元素高亮
  - 透明度变化
  - 联动动画
  - 状态辅助 UI

***

### 2. `data`

```ts
data: T[]
```

当前参与排序的数据数组。

重要说明：

- `ReorderableForEach` **不会自动修改该数组**
- 拖拽完成后，必须在 `onMove` 中手动更新该数组顺序
- 推荐与 `useObservable` 配合使用：

```ts
const data = useObservable<T[]>(...)
```

***

### 3. `builder`

```ts
builder: (item: T, index: number) => VirtualNode
```

用于渲染每一项的 UI 视图。

参数说明：

| 参数      | 含义                 |
| ------- | ------------------ |
| `item`  | 当前数据项              |
| `index` | 当前项在 `data` 中的实时索引 |

返回值必须是一个合法的 `VirtualNode`。

注意：

- 这里的 `index` 是拖拽后的实时索引
- 不应在此依赖旧索引逻辑做安全判断

***

### 4. `onMove`

```ts
onMove: (indices: number[], newOffset: number) => void
```

当用户完成一次拖拽排序后触发。

参数含义：

| 参数          | 类型         | 说明              |
| ----------- | ---------- | --------------- |
| `indices`   | `number[]` | 被拖动元素在原数组中的索引集合 |
| `newOffset` | `number`   | 新插入的起始位置        |

你必须在此方法中：

1. 根据 `indices` 取出被移动的元素
2. 从原数据中移除它们
3. 按 `newOffset` 重新插入
4. 使用 `Observable.setValue` 提交新顺序

标准实现如下：

```ts
const onMove = (indices: number[], newOffset: number) => {
  const movingItems = indices.map(index => data.value[index])
  const newValue = data.value.filter((_, index) => !indices.includes(index))
  newValue.splice(newOffset, 0, ...movingItems)
  data.setValue(newValue)
}
```

***

## 四、`contentShape` 的真实作用说明

在你的示例代码中：

```tsx
.contentShape({
  kind: 'dragPreview',
  shape: {
    type: 'rect',
    cornerRadius: 16
  }
})
```

该配置的核心作用是：

> **设置拖拽时的预览形状，使拖拽时显示的形状与非拖拽状态下保持一致（RoundedRectangle）。**

它并不是简单地“开启拖拽”，而是用于：

- 定义拖拽时的命中区域
- 同步拖拽预览的视觉形状
- 避免：

  - 拖拽时出现矩形裁切
  - 与原有圆角样式不一致的问题

如果不配置 `dragPreview` 形状，拖拽时可能会退化为默认矩形预览，破坏一致性。

***

## 五、完整使用流程说明

### 1. 数据模型定义

```ts
type Item = {
  id: string
  color: Color
}
```

***

### 2. 初始化可排序数据源

```ts
const data = useObservable<Item[]>(() => {
  return new Array(30)
    .fill(0)
    .map((_, index) => ({
      id: String(index),
      color: colors[index % colors.length]
    }))
})
```

***

### 3. 声明拖拽激活态

```ts
const active = useObservable<Item | null>(null)
```

***

### 4. 单项拖拽视图（保持拖拽前后外观一致）

```tsx
<VStack
  modifiers={
    modifiers()
      .frame({ height: 80 })
      .frame({ maxWidth: 'infinity' })
      .background(
        <RoundedRectangle
          cornerRadius={16}
          fill={item.color}
        />
      )
      .contentShape({
        kind: 'dragPreview',
        shape: {
          type: 'rect',
          cornerRadius: 16
        }
      })
  }
>
```

***

### 5. 在 `LazyVGrid` 中使用 ReorderableForEach

```tsx
<ReorderableForEach
  active={active}
  data={data.value}
  builder={(item) =>
    <ItemView item={item} />
  }
  onMove={onMove}
/>
```

***

## 六、关于在 `List` 中使用的限制说明

虽然从技术上讲，`ReorderableForEach` 可以放入 `List` 内部使用，但 **整体上并不推荐在 `List` 中使用该组件**，原因如下：

1. `List` 自带：

   - 行分隔线
   - 行高计算
   - 选中态
   - 系统滑动手势
   - 系统编辑模式

2. 这些系统行为会与：

   - 自定义拖拽动画
   - 自定义排序逻辑
   - 拖拽命中区域计算

   产生不可控的冲突。

3. 可能带来的问题包括：

- 拖拽过程中跳动
- 命中区域错位
- 拖拽排序时系统进入编辑态
- 行复用与拖拽状态不同步

因此推荐的使用容器是：

- `ScrollView`
- `LazyVGrid`
- `LazyHGrid`
- 纯自定义布局容器

而不是 `List`。

***

## 七、组件工作机制总结

`ReorderableForEach` 的行为逻辑可以总结为：

1. 依据 `data` 构建可拖拽子节点
2. 依据 `dragPreview contentShape` 确定拖拽命中区域与预览形状
3. 拖拽过程中：

   - 自动维护 `active`
   - 实时计算目标插入位置
4. 拖拽结束后：

   - 通过 `onMove` 将排序结果交给开发者处理
   - 由开发者负责最终数据顺序更新

***

## 八、适用场景

- 功能模块拖拽排序
- 工具栏按钮排序
- 卡片式任务优先级调整
- 桌面组件布局排序
- 视觉网格自由排序
