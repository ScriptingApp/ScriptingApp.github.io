---
title: Represent data hierarchy in sections


---
        
This example demonstrates how to use the `Section` component in the **Scripting** app to visually organize hierarchical data within a `List`. The content is structured by grouping related items—such as staff members by department—into labeled sections for better readability and navigation.

---

## Overview

You will learn how to:

* Display structured data using `List` and `Section`
* Group related items under section headers
* Create reusable row components for clarity
* Bind hierarchical data (Company → Departments → Staff) into a readable layout

---

## Data Model

The example defines a three-level hierarchy representing a company structure:

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

### Sample Data

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

## Person Row Component

`PersonRowView` is a reusable component that displays a person's name and phone number with appropriate formatting.

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

## Main View Layout

The main view uses a `NavigationStack` containing a `List` where each department is represented as a separate `Section`. The section header displays the department name, and each person is rendered using the `PersonRowView`.

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

## Entry Point

The script presents the view and exits upon dismissal:

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

## Key Components

* **List**: Provides a scrollable container for content.
* **Section**: Groups related items under a common header.
* **NavigationStack**: Enables title display and navigation context.
* **Reusable View**: `PersonRowView` ensures clean, consistent row formatting.

---

## Use Cases

* Grouping contacts by department or team
* Displaying categorized lists (e.g., tasks, inventory, regions)
* Organizing any data set that has a parent-child structure

Using `Section` within `List` improves both visual structure and user comprehension when working with hierarchical data.
