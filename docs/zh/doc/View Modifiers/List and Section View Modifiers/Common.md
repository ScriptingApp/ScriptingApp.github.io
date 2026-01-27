---
title: 通用修饰符

---

这些修饰符可用于精细控制 `<List>` 中每一行（Row）或每一个区块（Section）的布局与样式。

## 适用对象：

* 列表中的单个行（如 `<Text>`、`<HStack>`）
* 区块 `<Section>`
* 整个 `<List>`

---

## `listItemTint`

设置该行及其内容使用的 **前景色（tint）**。

### 类型

```ts
listItemTint?: Color
```

### 说明

* 设置为 `null` 表示不覆盖继承颜色。
* 可使用关键词颜色、Hex、或 rgba。

### 示例

```tsx
<Text listItemTint="green">
  带颜色的行
</Text>
```

---

## `listRowInsets`

设置该行的 **内边距（insets）**。

### 类型

```ts
listRowInsets?: number | EdgeInsets
```

### 说明

* 使用单个数字表示上下左右相同的内边距；
* 使用 `EdgeInsets` 对象设置四个方向的独立间距。

### 示例

```tsx
<Text
  listRowInsets={{
    top: 10,
    bottom: 10,
    leading: 20,
    trailing: 20
  }}
>
  自定义边距的行
</Text>
```

---

## `listRowSpacing`

设置 **相邻两行之间的垂直间距**。

### 类型

```ts
listRowSpacing?: number
```

### 示例

```tsx
<List listRowSpacing={12}>
  <Text>第一行</Text>
  <Text>第二行</Text>
</List>
```

---

## `listRowSeparator`

设置当前行的 **分隔线可见性**。

### 类型

```ts
listRowSeparator?: Visibility | {
  visibility: Visibility
  edges: VerticalEdgeSet
}
```

### 可选值（Visibility）：

* `"visible"`：始终显示分隔线
* `"hidden"`：隐藏分隔线
* `"automatic"`：系统默认行为

### 示例

```tsx
<Text
  listRowSeparator={{
    visibility: "hidden",
    edges: "bottom"
  }}
>
  隐藏底部分隔线的行
</Text>
```

---

## `listRowSeparatorTint`

设置该行的 **分隔线颜色**。

### 类型

```ts
listRowSeparatorTint?: Color | {
  color: Color
  edges: VerticalEdgeSet
}
```

### 示例

```tsx
<Text
  listRowSeparatorTint={{
    color: "rgba(255,0,0,0.5)",
    edges: "bottom"
  }}
>
  带红色分隔线的行
</Text>
```

---

## `listRowBackground`

为该行设置一个自定义的 **背景视图**。

### 类型

```ts
listRowBackground?: VirtualNode
```

### 示例

```tsx
<Text
  listRowBackground={
    <Rectangle fill="#f0f0f0" cornerRadius={10} />
  }
>
  带灰色背景的行
</Text>
```

---

## `listSectionSpacing`

设置 **区块（Section）之间的垂直间距**。

### 类型

```ts
listSectionSpacing?: number | "compact" | "default"
```

### 示例

```tsx
<List listSectionSpacing="compact">
  <Section>...</Section>
  <Section>...</Section>
</List>
```

---

## `listSectionSeparator`

控制某个区块的 **顶部或底部分隔线显示情况**。

### 类型

```ts
listSectionSeparator?: Visibility | {
  visibility: Visibility
  edges: VerticalEdgeSet
}
```

### 示例

```tsx
<Section
  listSectionSeparator={{
    visibility: "hidden",
    edges: "top"
  }}
>
  <Text>内容</Text>
</Section>
```

---

## `listSectionSeparatorTint`

设置区块分隔线的 **颜色**。

### 类型

```ts
listSectionSeparatorTint?: Color | {
  color: Color
  edges: VerticalEdgeSet
}
```

### 示例

```tsx
<Section
  listSectionSeparatorTint={{
    color: "#cccccc",
    edges: "bottom"
  }}
>
  <Text>灰色底部分隔线</Text>
</Section>
```

---

## 辅助类型定义

## `EdgeInsets` 示例

```ts
{
  top: number
  bottom: number
  leading: number
  trailing: number
}
```

## `Visibility`

```ts
"automatic" | "visible" | "hidden"
```

## `VerticalEdgeSet`

```ts
"top" | "bottom" | "all"
```

## `Color` 可接受格式：

* 关键词颜色（如 `"green"`、`"label"`）
* Hex 色值（如 `"#ff0000"`）
* RGBA 字符串（如 `"rgba(255,0,0,1)"`）

---

## 修饰符汇总表

| 修饰符                        | 作用说明                 |
| -------------------------- | -------------------- |
| `listItemTint`             | 设置该行内容的前景色           |
| `listRowInsets`            | 设置该行的内边距             |
| `listRowSpacing`           | 设置相邻两行之间的间距          |
| `listRowSeparator`         | 控制该行分隔线的显示           |
| `listRowSeparatorTint`     | 设置该行分隔线的颜色           |
| `listRowBackground`        | 设置该行的背景视图            |
| `listSectionSpacing`       | 设置两个 Section 之间的垂直间距 |
| `listSectionSeparator`     | 控制区块的顶部或底部分隔线是否显示    |
| `listSectionSeparatorTint` | 设置区块分隔线的颜色           |
