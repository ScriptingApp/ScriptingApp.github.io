# 形状样式

`ShapeStyle` 类型定义了如何将颜色、渐变和材质应用于视图的前景或背景，反映了 SwiftUI 中的样式能力。它涵盖了广泛的样式选项，包括纯色、系统材质和复杂的渐变。

## 概览

在使用 `foregroundStyle` 或 `background` 等修饰符时，你可以传入一个 `ShapeStyle` 来确定视觉外观。例如，可以使用纯红色背景、系统模糊材质或线性渐变，这些都可以通过 `ShapeStyle` 表达。

**SwiftUI 示例（仅供参考）：**

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

**脚本语言示例（TypeScript/TSX）：**

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

## ShapeStyle 的类型变体

`ShapeStyle` 可以是以下几种之一：

1. **Material（材质）**：系统定义的材质，用于创建层叠效果，通常包含模糊或半透明。
2. **Color（颜色）**：一个纯色，可通过关键字、十六进制或 RGBA 字符串定义。
3. **Gradient（渐变）**：颜色或渐变停点集合，生成平滑的颜色过渡效果。
4. **LinearGradient（线性渐变）**：沿直线方向的颜色渐变。
5. **RadialGradient（径向渐变）**：从中心向外辐射的渐变。
6. **AngularGradient（角向渐变）**：又称“圆锥渐变”，以角度为依据沿中心点展开。
7. **MeshGradient（网格渐变）**：由二维颜色网格定义的复杂渐变。
8. **ColorWithGradientOrOpacity**：带有标准渐变或不透明度调节的基础颜色。

### 材质（Materials）

**Material** 指的是系统模糊效果，如 `regularMaterial`、`thinMaterial` 等，常用于营造 iOS 应用中的“毛玻璃”外观。

**示例：**

```tsx
<HStack background="regularMaterial">
  {/* 内容 */}
</HStack>
```

### 颜色（Colors）

颜色可以通过三种方式定义：

- **关键字颜色**：系统或命名颜色（如 `"systemBlue"`、`"red"`、`"label"`）。
- **十六进制字符串**：类似 CSS 的格式（如 `"#FF0000"` 或 `"#F00"` 表示红色）。
- **RGBA 字符串**：CSS 格式的 rgba（如 `"rgba(255,0,0,1)"` 表示不透明红）。

**示例：**

```tsx
<Text foregroundStyle="blue">蓝色文字</Text>
<HStack background="#00FF00">绿色背景</HStack>
<HStack background="rgba(255,255,255,0.5)">半透明白色背景</HStack>
```

### 渐变（Gradients）

渐变可以是颜色数组或 `GradientStop` 数组，每个 `GradientStop` 包含一个颜色和一个从 0 到 1 的位置值，用于定义过渡位置。

**示例：**

```tsx
<HStack
  background={
    gradient([
      { color: 'red', location: 0 },
      { color: 'orange', location: 0.5 },
      { color: 'yellow', location: 1 }
    ])
  }
>
  {/* 内容 */}
</HStack>
```

### 线性渐变（LinearGradient）

线性渐变沿两点之间的直线进行颜色过渡。你可以指定颜色或渐变停点，以及起点和终点（可使用关键字如 `'top'`、`'bottom'`，或 `{x, y}` 格式的坐标）。

**示例：**

```tsx
<HStack
  background={
    gradient("linear", {
      colors: ['green', 'blue'],
      startPoint: 'top',
      endPoint: 'bottom'
    })
  }
>
  {/* 内容 */}
</HStack>
```

或使用渐变停点与自定义坐标：

```tsx
<HStack
  background={
    gradient("linear", {
      stops: [
        { color: 'green', location: 0 },
        { color: 'blue', location: 1 }
      ],
      startPoint: { x: 0.5, y: 0 },
      endPoint: { x: 0.5, y: 1 }
    })
  }
>
  {/* 内容 */}
</HStack>
```

### 径向渐变（RadialGradient）

径向渐变从一个中心点向外扩展，指定起始和结束半径。

**示例：**

```tsx
<HStack
  background={
    gradient("radial", {
      colors: ['red', 'yellow'],
      center: { x: 0.5, y: 0.5 },
      startRadius: 0,
      endRadius: 100
    })
  }
>
  {/* 内容 */}
</HStack>
```

