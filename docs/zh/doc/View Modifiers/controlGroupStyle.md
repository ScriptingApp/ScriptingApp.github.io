---
title: 控件组样式

---

通过该属性，你可以为视图中的控件组设置视觉和交互样式，模仿 SwiftUI 的外观和体验。通过定义 `ControlGroupStyle`，可以影响相关控件（如按钮、切换开关或其他可交互元素）如何被分组和呈现给用户。

---

## 概述

在 SwiftUI 中，你可以像这样设置 `controlGroupStyle`：

```swift
ControlGroup {
    Button("操作 1") { ... }
    Button("操作 2") { ... }
}
.controlGroupStyle(.navigation)
```

**在 Scripting（TypeScript/TSX）中**，可以通过 `controlGroupStyle` 属性在包含控件组的视图上实现类似的样式设置：

```tsx
<ControlGroup
  title="文本格式化"
  controlGroupStyle="navigation"
>
  <Button title="加粗" action={() => console.log('加粗按钮被按下')} />
  <Button title="斜体" action={() => console.log('斜体按钮被按下')} />
  <Button title="下划线" action={() => console.log('下划线按钮被按下')} />
</ControlGroup>
```

---

## 可用样式

你可以将以下字符串值分配给 `controlGroupStyle`，以定义控件组的显示方式：

- **`automatic`**：让系统根据上下文决定合适的样式。
- **`compactMenu`**：将控件以紧凑菜单的形式展示，点击后展开，或者作为嵌套菜单的一部分。
- **`menu`**：将控件以菜单形式显示，按下时呈现为一个菜单或嵌套子菜单。
- **`navigation`**：将控件样式化以适应导航上下文，通常与平台特定的导航样式一致。
- **`palette`**：以调色板式分组显示控件，通常同时显示多个操作选项。

---

## 使用示例

### 设置 `controlGroupStyle` 为菜单样式

```tsx
<ControlGroup
  controlGroupStyle="menu"
>
  {/* 在此添加你的控件内容 */}
</ControlGroup>
```

在此示例中，控件组将以菜单形式显示。点击或与该组交互时，会以菜单界面呈现项目。

---

### 使用调色板样式

```tsx
<ControlGroup
  title="文本格式化"
  controlGroupStyle="palette"
>
  <Button title="加粗" action={() => console.log('加粗按钮被按下')} />
  <Button title="斜体" action={() => console.log('斜体按钮被按下')} />
  <Button title="下划线" action={() => console.log('下划线按钮被按下')} />
</ControlGroup>
```

在此示例中，控件会以调色板样式显示，多个样式选项可以同时展示，方便用户快速选择。

---

### 自动样式

如果不确定哪种样式最佳，或者希望让系统选择合适的样式，可以使用 `automatic`：

```tsx
<ControlGroup
  title="媒体控制"
  controlGroupStyle="automatic"
>
  <Button title="操作 A" action={() => console.log('操作 A')} />
  <Button title="操作 B" action={() => console.log('操作 B')} />
</ControlGroup>
```

在此示例中，系统会根据上下文自动选择适合的控件组样式。

---

## 小结

通过设置 `controlGroupStyle`，你可以决定控件组的显示和交互方式。无论是选择 `menu`、`compactMenu`、`navigation`、`palette`，还是依赖系统默认的 `automatic` 样式，该属性都能帮助你的脚本控件自然地融入平台的 UI 规范和用户期望。