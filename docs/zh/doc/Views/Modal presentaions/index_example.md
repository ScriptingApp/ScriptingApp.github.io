---
title: 示例

---

```tsx
import { Button, List, Navigation, NavigationStack, Script, Section, Text, useState, VStack } from "scripting"

function SheetExample() {
  const [
    isPresented,
    setIsPresented
  ] = useState(false)

  return <Section
    header={
      <Text>Showing a sheet</Text>
    }
  >
    <Button
      title={"Present"}
      action={() => setIsPresented(true)}
      sheet={{
        isPresented: isPresented,
        onChanged: setIsPresented,
        content: <VStack
          presentationDragIndicator={"visible"}
        >
          <Text
            font={"title"}
            padding={50}
          >
            Sheet content
          </Text>
          <Button
            title={"Dismiss"}
            action={() => setIsPresented(false)}
          />
        </VStack>
      }}
    />
  </Section>
}

function PopoverExample() {
  const [isPresented, setIsPresented] = useState(false)

  return <Section
    header={
      <Text>Showing a popover</Text>
    }
  >
    <Button
      title={"Show Popover"}
      action={() => {
        setIsPresented(true)
      }}
      popover={{
        isPresented: isPresented,
        onChanged: setIsPresented,
        presentationCompactAdaptation: "popover",
        content: <Text padding>Popover content</Text>,
        arrowEdge: "top",
      }}
    />
  </Section>
}

function FullScreenCoverExample() {
  const [isPresented, setIsPresented] = useState(false)

  return <Section
    header={
      <Text>Showing a full screen cover</Text>
    }
  >
    <Button
      title={"Present"}
      action={() => setIsPresented(true)}
      fullScreenCover={{
        isPresented: isPresented,
        onChanged: setIsPresented,
        content: <VStack
          onTapGesture={() => setIsPresented(false)}
          foregroundStyle={"white"}
          frame={{
            maxHeight: "infinity",
            maxWidth: "infinity",
          }}
          background={"blue"}
          ignoresSafeArea
        >
          <Text>A full-screen modal view.</Text>
          <Text>Tap to dismiss</Text>
        </VStack>
      }}
    />
  </Section>
}

function ConfiguringSheetHeightExample() {
  const [isPresented, setIsPresented] = useState(false)

  return <Section
    header={
      <Text>Configuring sheet height</Text>
    }
  >
    <Button
      title={"Present"}
      action={() => setIsPresented(true)}
      sheet={{
        isPresented: isPresented,
        onChanged: setIsPresented,
        content: <VStack
          presentationDragIndicator={"visible"}
          presentationDetents={[
            200, // fixed height
            "medium",
            "large"
          ]}
        >
          <Text
            font={"title"}
            padding={50}
          >
            Drag the indicator to resize the sheet height.
          </Text>
          <Button
            title={"Dismiss"}
            action={() => setIsPresented(false)}
          />
        </VStack>
      }}
    />
  </Section>
}

function PresentAlertExample() {
  const [isPresented, setIsPresented] = useState(false)

  return <Section
    header={
      <Text>Present a alert view</Text>
    }
  >
    <Button
      title={"Present"}
      action={() => setIsPresented(true)}
      alert={{
        isPresented: isPresented,
        onChanged: setIsPresented,
        actions: <Button
          title={"OK"}
          action={() => { }}
        />,
        title: "Alert",
        message: <Text>Everything is OK</Text>
      }}
    />
  </Section>
}

function PresentConfirmationDialogExample() {
  const [isPresented, setIsPresented] = useState(false)

  return <Section
    header={
      <Text>Present a confirmation dialog</Text>
    }
  >
    <Button
      title={"Present"}
      action={() => {
        setIsPresented(true)
      }}
      confirmationDialog={{
        isPresented,
        onChanged: setIsPresented,
        title: "Do you want to delete this image?",
        actions: <Button
          title={"Delete"}
          role={"destructive"}
          action={() => {
            Dialog.alert({
              message: "The image has been deleted."
            })
          }}
        />
      }}
    />
  </Section>
}

function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"Modal presentations"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <SheetExample />
      <ConfiguringSheetHeightExample />
      <FullScreenCoverExample />
      <PopoverExample />
      <PresentAlertExample />
      <PresentConfirmationDialogExample />
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