---
title: Example
description: Provide immediate access to frequently used commands and controls.

---

```tsx
import { Button, ControlGroup, HStack, Navigation, NavigationStack, Script, Spacer, TextField, useState, VStack } from "scripting"

function Example() {
  const [text, setText] = useState("")

  return <NavigationStack>
    <VStack
      navigationTitle={"Toolbars"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        topBarTrailing: [
          <Button
            title={"Select"}
            action={() => { }}
          />,
          <ControlGroup
            label={
              <Button
                title={"Add"}
                systemImage={"plus"}
                action={() => { }}
              />
            }
            controlGroupStyle={"palette"}
          >
            <Button
              title={"New"}
              systemImage={"plus"}
              action={() => { }}
            />
            <Button
              title={"Import"}
              systemImage={"square.and.arrow.down"}
              action={() => { }}
            />
          </ControlGroup>
        ],
        bottomBar: [
          <Button
            title={"New Sub Category"}
            action={() => { }}
          />,
          <Button
            title={"Add category"}
            action={() => { }}
          />
        ],
        keyboard: <HStack
          padding
        >
          <Spacer />
          <Button
            title={"Done"}
            action={() => {
              Keyboard.hide()
            }}
          />
        </HStack>
      }}
      padding
    >
      <TextField
        title={"TextField"}
        value={text}
        onChanged={setText}
        textFieldStyle={"roundedBorder"}
        prompt={"Focus to show the keyboard toolbar"}
      />
    </VStack>
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