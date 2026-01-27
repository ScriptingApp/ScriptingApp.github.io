---
title: 使用列表进行导航

---
        
本示例展示如何在 **Scripting** 应用中使用 `List` 创建可导航的分层数据界面。通过 `DisclosureGroup` 将内容按部门分组，并结合 `NavigationLink` 实现点击跳转到人员详情页的功能。

---

## 概览

你将学习如何：

* 使用 `List` 显示部门和员工的目录结构
* 使用 `DisclosureGroup` 创建可展开的分组
* 使用 `NavigationLink` 跳转到详细视图
* 构建可复用的子视图组件来提升代码结构清晰度

---

## 数据结构

本示例使用嵌套结构模拟公司 → 部门 → 员工的信息层级：

```ts
type Person = {
  name: string
  phoneNumber: string
}

type Department = {
  name: string
  staff: Person[]
}

type Company = {
  name: string
  departments: Department[]
}
```

### 示例数据

```ts
const companyA: Company = {
  name: "Company A",
  departments: [
    {
      name: "Sales",
      staff: [
        { name: "Juan Chavez", phoneNumber: "(408) 555-4301" },
        { name: "Mei Chen", phoneNumber: "(919) 555-2481" }
      ]
    },
    {
      name: "Engineering",
      staff: [
        { name: "Bill James", phoneNumber: "(408) 555-4450" },
        { name: "Anne Johnson", phoneNumber: "(417) 555-9311" }
      ]
    }
  ]
}
```

---

## 视图组件

### `PersonRowView`

用于显示员工姓名与电话号码的组件，使用垂直堆叠排版。

```tsx
function PersonRowView({ person }: { person: Person }) {
  return <VStack alignment={"leading"} spacing={3}>
    <Text font={"headline"} foregroundStyle={"label"}>{person.name}</Text>
    <HStack spacing={3} font={"subheadline"} foregroundStyle={"secondaryLabel"}>
      <Label title={person.phoneNumber} systemImage={"phone"} />
    </HStack>
  </VStack>
}
```

### `PersonDetailView`

点击员工后跳转的详情页，展示详细信息。

```tsx
function PersonDetailView({ person }: { person: Person }) {
  return <VStack>
    <Text font={"title"} foregroundStyle={"label"}>{person.name}</Text>
    <HStack foregroundStyle={"secondaryLabel"}>
      <Label title={person.phoneNumber} systemImage={"phone"} />
    </HStack>
  </VStack>
}
```

---

## 主界面布局

根视图使用 `NavigationStack` 包裹 `List`，通过 `DisclosureGroup` 对部门分组，组内使用 `NavigationLink` 包裹员工信息，支持点击跳转详情页：

```tsx
function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"Staff Directory"}
      navigationBarTitleDisplayMode={"inline"}
    >
      {companyA.departments.map(department =>
        <DisclosureGroup title={department.name}>
          {department.staff.map(person =>
            <NavigationLink
              destination={<PersonDetailView person={person} />}
            >
              <PersonRowView person={person} />
            </NavigationLink>
          )}
        </DisclosureGroup>
      )}
    </List>
  </NavigationStack>
}
```

---

## 启动视图并退出脚本

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

---

## 关键组件说明

* **List**：用于展示可滚动的列表结构。
* **DisclosureGroup**：支持分组并可展开/折叠内容区域。
* **NavigationLink**：可点击的跳转组件，用于导航到目标视图。
* **NavigationStack**：用于包裹整个导航流程，提供导航上下文。

---

## 应用场景

* 构建组织架构、通讯录等分级导航界面
* 展示具有层级结构的数据，如公司目录、分类商品等
* 提供从列表快速跳转到详细信息的用户体验

本示例提供了一种结构清晰、功能完整的导航模式，适用于构建多级数据浏览和交互式信息展示的脚本页面。
