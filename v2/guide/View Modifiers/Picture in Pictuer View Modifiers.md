# Picture in Pictuer View Modifiers

Scripting provides a set of Picture in Picture (PiP) view modifiers that allow developers to render any SwiftUI view inside a system PiP window.
These APIs abstract away the underlying `AVPictureInPicture` implementation and provide a declarative, script-friendly way to control PiP presentation, interaction, and lifecycle.

PiP is suitable for the following scenarios:

- Real-time status display (timers, workouts, progress indicators)
- Audio or video playback companion UI
- Lightweight views that should remain visible when the app enters background

***

## 1. PiPProps API Definition

```ts
type PiPProps = {
  pip?: {
    isPresented: Observable<boolean>
    maximumUpdatesPerSecond?: number
    content: VirtualNode
  }
  
  onPipStart?: () => void
  onPipStop?: () => void
  onPipPlayPauseToggle?: (isPlaying: boolean) => void
  onPipSkip?: (isForward: boolean) => void
  onPipRenderSizeChanged?: (size: Size) => void

  pipHideOnForeground?: boolean
  pipShowOnBackground?: boolean
}
```

***

## 2. Core Properties

### 2.1 `pip.isPresented`

```ts
isPresented: Observable<boolean>
```

- The **single source of truth** for PiP presentation
- `true`: PiP window is presented
- `false`: PiP window is dismissed

This value is typically controlled by user actions or app lifecycle events.

***

### 2.2 `pip.content`

```ts
content: VirtualNode
```

- The view rendered inside the PiP window
- Strongly recommended to be a **dedicated PiP view**
- Should be minimal, stable, and predictable in layout

***

### 2.3 `pip.maximumUpdatesPerSecond`

```ts
maximumUpdatesPerSecond?: number
```

- **Default value: 30**
- Limits how often the PiP view can be re-rendered per second
- One of the most important performance-related parameters

#### Recommended values

- **No animation / low-frequency updates**
  Use `1–5`

- **Animated PiP views**
  Can be set to `60`

Important:
Setting this value to `60` has a **significant performance impact**, increasing both CPU and GPU usage. This should only be used when animation is strictly required.

***

## 3. PiP Lifecycle Callbacks

(Only valid inside the PiP view)

### 3.1 `onPipStart`

```ts
onPipStart?: () => void
```

- Called when the PiP window is successfully presented
- Typical use cases:

  - Start timers
  - Begin state updates
  - Subscribe to data streams

***

### 3.2 `onPipStop`

```ts
onPipStop?: () => void
```

- Called when PiP is dismissed or stopped by the system
- All side effects should be cleaned up here:

  - Timers
  - Subscriptions
  - Long-running tasks

***

## 4. PiP Interaction Callbacks

(Only valid inside the PiP view)

### 4.1 Play / Pause Toggle

```ts
onPipPlayPauseToggle?: (isPlaying: boolean) => void
```

- Triggered when the user taps the play/pause control in the PiP window
- `isPlaying` indicates the resulting playback state
- Commonly used for audio, video, or workout scenarios

***

### 4.2 Skip Forward / Backward

```ts
onPipSkip?: (isForward: boolean) => void
```

- `true`: skip forward
- `false`: skip backward

***

## 5. Render Size Changes

### `onPipRenderSizeChanged`

```ts
onPipRenderSizeChanged?: (size: Size) => void
```

- Called whenever the PiP render size changes
- Can be used to adapt layout for different PiP sizes or orientations

***

## 6. Foreground and Background Behavior

(Only valid inside the PiP view)

### 6.1 `pipHideOnForeground`

```ts
pipHideOnForeground?: boolean
```

- When the app enters foreground:

  - Determines whether an active PiP session should be stopped
- Default: `false`

***

### 6.2 `pipShowOnBackground`

```ts
pipShowOnBackground?: boolean
```

- Automatically starts PiP when the app moves to background
- Commonly used for audio playback or real-time status displays

***

## 7. Complete Code Example

### 7.1 PiP Content View

```tsx
function PipView() {
  const started = useObservable(false)
  const count = useObservable(0)

  useEffect(() => {
    if (!started.value) {
      return
    }

    let timerId: number

    function startTimer() {
      timerId = setTimeout(() => {
        count.setValue(count.value + 1)
        startTimer()
      }, 1000)
    }

    startTimer()

    return () => {
      clearTimeout(timerId)
    }
  }, [started.value])

  return <HStack
    onPipStart={() => {
      started.setValue(true)
    }}
    frame={{
      width: Device.screen.width,
      height: 50
    }}
    background="systemBlue"
  >
    <Image
      systemName="figure.walk"
      font="title"
    />
    <Text foregroundStyle="white">
      Count: {count.value}
    </Text>
  </HStack>
}
```

***

### 7.2 Enabling PiP on a Page

```tsx
function PageView() {
  const dismiss = Navigation.useDismiss()
  const pipPresented = useObservable(false)

  return <NavigationStack>
    <List
      navigationTitle="PiP Demo"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        topBarLeading: <Button
          title="Done"
          action={dismiss}
        />
      }}
      pip={{
        isPresented: pipPresented,
        content: <PipView />
      }}
    >
      <Button
        title="Toggle PiP"
        action={() => {
          pipPresented.setValue(!pipPresented.value)
        }}
      />
    </List>
  </NavigationStack>
}
```

***

## 8. Critical Notes

### 8.1 PiP views are constructed even when not presented

When `isPresented` is `false`:

- The PiP view is **not visible**
- But it is still constructed and participates in state binding

Therefore:

- Do not perform heavy computation in the view body
- Delay all side effects until `onPipStart`
- Always clean up in `onPipStop`

***

### 8.2 PiP-specific modifiers must be used only in the PiP view

The following properties and callbacks:

- `onPipStart`
- `onPipStop`
- `onPipPlayPauseToggle`
- `onPipSkip`
- `onPipRenderSizeChanged`
- `pipHideOnForeground`
- `pipShowOnBackground`

**Must be declared on the PiP content view (PipView)**.

Declaring them on a normal page view will result in:

- No callbacks being triggered
- Missing or incorrect state updates
- Undefined behavior

***

### 8.3 PiP is not suitable for complex UI

Avoid using the following inside PiP:

- `List` or `ScrollView`
- Complex or chained animations
- High-frequency state updates
- Network-driven UI rendering

PiP is designed for:

Lightweight, stable, and continuously visible system-level companion views.

***

## 9. Recommended Best Practices

- Design a dedicated, minimal PiP view
- Keep layout fixed and predictable
- Tune `maximumUpdatesPerSecond` carefully
- Start all logic in `onPipStart`
- Always release resources in `onPipStop`
- Never reuse complex page-level views inside PiP
