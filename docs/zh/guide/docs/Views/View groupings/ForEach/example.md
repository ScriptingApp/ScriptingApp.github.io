---
title: 示例
---
```tsx
import { Button, Font, ForEach, List, Navigation, NavigationStack, Script, Section, Text, VStack } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()

  const namedFonts: Font[] = [
    "largeTitle",
    "title",
    "headline",
    "body",
    "caption"
  ]

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
          count={namedFonts.length}
          itemBuilder={index => {
            const namedFont = namedFonts[index]
            return <Text
              key={namedFont}
              font={namedFont}
            >{namedFont}</Text>
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
          {namedFonts.map(namedFont =>
            <Text
              font={namedFont}
            >{namedFont}</Text>
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