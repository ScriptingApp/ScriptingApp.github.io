---
title: 形状样式
---
借助 `ShapeStyle`，你可以为视图的前景或背景设置不同的颜色、渐变以及系统材料特效，与 SwiftUI 中的样式能力相呼应。它提供从纯色到系统材料再到复杂渐变的多种选择。

---

## 概述

在使用诸如 `foregroundStyle` 或 `background` 之类的修饰器（modifier）时，允许你指定一个 `ShapeStyle` 来决定视图的外观。例如，你可以将背景设置为纯红色，也可以设置为系统材料模糊效果，甚至还可使用线性渐变等多种选项来进行样式化。

**在 SwiftUI（参考示例）：**
```swift
Text("Hello")
    .foregroundStyle(.red)
    .background(
        LinearGradient(
            colors: [.green, .blue],
            startPoint: .top,
            endPoint: .bottom
        )
    )
```

**在 Scripting（TypeScript/TSX）：**
```tsx
<Text
  foregroundStyle="red"
  background={{
    gradient: [
      { color: 'green', location: 0 },
      { color: 'blue', location: 1 }
    ],
    startPoint: { x: 0.5, y: 0 },
    endPoint: { x: 0.5, y: 1 }
  }}
>
  Hello
</Text>
```

---

## `ShapeStyle` 的各种类型

`ShapeStyle` 可以是下列之一：

1. **Material（材料）**：系统定义的材料效果，通常带有模糊或半透明效果。
2. **Color（颜色）**：可使用关键字、HEX 或者 RGBA 来表示的纯色。
3. **Gradient（渐变）**：由一组颜色或渐变点（gradient stop）生成的平滑色彩过渡。
4. **LinearGradient（线性渐变）**：在一条直线的两个端点之间平滑过渡。
5. **RadialGradient（径向渐变）**：从中心点向外辐射的渐变。
6. **ColorWithGradientOrOpacity**：以一个基本颜色为起点，可以自动生成标准渐变，或者通过不透明度（opacity）来调整透明度。

---

### Materials（材料）

**Material** 是指系统模糊或半透明材料效果，如 `regular`、`thin` 等，为 UI 提供类似原生 iOS 应用的“毛玻璃”外观。

**示例：**
```tsx
<HStack background="regular">
  {/* 在此放置内容 */}
</HStack>
```

---

### Colors（颜色）

**颜色** 可以通过以下三种方式指定：

- **关键字颜色**：系统和命名颜色（如 `"systemBlue"`、`"red"`、`"label"` 等）。
- **HEX 字符串**：类似 CSS 的十六进制格式（`"#FF0000"` 或 `"#F00"` 表示红色）。
- **RGBA 字符串**：CSS 的 rgba 格式（`"rgba(255,0,0,1)"` 表示不透明的红色）。

**示例：**
```tsx
<Text foregroundStyle="blue">蓝色文字</Text>
<HStack background="#00FF00">绿色背景</HStack>
<HStack background="rgba(255,255,255,0.5)">半透明白色背景</HStack>
```

---

### Gradients（渐变）

**Gradients** 可以由一个颜色数组或者一个包含 `GradientStop` 对象的数组来定义。每个 `GradientStop` 包括 `color` 和 `location`（从 0 到 1）来描述颜色过渡过程。

**示例：**
```tsx
<HStack
  background={{
    gradient: [
      { color: 'red', location: 0 },
      { color: 'orange', location: 0.5 },
      { color: 'yellow', location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }}
>
  {/* 内容 */}
</HStack>
```

---

### LinearGradient（线性渐变）

**LinearGradient** 用于定义在两个点之间的线性过渡。你可以直接指定一组颜色或使用渐变点（gradient stops），并通过关键字（如 `'top'`, `'bottom'`, `'leading'`, `'trailing'`）或者坐标对象（如 `{x: number, y: number}`）来确定起始点和终止点。

**示例：**
```tsx
<HStack
  background={{
    colors: ['green', 'blue'],
    startPoint: 'top',
    endPoint: 'bottom'
  }}
>
  {/* 内容 */}
</HStack>
```

或使用渐变点并自定义坐标：

```tsx
<HStack
  background={{
    stops: [
      { color: 'green', location: 0 },
      { color: 'blue', location: 1 }
    ],
    startPoint: { x: 0.5, y: 0 },
    endPoint: { x: 0.5, y: 1 }
  }}
>
  {/* 内容 */}
</HStack>
```

---

### RadialGradient（径向渐变）

**RadialGradient** 会从中心点向外扩散。通过指定 `center` 坐标，以及从 `startRadius` 到 `endRadius` 的变化范围，来形成辐射状的颜色过渡。

**示例：**
```tsx
<HStack
  background={{
    colors: ['red', 'yellow'],
    center: { x: 0.5, y: 0.5 },
    startRadius: 0,
    endRadius: 100
  }}
>
  {/* 内容 */}
</HStack>
```

---

### ColorWithGradientOrOpacity

使用 `ColorWithGradientOrOpacity` 时，你可以先设置一个 `color`，然后通过 `gradient: true` 属性启用该颜色的标准渐变，或者通过 `opacity` 属性来改变透明度。

**示例：**
```tsx
<HStack
  background={{
    color: 'blue',
    gradient: true,
    opacity: 0.8
  }}
>
  {/* 内容 */}
</HStack>
```

上面的配置将基于 `blue` 生成一个标准的渐变，并应用 80% 的不透明度。

---

## 小结

- 使用 **Materials** 来实现系统的模糊或半透明特效。  
- 使用 **Colors** 来填充纯色。  
- 使用 **Gradients**、**LinearGradient** 或 **RadialGradient** 实现多色平滑过渡的效果。  
- 使用 **ColorWithGradientOrOpacity** 来调整基础色彩的透明度，或者应用标准渐变。  

通过为视图选择合适的 `ShapeStyle` 变体，你可以快速为你的 UI 带来所需的视觉效果，无论是简洁纯色、灵动渐变，还是带有磨砂感的系统材料。