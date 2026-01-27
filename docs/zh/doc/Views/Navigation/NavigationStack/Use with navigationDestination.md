---
title: 与 navigationDestination 一起使用

---

```tsx
import { useState, Color, NavigationStack, List, Text, HStack, Spacer, Image, VStack, Navigation, Script } from "scripting"

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
  const [selectedColor, setSelectedColor] = useState<Color | null>()

  return <NavigationStack>
    <List
      navigationTitle={"With Navigation Destination"}
      navigationDestination={{
        isPresented: selectedColor != null,
        onChanged: value => {
          if (!value) {
            setSelectedColor(null)
          }
        },
        content: selectedColor != null
          ? <NavigationDetailView
            color={selectedColor}
          />
          : <Text>Select a color</Text>
      }}
    >
      {colors.map(color =>
        <HStack
          contentShape={"rect"}
          onTapGesture={() => {
            setSelectedColor(color)
          }}
        >
          <Text>Navigation to {color} view</Text>
          <Spacer />
          <Image
            systemName={"chevron.right"}
            foregroundStyle={"secondaryLabel"}
          />
        </HStack>
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