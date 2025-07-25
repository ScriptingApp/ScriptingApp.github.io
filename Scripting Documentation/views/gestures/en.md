Gesture modifiers allow you to add interactivity to views using common gestures like taps, long presses, and drags. These gestures behave similarly to their counterparts in SwiftUI and are fully supported in views like `<VStack>` and `<HStack>`.

---

## `onTapGesture`

Adds an action to perform when a tap gesture is recognized.

### Type

```ts
onTapGesture?: (() => void) | {
  count: number
  perform: () => void
}
```

### Behavior

* Basic usage:

  ```tsx
  <VStack onTapGesture={() => console.log('Tapped')} />
  ```

* With specified number of taps:

  ```tsx
  <HStack
    onTapGesture={{
      count: 2,
      perform: () => console.log('Double tapped')
    }}
  />
  ```

### Defaults

* `count`: `1` — the gesture is triggered by a single tap.

---

## `onLongPressGesture`

Adds an action to perform when a long press gesture is recognized.

### Type

```ts
onLongPressGesture?: (() => void) | {
  minDuration?: number
  maxDuration?: number
  perform: () => void
  onPressingChanged?: (state: boolean) => void
}
```

### Behavior

* Simple long press:

  ```tsx
  <VStack onLongPressGesture={() => console.log('Long pressed')} />
  ```

* With customization:

  ```tsx
  <HStack
    onLongPressGesture={{
      minDuration: 800,
      maxDuration: 3000,
      perform: () => console.log('Long press recognized'),
      onPressingChanged: isPressing =>
        console.log(isPressing ? 'Pressing...' : 'Released')
    }}
  />
  ```

### Defaults

* `minDuration`: `500` milliseconds
* `maxDuration`: `10000` milliseconds

---

## `onDragGesture`

Adds drag interaction to a view, with callbacks for changes and completion.

### Type

```ts
onDragGesture?: {
  minDistance?: number
  coordinateSpace?: 'local' | 'global'
  onChanged?: (details: DragGestureDetails) => void
  onEnded?: (details: DragGestureDetails) => void
}
```

### Behavior

* Basic usage:

  ```tsx
  <VStack
    onDragGesture={{
      onChanged: details =>
        console.log('Dragging at', details.location),
      onEnded: details =>
        console.log('Ended drag with velocity', details.velocity)
    }}
  />
  ```

* With options:

  ```tsx
  <HStack
    onDragGesture={{
      minDistance: 5,
      coordinateSpace: 'global',
      onChanged: details => {
        console.log('Current location:', details.location)
        console.log('Translation:', details.translation)
      },
      onEnded: details => {
        console.log('Predicted end:', details.predictedEndLocation)
      }
    }}
  />
  ```

### Defaults

* `minDistance`: `10` points
* `coordinateSpace`: `'local'`

---

## `DragGestureDetails`

The object passed to `onChanged` and `onEnded` callbacks for `onDragGesture`.

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

### Fields

* `time`: Timestamp (ms) of the current drag event.
* `location`: Current pointer location.
* `startLocation`: Starting point of the drag.
* `translation`: `{ x, y }` offset from the start location.
* `velocity`: Estimated speed of the drag in points per second.
* `predictedEndLocation`: Projected final location if dragging stops now.
* `predictedEndTranslation`: Projected total translation based on current velocity.
