---
title: 示例

---

```tsx
import { HStack, Label, List, Navigation, NavigationStack, Script, Section, Text, VStack } from "scripting"

type Department = {
  name: string
  staff: Person[]
}

type Company = {
  name: string
  departments: Department[]
}

type Person = {
  name: string
  phoneNumber: string
}

const companyA: Company = {
  name: "Company A",
  departments: [
    {
      name: "Sales",
      staff: [
        {
          name: "Juan Chavez",
          phoneNumber: "(408) 555-4301",
        },
        {
          name: "Mei Chen",
          phoneNumber: "(919) 555-2481",
        }
      ]
    },
    {
      name: "Engineering",
      staff: [
        {
          name: "Bill James",
          phoneNumber: "(408) 555-4450"
        },
        {
          name: "Anne Johnson",
          phoneNumber: "(417) 555-9311"
        }
      ]
    }
  ]
}

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

function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"Represent data hierarchy in sections"}
      navigationBarTitleDisplayMode={"inline"}
    >
      {companyA.departments.map(department =>
        <Section
          header={
            <Text>{department.name}</Text>
          }
        >
          {department.staff.map(person =>
            <PersonRowView
              person={person}
            />
          )}
        </Section>
      )}
    </List>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()

```