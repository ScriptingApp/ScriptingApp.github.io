---
title: List interaction

---
        
This example demonstrates how to implement interactive list items in the **Scripting** app using **swipe gestures**. By leveraging `leadingSwipeActions` and `trailingSwipeActions`, you can provide contextual actions such as marking a message as unread, deleting a message, or flagging it.

---

## Overview

You will learn how to:

* Display a list of messages using a custom cell layout
* Implement swipe actions on both leading and trailing edges
* Configure swipe behavior (e.g. disabling full swipe)
* Use `Button`, `Label`, and `Circle` for interactive UI elements

---

## Example Code

### 1. Define Message Data Type

```ts
type Message = {
  from: string
  content: string
  isUnread: boolean
}
```

### 2. Create a Custom Message Cell

Each message is rendered with a colored indicator (for unread status), sender name, and content using `HStack` and `VStack`.

```tsx
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
    <VStack alignment={"leading"}>
      <Text font={"headline"}>{message.from}</Text>
      <Text>{message.content}</Text>
    </VStack>
  </HStack>
}
```

### 3. Manage State and Actions

```tsx
const [messages, setMessages] = useState<Message[]>(...)

function toggleUnread(message: Message) {
  setMessages(messages.map(item =>
    item !== message ? item : { ...message, isUnread: !item.isUnread }
  ))
}

function deleteMessage(message: Message) {
  setMessages(messages.filter(item => item !== message))
}
```

### 4. Construct the List with Swipe Actions

```tsx
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
              action={() => {}}
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
```

### 5. Present the View and Exit

```tsx
async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()
```

---

## Key Features

* **leadingSwipeActions**: Add actions triggered by swiping from the leading edge (left-to-right in LTR layouts).
* **trailingSwipeActions**: Add actions triggered by swiping from the trailing edge.
* **allowsFullSwipe**: When set to `false`, prevents full swipe from automatically triggering the first action.
* **Button Roles**: Use roles like `"destructive"` to style buttons (e.g., red for delete).
* **tint**: Customize button color for better visual context.

---

## Use Cases

* **Email/Messaging Scripts**: Mark messages as read/unread, delete, archive, or flag.
* **To-Do Lists**: Complete or remove tasks with quick gestures.
* **Custom Tools**: Attach context-specific actions to list items.

Swipe actions provide an efficient and intuitive way for users to perform actions directly within list views, improving interaction speed and user experience.
