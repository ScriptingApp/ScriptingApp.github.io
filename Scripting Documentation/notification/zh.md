`Notification` 模块允许在 **Scripting** 应用中创建、管理和显示本地通知，可选地包含富文本内容以及交互操作。通过这些 API，您可以安排通知的触发时间、自定义通知外观，并定义用户可在通知界面直接执行的操作。

## 目录

1. **通知调度**
2. **获取通知**
3. **移除通知**
4. **设置应用徽章数**
5. **自定义通知中展示的UI**
6. **在自定义UI中获取通知数据**

---

## 1. 通知调度

使用 `Notification.schedule` 方法可以调度本地通知，并通过配置选项来实现自定义操作以及在展开时显示富通知UI的功能。

**方法**:  
```ts
Notification.schedule(options: NotificationScheduleOptions): Promise<boolean>
```

### NotificationScheduleOptions

可用此类型来配置通知选项：

```ts
type NotificationScheduleOptions = {
  title: string
  subtitle?: string
  body?: string
  badge?: number
  silent?: boolean
  userInfo?: Record<string, any>
  threadIdentifier?: string
  triggerTime?: number
  repeatsType?: 'hourly' | 'daily' | 'weekly' | 'monthly'
  actions?: NotificationAction[]
  customUI?: boolean
}
```

| 属性                | 类型                             | 说明                                                                                         |
|---------------------|----------------------------------|----------------------------------------------------------------------------------------------|
| `title`            | `string`                         | 通知的主标题文本。                                                                           |
| `subtitle`         | `string` (可选)                  | 通知副标题，部分场景可能不显示。                                                             |
| `body`             | `string` (可选)                  | 通知正文文本。                                                                               |
| `badge`            | `number` (可选)                  | 应用图标上要显示的徽章数量。                                                                 |
| `silent`           | `boolean` (可选)                 | 若为 `true`，则通知不会发出声音（默认值：`true`）。                                          |
| `userInfo`         | `Record<string, any>` (可选)      | 自定义数据，会附加在通知上，可在脚本中访问。                                                 |
| `threadIdentifier` | `string` (可选)                  | 用于对通知进行分组显示的标识符。                                                             |
| `triggerTime`      | `number` (可选)                  | 通知触发时间（毫秒），若为 `null` 则立即发送。                                               |
| `repeatsType`      | `'hourly' \| 'daily' \| 'weekly' \| 'monthly'` (可选) | 通知的重复间隔类型。                                                          |
| `actions`          | `NotificationAction[]` (可选)     | 通知中的交互操作（按钮等）。                                                                 |
| `customUI`         | `boolean` (可选)                 | 若为 `true`，则在长按或下拉时展示 `notification.tsx` 中定义的富通知自定义UI。                 |

### NotificationAction

```ts
type NotificationAction = {
  title: string          // 按钮标题
  url: string            // 按钮点击后要打开的URL，支持 Scripting URL Scheme 或 https:// 链接
  destructive?: boolean  // （可选）是否为 destructive 操作（一般用于删除或危险操作）
}
```

**使用 `customUI` 与 `actions` 的示例：**

假设要发送一个喝水提醒的通知，在 `notification.tsx` 中可以自定义界面（如按钮“已喝水”或“忽略”），并在 `actions` 中设置相关操作按钮，让用户直接在通知上执行任务。

```tsx
// Hydration Reminder index.tsx

await Notification.schedule({
  title: "Hydration Reminder",
  body: "Time to drink water!",
  customUI: true,
  repeatsType: "hourly", // 每小时提醒一次
  triggerTime: Date.now() + 2000, // 2秒后发送示例
  actions: [
    {
      title: "I Drank",
      url: Script.createRunURLScheme("Hydration Reminder", { drank: true }),
    },
    {
      title: "Ignore",
      url: Script.createRunURLScheme("Hydration Reminder", { drank: false }),
      destructive: true
    }
  ]
})

// 当脚本 "Hydration Reminder" 运行时，index.tsx 会作为入口点
// 可读取 Script.queryParameters["drank"] 的值来确定用户是否喝水。
const drank = Script.queryParameters["drank"]
if (drank === "true") {
  // 用户选择了“已喝水”
} else if (drank === "false") {
  // 用户选择了“忽略”
}
```

---

## 2. 获取通知

### 获取已投递的通知

**方法**: 
```ts
Notification.getAllDelivereds(): Promise<NotificationInfo[]>
```
返回当前仍显示在通知中心中的所有已投递通知。

```ts
type NotificationInfo = {
  identifier: string            // 唯一标识符
  deliveryTime: number          // 通知投递时间戳
  title: string                 // 通知标题
  subtitle: string              // 通知副标题
  body: string                  // 通知内容
  userInfo: Record<string, any> // 自定义数据
  threadIdentifier: string      // 分组标识符
}
```

### 获取待投递的通知

**方法**: 
```ts
Notification.getAllPendings(): Promise<NotificationInfo[]>
```
返回所有尚未投递的通知。

---

## 3. 移除通知

### 移除所有已投递的通知

**方法**: 
```ts
Notification.removeAllDelivereds(): Promise<void>
```
移除当前脚本在通知中心中的所有已投递通知。

### 移除所有待投递的通知

**方法**: 
```ts
Notification.removeAllPendings(): Promise<void>
```
移除当前脚本所有未投递的通知。

### 移除指定已投递通知

**方法**: 
```ts
Notification.removeDelivereds(identifiers: string[]): Promise<void>
```
根据 identifiers 来移除特定已投递的通知。

### 移除指定待投递通知

**方法**: 
```ts
Notification.removePendings(identifiers: string[]): Promise<void>
```
根据 identifiers 来移除特定待投递的通知。

---

## 4. 设置应用徽章数

**方法**:  
```ts
Notification.setBadgeCount(count: number): Promise<boolean>
```
更新 Scripting 应用的图标徽章数字。

**示例**:
```ts
await Notification.setBadgeCount(5)
```

---

## 5. 在通知中展示自定义UI

若在 `NotificationScheduleOptions` 中将 `customUI` 设为 `true`，则通知会支持富文本界面。用户长按或下拉展开通知时，系统会加载并显示 `notification.tsx` 中定义的自定义组件。

**方法**:  
```ts
Notification.present(element: JSX.Element)
```
此方法在 `notification.tsx` 中使用。当用户展开通知时，您可以呈现自定义 UI 元素，以进行更多互动。

**在 `notification.tsx` 中的示例**:
```tsx
import { Notification, VStack, Text, Button } from 'scripting'

function HydrationNotification() {
  const handleDrinkWater = () => {
    console.log("User drank water")
  }

  const handleIgnore = () => {
    console.log("User ignored the reminder")
  }

  return (
    <VStack>
      <Text>Remember to stay hydrated!</Text>
      <Button title="I Drank" action={handleDrinkWater} />
      <Button title="Ignore" action={handleIgnore} />
    </VStack>
  )
}

Notification.present(<HydrationNotification />)
```

---

## 6. 在自定义UI中获取通知数据

**属性**:  
```ts
Notification.current
```
当通知打开脚本或者在渲染富通知UI时，您可以通过 `Notification.current` 获取通知信息。

**示例**:
```ts
const notificationData = Notification.current
if (notificationData != null) {
  console.log(notificationData.title, notificationData.body)
}
```

---

以上文档概述了如何在 **Scripting** 应用中使用 `Notification` 模块来发送、管理并自定义具有富交互内容的通知。祝您编码愉快！