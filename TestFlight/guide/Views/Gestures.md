# Gestures

The **Scripting app** provides a gesture system similar to SwiftUI, allowing any view (`<VStack>`, `<HStack>`, `<Text>`, etc.) to respond to touch interactions such as tapping, long pressing, dragging, rotating, and magnifying.

You can use:

- Simplified gesture properties like `onTapGesture`, `onLongPressGesture`, `onDragGesture`, or
- Advanced gesture objects such as `TapGesture()`, `LongPressGesture()`, and the `gesture` modifiers for composition and priority control.

***

## 1. Simple Gesture Properties

These are convenient, shorthand ways to add gestures directly to a view.

***

### `onTapGesture`

Executes an action when a tap gesture is recognized.

#### Type

```ts
onTapGesture?: (() => void) | {
  count: number
  perform: () => void
}
```

#### Parameters

| Name      | Type         | Default | Description                                                  |
| --------- | ------------ | ------- | ------------------------------------------------------------ |
| `count`   | `number`     | `1`     | Number of taps required (1 for single tap, 2 for double tap) |
| `perform` | `() => void` | —       | Action to perform when the tap is recognized                 |

#### Examples

```tsx
// Single tap
<VStack onTapGesture={() => console.log('Tapped')} />

// Double tap
<HStack
  onTapGesture={{
    count: 2,
    perform: () => console.log('Double tapped')
  }}
/>
```

***

### `onLongPressGesture`

Executes an action when a long press gesture is recognized.

#### Type

```ts
onLongPressGesture?: (() => void) | {
  minDuration?: number
  maxDuration?: number
  perform: () => void
  onPressingChanged?: (state: boolean) => void
}
```

#### Parameters

| Name                | Type                       | Default | Description                                             |
| ------------------- | -------------------------- | ------- | ------------------------------------------------------- |
| `minDuration`       | `number`                   | `500`   | Minimum press duration (ms) before the gesture succeeds |
| `maxDuration`       | `number`                   | `10000` | Maximum duration before the gesture fails (ms)          |
| `perform`           | `() => void`               | —       | Action to execute when the long press succeeds          |
| `onPressingChanged` | `(state: boolean) => void` | —       | Called when pressing starts or ends (`true` = pressing) |

#### Examples

```tsx
// Simple usage
<VStack onLongPressGesture={() => console.log('Long pressed')} />

// Custom duration and press state callback
<HStack
  onLongPressGesture={{
    minDuration: 800,
    maxDuration: 3000,
    perform: () => console.log('Long press success'),
    onPressingChanged: isPressing =>
      console.log(isPressing ? 'Pressing...' : 'Released')
  }}
/>
```

***

### `onDragGesture`

Adds a drag gesture to a view, tracking position, offset, and velocity.

#### Type

```ts
onDragGesture?: {
  minDistance?: number
  coordinateSpace?: 'local' | 'global'
  onChanged?: (details: DragGestureDetails) => void
  onEnded?: (details: DragGestureDetails) => void
}
```

#### Parameters

| Name              | Type                                    | Default    | Description                                            |                                 |
| ----------------- | --------------------------------------- | ---------- | ------------------------------------------------------ | ------------------------------- |
| `minDistance`     | `number`                                | `10`       | Minimum movement (in points) before the gesture starts |                                 |
| `coordinateSpace` | `'local'`                               | `'global'` | `'local'`                                              | Coordinate space of the gesture |
| `onChanged`       | `(details: DragGestureDetails) => void` | —          | Called as the drag changes                             |                                 |
| `onEnded`         | `(details: DragGestureDetails) => void` | —          | Called when the drag ends                              |                                 |

#### `DragGestureDetails`

```ts
type DragGestureDetails = {
  time: number
  location: Point
  startLocation: Point
  translation: Size
  velocity: Size
  predictedEndLocation: Point
  predictedEndTranslation: Size
}
```

