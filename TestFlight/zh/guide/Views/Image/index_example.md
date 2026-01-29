# 示例

```tsx
import { Button, Image, List, Markdown, Navigation, NavigationStack, ProgressView, QRImage, Script, Section, Text, VStack } from "scripting"

function View() {
  const dismiss = Navigation.useDismiss()
  const url = "https://github.com"

  return <NavigationStack>
    <List
      navigationTitle={"Image"}
      toolbar={{
        topBarLeading: <Button
          title={"Close"}
          action={dismiss}
        />
      }}
    >

      <Section title={"Network Image"}>
        <Image
          imageUrl={'https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96_2x.png'}
          resizable
          scaleToFit
          placeholder={<ProgressView
            progressViewStyle={'circular'}
          />}
        />
      </Section>

      <Section title={"SF Symbol"}>
        <Image
          systemName={"phone"}
          resizable
          scaleToFit
          frame={{
            width: 32,
            height: 32,
          }}
          foregroundStyle={"systemGreen"}
        />
      </Section>

      <Section title={"Local Image"}>
        <Markdown
          content={`\`\`\`tsx
<Image
  filePath={Path.join(Script.directory, "test.jpg")}
/>
\`\`\``}
        />
      </Section>

      <Section title={"QR Code Image"}>
        <VStack>
          <Text>URL: {url}</Text>
          <QRImage
            data={url}
          />
        </VStack>
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
