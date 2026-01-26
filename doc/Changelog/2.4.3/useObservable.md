# useObservable

Scripting provides a reactive state system formed by `Observable<T>` and the `useObservable<T>` hook.
This system drives UI updates, interacts with the animation engine, and aligns closely with SwiftUI’s binding model—enabling future APIs such as `List(selection:)`, `NavigationStack(path:)`, `TextField(text:)`, and more.

***

# 1. Observable\<T>

`Observable<T>` is a reactive container that holds a mutable value.
Whenever the value changes, any UI components that read this value are automatically re-rendered.

## 1.1 Class Definition

```ts
class Observable<T> {
  constructor(initialValue: T);
  value: T;
  setValue(value: T): void;
  subscribe(callback: (value: T, oldValue: T) => void): void;
  unsubscribe(callback: (value: T, oldValue: T) => void): void;
  dispose(): void;
}
```

***

## 1.2 Property & Method Details

### value

The current value stored inside the observable.

### setValue(newValue)

Updates the value and triggers UI re-rendering.

```ts
observable.setValue(newValue);
```

`T` may be **any type**: primitives, arrays, objects, or class instances.

### subscribe / unsubscribe

Allows external listeners to respond to value changes.
Most components do not need to use these manually.

### dispose

Releases internal subscriptions.
Typically only needed when manually managing observables outside the component system.

***

# 2. useObservable\<T>

`useObservable<T>` creates component-local reactive state and provides an `Observable<T>` instance whose value persists across re-renders.

## 2.1 Function Signature

```ts
declare function useObservable<T>(): Observable<T | undefined>;
declare function useObservable<T>(value: T): Observable<T>;
declare function useObservable<T>(initializer: () => T): Observable<T>;
```

***

## 2.2 Initialization Modes

### 1. Without initial value

Value defaults to `undefined`.

```tsx
const data = useObservable<string>();
```

### 2. With initial value

```tsx
const count = useObservable(0);
```

### 3. Lazy initialization

The initializer is executed only on the first render.

```tsx
const user = useObservable(() => createDefaultUser());
```

***

# 3. Using Observable in UI Components

Reading `.value` inside JSX automatically establishes dependency tracking.

```tsx
<Text>{name.value}</Text>
```

Updating the state triggers re-render:

```tsx
<Button title="Change" action={() => name.setValue("Updated")} />
```

This behavior is similar to React’s `useState`, but aligned with SwiftUI’s reactive identity-based rendering.

***

# 4. Integration with Animation

Observable values participate directly in Scripting’s animation system.

There are two main animation mechanisms:

***

## 4.1 Explicit animations: withAnimation

```tsx
withAnimation(() => {
  size.setValue(size.value + 20);
});
```

Any view that depends on `size.value` will animate its change.

***

## 4.2 Implicit animations: the animation modifier

Views can animate whenever a specific dependency changes.

### Correct syntax:

```tsx
animation={{
  animation: Animation.spring({ duration: 0.3 }),
  value: size.value
}}
```

This mirrors SwiftUI’s `.animation(animation, value: value)` API.

Example:

```tsx
<Rectangle
  frame={{
    width: size.value,
    height: size.value,
  }}
  animation={{
    animation: Animation.easeIn(0.25),
    value: size.value,
  }}
/>
```

***

# 5. Forward Compatibility with SwiftUI-Style Binding APIs

`Observable` is the foundation for future SwiftUI-style binding APIs.
Upcoming components will accept `Observable<T>` directly, matching SwiftUI’s `$binding` behavior.

### 5.1 List(selection:)

```tsx
const selection = useObservable<string | undefined>(undefined)

<List selection={selection}>
  ...
</List>
```

***

### 5.2 NavigationStack(path:)

```tsx
const path = useObservable<string[]>([])

<NavigationStack path={path}>
  ...
</NavigationStack>
```

This allows fully type-safe and reactive navigation, mirroring SwiftUI’s native patterns.

***

# 6. ForEach: Recommended Data Binding Pattern

Scripting provides a SwiftUI-aligned ForEach API:

```tsx
<ForEach data={items} builder={(item, index) => <Text>{item.name}</Text>} />
```

Where each item must satisfy:

```ts
T extends { id: string }
```

### Why this is the recommended pattern:

- Enables insertion/removal animations
- Avoids index-based rendering issues
- Improves performance for large lists

Example:

```tsx
const items = useObservable([
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" }
])

<ForEach
  data={items}
  editActions="all"
  builder={(item) => <Text>{item.name}</Text>}
/>
```

***

# 7. Complete Example

```tsx
export function Demo() {
  const visible = useObservable(true);
  const size = useObservable(100);

  return (
    <VStack spacing={20}>
      {visible.value && (
        <Rectangle
          frame={{
            width: size.value,
            height: size.value,
          }}
          background="blue"
          animation={{
            animation: Animation.spring({ duration: 0.4, bounce: 0.3 }),
            value: size.value,
          }}
          transition={Transition.opacity()}
        />
      )}

      <Button
        title="Toggle Visible"
        action={() => {
          withAnimation(() => {
            visible.setValue(!visible.value);
          });
        }}
      />

      <Button
        title="Resize"
        action={() => {
          withAnimation(Animation.easeOut(0.25), () => {
            size.setValue(size.value === 100 ? 160 : 100);
          });
        }}
      />
    </VStack>
  );
}
```

***

# 8. Summary

- `Observable<T>` is the core reactive state container in Scripting.
- `useObservable` creates component-local observable state.
- Any change to `.value` automatically re-renders dependent UI.
- Observable integrates directly with animations (explicit and implicit).
- It is the foundation for SwiftUI-style binding APIs such as `List(selection:)` and `NavigationStack(path:)`.
- ForEach works best with `data: Observable<Array<T>>` for identity-based diffing and smooth animations.
