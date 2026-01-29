# Example

```tsx
import { DisclosureGroup, HStack, Label, List, Navigation, NavigationLink, NavigationStack, Script, Text, VStack } from "scripting"

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
      navigationTitle={"Staff Directory"}
      navigationBarTitleDisplayMode={"inline"}
    >
      {companyA.departments.map(department =>
        <DisclosureGroup
          title={department.name}
        >
          {department.staff.map(person =>
            <NavigationLink
              destination={
                <PersonDetailView
                  person={person}
                />
              }
            >
              <PersonRowView
                person={person}
              />
            </NavigationLink>
          )}
        </DisclosureGroup>
      )}
    </List>
  </NavigationStack>
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

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()

```
