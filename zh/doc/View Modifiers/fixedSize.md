# 固定大小

将视图固定在其理想大小，防止其被压缩或扩展超出其内容本身所需的尺寸。

## 类型

```ts
fixedSize?: boolean | {
  horizontal: boolean
  vertical: boolean
}
```

## 概述

`fixedSize` 修饰符会告诉布局系统使用视图的“理想尺寸”进行布局，而不是根据父视图的限制拉伸或压缩视图。这在你希望文本不被截断、内容完整显示时非常有用，或者在你希望视图不随父容器大小变化而自动调整尺寸时使用。

该行为与 SwiftUI 中的 [`fixedSize()`](https://developer.apple.com/documentation/swiftui/view/fixedsize%28%29) 一致。

## 使用方式

你可以通过两种方式设置 `fixedSize`：

### 1. 布尔值形式

```tsx
<Text fixedSize>
  这段文字不会被压缩或截断。
</Text>
```

等价于：

```tsx
<Text fixedSize={{ horizontal: true, vertical: true }}>
  这段文字不会被压缩或截断。
</Text>
```

### 2. 对象形式

通过对象形式可以分别控制水平和垂直方向是否固定：

```tsx
<Text fixedSize={{ horizontal: true, vertical: false }}>
  水平方向不压缩，垂直方向仍可适应内容。
</Text>
```

## 行为说明

- `horizontal: true`：视图水平方向保持其理想宽度，不会被压缩或拉伸，常用于防止文字被截断。
- `vertical: true`：视图垂直方向保持理想高度，不会被压缩或拉伸。
- 两个方向都为 `false` 时，该修饰符不生效。
- 父容器在布局时如果给定了较小的空间，设置了 `fixedSize` 的视图将优先保持其理想尺寸，可能导致内容溢出。

## 示例

```tsx
<VStack>
  <Text fixedSize>
    一段较长的文字，不应被截断，应完整显示。
  </Text>
  <Text fixedSize={{ horizontal: true, vertical: false }}>
    这段文字保持水平方向的尺寸，但可以在垂直方向自动换行或扩展。
  </Text>
</VStack>
```

## 注意事项

- 常用于防止 `Text` 视图在父容器中被截断。
- 与 `HStack`、`VStack` 等布局组件结合时，可以更精确地控制某个子视图不随整体布局缩放。
- 使用该修饰符时，应考虑可能出现的内容溢出或布局冲突问题。
