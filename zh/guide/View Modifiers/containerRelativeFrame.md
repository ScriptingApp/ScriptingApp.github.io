# containerRelativeFrame

将当前视图放置在一个相对于其最近容器尺寸的“隐形框架”中。该修饰符适用于 `ScrollView`、`Grid`、布局栈等容器中，用于实现按比例布局或视图对齐。

## 类型定义

```ts
containerRelativeFrame?: {
  axes: AxisSet
  alignment?: Alignment
  count: never
  span: never
  spacing: never
} | {
  axes: AxisSet
  alignment?: Alignment
  count: number
  span?: number
  spacing: number
}
```

***

## 描述

该修饰符允许视图根据其父容器的尺寸进行相对的布局和定位。常用于构建按比例划分空间的布局，或配合滚动视图对视图进行精准定位。

***

## 属性说明

- **`axes`** (`AxisSet`，必填)
  指定在哪些轴向上应用相对布局（可选值：`horizontal`、`vertical` 或 `all`）。

- **`alignment`** (`Alignment`，可选，默认值：`"center"`）
  控制视图在容器内的对齐方式。

- **`count`** (`number`，可选，仅在第二种用法中有效)
  容器会被划分为多少等分。

- **`span`** (`number`，可选，默认值为 `1`)
  当前视图应占据多少等分。

- **`spacing`** (`number`，仅在第二种用法中为必填)
  分段之间的间距。

***

## 使用方式

该修饰符支持两种配置模式：

### 1. **自动适应模式**

仅指定对齐方向和轴向，不设置具体划分方式。

```tsx
containerRelativeFrame={{
  axes: 'horizontal',
  alignment: 'leading'
}}
```

### 2. **按比例划分模式**

将容器划分为若干等分，并为每个视图分配所占比例及间距。

```tsx
containerRelativeFrame={{
  axes: 'horizontal',
  count: 4,
  span: 2,
  spacing: 10
}}
```

***

## 示例

```tsx
<HStack>
  <Text
    containerRelativeFrame={{
      axes: 'horizontal',
      count: 3,
      span: 1,
      spacing: 8,
      alignment: 'center'
    }}
  >
    占据三分之一宽度
  </Text>
</HStack>
```

该示例将文字放入一个宽度为容器三分之一的区域内，视图之间的间距为 8。

***

## 参考资料

- [Apple 官方文档](https://developer.apple.com/documentation/swiftui/view/containerrelativeframe%28_:alignment:%29)
- [Hacking with Swift 教程](https://www.hackingwithswift.com/quick-start/swiftui/how-to-adjust-the-size-of-a-view-relative-to-its-container)
