---
title: clipShape
description: Clips the view to the specified shape while maintaining its aspect ratio.

---

Clips the view to the specified shape while maintaining its aspect ratio.

### Type

```ts
clipShape?: Shape
```

### Example

```tsx
<Image 
  filePath="path/to/photo.jpg"
  clipShape="Circle"
/>

<Image 
  filePath="path/to/photo.jpg"
  clipShape={
    type: "rect",
    cornerRadius: 12
  }
/>
```
