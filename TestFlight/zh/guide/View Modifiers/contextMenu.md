# 上下文菜单

`contextMenu` 属性用于为任意视图添加系统风格的上下文菜单。在触控设备上通过长按触发，在使用鼠标的设备上则可通过右键点击触发。开发者可以自定义菜单项内容，并可选地添加一个预览视图，与菜单同时显示。

***

## 定义

```ts
contextMenu?: {
  menuItems: VirtualNode
  preview?: VirtualNode
}
```

***

## 字段说明

- **`menuItems`**：定义菜单项内容的 `VirtualNode`。通常包含多个 `Button` 组件，并建议使用 `Group` 元素进行组织，以确保良好的布局与交互。

- **`preview`**（可选）：一个预览视图，类型为 `VirtualNode`。该视图会在上下文菜单旁边展示，用于提供可视化的上下文提示，例如当前操作的对象缩略图或详细信息。

***

## 行为说明

当用户对视图进行长按（触控设备）或右键点击（指针设备）时，系统将展示由 `menuItems` 定义的上下文菜单；如果提供了 `preview` 属性，则在菜单旁边显示对应的预览内容。

***

## 示例

```tsx
function View() {
  return <Text
    contextMenu={{
      menuItems: <Group>
        <Button
          title="添加"
          action={() => {
            // 执行添加操作
          }}
        />
        <Button
          title="删除"
          role="destructive"
          action={() => {
            // 执行删除操作
          }}
        />
      </Group>
    }}
  >
    长按以打开上下文菜单
  </Text>
}
```

上述示例中，`Text` 视图被添加了上下文菜单。在长按该文本时，系统会展示两个操作项：“添加” 和 “删除”，其中“删除”按钮带有破坏性角色样式（`destructive`）。

***

## 注意事项

- 上下文菜单的样式由系统自动管理，符合各平台的界面规范。
- `preview` 字段为可选项，未提供时仅展示菜单项。
- 推荐使用 `Group` 对 `menuItems` 进行结构化组织，以确保良好的交互体验和渲染效果。