| Field                     | Description                              |
| ------------------------- | ---------------------------------------- |
| `time`                    | Timestamp of the drag event (ms)         |
| `location`                | Current pointer position `{x, y}`        |
| `startLocation`           | Initial drag position                    |
| `translation`             | Offset from start to current position    |
| `velocity`                | Current velocity in points per second    |
| `predictedEndLocation`    | Predicted end position based on velocity |
| `predictedEndTranslation` | Predicted total translation              |

#### Example

```tsx
<VStack
  onDragGesture={{
    minDistance: 5,
    coordinateSpace: 'global',
    onChanged: details => {
      console.log('Location:', details.location)
      console.log('Offset:', details.translation)
    },
    onEnded: details => {
      console.log('Predicted end:', details.predictedEndLocation)
    }
  }}
/>
```

***

## 2. Gesture Classes (Advanced Usage)

For complex interaction handling or gesture composition, use the gesture constructors and modifiers.

***

### `GestureInfo` Class

All gesture constructors return a `GestureInfo` object that defines configuration and callbacks.

```ts
class GestureInfo<Options, Value> {
  type: string
  options: Options
  onChanged(callback: (value: Value) => void): this
  onEnded(callback: (value: Value) => void): this
}
```

| Method                | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `onChanged(callback)` | Called when the gesture changes (e.g. dragging, zooming) |
| `onEnded(callback)`   | Called when the gesture finishes                         |

#### Example

```tsx
<Text
  gesture={
    TapGesture()
      .onEnded(() => console.log('Tapped'))
  }
/>
```

***

### `TapGesture`

Detects single or multiple taps.

```ts
declare function TapGesture(count?: number): GestureInfo<number | undefined, void>
```

| Parameter | Type     | Default | Description             |
| --------- | -------- | ------- | ----------------------- |
| `count`   | `number` | `1`     | Number of taps required |

#### Example

```tsx
<Text
  gesture={
    TapGesture(2)
      .onEnded(() => console.log('Double tapped'))
  }
/>
```

***

### `LongPressGesture`

Detects press and hold gestures.

```ts
declare function LongPressGesture(options?: LongPressGestureOptions): GestureInfo<LongPressGestureOptions, boolean>

type LongPressGestureOptions = {
  minDuration?: number
  maxDuration?: number
}
```

| Parameter     | Default | Description                          |
| ------------- | ------- | ------------------------------------ |
| `minDuration` | `500`   | Minimum press duration (ms)          |
| `maxDuration` | `10000` | Maximum duration before failure (ms) |

#### Example

```tsx
<Text
  gesture={
    LongPressGesture({ minDuration: 800 })
      .onChanged(() => console.log('Pressing...'))
      .onEnded(() => console.log('Long press finished'))
  }
/>
```

***

### `DragGesture`

Tracks finger or pointer movement.

```ts
declare function DragGesture(options?: DragGestureOptions): GestureInfo<DragGestureOptions, DragGestureDetails>

type DragGestureOptions = {
  minDistance?: number
  coordinateSpace?: 'local' | 'global'
}
```

#### Example

```tsx
<VStack
  gesture={
    DragGesture({ coordinateSpace: 'global' })
      .onChanged(d => console.log('Offset', d.translation))
      .onEnded(d => console.log('Velocity', d.velocity))
  }
/>
```

***

### `MagnifyGesture`

Detects pinch zoom gestures.

```ts
declare function MagnifyGesture(minScaleDelta?: number | null): GestureInfo<number | null | undefined, MagnifyGestureValue>

type MagnifyGestureValue = {
  time: Date
  magnification: number
  startAnchor: Point
  startLocation: Point
  velocity: number
}
```

#### Example

```tsx
<Text
  gesture={
    MagnifyGesture(0.05)
      .onChanged(v => console.log('Scale', v.magnification))
      .onEnded(() => console.log('Zoom ended'))
  }
/>
```

***

### `RotateGesture`

