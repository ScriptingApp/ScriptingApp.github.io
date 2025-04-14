import { HStack, Notification, Spacer, Text, VStack } from "scripting"

function RichNotificationView() {

  const document = Notification.current?.userInfo

  if (document == null) {
    return <VStack>
      <Text
        font={"footnote"}
        foregroundStyle={"systemRed"}
      >No userInfo found from NotificationInfo</Text>
    </VStack>
  }

  return <VStack
    alignment={"leading"}
    frame={{
      height: 150
    }}
    padding
  >
    <Text
      font={"headline"}
    >
      {document.title}
    </Text>
    <Text
      font={"subheadline"}
    >
      {document.subtitle ?? ""}
    </Text>
    <Spacer />
    <HStack>
      <Spacer />
      <Text
        font={"footnote"}
        foregroundStyle={"secondaryLabel"}
      >Scripting</Text>
    </HStack>
  </VStack>
}

Notification.present(
  <RichNotificationView />
)

