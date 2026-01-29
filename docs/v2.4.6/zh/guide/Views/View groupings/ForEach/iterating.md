---
title: 示例
description: 迭代动态数据

---

```tsx
import { Button, Font, ForEach, List, Navigation, NavigationStack, Script, Section, Text, useObservable, VStack } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()

  const namedFonts = useObservable(() => {
    return [
      "largeTitle",
      "title",
      "headline",
      "body",
      "caption"
    ].map(e => ({
      id: e,
      name: e as Font
    }))
  })

  return <NavigationStack>
    <List
      navigationTitle={"Iterating"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      <Section
        header={
          <Text
            textCase={null}
          >ForEach</Text>
        }
      >
        <ForEach
          data={namedFonts}
          builder={(namedFont) => {
            return <Text
              key={namedFont.id}
              font={namedFont.name}
            >{namedFont.name}</Text>
          }}
        />
      </Section>

      <Section
        header={
          <Text
            textCase={null}
          >Iterating in code block</Text>
        }
      >
        <VStack>
          {namedFonts.value.map(namedFont =>
            <Text
              font={namedFont.name}
            >{namedFont.name}</Text>
          )}
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