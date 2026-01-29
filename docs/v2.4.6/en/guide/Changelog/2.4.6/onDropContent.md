---
title: onDropContent
description: New Observable support, perform function has been adjusted, return an array of ItemProvider objects for deferred loading data.

---

`onDropContent` is a view modifier provided by Scripting that allows a view to act as a **drop target**, receiving files, images, or text dragged in from other applications.

---

## Overview

With `onDropContent`, you can:

- Receive drag-and-drop content from other apps
- Restrict acceptable content using UTType identifiers
- Track whether a drag operation is hovering over the view
- Start loading dropped content through `ItemProvider`
- Establish persistent access to security-scoped files when needed

---

## Modifier Definition

```ts
onDropContent?: {
  types: UTType[]
  isTarget: {
    value: boolean
    onChanged: (value: boolean) => void
  } | Observable<boolean>
  perform: (attachments: ItemProvider[]) => boolean
}
```

---

## Parameters

### types

Specifies the list of content types that the view can accept, expressed as UTType strings.

If the drag operation does not contain any of the specified types:

- The view does not activate as a drop target
- `isTarget` does not update
- `perform` is not called

Example:

```ts
types: ["public.image", "public.movie"]
```

---

### isTarget

Indicates whether the drag operation is currently hovering over the view.

- The value is `true` when the drag enters the view’s area
- The value is `false` when the drag exits the area

Two forms are supported:

- Binding object form

  ```ts
  {
    value: boolean
    onChanged: (value: boolean) => void
  }
  ```

- Observable form

  ```ts
  Observable<boolean>
  ```

The observable form works well with `useObservable` and provides a more concise reactive binding.

---

### perform

Called when content matching the specified `types` is dropped onto the view.

```ts
perform: (attachments: ItemProvider[]) => boolean
```

- `attachments` is an array of `ItemProvider`
- Each `ItemProvider` represents one dropped item
- The return value indicates whether the drop was successfully handled

Return value semantics:

- Return `true` to indicate the drop was accepted
- Return `false` to indicate the drop was not handled

---

## Execution Rules for perform

The following rules must be followed inside `perform`:

- Loading of `ItemProvider` contents must be **started synchronously within the execution scope of `perform`**
- Asynchronous completion is allowed using `Promise` or `then`
- Loading must not be initiated later from a different callback or event
- If `perform` returns `false`, the system treats the drop as unhandled

Reasoning:

- Dropped content is protected by system security rules
- Access to the dropped payload is only valid while `perform` is executing
- If loading does not begin within this scope, the content may no longer be accessible

---

## Working with ItemProvider

Within `perform`, you should inspect each `ItemProvider` and start loading based on its capabilities.

Typical steps include:

- Checking type conformance using `hasItemConforming`
- Selecting an appropriate loading method
- Handling files, images, or text accordingly

---

## Example Usage

```tsx
const isTarget = useObservable(false)

return <VStack
  onDropContent={{
    types: ["public.image", "public.movie"],
    isTarget: isTarget,
    perform: (attachments) => {
      const images: UIImage[] = []
      const videos: string[] = []

      let found = false

      for (const attachment of attachments) {
        if (attachment.hasItemConforming("public.png")) {
          found = true
          attachment.loadUIImage().then(image => {
            if (image != null) {
              images.push(image)
            }
          })
        } else if (attachment.hasItemConforming("public.movie")) {
          found = true
          attachment.loadFilePath("public.movie").then(filePath => {
            if (filePath != null) {
              // Create a bookmark for the security-scoped file
              FileManager.addFileBookmark(filePath)
              videos.push(filePath)
            }
          })
        }
      }

      return found
    }
  }}
>
  ...
</VStack>
```

---

## Security-Scoped File Access

File paths obtained via `onDropContent` are typically **security-scoped resources**.

These paths may become invalid when:

- `perform` returns
- The app restarts
- The script lifecycle ends

To retain long-term access, you should create a file bookmark as soon as the path is obtained.

---

## FileManager.addFileBookmark

```ts
FileManager.addFileBookmark(path: string, name?: string): string | null
```

Description:

- Creates a security-scoped bookmark for a file or folder
- Intended for paths obtained via APIs such as `Photos` or `onDropContent`
- Returns the bookmark name, or `null` if creation fails

Example:

```ts
const bookmarkName = FileManager.addFileBookmark(filePath)
```

---

## FileManager.removeFileBookmark

```ts
FileManager.removeFileBookmark(name: string): boolean
```

Description:

- Removes a previously created file bookmark
- Should be called when access to the file is no longer needed
- Returns whether the removal was successful

Example:

```ts
FileManager.removeFileBookmark(bookmarkName)
```

---

## Usage Recommendations

- Specify `types` as precisely as possible
- Use `perform` only to start loading, not to wait for results
- Load images and lightweight data as objects when appropriate
- Prefer file paths for large resources such as videos or documents
- Create bookmarks for files that require long-term access
- Remove bookmarks when the associated files are no longer needed
