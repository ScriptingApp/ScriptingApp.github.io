---
title: FontPicker
description: This namespace provides methods for selecting fonts from the system’s available font list.
tag: PRO
---

The `FontPicker` namespace provides methods for selecting fonts from the system’s available font list.
It opens the system font picker UI, allowing the user to choose a font, and returns the **PostScript name** of the selected font.

---

## Overview

In scenarios such as custom text editors, UI design, or typography styling, users may need to select a font dynamically.
`FontPicker` offers a simple asynchronous interface to display the system’s font picker and obtain the selected font name.

---

## Methods

### `pickFont(): Promise<string | null>`

Opens the system font picker interface and lets the user select a font.
Returns a Promise that resolves when the user either selects a font or cancels the picker.

**Return Value:**

* `string` — The **PostScript name** of the selected font (e.g., `"Helvetica-Bold"`, `"KaitiSC-Regular"`).
* `null` — Returned if the user cancels the picker.

---

## Example

```ts
const fontPostscriptName = await FontPicker.pickFont()
if (fontPostscriptName == null) {
  // User canceled the font picker
  console.log("Font selection canceled")
} else {
  console.log("Selected font:", fontPostscriptName)
}
```

Example output:

```
Selected font: HelveticaNeue-Bold
```

---

## Usage Notes

* The returned font name can be used directly in text rendering or UI styling contexts.
* If the user cancels the selection, the return value is `null`; your code should handle this case gracefully.
* The fonts displayed in the picker depend on the fonts currently installed on the system, including both built-in and user-installed fonts.

---

## Summary

| Method       | Return Type               | Description                                                                                             |
| ------------ | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `pickFont()` | `Promise<string \| null>` | Opens the system font picker and returns the PostScript name of the selected font or `null` if canceled |
