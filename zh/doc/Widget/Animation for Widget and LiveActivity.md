# 在小组件和灵动岛中使用动画

这些API让你在小组件中播放动图或者使用位移和旋转动画。

## `AnimatedFrames` 组件

### 描述

`AnimatedFrames` 组件允许你通过提供的子视图来展示帧动画。这些子视图将按顺序循环显示，形成动画效果。你可以自定义动画的持续时间。

### 属性

- **`duration`**: `DurationInSeconds`\
  动画的持续时间，单位为秒。

- **`children`**: `VirtualNode[]`\
  一组视图，作为动画的每一帧。每个子视图在动画过程中依次显示。

### 示例

```tsx
<AnimatedFrames duration={4}>
  <Circle fill="red" frame={{width: 20, height: 20}} />
  <Circle fill="red" frame={{width: 25, height: 25}} />
  <Circle fill="red" frame={{width: 30, height: 30}} />
  <Circle fill="red" frame={{width: 35, height: 35}} />
</AnimatedFrames>
```

***

## `AnimatedGif` 组件

### 描述

`AnimatedGif` 组件用于在小组件中渲染一个 GIF 动图。你可以提供 GIF 文件的路径，并可选地设置动画的持续时间。

### 属性

- **`path`**: `string`\
  GIF 文件的路径。

- **`duration`**: `DurationInSeconds` _(可选)_\
  动画的持续时间，单位为秒。如果未提供，使用默认持续时间。

### 示例

```tsx
<AnimatedGif
  path={Path.join(Script.directory, "test.gif")}
  duration={4}
/>
```

***

## `SwingAnimation` 类型

### 描述

`SwingAnimation` 类型定义了视图在水平和垂直方向上的摇摆动画配置。

### 属性

- **`duration`**: `DurationInSeconds`\
  动画的持续时间，单位为秒。

- **`distance`**: `number`\
  视图在给定轴向上摇摆的距离。

***

## `ClockHandRotationEffectPeriod` 类型

### 描述

`ClockHandRotationEffectPeriod` 类型用于定义时钟指针旋转效果的周期。你可以使用预定义值如 `"hourHand"`、`"minuteHand"` 或 `"secondHand"`，也可以提供自定义的持续时间。

***

## `AnimatedImage` 组件

### 描述

`AnimatedImage` 组件用于在小组件中渲染一个动画图像。你可以使用 `SFSymbol` 或 `UIImage` 作为动画帧，并自定义动画的持续时间和内容模式（适应或填充）。

### 属性

- **`systemImages`**: `(string | { name: string; variableValue: number })[]` _(可选)_\
  一个包含 `SFSymbol` 名称和变量值的数组，用于显示作为动画帧的符号图像。

- **`images`**: `UIImage[]` _(可选)_\
  一个 `UIImage` 数组，用于显示作为动画帧的图像。

- **`contentMode`**: `ContentMode` _(可选)_\
  图像在父容器中的显示方式。默认为 `"fit"`。\
  可选值：`"fit"`、`"fill"`。

- **`duration`**: `DurationInSeconds`\
  动画的持续时间，单位为秒。

### 示例 (使用 `SFSymbol`)

```tsx
<AnimatedImage
  duration={6}
  systemImages={[
    {name: "chart.bar.fill", variableValue: 0},
    {name: "chart.bar.fill", variableValue: 0.3},
    {name: "chart.bar.fill", variableValue: 0.6},
    {name: "chart.bar.fill", variableValue: 1},
  ]}
  contentMode="fit"
/>
```

### 示例 (使用 `UIImage`)

```tsx
const image1 = Path.join(Script.directory, "image1.png")
const image2 = Path.join(Script.directory, "image2.png")

<AnimatedImage
  duration={4}
  images={[
    UIImage.fromFile(image1),
    UIImage.fromFile(image2),
  ]}
  contentMode="fill"
/>
```

***

## `CommonViewProps` 类型

### 描述

此类型定义了支持动画效果的视图的公共属性，包括摇摆动画和时钟指针旋转效果。

### 属性

- **`swingAnimation`**: `{ x?: SwingAnimation, y?: SwingAnimation }` _(可选)_\
  定义了视图在 X 轴和 Y 轴上的摇摆动画配置。每个轴向都可以有单独的动画设置：
  - **`x`**: 水平轴的动画配置。
  - **`y`**: 垂直轴的动画配置。

- **`clockHandRotationEffect`**: `ClockHandRotationEffectPeriod | { anchor: KeywordPoint | Point, period: ClockHandRotationEffectPeriod }` _(可选)_\
  定义模拟时钟指针的旋转效果。可以指定锚点（可选）和周期（例如，`"hourHand"`、`"minuteHand"`、`"secondHand"`），或者提供自定义的旋转持续时间。

### 示例 (摇摆动画)

```tsx
<Circle
  fill="systemRed"
  frame={{width: 50, height: 50}}
  swingAnimation={{
    x: {duration: 4, distance: 250},
    y: {duration: 2, distance: 50},
  }}
/>
```

### 示例 (时钟指针旋转效果)

```tsx
<Circle
  fill="systemBlue"
  frame={{width: 50, height: 50}}
  clockHandRotationEffect="minuteHand"
/>
```