Detects rotation gestures.

```ts
declare function RotateGesture(minAngleDelta?: Angle | null): GestureInfo<Angle | null | undefined, RotateGestureValue>

type RotateGestureValue = {
  rotation: AngleValue
  velocity: AngleValue
  startAnchor: Point
  time: Date
}

type AngleValue = {
  radians: number
  degrees: number
  magnitude: number
  animatableData: number
}
```

#### Example

```tsx
<ZStack
  gesture={
    RotateGesture()
      .onChanged(v => console.log('Rotation', v.rotation.degrees))
      .onEnded(() => console.log('Rotation ended'))
  }
/>
```

***

## 3. Gesture Modifiers for Views

All views support the following gesture-related properties.

```ts
type GesturesProps = {
  gesture?: GestureProps
  simultaneousGesture?: GestureProps
  highPriorityGesture?: GestureProps
  defersSystemGestures?: EdgeSet
}
```

***

### `gesture`

Adds a gesture to the view.

```tsx
<Text
  gesture={
    TapGesture()
      .onEnded(() => console.log('Tapped'))
  }
/>
```

***

### `highPriorityGesture`

Adds a gesture with higher priority than existing ones on the view.

```tsx
<Text
  highPriorityGesture={
    TapGesture(2)
      .onEnded(() => console.log('Double tap takes priority'))
  }
/>
```

***

### `simultaneousGesture`

Allows multiple gestures to be recognized simultaneously.

```tsx
<Text
  simultaneousGesture={
    LongPressGesture()
      .onEnded(() => console.log('Long pressed'))
  }
  gesture={
    TapGesture()
      .onEnded(() => console.log('Tapped'))
  }
/>
```

***

### `defersSystemGestures`

Gives your custom gestures precedence over system gestures originating from screen edges.

```tsx
<VStack defersSystemGestures="all">
  <Text>Custom gestures take precedence</Text>
</VStack>
```

#### Accepted Values

| Value          | Description                          |
| -------------- | ------------------------------------ |
| `'top'`        | Top edge                             |
| `'leading'`    | Leading edge (left, or right in RTL) |
| `'trailing'`   | Trailing edge                        |
| `'bottom'`     | Bottom edge                          |
| `'horizontal'` | Left and right edges                 |
| `'vertical'`   | Top and bottom edges                 |
| `'all'`        | All edges                            |

***

## 4. GestureMask

Controls how adding a gesture affects other gestures on the same view or its subviews.

```ts
type GestureMask = "all" | "gesture" | "subviews" | "none"
```

| Value        | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `"all"`      | Enables both the added gesture and subview gestures (default) |
| `"gesture"`  | Enables only the added gesture, disables subview gestures     |
| `"subviews"` | Enables subview gestures, disables the added gesture          |
| `"none"`     | Disables all gestures                                         |

#### Example

```tsx
<VStack
  gesture={{
    gesture: TapGesture().onEnded(() => console.log('Tapped')),
    mask: 'gesture'
  }}
>
  <Text>Tap here</Text>
</VStack>
```

***

## 5. Summary Table

| Gesture Type | Description                     | Class Constructor    | Shorthand Property   | Common Callbacks             |
| ------------ | ------------------------------- | -------------------- | -------------------- | ---------------------------- |
| Tap          | Detects single or multiple taps | `TapGesture()`       | `onTapGesture`       | `.onEnded()`                 |
| Long Press   | Detects hold gestures           | `LongPressGesture()` | `onLongPressGesture` | `.onChanged()`, `.onEnded()` |
| Drag         | Detects movement                | `DragGesture()`      | `onDragGesture`      | `.onChanged()`, `.onEnded()` |
| Magnify      | Detects pinch zoom              | `MagnifyGesture()`   | —                    | `.onChanged()`, `.onEnded()` |
| Rotate       | Detects rotation                | `RotateGesture()`    | —                    | `.onChanged()`, `.onEnded()` |
