---
title: 三栏


---

```tsx
import { HStack, Label, List, Navigation, NavigationSplitView, Script, Section, Text, useState, VStack } from "scripting"

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

const companies: Company[] = [
  {
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
  },
  {
    name: "Company B",
    departments: [
      {
        name: "Human resources",
        staff: [
          {
            name: "Lily",
            phoneNumber: "(111) 555-5552"
          },
          {
            name: "Ross",
            phoneNumber: "(222) 666-8888"
          }
        ]
      },
      {
        name: "Sales",
        staff: [
          {
            name: "John",
            phoneNumber: "(1) 888-4444"
          }
        ]
      }
    ]
  }
]

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
  const [selectedCompany, setSelectedCompany] = useState<Company>()
  const [selectedPerson, setSelectedPerson] = useState<Person>()

  return <NavigationSplitView
    sidebar={
      <List>
        {companies.map(company =>
          <Text
            onTapGesture={() => {
              setSelectedCompany(company)
            }}
          >{company.name}</Text>
        )}
      </List>
    }
    content={
      selectedCompany != null
        ? <List>
          {selectedCompany.departments.map(department =>
            <Section
              header={<Text>{department.name}</Text>}
            >
              {department.staff.map(person =>
                <PersonRowView
                  person={person}
                  contentShape={"rect"}
                  onTapGesture={() => {
                    setSelectedPerson(person)
                  }}
                />
              )}
            </Section>
          )}
        </List>
        : <Text>Select a company</Text>
    }
  >
    {selectedPerson != null
      ? <PersonDetailView
        person={selectedPerson}
      /> :
      <Text>Select a person</Text>}
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