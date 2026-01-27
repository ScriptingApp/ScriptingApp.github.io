---
title: Two-column

---

```tsx
import { HStack, Label, List, Navigation, NavigationSplitView, Script, Text, useState, VStack } from "scripting"

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

function PersonDetailView({
  person
}: {
  person: Person
}) {

  return <VStack>
    <Text
      font={"title"}
      foregroundStyle={"label"}
    >{person.name}</Text>
    <HStack
      foregroundStyle={"secondaryLabel"}
    >
      <Label
        title={person.phoneNumber}
        systemImage={"phone"}
      />
    </HStack>
  </VStack>
}

function Example() {
  const [selectedPerson, setSelectedPerson] = useState<Person>()

  return <NavigationSplitView
    sidebar={
      <List>
        {companyA.departments[0].staff.map(person =>
          <PersonRowView
            person={person}
            contentShape={"rect"}
            onTapGesture={() => {
              setSelectedPerson(person)
            }}
          />
        )}
      </List>
    }
  >
    {selectedPerson != null
      ? <PersonDetailView
        person={selectedPerson}
      />
      : <Text>Please select a person.</Text>
    }
  </NavigationSplitView>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()

```