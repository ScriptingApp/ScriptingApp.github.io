---
title: 示例
---
```tsx
import { Color, Image, List, Navigation, NavigationStack, Script, ScrollView, Section, Text, useState, VStack } from "scripting"

function TapGestureExample() {
  const [
    firstViewTapped,
    setFirstViewTapped
  ] = useState(false)

  return <Section>
    <Text
      onTapGesture={() => {
        setFirstViewTapped(true)
      }}
    >
      {firstViewTapped
        ? "Tapped"
        : "Tap on me"}
    </Text>
  </Section>
}

function LongPressGestureExample() {
  const [isPopoverPresented, setIsPopoverPresented] = useState(false)

  return <Section>
    <Text
      onLongPressGesture={() => {
        setIsPopoverPresented(true)
      }}
      popover={{
        isPresented: isPopoverPresented,
        onChanged: setIsPopoverPresented,
        presentationCompactAdaptation: "popover",
        content: <Text
          font={"headline"}
          padding
        >The popover content</Text>
      }}
    >Long press and show a pop-over view</Text>
  </Section>
}

function DoubleTapGestureExample() {
  const [color, setColor] = useState<Color>("gray")
  const colors: Color[] = ["systemBlue", "systemRed", "systemOrange", "systemYellow", "systemPurple"]

  return <Section>
    <VStack
      alignment={"center"}
    >
      <Image
        systemName={"heart.fill"}
        resizable
        frame={{
          width: 100,
          height: 100,
        }}
        foregroundStyle={color}
        onTapGesture={{
          count: 2,
          perform: () => {
            const index = Math.floor(Math.random() * colors.length)
            setColor(colors[index])
          }
        }}
      />
      <Text>Double tap on the Image</Text>
    </VStack>
  </Section>
}

function Example() {

  return <NavigationStack>
    <List
      navigationTitle={"Gestures"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <TapGestureExample />
      <DoubleTapGestureExample />
      <LongPressGestureExample />
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