### 角向渐变（AngularGradient）

角向渐变围绕中心点以角度变化生成颜色过渡，适合用于圆形进度条等效果。

#### 定义方式

```ts
type AngularGradient =
  | { stops: GradientStop[], center: KeywordPoint | Point, startAngle: Angle, endAngle: Angle }
  | { colors: Color[], center: KeywordPoint | Point, startAngle: Angle, endAngle: Angle }
  | { gradient: Gradient, center: KeywordPoint | Point, startAngle: Angle, endAngle: Angle }
  | { stops: GradientStop[], center: KeywordPoint | Point, angle: Angle }
  | { colors: Color[], center: KeywordPoint | Point, angle: Angle }
  | { gradient: Gradient, center: KeywordPoint | Point, angle: Angle }
```

#### 参数说明

- **`colors` 或 `stops`**：定义渐变的颜色或颜色停点。
- **`center`**：以哪个点为中心展开渐变，可用关键字或自定义点。
- **`startAngle` 与 `endAngle`**：渐变覆盖的角度范围。
- **`angle`**：用于简化表示完整角度变化。

#### 示例

```tsx
<Circle
  fill={gradient("angular", {
    colors: ["blue", "purple", "pink"],
    center: "center",
    startAngle: 0,
    endAngle: 360
  })}
/>
```

此示例为圆形应用一个从蓝到粉的角向渐变。

### 网格渐变（MeshGradient）（iOS 18.0+）

`MeshGradient` 是由控制点网格组成的二维渐变，能实现复杂细腻的动态颜色过渡。

#### 定义

```ts
type MeshGradient = {
  width: number
  height: number
  points: Point[]
  colors: Color[]
  background?: Color
  smoothsColors?: boolean
}
```

#### 参数说明

- **`width` 与 `height`**：控制点网格的宽度和高度。
- **`points`**：每个控制点的位置，数量需与 `width × height` 一致。
- **`colors`**：每个点的颜色，数量也需一致。
- **`background`**（可选）：网格外部的背景颜色，默认是透明。
- **`smoothsColors`**（可选）：是否启用平滑颜色插值，默认为 `true`。

> 注：仅支持 **iOS 18.0 及以上版本**

#### 示例

```tsx
<Rectangle
  fill={gradient("mesh", {
    width: 2,
    height: 2,
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ],
    colors: ["red", "yellow", "blue", "green"]
  })}
/>
```

这个示例定义了一个 2×2 网格，在四个控制点之间进行颜色过渡。

### `gradient()` 工具函数

`gradient()` 是一个辅助函数，用于使代码更具可读性和表达力，支持所有渐变类型。

#### 函数签名

```ts
function gradient(gradient: Gradient): Gradient
function gradient(type: "linear", gradient: LinearGradient): LinearGradient
function gradient(type: "radial", gradient: RadialGradient): RadialGradient
function gradient(type: "angular", gradient: AngularGradient): AngularGradient
function gradient(type: "mesh", gradient: MeshGradient): MeshGradient
```

#### 描述

- 单参数使用：`gradient(Gradient)` 返回原始渐变对象。
- 双参数使用：第一个参数为渐变类型，第二个为其配置项。

#### 示例

```tsx
<Text
  foregroundStyle={
    gradient("linear", {
      colors: ["red", "orange"],
      startPoint: "leading",
      endPoint: "trailing"
    })
  }
>
  Hello World!
</Text>
```

### ColorWithGradientOrOpacity

该类型以基础颜色为起点，可设置 `gradient: true` 来自动应用标准渐变，或通过 `opacity` 设置透明度。

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

这将生成一个蓝色的标准渐变，并应用 80% 的不透明度。

## 总结

- 使用 **Material** 实现系统模糊效果。
- 使用 **Color** 进行纯色填充。
- 使用 **各种 Gradient 类型** 实现多色渐变过渡。
- 使用 **ColorWithGradientOrOpacity** 实现颜色透明度调整或标准渐变。

通过选择合适的 `ShapeStyle` 类型，可以轻松地为 UI 元素实现所需的视觉样式，无论是简单的纯色、动态的渐变，还是精致的材质效果。
