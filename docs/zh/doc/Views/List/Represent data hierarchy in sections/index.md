---
title: 以分区表示数据层级

---
        
本示例展示如何在 **Scripting** 应用中使用 `Section` 组件，在 `List` 中清晰地组织层级化数据。通过将相关数据（例如员工列表）按部门分组，并为每个分组设置标题，可以更好地提升信息的可读性与结构性。

---

## 概览

你将学习如何：

* 使用 `List` 和 `Section` 展示结构化数据
* 根据部门将员工信息分组显示
* 创建可复用的行视图组件
* 将公司 → 部门 → 员工的层级数据结构转换为列表界面

---

## 数据模型

示例定义了一个公司层级结构，包含公司、部门和员工三层：

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

## 人员行组件

`PersonRowView` 是一个可复用组件，用于展示员工姓名和电话号码，采用垂直排版并添加辅助样式。

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

---

## 主视图布局

主界面使用 `NavigationStack` 包裹 `List`，每个部门对应一个 `Section`。部门名称作为区块标题，区块内通过 `PersonRowView` 渲染员工列表。

```tsx
function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"Represent data hierarchy in sections"}
      navigationBarTitleDisplayMode={"inline"}
    >
      {companyA.departments.map(department =>
        <Section
          header={<Text>{department.name}</Text>}
        >
          {department.staff.map(person =>
            <PersonRowView person={person} />
          )}
        </Section>
      )}
    </List>
  </NavigationStack>
}
```

---

## 启动入口

脚本展示界面后，在关闭时退出脚本：

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

* **List**：用于构建可滚动的列表容器。
* **Section**：将列表按组分类，每组有标题和子项。
* **NavigationStack**：提供导航上下文与导航栏标题显示。
* **PersonRowView**：可复用组件，统一渲染员工数据格式。

---

## 适用场景

* 按部门、分类、地区等组织联系人或数据条目
* 展示有父子结构的数据，如清单、文件、配置项等
* 实现信息有序分组，提升用户的查阅与交互体验

通过在 `List` 中使用 `Section`，你可以构建清晰、分组合理的层级数据界面，使复杂内容一目了然，适合各类数据展示与信息架构设计。
