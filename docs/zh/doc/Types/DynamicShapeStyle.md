---
title: DynamicShapeStyle

---

`DynamicShapeStyle` 类型允许为一个形状定义两种不同的样式——一种用于浅色模式，另一种用于深色模式。系统会根据用户设备的当前配色方案（浅色或深色）自动应用适合的样式。

## 概述

动态样式是创建自适应且视觉吸引力用户界面的关键之一。通过使用 `DynamicShapeStyle`，可以确保您的形状与用户首选的配色方案完美融合，为浅色模式和深色模式分别定义样式。

**关键点：**

- 使用 `light` 属性定义 **浅色模式** 的样式。
- 使用 `dark` 属性定义 **深色模式** 的样式。
- 系统会根据用户当前的设置自动应用适当的样式。

## 声明

```tsx
type DynamicShapeStyle = {
    light: ShapeStyle;
    dark: ShapeStyle;
};
```

- **`light: ShapeStyle`**  
  当系统处于浅色模式时应用的样式。

- **`dark: ShapeStyle`**  
  当系统处于深色模式时应用的样式。

### 支持的 `ShapeStyle`

`ShapeStyle` 可以是颜色、渐变或材质，例如：

- **颜色**：如 `"red"`、十六进制值 `"#FF0000"` 或类似 CSS 的 RGBA 字符串 `"rgba(255, 0, 0, 1)"`。
- **渐变**：线性渐变或径向渐变。
- **材质**：系统材质，如 `"regularMaterial"`、`"thickMaterial"`。

## 使用示例

### 使用动态颜色

```tsx
const dynamicStyle: DynamicShapeStyle = {
  light: "blue",
  dark: "gray"
}

<Text
  foregroundStyle={dynamicStyle}
/>
```

在此示例中，形状在浅色模式下显示为 **蓝色**，在深色模式下显示为 **灰色**。

### 使用动态渐变

```tsx
const dynamicStyle: DynamicShapeStyle = {
  light: {
    gradient: [
      { color: "lightblue", location: 0 },
      { color: "white", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  },
  dark: {
    gradient: [
      { color: "darkblue", location: 0 },
      { color: "black", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }
}

<Circle
  fill={dynamicStyle}
/>
```

在此示例中，形状在浅色模式下使用 **浅蓝到白色渐变**，在深色模式下使用 **深蓝到黑色渐变**。

### 使用材质

```tsx
const dynamicStyle: DynamicShapeStyle = {
  light: "regularMaterial",
  dark: "ultraThickMaterial"
}

<HStack
  background={dynamicStyle}
></HStack>
```

此配置在浅色模式下应用 **普通材质**，在深色模式下应用 **超厚材质**。

## 为什么使用 `DynamicShapeStyle`？

动态样式通过以下方式提升用户体验：

1. **视觉和谐**：形状自适应用户的配色方案，保持美观一致。
2. **可访问性**：针对深色模式调整样式，提升在低光环境中的可读性和易用性。
3. **一致性**：与系统整体的偏好设置保持一致，使应用看起来更加集成。

## 总结

通过使用 `DynamicShapeStyle`，您可以为形状创建灵活且自适应的样式，根据用户的配色方案无缝切换。为浅色和深色模式分别定义样式，确保应用在任何环境下都能提供一致且用户友好的体验。