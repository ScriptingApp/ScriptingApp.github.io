---
title: TabView with multiple scrolling pages

---

```tsx
import { Color, Navigation, NavigationStack, Script, TabView, Text, VStack } from "scripting"

function Example() {
  const colors: Color[] = [
    "red",
    "green",
    "blue",
    "purple"
  ]

  return <NavigationStack>
    <VStack
      navigationTitle={"TabView"}
    >
      <TabView
        tabViewStyle={"page"}
        frame={{
          height: 200
        }}
      >
        {colors.map(color =>
          <ColorView
            color={color}
          />
        )}
      </TabView>
    </VStack>
  </NavigationStack>
}

function ColorView({
  color,
}: {
  color: Color
}) {
  return <VStack
    frame={{
      maxWidth: "infinity",
      maxHeight: "infinity"
    }}
    background={color}
  >
    <Text>{color}</Text>
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