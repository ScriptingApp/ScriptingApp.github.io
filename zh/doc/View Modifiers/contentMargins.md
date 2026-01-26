# 内容外边距

`contentMargins` 修饰符用于为视图内容添加自定义的外边距（Margins）。它支持统一设置所有边，也支持根据指定方向（如顶部、底部、水平、垂直）以及不同位置（内容区域或滚动指示器区域）灵活设置边距。

***

## 类型定义

```ts
contentMargins?: 
  | number
  | EdgeInsets
  | {
      edges?: EdgeSet
      insets: number | EdgeInsets
      placement?: ContentMarginPlacement
    }
```

***

## 参数说明

## `insets`（必填）

指定要添加的边距数值：

- 可传入一个数字，表示所有边统一使用该数值；
- 或传入 `EdgeInsets` 对象，分别设置 `top`、`bottom`、`leading`、`trailing`。

### 示例：统一边距

```tsx
<ScrollView contentMargins={20}>
  <Text>上下左右各添加 20 点边距</Text>
</ScrollView>
```

### 示例：分别设置边距

```tsx
<ScrollView
  contentMargins={{
    top: 10,
    bottom: 30,
    leading: 16,
    trailing: 16
  }}
>
  <Text>自定义边距</Text>
</ScrollView>
```

***

## `edges`（可选）

设置要在哪些方向上应用边距，默认是全部方向。

### 类型

```ts
type EdgeSet = "top" | "bottom" | "leading" | "trailing" | "vertical" | "horizontal" | "all"
```

### 示例：仅设置上下边距

```tsx
<ScrollView
  contentMargins={{
    edges: "vertical",
    insets: 12
  }}
>
  <Text>仅上下有边距</Text>
</ScrollView>
```

***

## `placement`（可选）

指定边距的作用区域，适用于滚动容器（如 ScrollView）中需要区分内容区域和滚动条指示区域的场景。

### 类型

```ts
type ContentMarginPlacement = "automatic" | "scrollContent" | "scrollIndicators"
```

### 可选值说明：

| 值                    | 描述                  |
| -------------------- | ------------------- |
| `"automatic"`        | 默认行为，系统决定边距应用位置     |
| `"scrollContent"`    | 边距应用于可滚动的内容区域       |
| `"scrollIndicators"` | 边距仅应用于滚动指示器（如滚动条）区域 |

### 示例：边距仅作用于内容区域

```tsx
<ScrollView
  contentMargins={{
    insets: 24,
    placement: "scrollContent"
  }}
>
  <Text>内容区域设置边距，滚动条不受影响</Text>
</ScrollView>
```

***

## 完整示例

```tsx
<ScrollView
  contentMargins={{
    edges: "horizontal",
    insets: { leading: 20, trailing: 20, top: 0, bottom: 0 },
    placement: "scrollContent"
  }}
>
  <VStack spacing={10}>
    <Text>仅在横向内容区域添加边距</Text>
  </VStack>
</ScrollView>
```

***

## 参数汇总

| 参数          | 说明                                         |
| ----------- | ------------------------------------------ |
| `insets`    | 必填。边距数值，可为统一数字或 `EdgeInsets` 对象            |
| `edges`     | 可选。应用边距的方向，如 `"vertical"`、`"horizontal"` 等 |
| `placement` | 可选。边距作用区域（内容区域或滚动条区域）                      |
