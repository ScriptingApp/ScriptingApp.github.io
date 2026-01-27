---
title: FontPicker（字体选择器）
tag: PRO
---

`FontPicker` 命名空间提供了在系统中选择字体的能力。
它会调用系统字体选择器，让用户从可用字体列表中选取字体，并返回所选字体的 **PostScript 名称**。

---

## 概述

在某些场景中（如自定义编辑器、文本渲染、样式设置等），需要用户选择字体。
`FontPicker` 提供了一个简洁的接口，可在脚本中异步调用系统字体选择器并获取结果。

---

## 方法

### `pickFont(): Promise<string | null>`

打开系统字体选择器，允许用户选择字体。
返回一个 Promise，当用户选择完成或取消时解析为结果。

**返回值：**

* `string`：所选字体的 **PostScript 名称**（例如 `"Helvetica-Bold"`、`"KaitiSC-Regular"` 等）。
* `null`：用户取消选择时返回。

---

## 示例

```ts
const fontPostscriptName = await FontPicker.pickFont()
if (fontPostscriptName == null) {
  // 用户取消了字体选择
  console.log("Font selection canceled")
} else {
  console.log("Selected font:", fontPostscriptName)
}
```

示例输出：

```
Selected font: HelveticaNeue-Bold
```

---

## 使用说明

* 返回的字体名称可直接用于需要指定字体的场景，如文本渲染或 UI 显示。
* 若用户取消选择，返回值为 `null`，调用方应当进行相应处理。
* 字体选择器展示的字体取决于系统中已安装的字体，包括系统预装与用户导入字体。

---

## 小结

| 方法           | 返回值                       | 说明                                    |
| ------------ | ------------------------- | ------------------------------------- |
| `pickFont()` | `Promise<string \| null>` | 打开系统字体选择器，返回字体的 PostScript 名称或 `null` |
