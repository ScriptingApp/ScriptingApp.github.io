# Animation and Transition

Scripting Animation & Transition System

## Animation Class

The `Animation` class describes how values animate in time.

## Factory Methods

### `Animation.default()`

Creates a default system animation.

```ts
static default(): Animation
```

***

### `Animation.linear(duration?)`

```ts
static linear(duration?: number | null): Animation
```

Constant-speed animation.

***

### `Animation.easeIn(duration?)`

```ts
static easeIn(duration?: number | null): Animation
```

***

### `Animation.easeOut(duration?)`

```ts
static easeOut(duration?: number | null): Animation
```

***

### `Animation.bouncy(options?)`

```ts
static bouncy(options?: {
  duration?: number
  extraBounce?: number
}): Animation
```

Spring-like animation with additional bounce.

***

### `Animation.smooth(options?)`

```ts
static smooth(options?: {
  duration?: number
  extraBounce?: number
}): Animation
```

***

### `Animation.snappy(options?)`

```ts
static snappy(options?: {
  duration?: number
  extraBounce?: number
}): Animation
```

***

### `Animation.spring(options?)`

Supports two mutually exclusive modes.

```ts
static spring(options?: {
  blendDuration?: number
} & (
  | {
      duration?: number
      bounce?: number
      response?: never
      dampingFraction?: never
    }
  | {
      response?: number
      dampingFraction?: number
      duration?: never
      bounce?: never
    }
)): Animation
```

***

### `Animation.interactiveSpring(options?)`

```ts
static interactiveSpring(options?: {
  response?: number
  dampingFraction?: number
  blendDuration?: number
}): Animation
```

***

### `Animation.interpolatingSpring(options?)`

```ts
static interpolatingSpring(options?: {
  mass?: number
  stiffness: number
  damping: number
  initialVelocity?: number
} | {
  duration?: number
  bounce?: number
  initialVelocity?: number
  mass?: never
  stiffness?: never
  damping?: never
}): Animation
```

***

## Modifier Methods

### `.delay(time)`

```ts
delay(time: number): Animation
```

### `.repeatCount(count, autoreverses)`

```ts
repeatCount(count: number, autoreverses?: boolean): Animation
```

### `.repeatForever(autoreverses)`

```ts
repeatForever(autoreverses?: boolean): Animation
```

***

## Transition Class

`Transition` describes how a view enters or leaves the hierarchy.

## Instance Methods

### `.animation(animation)`

Attach a specific animation to a transition.

```ts
animation(animation?: Animation): Transition
```

### `.combined(other)`

Combine transitions.

```ts
combined(other: Transition): Transition
```

***

## Static Transitions

### Identity

```ts
Transition.identity();
```

### Move

```ts
Transition.move(edge: Edge)
```

### Offset

```ts
Transition.offset(position?: Point)
```

### Push

```ts
Transition.pushFrom(edge: Edge)
```

### Opacity

```ts
Transition.opacity();
```

### Scale

```ts
Transition.scale(scale?: number, anchor?: Point | KeywordPoint)
```

### Slide

```ts
Transition.slide();
```

### Fade

```ts
Transition.fade(duration?: number)
```

### Flip transitions

```ts
Transition.flipFromLeft(duration?)
Transition.flipFromRight(duration?)
Transition.flipFromTop(duration?)
Transition.flipFromBottom(duration?)
```

### Asymmetric

```ts
Transition.asymmetric(insertion: Transition, removal: Transition)
```

***

## withAnimation

```ts
function withAnimation(body: () => void): Promise<void>;
function withAnimation(animation: Animation, body: () => void): Promise<void>;
function withAnimation(
  animation: Animation,
  completionCriteria: "logicallyComplete" | "removed",
  body: () => void,
): Promise<void>;
```

Wraps a state update and animates any affected values.

Example:

```ts
withAnimation(Animation.easeOut(0.3), () => {
  visible.setValue(false);
});
```

***

## Correct Usage of the animation View Modifier

### (Important Correction)

In Scripting, the `animation` prop is **not**:

```tsx
animation = { anim }; // incorrect
```

The correct format is:

```tsx
animation={{
  animation: anim,
  value: <observable or value>
}}
```

### Meaning:

| Field       | Description                                           |
| ----------- | ----------------------------------------------------- |
| `animation` | The `Animation` instance to use                       |
| `value`     | The observable value whose changes should be animated |

This mirrors SwiftUI’s `.animation(animation, value: value)` modifier.

***

## Correct Examples

### Example: Animate size changes

```tsx
const size = useObservable(100)
const anim = Animation.spring({ duration: 0.3, bounce: 0.3 })

<Rectangle
  frame={{ width: size.value, height: size.value }}
  animation={{ animation: anim, value: size.value }}
/>

<Button
  title="Toggle Size"
  action={() => {
    size.setValue(size.value === 100 ? 200 : 100)
  }}
/>
```

### Example: Animate color changes

```tsx
const isOn = useObservable(false)

<Text
  color={isOn.value ? "red" : "blue"}
  animation={{
    animation: Animation.easeIn(0.25),
    value: isOn.value
  }}
>
  Changing color
</Text>
```

### Example: Animate layout changes

```tsx
const expanded = useObservable(false)

<VStack
  spacing={expanded.value ? 40 : 10}
  animation={{
    animation: Animation.smooth({ duration: 0.3 }),
    value: expanded.value
  }}
>
```

***

## Transition Usage Examples

### Simple visibility toggle with transition

```tsx
const visible = useObservable(true)

<VStack>
  {visible.value &&
    <Text
      transition={Transition
        .slide()
        .combined(Transition.opacity())
      }
    >
      Slide + Fade
    </Text>
  }

  <Button
    title="Toggle"
    action={() => {
      withAnimation(() => {
        visible.setValue(!visible.value)
      })
    }}
  />
</VStack>
```

***

## Combined Example: Animation + Transition

```tsx
const visible = useObservable(true)
const anim = Animation.spring({ duration: 0.4, bounce: 0.25 })

<VStack spacing={12}>
  {visible.value &&
    <Text
      transition={Transition
        .move("bottom")
        .combined(Transition.opacity())
        .animation(anim)
      }
    >
      Animated panel
    </Text>
  }

  <Button
    title="Toggle"
    action={() => {
      withAnimation(anim, () => {
        visible.setValue(!visible.value)
      })
    }}
  />
</VStack>
```

***

## Summary

### Key Points

- `useObservable` drives UI updates.
- `withAnimation` animates state changes.
- `Transition` defines enter/exit effects.
- **Correct animation modifier usage**:

```tsx
animation={{ animation: myAnimation, value: myValue }}
```
