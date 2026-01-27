---
title: Use with NavigationLink

---

```tsx
import { Color, List, Navigation, NavigationLink, NavigationStack, Script, Text, VStack } from "scripting"

function NavigationDetailView({
  color
}: {
  color: Color
}) {

  return <VStack
    navigationContainerBackground={color}
    frame={{
      maxWidth: "infinity",
      maxHeight: "infinity"
    }}
  >
    <Text>{color}</Text>
  </VStack>
}


function Example() {
  const colors: Color[] = [
    "red", "green", "blue", "orange", "purple"
  ]

  return <NavigationStack>
    <List
      navigationTitle={"NavigationStack with links"}
      navigationBarTitleDisplayMode={"inline"}
    >
      {colors.map(color =>
        <NavigationLink
          destination={
            <NavigationDetailView
              color={color}
            />
          }
        >
          <Text>Navigation to {color} view</Text>
        </NavigationLink>
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