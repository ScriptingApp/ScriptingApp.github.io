---
title: 安全区域

---

Scripting 提供与 SwiftUI 类似的安全区域控制功能，允许你灵活地**向安全区域内插入视图内容**，或让视图**忽略安全区域限制**进行全屏布局。安全区域通常指设备屏幕上的“刘海”、工具栏、键盘等系统 UI 所保留的边距。

---

## `safeAreaPadding`

为视图的安全区域添加自定义内边距。该修饰符可调整视图在系统安全区域内的显示范围（例如避开刘海、Home 指示器或圆角），用于保持内容在合理的可视范围内。

### 类型

```ts
safeAreaPadding?: 
  true | 
  number | 
  {
    horizontal?: number | true
    vertical?: number | true
    leading?: number | true
    trailing?: number | true
    top?: number | true
    bottom?: number | true
  }
```

---

### 描述

该修饰符允许你为视图的安全区域内边距进行灵活设置：

* 传入 `true`：在所有安全区域边缘应用系统默认的内边距；
* 传入一个数字：为所有边缘应用统一的内边距值；
* 传入对象：分别设置各个方向或边缘的内边距，支持数值或 `true` 表示使用系统默认值。

适合在你希望视图保持适配安全区域的同时进行自定义布局的场景使用。

---

### 用法说明

* `true`：在所有安全区域边缘应用系统默认内边距
* `number`：为所有边缘应用指定数值的内边距
* `object`：为不同方向或边缘单独设置内边距

---

### 对象属性说明

* `horizontal`：左右（`leading` 和 `trailing`）方向的内边距
* `vertical`：上下（`top` 和 `bottom`）方向的内边距
* `leading`、`trailing`、`top`、`bottom`：各个边缘的单独内边距
* 值可以是具体的数值，也可以是 `true`（表示使用系统默认值）

---

### 示例：默认内边距

```tsx
<VStack safeAreaPadding={true}>
  <Text>Hello</Text>
</VStack>
```

在所有安全区域边缘应用系统默认的内边距。

---

### 示例：自定义内边距

```tsx
<VStack
  safeAreaPadding={{
    top: 20,
    bottom: true,
    horizontal: 12
  }}
>
  <Text>内容</Text>
</VStack>
```

上边距为 20 点，下边距为系统默认值，左右边距为 12 点。

---

## `safeAreaInset`

在指定的安全区域边缘插入一个视图内容（如底部工具栏、顶部标题等）。

### 类型

```ts
safeAreaInset?: {
  top?: {
    alignment?: HorizontalAlignment
    spacing?: number
    content: VirtualNode
  },
  bottom?: {
    alignment?: HorizontalAlignment
    spacing?: number
    content: VirtualNode
  },
  leading?: {
    alignment?: VerticalAlignment
    spacing?: number  // 实际为 spacing
    content: VirtualNode
  },
  trailing?: {
    alignment?: VerticalAlignment
    spacing?: number  // 实际为 spacing
    content: VirtualNode
  }
}
```

### 参数说明

* `top` / `bottom`：向顶部或底部安全区域插入内容，使用 **水平对齐（HorizontalAlignment）**。
* `leading` / `trailing`：向左右安全区域插入内容，使用 **垂直对齐（VerticalAlignment）**。
* `alignment`：内容在插入区域内的对齐方式。
* `spacing`：原始视图与插入内容之间的额外间距。
* `content`：要插入的视图节点，如 `<Text>`、`<HStack>` 等。

### 示例

```tsx
<ScrollView
  safeAreaInset={{
    bottom: {
      alignment: "center",
      spacing: 8,
      content: <Text>底部工具栏</Text>
    }
  }}
>
  <VStack>
    <Text>滚动内容</Text>
  </VStack>
</ScrollView>
```

### 对齐方式

* **水平对齐（top / bottom）**：`"leading"`、`"center"`、`"trailing"`
* **垂直对齐（leading / trailing）**：`"top"`、`"center"`、`"bottom"`

> 注意：`spacing` 是拼写错误，实际应为 `spacing`。

---

## `ignoresSafeArea`

让视图内容**扩展至安全区域之外**，用于构建沉浸式或全屏背景内容。

### 类型

```ts
ignoresSafeArea?: boolean | {
  regions?: SafeAreaRegions
  edges?: EdgeSet
}
```

### 简单用法（布尔值）

```tsx
<Image
  imageUrl="https://example.com/background.jpg"
  ignoresSafeArea
/>
```

> 整个视图将忽略所有边缘的安全区域，填满全屏。

### 配置用法（对象形式）

```tsx
<VStack
  ignoresSafeArea={{
    regions: "all",
    edges: "bottom"
  }}
>
  <Text>底部内容扩展到系统栏下方</Text>
</VStack>
```

---

### `regions`（可选）

| 值             | 描述                         |
| ------------- | -------------------------- |
| `"all"`       | 忽略所有安全区域（默认）               |
| `"container"` | 忽略容器级别的 UI（如导航栏、标签栏）       |
| `"keyboard"`  | 忽略键盘弹出区域（适用于需要背景填满键盘下方的场景） |

### `edges`（可选）

| 值              | 描述         |
| -------------- | ---------- |
| `"top"`        | 忽略顶部安全区域   |
| `"bottom"`     | 忽略底部安全区域   |
| `"leading"`    | 忽略左侧安全区域   |
| `"trailing"`   | 忽略右侧安全区域   |
| `"vertical"`   | 忽略上下       |
| `"horizontal"` | 忽略左右       |
| `"all"`        | 忽略所有边缘（默认） |
