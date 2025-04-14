import { Button, ButtonStyle, Navigation, NavigationStack, Picker, Script, Text, useMemo, useState, VStack } from "scripting"

function Example() {
  const [value, setValue] = useState(0)
  const buttonStyles = useMemo<ButtonStyle[]>(() => [
    'automatic', 'bordered', 'borderedProminent', 'borderless', 'plain'
  ], [])
  const buttonStyle = buttonStyles[value]

  return <NavigationStack>
    <VStack
      navigationTitle={"Button with text and icon"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Button
        title={"Share"}
        systemImage={"square.and.arrow.up"}
        buttonStyle={buttonStyle}
        action={async () => {
          const success = await ShareSheet.present(["This is share content."])
          Dialog.alert({
            message: "Share successfully: " + success
          })
        }}
      />

      <Picker
        title={"ButtonStyle"}
        value={value}
        onChanged={setValue}
        pickerStyle={'wheel'}
      >
        {buttonStyles.map((style, index) =>
          <Text tag={index}>{style}</Text>
        )}
      </Picker>
    </VStack>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()