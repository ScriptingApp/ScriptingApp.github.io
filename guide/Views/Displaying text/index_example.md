# Example

```tsx
import { Label, List, Markdown, Navigation, NavigationStack, Script, Section, Text, VStack } from "scripting"

function View() {
  return <NavigationStack>
    <List>
      <Section title={"Text"}>
        <VStack>
          <Text
            font={"title"}
            foregroundStyle={"systemRed"}
          >
            Title
          </Text>
          <Text
            font={"body"}
            foregroundStyle={"systemBlue"}
          >Hello Scripting!</Text>
          <Text
            foregroundStyle={"systemGreen"}
            font={"footnote"}
            italic
          >
            This is a footnote.
          </Text>
        </VStack>
      </Section>

      <Section title="AttributedString">
        <Text
          attributedString={`This is regular text.
* This is **bold** text, this is *italic* text, and this is ***bold, italic*** text.
~~A strikethrough example~~
\`Monospaced works too\`
Visit Apple: [click here](https://apple.com)`}
        />
      </Section>

      <Section title={"Label"}>
        <Label
          title={"Hello world"}
          systemImage={"globe"}
        />
      </Section>

      <Section title={"Markdown"}>
        <Markdown
          content={`
# Scripting App
Run your *ideas* quickly **with** scripts.
      `}
        />
      </Section>

      <Section title={"RichText"}>
        <Text
          font={16}
          styledText={{
            content: [
              "I agree the ",
              {
                content: "Terms",
                foregroundColor: "systemOrange",
                underlineColor: "systemBlue",
                bold: true,
                onTapGesture: () => {
                  Dialog.alert({
                    message: "OK!"
                  })
                }
              }
            ]
          }}
        />
      </Section>

    </List>
  </NavigationStack>
}

async function run() {
  await Navigation.present(<View />)
  Script.exit()
}

run()
```
