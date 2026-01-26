# Use list for navigations

This example demonstrates how to build a navigable list-based interface in the **Scripting** app. It organizes structured data into expandable sections using `DisclosureGroup`, and allows users to navigate to detail views using `NavigationLink`.

***

## Overview

You will learn how to:

- Use `List` to display a directory of departments and staff
- Use `DisclosureGroup` to group related items under collapsible headers
- Use `NavigationLink` to navigate to a detailed view for each item
- Build reusable view components for clarity and modularity

***

## Data Model

The example defines a nested data structure representing a company, its departments, and the staff within each department.

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

***

## View Components

### `PersonRowView`

A reusable component to display a person's name and phone number in a vertically stacked layout.

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

Displays detailed information about a selected person.

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

***

## Main View Layout

The root view uses a `NavigationStack` and displays departments grouped in a `List`. Each `DisclosureGroup` expands to show staff members. Selecting a person navigates to their detail view.

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

***

## Launching the View

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

## Key Components

- **List**: Displays a vertically scrollable list of items.
- **DisclosureGroup**: Organizes content into expandable/collapsible sections.
- **NavigationLink**: Enables navigation to another view when tapped.
- **NavigationStack**: Provides navigation context for view transitions.

***

## Use Cases

- Building directory-style interfaces (e.g., org charts, contact lists)
- Organizing hierarchical data with drill-down navigation
- Providing a structured browsing experience

This example offers a clean and scalable pattern for navigating through structured lists and accessing detailed information with ease.
