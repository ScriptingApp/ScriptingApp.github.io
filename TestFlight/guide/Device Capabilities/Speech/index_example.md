# Example

```tsx
import { Button, List, Navigation, NavigationStack, Path, Script, Section, Text, } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <List
      navigationTitle={"Speech Example"}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      <Section
        footer={
          <Text>Activate the SharedAudioSeesion, and speak a text.</Text>
        }
      >
        <Button
          title={"Speak a text"}
          action={async () => {
            console.present()
            if (await Speech.isSpeaking) {
              await Speech.stop('immediate')
              console.log("Stopped.")
              return
            }

            await SharedAudioSession.setActive(true)
            await SharedAudioSession.setCategory('playback', ['mixWithOthers'])

            const listener = () => {
              console.log("Speak completed!")
              Speech.removeListener('finish', listener)
            }

            Speech.addListener('finish', listener)

            await Speech.speak('Hi there, welcome to Scripting! I wish this app is helpful to you.', {
              voiceLanguage: 'en-US',
            })

            console.log("Started, tap the run button to stop.")
          }}
        />
      </Section>
      <Section
        footer={
          <Text>Synthesize text to the file stored in local documents directory.</Text>
        }
      >
        <Button
          title={"synthesize to File"}
          action={async () => {
            console.present()
            const filePath = Path.join(FileManager.documentsDirectory, 'greeting.caf')
            const listener = () => {
              if (FileManager.existsSync(filePath)) {
                console.log("Audio file is saved to " + filePath + ". Start to play it.")

                let player = new AVPlayer()
                player.setSource(filePath)
                player.onReadyToPlay = () => {
                  player.play()
                }
                player.onEnded = () => {
                  player.dispose()
                }
              } else {
                console.log("Failed to save audio file.")
              }
              Speech.removeListener('finish', listener)
            }

            Speech.addListener('finish', listener)

            await Speech.synthesizeToFile(
              'Hi there, welcome to Scripting! I wish this app is helpful to you.',
              filePath, {
              voiceLanguage: 'en-US',
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
