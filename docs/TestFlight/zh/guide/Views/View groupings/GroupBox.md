---
title: GroupBox
description: 将视图分组到一个方框中

---

```tsx
import { Button, GroupBox, Label, Navigation, NavigationStack, Script, ScrollView, Text, Toggle, useState, VStack } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()
  const [userAgreed, setUserAgreed] = useState(false)
  const agreementText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  return <NavigationStack>
    <VStack
      navigationTitle={"GroupBox"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      <GroupBox
        label={
          <Label
            title={"End-User Agreement"}
            systemImage={"building.columns"}
          />
        }
      >
        <ScrollView
          frame={{
            height: 100,
          }}
        >
          <Text>{agreementText}</Text>
        </ScrollView>
        <Toggle
          value={userAgreed}
          onChanged={setUserAgreed}
        >
          <Text>I agree to the above terms</Text>
        </Toggle>
      </GroupBox>
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