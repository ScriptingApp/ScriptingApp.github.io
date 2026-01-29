---
title: 编辑器
description: 一个提供富文本编辑界面的视图。

---

一个强大的代码编辑器，既可以通过编程方式控制，也可以嵌入自定义视图中展示。编辑器支持语法高亮、读写访问以及完整的生命周期管理，主要通过 `EditorController` 类和 `Editor` 组件来实现。

---

## EditorController

### 概述

`EditorController` 用于管理一个编辑器实例。你可以配置初始内容、监听用户修改、展示或隐藏编辑器，并在不再使用时释放资源。

### 构造函数

用于创建一个新的编辑器控制器实例。

**参数说明**：

* `content`（可选）：编辑器的初始文本内容。
* `ext`（可选）：文件扩展名，用于指定语法高亮语言。支持的类型包括 `tsx`、`ts`、`js`、`jsx`、`txt`、`md`、`css`、`html` 和 `json`。
* `readOnly`（可选）：是否启用只读模式，默认为 `false`。

---

### 属性说明

#### `ext`

只读属性，表示初始化时提供的文件扩展名，用于决定使用哪种语法高亮。

#### `content`

一个字符串，表示当前编辑器的文本内容。可以直接修改该值以更新编辑器内容。

#### `onContentChanged`

可选回调函数，在用户修改内容后大约 **100 毫秒** 被调用。该函数不会在每次输入时立即触发，适合用于防抖、自动保存等逻辑。

---

### 方法说明

#### `present(options?)`

以模态方式展示编辑器。

**参数说明**：

* `navigationTitle`（可选）：设置编辑器的顶部标题。
* `scriptName`（可选）：用于覆盖默认的 `Script.name`，默认为 `"Temporary Script"`。
* `fullscreen`（可选）：是否全屏显示编辑器，默认为 `false`。

**返回值**：返回一个 `Promise`，在编辑器被关闭时完成。

---

#### `dismiss()`

关闭当前展示的编辑器界面。注意，这不会销毁控制器实例，因此可以稍后再次调用 `present()`。

**返回值**：返回一个 `Promise`，在编辑器关闭后完成。

---

#### `dispose()`

释放控制器占用的资源。**必须在不再使用控制器时调用此方法**，以防止内存泄漏。一旦调用该方法，控制器将无法再次使用。

---

## Editor 组件

`Editor` 是一个 React 风格的组件，用于在 UI 中内联渲染编辑器。通常与 `EditorController` 实例搭配使用。

**属性说明**：

* `controller`：编辑器控制器实例，用于管理内容和状态。
* `scriptName`（可选）：用于指定当前编辑器的脚本名称。
* `showAccessoryView` (可选): 当键盘可见时是否显示附件视图。这对于显示“左移”、“右移”、“删除”、“关闭键盘”等按钮非常有用。默认为 false。当编辑器在屏幕上完全可见时（例如，当编辑器是屏幕上唯一的视图时），建议将其设置为 true。

---

### 示例代码

```tsx
function MyEditor() {
  const controller = useMemo(() => {
    return new EditorController({
      content: `const text = "Hello, World!"`,
      ext: "ts",
      readOnly: false,
    })
  }, [])
  
  useEffect(() => {
    return () => {
      // 组件卸载时释放资源
      controller.dispose()
    }
  }, [controller])

  return (
    <Editor
      controller={controller}
      scriptName="My Script"
      showAccessoryView
    />
  )
}
```