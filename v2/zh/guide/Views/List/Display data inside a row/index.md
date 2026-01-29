# 在行中显示数据

本示例展示如何使用 `List` 组件，通过自定义的行布局来展示结构化数据。每一行显示一个人的姓名和电话号码，布局清晰，排版整洁，采用了 SwiftUI 风格的堆叠式组件。

## 概览

你将学到如何：

- 定义自定义的行组件（`PersonRowView`）
- 使用 `List` 展示数据集合
- 应用文本样式和系统图标
- 使用 `VStack` 和 `HStack` 进行布局排版

***

## 示例代码

### 1. 导入依赖并定义数据类型

```tsx
import { HStack, Label, List, Navigation, NavigationStack, Script, Text, VStack } from "scripting"

type Person = {
  name: string
  phoneNumber: string
}
```

### 2. 创建行组件

`PersonRowView` 是用于渲染单行内容的组件。它使用纵向堆叠将姓名与电话号码分隔，并使用适当的字体样式和颜色来区分信息层级。

```tsx
function PersonRowView({
  person
}: {
  person: Person
}) {
  return <VStack
    alignment={"leading"}
    spacing={3}
  >
    <Text
      foregroundStyle={"label"}
      font={"headline"}
    >{person.name}</Text>
    <HStack
      spacing={3}
      foregroundStyle={"secondaryLabel"}
      font={"subheadline"}
    >
      <Label
        title={person.phoneNumber}
        systemImage={"phone"}
      />
    </HStack>
  </VStack>
}
```

### 3. 在导航堆栈中展示列表

使用 `NavigationStack` 和 `List` 来展示所有的行。你可以设置导航栏标题以说明视图内容。

```tsx
function Example() {
  const staff: Person[] = [
    {
      name: "Juan Chavez",
      phoneNumber: "(408) 555-4301",
    },
    {
      name: "Mei Chen",
      phoneNumber: "(919) 555-2481"
    }
  ]

  return <NavigationStack>
    <List
      navigationTitle={"Display data inside a row"}
      navigationBarTitleDisplayMode={"inline"}
    >
      {staff.map(person =>
        <PersonRowView
          person={person}
        />
      )}
    </List>
  </NavigationStack>
}
```

### 4. 展示界面并退出脚本

使用 `Navigation.present` 弹出该页面视图，并在页面关闭后退出脚本。

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

## 总结

本示例展示了如何**在行中展示数据**，核心要点包括：

- 使用 `VStack` 和 `HStack` 构建布局结构
- 定义可复用的类型化行组件
- 使用 `List` 渲染结构化的数据集合
- 搭配图标和标签增强可读性和视觉效果

适用于联系人列表、搜索结果、记录信息等多种数据展示场景，支持灵活扩展与样式自定义。
