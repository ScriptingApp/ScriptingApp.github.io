# 可编辑列表

本示例展示如何在 Scripting 应用中使用 `List`、`ForEach` 和 `EditButton` 组件构建一个支持 **删除与排序操作** 的可编辑列表。

***

## 概览

你将学习如何：

- 使用 `ForEach` 渲染动态列表项
- 实现列表项的删除和拖动排序功能
- 使用 `EditButton` 启用编辑模式
- 通过 `useState` 管理列表的状态

***

## 示例代码

### 1. 导入所需模块

```tsx
import { Color, EditButton, ForEach, List, Navigation, NavigationStack, Script, Text, useState } from "scripting"
```

### 2. 定义组件状态

使用 `useState` 初始化颜色字符串数组作为列表数据：

```tsx
const [colors, setColors] = useState<Color[]>([
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
])
```

### 3. 处理删除操作

`onDelete` 方法根据传入的索引数组移除对应的列表项：

```tsx
function onDelete(indices: number[]) {
  setColors(colors.filter((_, index) => !indices.includes(index)))
}
```

### 4. 处理拖动排序操作

`onMove` 方法将被拖动的元素插入至目标位置：

```tsx
function onMove(indices: number[], newOffset: number) {
  const movingItems = indices.map(index => colors[index])
  const newColors = colors.filter((_, index) => !indices.includes(index))
  newColors.splice(newOffset, 0, ...movingItems)
  setColors(newColors)
}
```

### 5. 构建可编辑列表界面

主界面使用 `NavigationStack` 和 `List` 构建，并通过 `toolbar` 添加 `EditButton` 实现编辑模式：

```tsx
return <NavigationStack>
  <List
    navigationTitle={"Editable List"}
    navigationBarTitleDisplayMode={"inline"}
    toolbar={{
      confirmationAction: [
        <EditButton />,
      ]
    }}
  >
    <ForEach
      count={colors.length}
      itemBuilder={index =>
        <Text
          key={colors[index]} // 每项必须提供唯一 key
        >{colors[index]}</Text>
      }
      onDelete={onDelete}
      onMove={onMove}
    />
  </List>
</NavigationStack>
```

### 6. 启动视图并退出脚本

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

***

## 关键组件说明

- **List**：用于展示可滚动的列表视图。
- **ForEach**：根据指定数量动态渲染子视图。
- **EditButton**：切换列表的编辑模式，支持删除和排序操作。
- **onDelete / onMove**：在用户删除或拖动项时调用的回调函数。
- **useState**：用于追踪和更新当前的列表数据。

***

## 注意事项

- `ForEach` 中的每个子项必须提供唯一的 `key`，以确保视图更新正常。
- 仅在编辑模式下才能进行删除和排序操作，需通过 `EditButton` 启用。

***

## 适用场景

- 可排序的任务列表或待办事项
- 支持编辑的设置项集合
- 根据用户输入动态更新的内容展示

该示例为你创建交互式脚本或工具提供了灵活的列表功能模板。
