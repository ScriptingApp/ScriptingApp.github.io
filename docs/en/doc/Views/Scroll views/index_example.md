---
title: Example

---

```tsx
import { Color, ForEach, HStack, KeywordPoint, Navigation, NavigationStack, Picker, RoundedRectangle, Script, ScrollView, Text, useState, VStack } from "scripting"

function Example() {
  const colors: Color[] = [
    "systemRed",
    "systemOrange",
    "systemYellow",
    "systemGreen",
    "systemBlue",
    "systemPurple",
    "systemIndigo",
    "systemPink",
  ]
  const [scrollAnchor, setScrollAnchor] = useState<KeywordPoint>("bottom")

  return <NavigationStack>
    <ScrollView
      navigationTitle={"ScrollView"}
      defaultScrollAnchor={scrollAnchor}
      navigationBarTitleDisplayMode={"inline"}
      key={scrollAnchor}
    >
      <VStack
        spacing={16}
        padding
      >
        <Picker
          title={"Default Scroll Anchor"}
          value={scrollAnchor}
          onChanged={setScrollAnchor as any}
          pickerStyle={"menu"}
        >
          <Text tag={"top"}>Top</Text>
          <Text tag={"center"}>Center</Text>
          <Text tag={"bottom"}>Bottom</Text>
        </Picker>

        <ScrollView
          axes={"horizontal"}
          frame={{
            height: 64
          }}
        >
          <HStack spacing={8}>
            <ForEach
              count={15}
              itemBuilder={index =>
                <RoundedRectangle
                  key={index.toString()}
                  fill={"systemIndigo"}
                  cornerRadius={6}
                  frame={{
                    width: 64,
                    height: 64,
                  }}
                  overlay={
                    <Text>{index}</Text>
                  }
                />
              }
            />
          </HStack>
        </ScrollView>

        <ForEach
          count={colors.length}
          itemBuilder={index => {
            const color = colors[index]
            return <RoundedRectangle
              key={color}
              fill={color}
              cornerRadius={16}
              frame={{
                height: 100
              }}
            />
          }}
        />
      </VStack>
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