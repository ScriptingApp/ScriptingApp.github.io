---
title: 内容形状
description: 该属性用于定义视图内容的交互区域或视觉边界形状。

---

`contentShape` 属性用于定义视图内容的**交互区域或视觉边界形状**。该形状可影响视图在点击、拖放、辅助功能、悬停等场景中的行为。常用于精确控制**命中测试（hit-testing）区域**或指定用于辅助功能和交互反馈的自定义轮廓。

这在如下场景中特别有用：

* 控制按钮或自定义视图的可点击区域；
* 定义拖放预览或上下文菜单的形状；
* 指定辅助功能的可聚焦区域；
* 优化鼠标悬停的交互体验。

## 定义

```ts
contentShape?: Shape | {
  kind: ContentShapeKinds
  shape: Shape
}
```

---

## 支持的写法

### 1. 简单形状（适用于所有用途）

直接传入一个 `Shape` 值，作为默认交互区域，用于所有情境（点击、辅助功能、拖放等）。

```tsx
contentShape="circle"
```

---

### 2. 按用途定义的指定形状

使用结构体形式设置指定类型的内容形状：

```ts
{
  kind: ContentShapeKinds
  shape: Shape
}
```

用于为特定交互类型（如 `accessibility`、`dragPreview`）设置不同的区域。

---

## 支持的 `ContentShapeKinds`

| 类型名称                   | 用途说明                      |
| ---------------------- | ------------------------- |
| `"interaction"`        | 命中测试区域（如点击、手势）            |
| `"dragPreview"`        | 拖放操作中的预览形状                |
| `"contextMenuPreview"` | 上下文菜单预览的形状                |
| `"hoverEffect"`        | 鼠标悬停交互区域（适用于连接鼠标的设备）      |
| `"accessibility"`      | 辅助功能可聚焦区域，用于朗读、排序、高亮等辅助操作 |

---

## 示例

### 为所有交互设置默认形状

```tsx
<Button
  title="点击我"
  action={() => {}}
  contentShape="capsule"
/>
```

---

### 仅为辅助功能定义内容形状

```tsx
<Button
  title="可访问按钮"
  action={() => {}}
  contentShape={{
    kind: "accessibility",
    shape: {
      type: "rect",
      cornerRadius: 12
    }
  }}
/>
```

---

### 自定义点击区域为椭圆形

```tsx
<Text
  contentShape={{
    kind: "interaction",
    shape: "ellipse"
  }}
>
  自定义点击区域
</Text>
```

---

## 注意事项

* `contentShape` **不会影响视图的外观**，只影响其**交互行为**；
* 如果使用自定义形状，建议确保其与视图的 `frame` 对齐合理；
* 对于只有图标的按钮或较小区域，设置合适的 `contentShape` 有助于提升点击命中率与可访问性。
