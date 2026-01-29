# 示例

```tsx
import { Button, List, Navigation, NavigationStack, Notification, Script, Section, } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <List
      navigationTitle={"Notification"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      <Section
      >
        <Button
          title={"Schedule a Notification with actions"}
          action={async () => {
            Notification.schedule({
              title: "Notification Testing",
              body: "Long Press or Pull Down",
              actions: [
                {
                  title: "Widget",
                  url: Script.createRunURLScheme(Script.name, {
                    doc: "Widget",
                  })
                },
                {
                  title: "LiveActivity",
                  url: Script.createRunURLScheme(Script.name, {
                    doc: "LiveActivity",
                  })
                }
              ]
            })
          }}
        />
      </Section>

      <Section
      >
        <Button
          title={"Schedule a Notification with Rich Content"}
          action={async () => {
            Notification.schedule({
              title: "Notification Testing",
              body: "Long Press or Pull Down to show rich content.",
              customUI: true,
              userInfo: {
                title: "AudioRecorder",
                subtitle: "The interface allows you to record audio data to a file. It provides functionalities to start, stop, pause, and manage audio recordings, with configurable settings for audio quality, sample rate, format, and more.",
              }
            })
          }}
        />
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
