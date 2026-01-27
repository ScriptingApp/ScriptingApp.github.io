---
title: Example

---

```tsx
import { HStack, LazyVStack, Navigation, NavigationStack, Script, ScrollView, Section, Spacer, Text, useMemo } from "scripting"

function Example() {
  const groups = useMemo(() => {
    const groups: {
      name: string
      items: number[]
    }[] = []

    for (let i = 1; i < 10; i++) {
      const list: {
        name: string
        items: number[]
      } = {
        name: "Group " + i,
        items: []
      }

      for (let j = 0; j < 10; j++) {
        list.items.push(i * 10 + j)
      }

      groups.push(list)
    }

    return groups
  }, [])

  return <NavigationStack>
    <ScrollView
      navigationTitle={"LazyVStack"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <LazyVStack
        alignment={"leading"}
        spacing={10}
        pinnedViews={"sectionHeaders"}
      >
        {groups.map(group =>
          <Section
            header={
              <HStack
                background={"purple"}
              >
                <Text>{group.name}</Text>
                <Spacer />
              </HStack>
            }
          >
            {group.items.map(item =>
              <Text>Row {item}</Text>
            )}
          </Section>
        )}
      </LazyVStack>
    </ScrollView>
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