---
title: 流式布局组件(FlowLayout)

---

`FlowLayout` 是一种流式布局组件，用于按照水平方向依次排列子视图，当空间不足时会自动换行至下一行。适用于展示一组大小不一的元素，如标签、按钮、图标列表等。

---

## 导入方式

```ts
import { FlowLayout } from "scripting"
```

---

## 属性（Props）

### `spacing?: number`

元素之间的间距（水平与垂直间距），单位为像素。

* 默认值：`8`
* 类型：`number`

用于设置每个子元素之间的间距，若不指定则使用默认间距。

### `children?: VirtualNode | (VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[]`

要显示的子元素集合。

* 支持单个子节点或多个节点
* `undefined` 和 `null` 类型的子元素会被忽略
* 可传入嵌套数组（常见于使用 `map` 渲染）

---

## 示例

### 基本用法

```ts
import { FlowLayout, Text } from "scripting"

export default function Example() {
  return (
    <FlowLayout spacing={12}>
      <Text>标签一</Text>
      <Text>标签二</Text>
      <Text>标签三</Text>
      <Text>标签四</Text>
    </FlowLayout>
  )
}
```

### 搭配数组渲染

```ts
const tags = ["Apple", "Orange", "Banana", "Pear", "Grape"]

export default function TagsExample() {
  return (
    <FlowLayout spacing={6}>
      {tags.map(tag => <Text>{tag}</Text>)}
    </FlowLayout>
  )
}
```

### 使用默认间距

```ts
<FlowLayout>
  <Text>A</Text>
  <Text>B</Text>
  <Text>C</Text>
</FlowLayout>
```

---

## 使用场景示例

适用于以下布局需求：

* 标签集合展示（Tag Cloud）
* 动态宽度按钮组
* 图标/头像流式排列
* 自适应内容容器
