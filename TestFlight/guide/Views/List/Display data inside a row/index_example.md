# Example

```tsx
import { HStack, Label, List, Navigation, NavigationStack, Script, Text, VStack } from "scripting"

type Person = {
  name: string
  phoneNumber: string
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

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()

```
