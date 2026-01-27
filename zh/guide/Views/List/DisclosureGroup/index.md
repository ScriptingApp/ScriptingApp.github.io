# 展开组

`DisclosureGroup` 组件用于将相关内容组织为可展开/折叠的区域。它非常适合在列表中分组展示具有层级结构或可选显示的内容。

本示例展示如何创建一个顶层的 DisclosureGroup，以及如何嵌套子组来构建多层结构。同时结合按钮和切换开关（Toggle）进行交互控制。

***

## 概览

你将学习如何：

- 使用 `DisclosureGroup` 创建可折叠的内容区域
- 绑定展开状态到本地组件状态
- 嵌套多个 DisclosureGroup 以展示层级结构
- 与 `Toggle`、`Text`、`Button` 等其他视图组合使用

***

## 示例代码

### 1. 导入依赖模块

```tsx
import { Button, DisclosureGroup, List, Navigation, NavigationStack, Script, Text, Toggle, useState } from "scripting"
```

### 2. 定义组件状态

通过 `useState` 管理展开状态以及两个切换项的值：

```tsx
const [topExpanded, setTopExpanded] = useState(true)
const [oneIsOn, setOneIsOn] = useState(false)
const [twoIsOn, setTwoIsOn] = useState(true)
```

### 3. 使用 DisclosureGroup 构建界面

该界面包含一个 `List`，位于 `NavigationStack` 中。通过 `Button` 控制顶层 DisclosureGroup 的展开状态。组内包含多个切换项，并嵌套一个子组：

```tsx
return <NavigationStack>
  <List
    navigationTitle={"DislcosureGroup"}
    navigationBarTitleDisplayMode={"inline"}
  >
    <Button
      title={"Toggle expanded"}
      action={() => setTopExpanded(!topExpanded)}
    />
    <DisclosureGroup
      title={"Items"}
      isExpanded={topExpanded}
      onChanged={setTopExpanded}
    >
      <Toggle
        title={"Toggle 1"}
        value={oneIsOn}
        onChanged={setOneIsOn}
      />
      <Toggle
        title={"Toggle 2"}
        value={twoIsOn}
        onChanged={setTwoIsOn}
      />
      <DisclosureGroup
        title={"Sub-items"}
      >
        <Text>Sub-item 1</Text>
      </DisclosureGroup>
    </DisclosureGroup>
  </List>
</NavigationStack>
```

### 4. 展示页面并退出脚本

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

## 关键概念

- **DisclosureGroup**：一个可展开的容器视图，用于隐藏或显示内部内容。
- **isExpanded**：用于绑定展开状态，控制 DisclosureGroup 的展开或折叠。
- **onChanged**：当用户点击展开或折叠时触发的回调函数。
- **嵌套支持**：DisclosureGroup 支持嵌套使用，可构建多层内容。
- **组件组合**：可与 `Toggle`、`Text`、`Button` 等组件灵活组合，构建交互界面。

***

## 应用场景

- 将设置项分组管理，提升可读性
- 构建可展开的问答、功能列表或信息面板
- 显示具有层级结构的数据，如文件夹、分类、过滤器等

通过 DisclosureGroup，你可以在滚动列表中以清晰且用户友好的方式组织复杂或可选内容。
