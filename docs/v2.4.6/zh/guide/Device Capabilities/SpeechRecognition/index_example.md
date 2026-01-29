---
title: 示例
description: 用于管理语音识别过程的接口。

---

```tsx
import { Button, List, Navigation, NavigationStack, Script, Section, Text, } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <List
      navigationTitle={"SpeechRecognition"}
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
          <Text>Returns the list of locales that are supported by the speech recognizer.</Text>
        }
      >
        <Button
          title={"SpeechRecognition.supportedLocales"}
          action={() => {
            console.clear()
            console.present()
            console.log(JSON.stringify(SpeechRecognition.supportedLocales, null, 2))
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Returns a boolean that indicates whether the recognizer is running.</Text>
        }
      >
        <Button
          title={"SpeechRecognition.isRecognizing"}
          action={() => {
            console.clear()
            console.present()
            console.log(
              "SpeechRecognition.isRecognizing",
              SpeechRecognition.isRecognizing
            )
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Start a speech audio buffer recognition request. Return a boolean value that indicates whether the operation was successfully.</Text>
        }
      >
        <Button
          title={"SpeechRecognition.start"}
          action={async () => {
            console.clear()
            console.present()
            console.log("Speech recognizing is started, it will stop after 5s.")

            if (await SpeechRecognition.start({
              locale: "en-US",
              partialResults: false,
              onResult: result => {
                console.log("Result: " + result.text)
              }
            })) {
              setTimeout(async () => {
                await SpeechRecognition.stop()
                console.log("Stoped")
              }, 5000)
            } else {
              console.error("Failed to start recognizing")
            }
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Start a request to recognize speech in a recorded audio file.</Text>
        }
      >
        <Button
          title={"SpeechRecognition.recognizeFile"}
          action={async () => {
            console.clear()
            console.present()
            console.log("SpeechRecognition is started, it will stop after 5s.")

            let audioFilePathToRecognize = await DocumentPicker.pickFiles({
              types: ["public.audio"]
            })

            if (audioFilePathToRecognize.length === 0) {
              console.log("Please pick a audio file.")
              return
            }

            if (await SpeechRecognition.recognizeFile({
              filePath: audioFilePathToRecognize[0],
              partialResults: true,
              onResult: (result) => {
                console.log("Recognized result: " + result.text)
              }
            })) {
              console.log("Started recognizing file...")
            } else {
              console.error("Failed to start recognizing",)
            }
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Stop speech recognition request. Return a boolean value that indicates whether the operation was successfully.</Text>
        }
      >
        <Button
          title={"SpeechRecognition.stop"}
          action={async () => {
            if (SpeechRecognition.isRecognizing) {
              await SpeechRecognition.stop()
              Dialog.alert({
                message: "SpeechRecognition is stopped."
              })
            } else {
              Dialog.alert({
                message: "No progressing recognition."
              })
            }
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