---
title: 通知
---
`Notification` 模块允许你在 iOS 中调度、管理和显示本地通知。它支持多种触发类型（时间、日历、位置）、交互式操作按钮，以及自定义丰富的 UI。

---

## 目录

1. [调度通知](#调度通知)
2. [通知触发器](#通知触发器)

   * [TimeIntervalNotificationTrigger](#timeintervalnotificationtrigger)
   * [CalendarNotificationTrigger](#calendarnotificationtrigger)
   * [LocationNotificationTrigger](#locationnotificationtrigger)
3. [通知操作按钮](#通知操作按钮)
4. [自定义 UI 展示](#自定义-ui-展示)
5. [通知管理](#通知管理)
6. [NotificationInfo 与迁移指南](#notificationinfo-与迁移指南)
7. [完整示例](#完整示例)

---

## 调度通知

使用 `Notification.schedule` 调度一个本地通知：

```ts
await Notification.schedule({
  title: "Time to move",
  body: "You've been sitting too long.",
  trigger: new TimeIntervalNotificationTrigger({
    timeInterval: 1800,
    repeats: true
  }),
  actions: [
    {
      title: "Got up",
      url: Script.createRunURLScheme("Move Reminder", { moved: true })
    }
  ],
  customUI: false
})
```

> 始终使用 `Script.createRunURLScheme(scriptName, parameters)` 来构建操作按钮的回调 URL。

### 参数说明

| 参数名                                   | 类型                                                                                                            | 描述                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `title`                               | `string`                                                                                                      | 必填。通知标题。                                  |
| `subtitle`                            | `string?`                                                                                                     | 可选。副标题。                                   |
| `body`                                | `string?`                                                                                                     | 可选。通知正文内容。                                |
| `badge`                               | `number?`                                                                                                     | 可选。图标角标数字。                                |
| `silent`                              | `boolean?`                                                                                                    | 可选。默认值为 `true`。设为 `false` 可播放声音。          |
| `interruptionLevel`                   | `"active"` \| `"passive"` \| `"timeSensitive"`                                                                | 可选。通知的重要性与送达方式。                           |
| `userInfo`                            | `Record<string, any>?`                                                                                        | 可选。自定义元数据。                                |
| `threadIdentifier`                    | `string?`                                                                                                     | 可选。用于分组的标识符。                              |
| `trigger`                             | `TimeIntervalNotificationTrigger` \| `CalendarNotificationTrigger` \| `LocationNotificationTrigger` \| `null` | 可选。通知的触发条件。                               |
| `actions`                             | `NotificationAction[]?`                                                                                       | 可选。通知上的操作按钮。                              |
| `customUI`                            | `boolean?`                                                                                                    | 可选。启用自定义通知 UI（需使用 `notification.tsx` 文件）。 |
| `avoidRunningCurrentScriptWhenTapped` | `boolean?`                                                                                                    | 可选。阻止点击通知时自动运行当前脚本。默认值为 `false`。          |

> **已废弃：** `triggerTime` 和 `repeatsType` 已弃用，请改用 `trigger`。

---

## 通知触发器

### TimeIntervalNotificationTrigger（时间间隔触发器）

在指定秒数后触发通知：

```ts
new TimeIntervalNotificationTrigger({
  timeInterval: 3600,
  repeats: true
})
```

* `timeInterval`: 秒数。
* `repeats`: 是否重复触发。
* `nextTriggerDate()`: 返回下一次触发的时间。

---

### CalendarNotificationTrigger（日历触发器）

当系统时间匹配指定的日期组件时触发通知：

```ts
const components = new DateComponents({ hour: 8, minute: 0 })
new CalendarNotificationTrigger({
  dateMatching: components,
  repeats: true
})
```

* 可设置 `year`、`month`、`day`、`hour` 等。
* 适合设置每日、每周或一次性的定时任务。

---

### LocationNotificationTrigger（位置触发器）

在进入或离开某个地理区域时触发通知：

```ts
new LocationNotificationTrigger({
  region: {
    identifier: "Work",
    center: { latitude: 37.7749, longitude: -122.4194 },
    radius: 100,
    notifyOnEntry: true,
    notifyOnExit: false
  },
  repeats: false
})
```

* 根据进入或离开指定区域触发。

---

## 通知操作按钮

使用 `actions` 参数设置通知扩展时显示的按钮：

```ts
actions: [
  {
    title: "Open Details",
    url: Script.createRunURLScheme("Details Script", { fromNotification: true })
  },
  {
    title: "Dismiss",
    url: Script.createRunURLScheme("Dismiss Script", { dismissed: true }),
    destructive: true
  }
]
```

* 使用 `Script.createRunURLScheme(...)` 生成正确的回调 URL。
* 用户长按或下拉通知时会看到按钮。

---

## 自定义 UI 展示（Rich Notifications）

可以通过 JSX 创建展开通知时的自定义界面：

1. 在 `Notification.schedule` 中设置 `customUI: true`
2. 在脚本项目中添加 `notification.tsx` 文件
3. 在该文件中调用 `Notification.present(element)` 渲染界面

### `Notification.present(...)`

```ts
Notification.present(element: JSX.Element): void
```

* 只能在 `notification.tsx` 文件中调用。
* 显示指定的 UI 元素作为通知的展开视图。

---

### 示例：`notification.tsx`

```tsx
import { Notification, VStack, Text, Button } from 'scripting'

function NotificationView() {
  return (
    <VStack>
      <Text>Need to complete your task?</Text>
      <Button title="Done" action={() => console.log("Task completed")} />
      <Button title="Later" action={() => console.log("Task postponed")} />
    </VStack>
  )
}

Notification.present(<NotificationView />)
```

---

## 通知管理

| 方法                                     | 描述             |
| -------------------------------------- | -------------- |
| `getAllDelivereds()`                   | 获取所有已送达通知      |
| `getAllPendings()`                     | 获取所有已调度但未送达的通知 |
| `removeAllDelivereds()`                | 清除所有已送达通知      |
| `removeAllPendings()`                  | 取消所有待发送通知      |
| `removeDelivereds(ids)`                | 移除指定 ID 的已送达通知 |
| `removePendings(ids)`                  | 取消指定 ID 的待发送通知 |
| `getAllDeliveredsOfCurrentScript()`    | 获取当前脚本的已送达通知   |
| `getAllPendingsOfCurrentScript()`      | 获取当前脚本的待发送通知   |
| `removeAllDeliveredsOfCurrentScript()` | 移除当前脚本的所有已送达通知 |
| `removeAllPendingsOfCurrentScript()`   | 取消当前脚本的所有待发送通知 |
| `setBadgeCount(count)`                 | 设置 App 图标的角标数值 |

---

## NotificationInfo 与迁移指南

当通知启动脚本时，可以使用 `Notification.current` 获取通知上下文：

```ts
if (Notification.current) {
  const info = Notification.current
  const title = info.request.content.title
  const data = info.request.content.userInfo
  console.log(`Launched from notification: ${title}`, data)
}
```

---

### `NotificationRequest` 结构

| 字段名                        | 描述        |
| -------------------------- | --------- |
| `identifier`               | 通知请求唯一标识符 |
| `content.title`            | 通知标题      |
| `content.subtitle`         | 可选，副标题    |
| `content.body`             | 通知正文      |
| `content.userInfo`         | 自定义元数据    |
| `content.threadIdentifier` | 分组标识符     |
| `trigger`                  | 通知触发器对象   |

---

### NotificationInfo 结构

| 字段        | 类型                    | 描述                    |
| --------- | --------------------- | --------------------- |
| `date`    | `Date`                | 实际的送达时间戳              |
| `request` | `NotificationRequest` | 完整的通知请求，包括触发器、内容和元数据等 |

---

### 已废弃字段与迁移建议

| 废弃字段               | 推荐使用                               |
| ------------------ | ---------------------------------- |
| `title`            | `request.content.title`            |
| `subtitle`         | `request.content.subtitle`         |
| `body`             | `request.content.body`             |
| `userInfo`         | `request.content.userInfo`         |
| `identifier`       | `request.identifier`               |
| `deliveryTime`     | `date.getTime()`                   |
| `threadIdentifier` | `request.content.threadIdentifier` |

> 为兼容旧版本，这些字段依然可用，但不推荐使用。建议统一使用 `NotificationInfo.request` 中的嵌套字段。

---

## 完整示例

以下是一个包含重复触发、交互按钮、中断级别和自定义 UI 的完整通知配置示例。

### 步骤 1：调度通知

```ts
await Notification.schedule({
  title: "Hydration Reminder",
  body: "Time to drink water!",
  interruptionLevel: "timeSensitive",
  customUI: true,
  trigger: new TimeIntervalNotificationTrigger({
    timeInterval: 3600,
    repeats: true
  }),
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
```

### 步骤 2：定义 `notification.tsx`

```tsx
import { Notification, VStack, Text, Button } from 'scripting'

function HydrationUI() {
  return (
    <VStack>
      <Text>Have you drunk water?</Text>
      <Button title="Yes" action={() => console.log("Hydration confirmed")} />
      <Button title="No" action={() => console.log("Reminder ignored")} />
    </VStack>
  )
}

Notification.present(<HydrationUI />)
```

---

## 总结

Scripting 提供了强大的 `Notification` API，支持：

* 使用时间、日历或位置作为通知触发条件
* 添加交互式按钮与自定义数据
* 使用 JSX 构建丰富的通知界面
* 简洁地管理通知生命周期
