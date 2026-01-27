---
title: 列表交互

---
        
本示例展示如何在 **Scripting** 应用中通过左右滑动手势为 `List` 列表项添加交互操作。借助 `leadingSwipeActions` 和 `trailingSwipeActions`，你可以实现诸如标记未读、删除、标记重点等常见功能。

---

## 概览

你将学会如何：

* 使用自定义单元格显示消息列表
* 为列表项添加左右滑动手势操作
* 配置滑动行为（例如禁止全滑触发）
* 结合 `Button`、`Label`、`Circle` 等组件构建交互界面

---

## 示例代码

### 1. 定义消息数据类型

```ts
type Message = {
  from: string
  content: string
  isUnread: boolean
}
```

### 2. 创建自定义消息单元格组件

使用 `HStack` 和 `VStack` 展示每条消息的状态指示点、发件人和内容。

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

### 3. 管理列表状态与操作

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

### 4. 构建带滑动交互的列表视图

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

### 5. 展示页面并退出脚本

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

## 关键特性

* **leadingSwipeActions**：配置从主视图起始方向滑动（如从左向右）的操作。
* **trailingSwipeActions**：配置从主视图尾部方向滑动（如从右向左）的操作。
* **allowsFullSwipe**：设置为 `false` 时，禁止通过完全滑动直接触发第一个操作按钮。
* **Button 的 role 属性**：使用 `"destructive"` 等角色值，系统会为按钮应用相应的视觉样式（如删除按钮为红色）。
* **tint**：可自定义按钮颜色，以提升识别度与视觉分层。

---

## 适用场景

* **邮件/消息类脚本**：快速标记为已读/未读、删除、归档或加星。
* **任务清单**：滑动完成任务或移除待办事项。
* **自定义工具列表**：根据上下文为每项内容添加快捷操作。

通过滑动操作，可以为列表提供直观、高效的交互方式，提升用户体验与操作效率。
