---
title: Group
description: Grouping views into a container

---

```tsx
import { Button, Group, List, Navigation, NavigationStack, Script, Section, Text, VStack } from "scripting"

function Example() {
  const dimiss = Navigation.useDismiss()

  return <NavigationStack>
    <List
      navigationTitle={"Group"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dimiss}
        />
      }}
    >
      <Section
        footer={
          <Text>Apply the headline font to all Text views</Text>
        }
      >
        <Group
          font={"headline"}
        >
          <Text>Scripting</Text>
          <Text>TypeScript</Text>
          <Text>TSX</Text>
        </Group>
      </Section>

      <Section
        footer={
          <Text>Group some views as a view</Text>
        }
      >
        <VStack>
          <Group
            foregroundStyle={"red"}
          >
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
            <Text>7</Text>
          </Group>
          <Text>8</Text>
        </VStack>
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