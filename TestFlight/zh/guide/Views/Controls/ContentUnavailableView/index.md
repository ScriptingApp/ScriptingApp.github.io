# 内容不可用视图

`ContentUnavailableView` 是一个 UI 组件，用于在应用内容不可用时向用户展示一个视图。它通常会显示标题、可选的描述内容以及操作区，用以清晰地告知用户内容缺失或尚未准备好。此组件适用于如列表等场景，当没有数据展示时，提供明确的提示。

## 属性

### 通用属性

您可以为 `ContentUnavailableView` 组件传递两种结构的属性：

1. **基于字符串的属性：**
   - `title` (string): 显示的主标题，通常描述不可用的内容。
   - `systemImage` (string): 一个系统图标，用来直观表示内容不可用。这个图标有助于用户理解当前的状态。
   - `description` (string, 可选): 一个简短的文本描述，进一步说明不可用内容。如果不需要，可以省略。

2. **基于 `VirtualNode` 的属性：**
   - `label` (VirtualNode): 一个虚拟节点，通常是 `Text` 或其他 UI 组件，用来描述不可用内容的标签。
   - `description` (VirtualNode | null, 可选): 一个虚拟节点，通常是 `Text` 组件，用于提供更详细的不可用内容描述。如果不需要描述，可以将其设置为 `null`。
   - `actions` (虚拟节点数组 | null, 可选): 一个可选的操作按钮或链接列表。这些操作可以是按钮、链接或其他组件，也可以设置为 `null`，如果没有操作需求。

## 示例用法

### 1. 使用字符串的简单示例

```tsx
function View({documents}: {documents: {name: string}[]}) {
  return (
    <NavigationStack>
      <List
        overlay={
          documents.length > 0
            ? undefined
            : <ContentUnavailableView
                title="暂无文档"
                systemImage="tray.fill"
              />
        }
      >
        {documents.map(item => (
          <Text>{item.name}</Text>
        ))}
      </List>
    </NavigationStack>
  )
}
```

在此示例中，当文档列表为空时，`ContentUnavailableView` 会显示一个标题“暂无文档”以及一个系统图标 `"tray.fill"`。

### 2. 使用 `VirtualNode` 的高级示例

```tsx
function View({documents}: {documents: {name: string}[]}) {
  return (
    <NavigationStack>
      <List
        overlay={
          documents.length > 0
            ? undefined
            : <ContentUnavailableView
                label={<Text>暂无可用文档</Text>}
                description={<Text>请稍后检查，文档将会在更新后显示。</Text>}
                actions={[<Button onClick={handleRefresh}>刷新</Button>]}
              />
        }
      >
        {documents.map(item => (
          <Text>{item.name}</Text>
        ))}
      </List>
    </NavigationStack>
  )
}
```

在这个例子中，`ContentUnavailableView` 使用虚拟节点作为标签和描述，此外，还添加了一个刷新按钮作为操作。

## 注意事项

- 您可以根据需要选择使用基于字符串的属性或基于虚拟节点的属性，后者适用于更动态的内容展示。
- 该组件灵活，能够在列表、堆栈和其他复杂布局中使用。

## API 详情

- **`title`** 和 **`systemImage`**: 提供一种简单的方式来显示不可用内容，使用字符串标题和系统图标。
- **`label`** 和 **`description`**: 使用虚拟节点可以更灵活地定制标签和描述内容。
- **`actions`**: 可选操作，允许您添加按钮或链接，引导用户执行操作，如刷新内容或跳转到其他页面。

该组件非常适合用在内容可能暂时不可用的场景，能够清晰、一致地向用户展示提示信息。
