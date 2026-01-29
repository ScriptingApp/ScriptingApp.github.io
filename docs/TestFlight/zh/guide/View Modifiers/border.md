---
title: 边框
description: 该属性用于为视图添加边框。

---

`border` 属性用于为视图添加边框，可指定边框样式与可选的宽度。支持使用纯色、渐变、系统材质等视觉样式，并能根据系统浅色/深色模式自动切换。

## 定义

```ts
border?: {
  style: ShapeStyle | DynamicShapeStyle
  width?: number
}
```

* **`style`**：必填，定义边框的视觉样式，支持 `ShapeStyle` 或 `DynamicShapeStyle`。
* **`width`**：选填，设置边框的粗细（像素单位），默认值为 `1`。

## 使用示例

### 纯色边框

```tsx
<Text
  border={{
    style: "systemRed",
    width: 2
  }}
>
  带边框的文字
</Text>
```

### 默认宽度（1px）边框

```tsx
<HStack
  border={{
    style: "#000000"
  }}
>
  ...
</HStack>
```

### 渐变边框

```tsx
<Text
  border={{
    style: {
      gradient: [
        { color: "red", location: 0 },
        { color: "blue", location: 1 }
      ],
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 1, y: 1 }
    },
    width: 3
  }}
>
  渐变边框
</Text>
```

### 动态边框样式（浅色/深色模式自动切换）

```tsx
<Text
  border={{
    style: {
      light: "gray",
      dark: "white"
    },
    width: 1.5
  }}
>
  自适应边框
</Text>
```

## 注意事项

* 边框将包裹整个视图边缘，并与视图尺寸和 `frame` 设置一起作用。
* `style` 支持所有 `ShapeStyle` 类型，也可使用系统材质（如 `"regularMaterial"`、`"ultraThinMaterial"`）来创建原生 iOS 风格的边框。
