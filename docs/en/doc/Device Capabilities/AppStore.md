---
title: AppStore
tag: PRO
---

The `AppStore` API allows you to display App Store app information **directly inside the Scripting app**, without navigating users away to the system App Store application.

This API is built on top of Apple’s native App Store presentation components and is suitable for scenarios such as **app recommendations, app collections, related app discovery, and ecosystem entry points**.

---

## Namespace: `AppStore`

```ts
namespace AppStore
```

---

## Overview

* Present an App Store product page inside the Scripting app using a **modal view**
* Users can view app details, screenshots, ratings, and release notes
* Users can **download, update, or open** the app directly
* Automatically returns to the current script UI after dismissal
* Does not launch or switch to the system App Store app

---

## API Summary

| Method                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `presentApp(id: string)` | Presents an App Store product page for the specified app |
| `dismissApp()`           | Dismisses the currently presented App Store page         |

---

## API Reference

### `presentApp(id: string): Promise<void>`

Presents the App Store product page for a specific app inside the Scripting app.

#### Parameters

| Name | Type     | Description                               |
| ---- | -------- | ----------------------------------------- |
| `id` | `string` | The **App Store app identifier (App ID)** |

* The App ID is the numeric identifier used by the App Store
* It can be extracted from an App Store URL
  Example:
  `https://apps.apple.com/app/id123456789`
  The ID is `"123456789"`

#### Return Value

* Returns a `Promise<void>`
* The promise resolves when the App Store modal is dismissed
* Throws an error if another App Store modal is already presented

#### Behavior

* Presents the App Store page as a modal view
* Only **one App Store modal** can be active at a time
* Calling `presentApp` again while one is already open will result in an error

#### Example

```ts
await AppStore.presentApp("123456789")
```

---

### `dismissApp(): Promise<void>`

Dismisses the App Store modal that was opened using `presentApp`.

#### Return Value

* Returns a `Promise<void>`
* Resolves when the modal has been successfully dismissed

#### Usage Notes

* In most cases, manual dismissal is not required
* Useful when:

  * Implementing custom UI-driven dismissal logic
  * Closing the App Store page at a specific point in a script’s workflow

#### Example

```ts
await AppStore.dismissApp()
```

---

## Usage Examples

### Example 1: App Recommendation Entry

```ts
import { Button } from "scripting"

function AppRecommendation() {
  return (
    <Button
      title="View Recommended App"
      action={() => {
        AppStore.presentApp("123456789")
      }}
    />
  )
}
```

---

### Example 2: App Collection / Favorites

```ts
const favoriteApps = [
  { name: "App A", id: "123456789" },
  { name: "App B", id: "987654321" }
]

function AppList() {
  return favoriteApps.map(app => (
    <Button
      title={app.name}
      action={() => {
        AppStore.presentApp(app.id)
      }}
    />
  ))
}
```

---

## Errors and Considerations

### Common Errors

* **An App Store modal is already presented**

  * Calling `presentApp` again will throw an error
  * Ensure your logic prevents duplicate presentations

### Limitations

* Only App Store app product pages are supported
* Subscription pages, developer profiles, and other App Store sections are not supported
* The provided App ID must be valid and publicly available on the App Store
