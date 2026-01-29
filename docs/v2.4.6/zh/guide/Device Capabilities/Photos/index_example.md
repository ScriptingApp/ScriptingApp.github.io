---
title: 示例
description: 用于管理用户照片库的访问和变更的接口。

---

```tsx
import { Button, List, Navigation, NavigationStack, Script, Section, Text, } from "scripting"

function Example() {
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <List
      navigationTitle={"Photos"}
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
          <Text>Get the latest specified number of photos from the Photos app.</Text>
        }
      >
        <Button
          title={"Photos.getLatestPhotos"}
          action={async () => {
            const images = await Photos.getLatestPhotos(1)
            const image = images?.[0]

            if (image != null) {
              Dialog.alert({
                message: `Image size: ${image.width}*${image.height}`
              })
            } else {
              Dialog.alert({
                message: "Cancelled"
              })
            }
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Present a photo picker dialog and pick limited number of photos.</Text>
        }
      >

        <Button
          title={"Photos.pickPhotos"}
          action={async () => {
            const images = await Photos.pickPhotos(1)
            const image = images?.[0]

            if (image != null) {
              Dialog.alert({
                message: `Image size: ${image.width}*${image.height}`
              })
            } else {
              Dialog.alert({
                message: "Cancelled"
              })
            }
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Take a photo and return a UIImage instance.</Text>
        }
      >
        <Button
          title={"Photos.takePhoto"}
          action={async () => {
            const image = await Photos.takePhoto()

            if (image != null) {
              Dialog.alert({
                message: `Image size: ${image.width}*${image.height}`
              })
            } else {
              Dialog.alert({
                message: "Cancelled"
              })
            }
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Save an image to the Photos app. Returns a boolean value indicates that whether the operation is successful.</Text>
        }
      >
        <Button
          title={"Photos.savePhoto"}
          action={async () => {
            const image = await Photos.takePhoto()

            if (image != null) {
              const success = await Photos.savePhoto(Data.fromJPEG(image, 0.5)!)
              Dialog.alert({
                message: "The photo has been saved: " + success
              })
            } else {
              Dialog.alert({
                message: "Canceled"
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