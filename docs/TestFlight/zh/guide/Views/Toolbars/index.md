---
title: 工具栏
description: 为用户提供快速访问常用命令和控件。

---
        
`toolbar` 属性用于为导航栏、底部工具栏或键盘附加区域添加自定义操作项。该机制参考了 SwiftUI 中的工具栏 API，允许开发者以声明式方式将按钮、控制组等元素精确地放置在界面的特定位置。

这套系统适用于提供主操作、上下文操作或增强文本输入时的交互体验。

---

## 定义

```ts
toolbar?: ToolBarProps
```

### ToolBarProps 类型定义

```ts
type ToolBarProps = {
  bottomBar?: VirtualNode | VirtualNode[]
  cancellationAction?: VirtualNode | VirtualNode[]
  confirmationAction?: VirtualNode | VirtualNode[]
  destructiveAction?: VirtualNode | VirtualNode[]
  keyboard?: VirtualNode | VirtualNode[]
  navigation?: VirtualNode | VirtualNode[]
  primaryAction?: VirtualNode | VirtualNode[]
  principal?: VirtualNode | VirtualNode[]
  topBarLeading?: VirtualNode | VirtualNode[]
  topBarTrailing?: VirtualNode | VirtualNode[]
}
```

---

## 放置位置说明

`ToolBarProps` 的每个字段都对应一个界面区域，可传入单个或多个 `VirtualNode` 元素进行展示。

* **`automatic`**（隐式）：由系统自动判断最佳放置位置（未在类型中显式声明）。
* **`bottomBar`**：放置于底部工具栏。
* **`cancellationAction`**：表示“取消”操作，通常用于模态界面中。
* **`confirmationAction`**：表示“确认”操作，通常用于模态界面中。
* **`destructiveAction`**：表示破坏性操作，系统可能使用红色等强调样式。
* **`keyboard`**：当键盘弹出时显示在键盘附加区域。
* **`navigation`**：用于导航行为（如返回或关闭）。
* **`primaryAction`**：表示当前上下文中的主要操作。
* **`principal`**：放置在导航栏中间区域。
* **`topBarLeading`**：放置于导航栏的前导位置（通常是左侧）。
* **`topBarTrailing`**：放置于导航栏的尾部位置（通常是右侧）。

---

## 示例

```tsx
<VStack
  navigationTitle={"Toolbars"}
  navigationBarTitleDisplayMode={"inline"}
  toolbar={{
    topBarTrailing: [
      <Button
        title={"选择"}
        action={() => {}}
      />,
      <ControlGroup
        label={
          <Button
            title={"添加"}
            systemImage={"plus"}
            action={() => {}}
          />
        }
        controlGroupStyle={"palette"}
      >
        <Button
          title={"新建"}
          systemImage={"plus"}
          action={() => {}}
        />
        <Button
          title={"导入"}
          systemImage={"square.and.arrow.down"}
          action={() => {}}
        />
      </ControlGroup>
    ],
    bottomBar: [
      <Button
        title={"新建子分类"}
        action={() => {}}
      />,
      <Button
        title={"添加分类"}
        action={() => {}}
      />
    ],
    keyboard: <HStack padding>
      <Spacer />
      <Button
        title={"完成"}
        action={() => {
          Keyboard.hide()
        }}
      />
    </HStack>
  }}
>
  <TextField
    title={"文本输入框"}
    value={text}
    onChanged={setText}
    textFieldStyle={"roundedBorder"}
    prompt={"点击输入框以显示键盘工具栏"}
  />
</VStack>
```

此示例展示了：

* 在顶部导航栏右侧添加了一个“选择”按钮和一个带“新建”“导入”按钮的控制组。
* 在底部工具栏添加了两个分类相关操作按钮。
* 在键盘区域右侧添加了一个“完成”按钮，可点击关闭键盘。

---

## 注意事项

* 所有工具栏项支持响应状态变化，UI 会自动刷新。
* `keyboard` 区域的内容仅在输入框聚焦、键盘弹出时显示。
* 推荐使用 `ControlGroup` 来组织功能相关的按钮，提升可读性和操作一致性。
