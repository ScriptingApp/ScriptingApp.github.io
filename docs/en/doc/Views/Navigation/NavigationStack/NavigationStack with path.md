---
title: NavigationStack with path

---

`NavigationStack.path` provides **observable, programmatic control over the navigation stack**. It allows direct manipulation of the navigation history using a bound observable array.

It enables:

* Programmatic navigation
* Multi-level stack control
* Returning to the root view
* Dynamic page resolution via `NavigationDestination`

---

## 1. API Definition

```ts
type NavigationStackProps = {
  path?: Observable<string[]>
  ...
}

declare const NavigationStack: FunctionComponent<NavigationStackProps>
```

---

## 2. Type and Semantics of path

```ts
path?: Observable<string[]>
```

`path` is an observable string array representing the **current navigation stack**.

Rules:

* Each `string` represents a unique page identifier
* The array order defines the navigation order
* The last element is the currently visible page
* An empty array represents the root view

Examples:

```ts
[]
```

Represents the root view

```ts
["a"]
```

Represents navigation to page `a`

```ts
["a", "b"]
```

Represents navigation to page `a`, then to page `b`, with `b` as the active page

---

## 3. Basic Usage Example

```tsx
function Page() {
  const path = useObservable<string[]>(["a"])

  return <NavigationStack
    path={path}
  >
    <VStack
      navigationTitle="Navigation Demo"
      navigationDestination={
        <NavigationDestination>
          {(page) =>
            <VStack>
              <Text>
                Current page:
                {page}
              </Text>
              {path.value.length > 1
                && <Button
                  title="Go to Root"
                  action={() => {
                    path.setValue([])
                  }}
                />}
            </VStack>
          }
        </NavigationDestination>
      }
    >
      <Button
        title="Show page a"
        action={() => {
          path.setValue(["a"])
        }}
      />
      <Button
        title="Show page b"
        action={() => {
          path.setValue(["b"])
        }}
      />
      <Button
        title="Show page a then b"
        action={() => {
          path.setValue(["a", "b"])
        }}
      />
    </VStack>
  </NavigationStack>
}
```

---

## 4. How path Controls Navigation

### 4.1 path as the Single Source of Navigation State

When `path` is bound:

* The full navigation stack is determined exclusively by `path.value`
* UI navigation state stays fully synchronized with `path`
* Implicit push/pop navigation is replaced by explicit state control

---

### 4.2 Pushing Pages

```ts
path.setValue(["a"])
```

System behavior:

* Pushes page `a` onto the stack
* Displays page `a`

```ts
path.setValue(["a", "b"])
```

System behavior:

* Pushes page `a`
* Then pushes page `b`
* Displays page `b`

---

### 4.3 Popping Pages and Returning to Root

```ts
path.setValue([])
```

System behavior:

* Clears the entire navigation stack
* Immediately returns to the root view

---

## 5. Relationship Between path and NavigationDestination

`NavigationDestination` dynamically renders destination views based on the **current value of `path`**:

```tsx
<NavigationDestination>
  {(page) => ...}
</NavigationDestination>
```

Rules:

* `page` is always equal to the **last element of `path.value`**
* When `path` changes:

  * `page` updates automatically
  * The destination view re-renders automatically

Mapping result examples:

```ts
["a"]        -> page === "a"
["a", "b"]   -> page === "b"
```

---

## 6. Controlling Navigation with Buttons

Navigate to page `a`:

```ts
path.setValue(["a"])
```

Navigate to page `b`:

```ts
path.setValue(["b"])
```

Navigate through multiple pages:

```ts
path.setValue(["a", "b"])
```

Return to the root view:

```ts
path.setValue([])
```

---

## 7. Synchronization with System Back Gestures

When the user navigates back using:

* The system back gesture
* The navigation bar back button

Then:

* `path.value` is automatically updated
* The navigation stack and UI remain fully synchronized
* No manual back handling is required

---

## 8. Typical Use Cases

`NavigationStack.path` is suitable for:

* Deep linking
* Multi-step navigation flows
* Programmatic routing
* Script-driven navigation
* Navigation state restoration
* Wizard-style navigation
* Cross-page navigation control

---

## 9. Common Errors

### 9.1 Incorrect Initialization

Incorrect:

```ts
const path = useObservable<string[]>(null)
```

Correct:

```ts
const path = useObservable<string[]>([])
```

---

### 9.2 Invalid Path Element Types

Incorrect:

```ts
path.setValue([1, 2])
```

Correct:

```ts
path.setValue(["1", "2"])
```

Currently, only `string[]` is supported as the navigation path type.

---

## 10. Difference Between Using path and Default NavigationStack

| Feature                   | Without path  | With path        |
| ------------------------- | ------------- | ---------------- |
| Manual push/pop           | Supported     | Not recommended  |
| Programmatic navigation   | Not supported | Fully supported  |
| Multi-level routing       | Limited       | Fully supported  |
| State restoration         | Difficult     | Simple           |
| Centralized routing state | Not available | Fully controlled |
