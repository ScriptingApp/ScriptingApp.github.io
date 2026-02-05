---
title: Set environment values (environments)
description: This view modifier allows you to set environment values for a view hierarchy.
---

The `environments` view modifier allows injecting specific environment values into the current view hierarchy.
It serves a role similar to SwiftUI’s `.environment()`, but with a more explicit and controlled design tailored for Scripting.

Currently, the modifier supports:

- `editMode` — controls editing behavior in views such as `List`
- `openURL` — customizes how links are handled when tapped

These environment values affect all descendants within the modified view subtree.

---

##Modifier Definition

```ts
environments?: {
  editMode?: Observable<EditMode>;
  openURL?: (url: string) => OpenURLActionResult;
};
```

---

##1. editMode Environment

The `editMode` environment value controls the editing state of views that support editing behavior, such as `List` with row deletion or movement.

It must be provided as an `Observable<EditMode>` so views can reactively update when the editing state changes.

## EditMode Type

```ts
class EditMode {
  readonly value: "active" | "inactive" | "transient" | "unknown";
  readonly isEditing: boolean;

  static active(): EditMode;
  static inactive(): EditMode;
  static transient(): EditMode;
}
```

### Meaning of `value`

| Value       | Description                   |
| ----------- | ----------------------------- |
| `active`    | Editing mode is enabled       |
| `inactive`  | Editing mode is disabled      |
| `transient` | Temporary transitional state  |
| `unknown`   | Undefined or unexpected state |

---

## editMode Example

```tsx
const editMode = useObservable(() => EditMode.active())

<List
  environments={{
    editMode: editMode
  }}
>
  <ForEach
    editActions="all"
    data={items}
    builder={item => <Text key={item.id}>{item}</Text>}
  />
</List>
```

---

##2. openURL Environment

The `openURL` environment value customizes how URLs are handled when interacted with inside the view tree.
It overrides the default behavior of components such as `<Link>`.

This is useful for:

- Deciding whether URLs should open inside the app or externally
- Filtering or validating URLs
- Redirecting URLs to different handlers

## Function Signature

```ts
openURL?: (url: string) => OpenURLActionResult;
```

---

##OpenURLActionResult

```ts
class OpenURLActionResult {
  type: string;

  static handled(): OpenURLActionResult;
  static discarded(): OpenURLActionResult;

  static systemAction(options?: {
    url?: string;
    /**
     * Whether the system should prefer opening the URL in-app.
     * Requires iOS 26.0+.
     */
    prefersInApp: boolean;
  }): OpenURLActionResult;
}
```

### Result Behavior

| Method           | Meaning                                                     |
| ---------------- | ----------------------------------------------------------- |
| `handled()`      | The URL is considered fully handled; default behavior stops |
| `discarded()`    | The URL is ignored                                          |
| `systemAction()` | Requests the system to open a (possibly modified) URL       |

### iOS Requirement

- `prefersInApp` **requires iOS 26.0+**
- On earlier versions, the parameter may have no effect and system defaults will apply

---

##openURL Example

```tsx
<Group
  environments={{
    openURL: (url) => {
      return OpenURLActionResult.systemAction({
        url,
        prefersInApp: false, // Requires iOS 26.0+
      });
    },
  }}>
  {urls.map((url) => (
    <Link url={url}>{url}</Link>
  ))}
</Group>
```

---

##Combined Example (editMode + openURL)

```tsx
const editMode = useObservable(() => EditMode.inactive())

<VStack
  environments={{
    editMode,
    openURL: (url) => {
      if (url.startsWith("https://safe.com")) {
        return OpenURLActionResult.systemAction({
          url,
          prefersInApp: true   // iOS 26.0+ only
        })
      }
      return OpenURLActionResult.discarded()
    }
  }}
>
  <Button
    title="Toggle Edit"
    action={() => {
      editMode.value = editMode.value.isEditing
        ? EditMode.inactive()
        : EditMode.active()
    }}
  />

  <List>
    ...
  </List>

  <Link url="https://safe.com">Safe Link</Link>
  <Link url="https://blocked.com">Blocked Link</Link>
</VStack>
```

---

##Notes & Behavior Summary

1. The `environments` modifier applies only to the subtree where it is used.
2. `editMode` must be an `Observable<EditMode>` for reactive updates.
3. `openURL` replaces default URL-handling behavior for all descendant views.
4. Returning `handled()` stops further URL processing.
5. `systemAction()` delegates handling back to the system.
6. **`prefersInApp` requires iOS 26.0+** and may be ignored on earlier versions.
7. Scripting’s environment system is explicit—only the values you define are injected.
