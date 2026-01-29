# Form

```tsx
import { Button, Form, Navigation, NavigationStack, Picker, Script, Section, Text, Toggle, useState } from "scripting"

type NotifyMeAboutType = "directMessages" | "mentions" | "anything"
type ProfileImageSize = "large" | "medium" | "small"

function Example() {
  const dismiss = Navigation.useDismiss()
  const [notifyMeAbout, setNotifyMeAbout] = useState<NotifyMeAboutType>("directMessages")
  const [playNotificationSounds, setPlayNotificationSounds] = useState(true)
  const [profileImageSize, setprofileImageSize] = useState<ProfileImageSize>("medium")
  const [sendReadReceipts, setSendReadReceipts] = useState(false)

  return <NavigationStack>
    <Form
      navigationTitle={"Form"}
      toolbar={{
        cancellationAction: <Button
          title={"Done"}
          action={dismiss}
        />
      }}
    >
      <Section
        header={<Text>Notifications</Text>}
      >
        <Picker
          title={"Notify Me About"}
          value={notifyMeAbout}
          onChanged={setNotifyMeAbout as any}
        >
          <Text
            tag={"directMessages"}
          >Direct Messages</Text>
          <Text
            tag={"mentions"}
          >Mentions</Text>
          <Text
            tag={"anything"}
          >Anything</Text>
        </Picker>

        <Toggle
          title={"Play notification sounds"}
          value={playNotificationSounds}
          onChanged={setPlayNotificationSounds}
        />
        <Toggle
          title={"Send read receipts"}
          value={sendReadReceipts}
          onChanged={setSendReadReceipts}
        />
      </Section>

      <Section
        header={<Text>User Profiles</Text>}
      >
        <Picker
          title={"Profile Image Size"}
          value={profileImageSize}
          onChanged={setprofileImageSize as any}
        >
          <Text
            tag={"large"}
          >Large</Text>
          <Text
            tag={"medium"}
          >Medium</Text>
          <Text
            tag={"small"}
          >Small</Text>
        </Picker>

        <Button
          title={"Clear Image Cache"}
          action={() => { }}
        />
      </Section>
    </Form>
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
