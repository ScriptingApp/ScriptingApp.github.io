---
title: Animation for Widget and LiveActivity

---

These APIs allow you to display animation in a widget.

## `AnimatedFrames` Component

### Description
The `AnimatedFrames` component allows you to display a frame animation in a widget by cycling through the provided child views as frames. The duration of the animation is customizable, and each frame corresponds to a view passed in as a child element.

### Props
- **`duration`**: `DurationInSeconds`  
  The animation duration, in seconds.
  
- **`children`**: `VirtualNode[]`  
  The array of views to toggle as the frames of the animation. Each child will be displayed sequentially during the animation.

### Example
```tsx
<AnimatedFrames duration={4}>
  <Circle fill="red" frame={{width: 20, height: 20}} />
  <Circle fill="red" frame={{width: 25, height: 25}} />
  <Circle fill="red" frame={{width: 30, height: 30}} />
  <Circle fill="red" frame={{width: 35, height: 35}} />
</AnimatedFrames>
```

---

## `AnimatedGif` Component

### Description
The `AnimatedGif` component renders an animated GIF in a widget. You can provide a custom path to the GIF file, and optionally, a duration for the animation.

### Props
- **`path`**: `string`  
  The file path of the GIF image.
  
- **`duration`**: `DurationInSeconds` _(Optional)_  
  The animation duration in seconds. If not provided, the default duration is used.

### Example
```tsx
<AnimatedGif
  path={Path.join(Script.directory, "test.gif")}
  duration={4}
/>
```

---

## `SwingAnimation` Type

### Description
The `SwingAnimation` type defines the configuration for animating a view in a swinging motion along the X and Y axes.

### Props
- **`duration`**: `DurationInSeconds`  
  The animation duration, in seconds.

- **`distance`**: `number`  
  The distance the view swings along the given axis.

---

## `ClockHandRotationEffectPeriod` Type

### Description
The `ClockHandRotationEffectPeriod` type is used to define the period of rotation for the clock hand effect. You can use predefined values like `"hourHand"`, `"minuteHand"`, or `"secondHand"`, or provide a custom duration.

---

## `AnimatedImage` Component

### Description
The `AnimatedImage` component renders an animated image in a widget. You can display either `SFSymbol` images or `UIImage` objects. The animation duration and content mode (fit or fill) can be customized.

### Props
- **`systemImages`**: `(string | { name: string; variableValue: number })[]` _(Optional)_  
  An array of `SFSymbol` names and variable values to display as a sequence of animated images.
  
- **`images`**: `UIImage[]` _(Optional)_  
  An array of `UIImage` objects to use as the animated frames.

- **`contentMode`**: `ContentMode` _(Optional)_  
  A flag indicating whether the image should fit or fill the parent context. The default is `"fit"`.  
  Possible values: `"fit"`, `"fill"`.

- **`duration`**: `DurationInSeconds`  
  The animation duration, in seconds.

### Example (using `SFSymbol`)
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

### Example (using `UIImage`)
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

---

## `CommonViewProps` Type

### Description
This type defines common properties for views that support animation effects, including swing animations and clock hand rotation effects.

### Props
- **`swingAnimation`**: `{ x?: SwingAnimation, y?: SwingAnimation }` _(Optional)_  
  Defines the animation configuration for swinging the view along the X and/or Y axis. Each axis can have its own animation settings:
  - **`x`**: The animation configuration for the horizontal axis.
  - **`y`**: The animation configuration for the vertical axis.

- **`clockHandRotationEffect`**: `ClockHandRotationEffectPeriod | { anchor: KeywordPoint | Point, period: ClockHandRotationEffectPeriod }` _(Optional)_  
  Defines the rotation effect for simulating a clock hand. You can specify the anchor point (optional) and the period (e.g., `"hourHand"`, `"minuteHand"`, `"secondHand"`), or provide a custom duration for the rotation.

### Example (Swing Animation)
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

### Example (Clock Hand Rotation Effect)
```tsx
<Circle
  fill="systemBlue"
  frame={{width: 50, height: 50}}
  clockHandRotationEffect="minuteHand"
/>
```