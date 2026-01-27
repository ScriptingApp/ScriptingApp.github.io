---
title: Section

---

```tsx
import { Button, List, Navigation, NavigationStack, Script, Section, Text, useState } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()
  const [isExpanded, setIsExpanded] = useState(true)

  return <NavigationStack>
    <List
      navigationTitle={"Section"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />,
      }}
    >
      <Section>
        <Text>Row 1</Text>
        <Text>Row 2</Text>
        <Text>Row 3</Text>
        <Text>Row 4</Text>
      </Section>

      <Section
        header={<Text>Section with header</Text>}
      >
        <Text>Row 1</Text>
        <Text>Row 2</Text>
        <Text>Row 3</Text>
        <Text>Row 4</Text>
      </Section>

      <Section
        footer={<Text>Section with footer</Text>}
      >
        <Text>Row 1</Text>
        <Text>Row 2</Text>
        <Text>Row 3</Text>
        <Text>Row 4</Text>
      </Section>

      <Section
        header={
          <Text
            onTapGesture={() => setIsExpanded(!isExpanded)}
          >Collapsable Section</Text>
        }
        isExpanded={isExpanded}
        onChanged={setIsExpanded}
      >
        <Text>Row 1</Text>
        <Text>Row 2</Text>
        <Text>Row 3</Text>
        <Text>Row 4</Text>
      </Section>
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