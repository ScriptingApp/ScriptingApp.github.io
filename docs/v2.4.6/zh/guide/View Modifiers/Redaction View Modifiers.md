---
title: 数据遮罩视图修饰符
description: 该修饰符用于指定当视图内容发生变化时所应用的动画过渡效果。

---

Scripting App 支持用于视图层级的数据遮罩（Redaction）修饰符。通过这些修饰符，开发者可以将视图内容以占位符、隐私保护或失效状态的形式展示，常用于加载中、隐私信息隐藏或内容待更新的场景。

这些修饰符的行为与 SwiftUI 中的 `redacted(reason:)` 和 `unredacted()` 完全一致。

---

## `redacted`

```ts
redacted?: RedactedReason | null
```

为当前视图及其子视图应用数据遮罩效果，根据传入的遮罩原因改变内容的显示方式。

### 描述

`redacted` 会在不改变原始数据的情况下，以视觉形式替代原始内容。常用于提升用户体验，例如在内容加载时使用占位图形，或在展示敏感信息时进行遮罩。

### 枚举类型：`RedactedReason`

```ts
type RedactedReason = "placeholder" | "invalidated" | "privacy"
```

* **`placeholder`**：以占位符形式展示数据，适用于加载中状态。
* **`invalidated`**：表示数据已失效或正在等待更新。
* **`privacy`**：对内容进行遮罩，以保护用户隐私或敏感信息。

### 示例

```tsx
<Text
  redacted={"placeholder"}
>
  加载中...
</Text>
```

上述示例中，文本内容将以占位符样式展示，适用于数据尚未加载完成的情况。

---

## `unredacted`

```ts
unredacted?: boolean
```

用于移除继承自父视图的遮罩效果，使当前视图恢复原始样式。

### 描述

当上层视图应用了 `redacted` 后，可以在子视图中通过设置 `unredacted: true` 取消遮罩，使该子视图内容正常显示。

### 示例

```tsx
<VStack redacted={"placeholder"}>
  <Text>加载中...</Text>
  <Text unredacted={true}>此内容不遮罩</Text>
</VStack>
```

在此示例中，整个 `VStack` 应用了遮罩，但第二个 `Text` 通过 `unredacted: true` 显示真实内容，不受遮罩影响。

---

## 使用说明

* 遮罩效果仅影响视图的外观，不会影响布局或无障碍功能（如 VoiceOver）。
* `unredacted` 仅在其所在视图受到父视图遮罩影响时才会生效。
* 设置 `redacted: null` 可移除当前视图的遮罩状态（不推荐同时使用 `unredacted`）。
