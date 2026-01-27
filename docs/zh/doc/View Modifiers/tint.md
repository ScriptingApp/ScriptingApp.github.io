---
title: 强调色

---

`tint` 属性用于为视图设置局部的强调色，覆盖默认的系统 accent color。与应用的全局 accent color 不同，`tint` 不会被用户偏好覆盖，始终有效，适合用来强调控件的语义意义或视觉重点。

## 定义

```ts
tint?: ShapeStyle | DynamicShapeStyle
```


## 支持的值

* **`ShapeStyle`**：可为纯色、渐变或系统材质。
* **`DynamicShapeStyle`**：可根据浅色/深色模式自动切换的样式。

## 常见用途

* 设置如 `Toggle`、`Slider`、`Button`、`ProgressView` 等控件的本地着色。
* 在表单、列表或弹窗中标记具有特定意义的组件。
* 保证 UI 色彩在不同用户主题下始终一致。

## 示例：基础颜色着色

```tsx
<Toggle
  tint="systemGreen"
  // ...
/>
```

## 示例：渐变着色

```tsx
<ProgressView
  value={0.6}
  tint={{
    gradient: [
      { color: "red", location: 0 },
      { color: "orange", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }}
/>
```

## 示例：深浅模式适配

```tsx
<Slider
  tint={{
    light: "blue",
    dark: "purple"
  }}
  // ...
/>
```