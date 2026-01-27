---
title: 使用 ToolbarProps

---

通过该属性，你可以为视图的导航栏或工具栏区域添加各种项目，类似于 SwiftUI 的 `toolbar` 修饰符功能。

---

## 概述

`toolbar` 属性接受一个 `ToolBarProps` 对象。`ToolBarProps` 中的每个键都对应特定的工具栏位置或操作类型。你提供的值可以是单个 `VirtualNode` 或一个包含多个 `VirtualNode` 元素的数组，这些节点代表自定义的 UI 项目。

**SwiftUI 示例（参考）**
```swift
// SwiftUI 示例代码
YourView()
    .toolbar {
        ToolbarItem(placement: .confirmationAction) {
            Button("保存") {
                // 处理保存操作
            }
        }
    }
```

**Scripting 示例（TypeScript/TSX）**
```tsx
<NavigationStack>
  <List
    toolbar={{
      confirmationAction: <Button title="保存" action={() => handleSave()} />,
      cancellationAction: <Button title="取消" action={() => handleCancel()} />,
      topBarLeading: [
        <Button title="编辑" action={() => handleEdit()} />,
        <Button title="刷新" action={() => handleRefresh()} />
      ]
    }}
  >
    {/* 主内容 */}
  </List>
</NavigationStack>
```

---

## 工具栏位置

以下是 `ToolBarProps` 中可用的键，用于指定项目的位置和行为：

- **automatic**：根据上下文和平台自动确定位置。
- **bottomBar**：将项目放置在底部工具栏。
- **cancellationAction**：在模态界面中表示取消操作。
- **confirmationAction**：在模态界面中表示确认操作（例如，“保存”）。
- **destructiveAction**：表示执行破坏性任务的操作（例如，“删除”）。
- **keyboard**：将项目放置在与键盘关联的工具栏中。
- **navigation**：表示导航相关的操作（例如，“返回”或“关闭”）。
- **primaryAction**：表示界面的主要操作。
- **principal**：将项目放置在工具栏的主区域（通常在导航栏中居中）。
- **topBarLeading**：将项目放置在顶部栏的靠前位置（例如左侧）。
- **topBarTrailing**：将项目放置在顶部栏的靠后位置（例如右侧）。

---

## 使用示例

### 单个项目

如果想在工具栏中添加一个 `confirmationAction` 按钮：

```tsx
<NavigationStack>
  <VStack
    toolbar={{
      confirmationAction: <Button
        title="保存"
        action={() => console.log('正在保存...')}
      />
    }}
  >
    {/* 主内容 */}
  </VStack>
</NavigationStack>
```

---

### 多个项目

可以将节点数组传递给单个位置，从而在同一区域添加多个项目：

```tsx
<NavigationStack>
  <VStack
    toolbar={{
      topBarLeading: [
        <Button title="编辑" action={() => console.log('编辑被点击')} />,
        <Button title="设置" action={() => console.log('设置被点击')} />
      ],
      topBarTrailing: <Button title="完成" action={() => console.log('完成被点击')} />
    }}
  >
    {/* 主内容 */}
  </VStack>
</NavigationStack>
```

---

### 组合多个工具栏位置

可以根据需要混合和匹配不同的工具栏位置：

```tsx
<NavigationStack>
  <List
    toolbar={{
      navigation: <Button title="返回" action={() => console.log('返回被点击')} />,
      principal: <Text fontWeight={"bold"}>标题</Text>,
      primaryAction: <Button title="分享" action={() => console.log('分享被点击')} />,
      bottomBar: <Button title="帮助" action={() => console.log('帮助被点击')} />
    }}
  >
    {/* 主内容 */}
  </List>
</NavigationStack>
```

---

## 总结

通过使用 `toolbar` 属性，你可以轻松在 Scripting 应用中复制 SwiftUI 的 `toolbar` 修饰符行为。将 `VirtualNode` 元素分配给 `ToolBarProps` 中的合适键，能够为你的页面构建丰富的上下文工具栏和导航栏，从而增强用户体验。