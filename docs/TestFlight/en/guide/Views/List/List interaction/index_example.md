---
title: Example
description: Adds custom swipe actions to a row in a list.

---

```tsx
import { Button, Circle, HStack, Label, List, Navigation, NavigationStack, Script, Text, useState, VStack } from "scripting"

type Message = {
  from: string
  content: string
  isUnread: boolean
}

function MessageCell({
  message
}: {
  message: Message
}) {
  return <HStack>
    <Circle
      fill={message.isUnread ? "systemBlue" : "clear"}
      frame={{
        width: 16,
        height: 16,
      }}
    />
    <VStack
      alignment={"leading"}
    >
      <Text font={"headline"}>{message.from}</Text>
      <Text>{message.content}</Text>
    </VStack>
  </HStack>
}

function Example() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      from: "Maria Ruiz",
      content: "If you have a list of messages, you can add an action to toggle a message as unread on a swipe from the leading edge, and actions to delete or flag messages on a trailing edge swipe.",
      isUnread: true,
    },
    {
      from: "Mei Chen",
      content: "Actions appear in the order you list them, starting from the swipe’s originating edge. In the example, the Delete action appears closest to the screen’s trailing edge",
      isUnread: true,
    },
    {
      from: "Maria Ruiz",
      content: "By default, the user can perform the first action for a given swipe direction with a full swipe. The user can perform both the toggle unread and delete actions with full swipes. You can opt out of this behavior for an edge by setting the allowsFullSwipe parameter to false.",
      isUnread: false,
    },
    {
      from: "Mei Chen",
      content: "When you set a role for a button using one of the values from the ButtonRole, system styles the button according to its role. In the example above, the delete action appears in red because it has the destructive role. If you want to set a different color, add the tint property to the button",
      isUnread: true,
    }
  ])

  function toggleUnread(message: Message) {
    setMessages(messages.map(item => item !== message ? item : {
      ...message,
      isUnread: !item.isUnread
    }))
  }

  function deleteMessage(message: Message) {
    setMessages(messages.filter(item => item !== message))
  }

  return <NavigationStack>
    <List
      navigationTitle={"Messages"}
      navigationBarTitleDisplayMode={"inline"}
      listStyle={"inset"}
    >
      {messages.map(message =>
        <MessageCell
          message={message}
          leadingSwipeActions={{
            allowsFullSwipe: false,
            actions: [
              <Button
                action={() => toggleUnread(message)}
                tint={"systemBlue"}
              >
                {message.isUnread
                  ? <Label title={"Read"} systemImage={"envelope.open"} />
                  : <Label title={"Unread"} systemImage={"envelope.badge"} />
                }
              </Button>
            ]
          }}
          trailingSwipeActions={{
            actions: [
              <Button
                role={"destructive"}
                action={() => deleteMessage(message)}
              >
                <Label title={"Delete"} systemImage={"trash"} />
              </Button>,
              <Button
                action={() => { }}
                tint={"systemOrange"}
              >
                <Label title={"Flag"} systemImage={"flag"} />
              </Button>
            ]
          }}
        />
      )}
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