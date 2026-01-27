---
title: 滑动操作

---
        
在 **Scripting** 中，你可以为用作 `<List>` 列表行的视图（如 `<HStack>`）添加滑动操作按钮，支持如“删除”、“编辑”、“收藏”等常见交互。

为了更清晰地支持 TypeScript，Scripting 将 SwiftUI 的 `swipeActions` 拆分为两个方向明确的修饰符：

* `leadingSwipeActions`: 向右滑动（从左到右）
* `trailingSwipeActions`: 向左滑动（从右到左）

---

## `leadingSwipeActions`

为列表行的 **左侧（leading）** 添加滑动操作。

### 类型

```ts
leadingSwipeActions?: {
  allowsFullSwipe?: boolean
  actions: VirtualNode[]
}
```

### 参数说明

* `actions`: 滑动后显示的按钮组件数组（通常为 `<Button>`）。
* `allowsFullSwipe`: 是否允许“完全滑动”直接执行第一个按钮的操作。默认值为 `true`。

---

## `trailingSwipeActions`

为列表行的 **右侧（trailing）** 添加滑动操作。

### 类型

```ts
trailingSwipeActions?: {
  allowsFullSwipe?: boolean
  actions: VirtualNode[]
}
```

### 参数说明

* `actions`: 滑动后显示的按钮组件数组（通常为 `<Button>`）。
* `allowsFullSwipe`: 是否允许“完全滑动”直接执行第一个按钮的操作。默认值为 `true`。

---

## 示例用法

```tsx
<List>
  {list.map(item => 
    <HStack
      trailingSwipeActions={{
        allowsFullSwipe: true,
        actions: [
          <Button
            title="删除"
            role="destructive"
            action={() => deleteItem(item)}
          />,
          <Button
            title="编辑"
            tint="accentColor"
            action={() => editItem(item)}
          />
        ]
      }}
    >
      <Image systemName={item.icon} />
      <Text>{item.title}</Text>
    </HStack>
  )}
</List>
```

添加左滑操作（向右滑）示例：

```tsx
<HStack
  leadingSwipeActions={{
    actions: [
      <Button
        title="收藏"
        tint="orange"
        action={() => markAsFavorite(item)}
      />
    ]
  }}
>
  <Text>{item.title}</Text>
</HStack>
```

---

## `<Button>` 属性说明

每个滑动操作项都是一个 `<Button>`，你可以使用以下属性来自定义外观与行为：

* `title`: 按钮显示文本
* `action`: 点击按钮时执行的函数
* `role`（可选）: 设置为 `"destructive"` 会显示红色，适用于“删除”操作
* `tint`（可选）: 自定义按钮颜色，例如 `"accentColor"` 或系统颜色名

---

## 注意事项

* `leadingSwipeActions` 和 `trailingSwipeActions` 可以在同一个行视图上同时使用。
* 仅用于列表行中的视图（例如 `<List>` 中的 `<HStack>`）才支持滑动操作。
* 当 `allowsFullSwipe` 为 `false` 时，用户必须点击按钮，而不能通过滑动全程触发操作。