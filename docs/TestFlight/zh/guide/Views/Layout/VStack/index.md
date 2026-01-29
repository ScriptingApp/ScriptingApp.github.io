---
title: 垂直布局（VStack）
description: 一个在垂直方向排列子视图的视图。

---
        
在Scripting 应用程序中，`VStack` 组件是一个布局视图，用于垂直排列其子视图。它提供了灵活的选项，用于调整子视图的对齐方式以及控制它们之间的间距。

---

## **`VStack` 组件**

### **类型声明**

```ts
declare const VStack: FunctionComponent<VStackProps>
```

### **描述**

`VStack` 组件会将其子视图垂直排列，非常适合创建垂直堆叠的布局。您可以根据设计需求，自定义子视图的对齐方式和它们之间的间距。

---

## **属性**

### `alignment` （可选）

- **类型**: `HorizontalAlignment`
- **默认值**: `"center"`
- **描述**: 确定堆栈中子视图的水平对齐方式。对齐方式指定了垂直排列的视图如何在水平方向上相互定位。
- **可接受的值**:
  - `"leading"`：将视图向左对齐。
  - `"center"`：将视图水平居中对齐。
  - `"trailing"`：将视图向右对齐。

#### **示例**
```tsx
<VStack alignment="leading">
  <Text>左对齐</Text>
  <Text>另一个项目</Text>
</VStack>
```

---

### `spacing` （可选）

- **类型**: `number | undefined`
- **默认值**: 如果未指定，则会根据子视图自动计算。
- **描述**: 设置相邻子视图之间的距离（像素）。使用 `undefined` 时，堆栈将自动确定最佳间距。

#### **示例**
```tsx
<VStack spacing={10}>
  <Text>项目 1</Text>
  <Text>项目 2</Text>
</VStack>
```

---

### `children` （可选）

- **类型**:
  ```ts
  (VirtualNode | undefined | null | (VirtualNode | undefined | null)[])[] | VirtualNode | undefined
  ```
- **描述**: 堆栈中显示的子元素。您可以传递单个元素、元素数组或 `undefined`/`null` 值。`null` 和 `undefined` 值会被忽略，从而支持动态布局。

#### **示例**
```tsx
<VStack>
  <Text>第一个项目</Text>
  <Image systemName="star" />
</VStack>
```

---

## **`HorizontalAlignment` 类型**

水平对齐控制了当视图在 `VStack` 中垂直排列时，如何在水平方向上相互定位。

### **类型声明**

```ts
type HorizontalAlignment = 'leading' | 'center' | 'trailing'
```

### **对齐选项**

- **`leading`**：将所有子视图与堆栈的左边缘对齐。
- **`center`**：将所有子视图水平居中对齐。
- **`trailing`**：将所有子视图与堆栈的右边缘对齐。

### **视觉指南**
以下是三种对齐选项的示例图：

![水平对齐](https://docs-assets.developer.apple.com/published/cb8ad6030a1ebcfee545d02f406500ee/HorizontalAlignment-1-iOS@2x.png)

---

## **使用示例**

```tsx
<VStack alignment="leading" spacing={10}>
  <Image systemName="globe" />
  <Text>左对齐项目</Text>
  <Text>另一个项目</Text>
</VStack>
```

### **解释**
1. **`alignment="leading"`**：将所有子视图左对齐。
2. **`spacing={10}`**：为每个子视图之间添加 10 像素的间距。
3. 包含两个子视图：
   - 一个显示系统图标的 `Image` 视图。
   - 两个显示标签项目的 `Text` 视图。

---

## **最佳实践**

1. 使用 `alignment` 来控制堆叠文本和图标的水平定位，以实现更好的视觉一致性。
2. 利用 `spacing` 创建间距合理、视觉美观的布局。
3. 动态或条件性地传递子元素时，无需担心 `null` 或 `undefined` 值。

通过本指南，您可以自信地使用 `VStack` 组件，在Scripting 应用项目中创建清晰的垂直堆叠布局。