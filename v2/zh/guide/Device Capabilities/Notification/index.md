# 通知

Scripting App 中的 `Notification` 模块用于安排、管理和展示本地通知，支持多种触发方式、交互操作按钮和富交互界面（自定义 UI）。

***

## 目录

1. [安排通知](#安排通知)
2. [通知触发器](#通知触发器)

   - [TimeIntervalNotificationTrigger](#timeintervalnotificationtrigger)
   - [CalendarNotificationTrigger](#calendarnotificationtrigger)
   - [LocationNotificationTrigger](#locationnotificationtrigger)
3. [通知操作按钮](#通知操作按钮)
4. [富通知（自定义 UI）](#富通知自定义-ui)
5. [通知管理](#通知管理)
6. [通知信息与请求结构](#通知信息与请求结构)
7. [完整示例](#完整示例)

***

## 安排通知

使用 `Notification.schedule` 来安排本地通知。它支持标题、触发器、点击行为、操作按钮、自定义 UI 和其他投递选项：

```ts
await Notification.schedule({
  title: "提醒事项",
  body: "该起身活动了！",
  trigger: new TimeIntervalNotificationTrigger({
    timeInterval: 1800,
    repeats: true
  }),
  actions: [
    {
      title: "我知道了",
      icon: "checkmark",
      url: Script.createRunURLScheme("确认脚本", { acknowledged: true })
    }
  ],
  tapAction: {
    type: "runScript",
    scriptName: "确认脚本"
  },
  customUI: false
})
```

### 参数说明

| 参数名                 | 类型                                                                                                            | 说明                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `title`             | `string`                                                                                                      | 必填，通知标题。                                    |
| `subtitle`          | `string?`                                                                                                     | 可选，副标题内容。                                   |
| `body`              | `string?`                                                                                                     | 可选，正文内容。                                    |
| `iconImageData`     | `Data` \| `SystemImageIcon` \| `null`                                                                         | 可选，自定义通知图标图片的二进制数据或系统图标名称。                  |
| `badge`             | `number?`                                                                                                     | 可选，应用图标角标数字。                                |
| `silent`            | `boolean?`                                                                                                    | 可选，默认为 `false`。设为 `true` 则不播放声音静默送达。        |
| `interruptionLevel` | `"active"` \| `"passive"` \| `"timeSensitive"`                                                                | 可选，通知的重要级别和投递优先级。                           |
| `userInfo`          | `Record<string, any>?`                                                                                        | 可选，附加的自定义数据。                                |
| `threadIdentifier`  | `string?`                                                                                                     | 可选，用于通知分组的标识符。                              |
| `trigger`           | `TimeIntervalNotificationTrigger` \| `CalendarNotificationTrigger` \| `LocationNotificationTrigger` \| `null` | 可选，定义何时发送通知。                                |
| `actions`           | `NotificationAction[]?`                                                                                       | 可选，通知展开后展示的操作按钮。                            |
| `customUI`          | `boolean?`                                                                                                    | 可选，设为 `true` 可使用 `notification.tsx` 自定义 UI。 |
| `tapAction`         | `"none"` \| `{ type: "runScript", scriptName: string }` \| `{ type: "openURL", url: string }`                 | 可选，定义用户点击通知时执行的操作。                          |

#### SystemImageIcon

```ts
type SystemImageIcon = {
  systemImage: string
  color: Color
}
```

用于定义通知图标的系统图标名称和颜色。

- `systemImage`: 系统图标（SFSymbol）名称
- `color`: 图标颜色

***

### 通知操作按钮（`actions`）

通过 `actions` 参数，你可以为通知添加操作按钮。操作按钮会在通知展开后出现，用户可以点击进行操作。

#### 通知操作按钮类型（`NotificationAction`）

```ts
type NotificationAction = {
    title: string;
    icon?: string;
    url: string;
    destructive?: boolean;
}
```

- `title`: 按钮标题
- `icon`: 按钮图标
- `url`: 点击后打开的 URL
- `destructive`: 是否为破坏性操作

***

### 点击行为（`tapAction`）

通过 `tapAction` 参数，你可以完全控制用户**点击通知**时的行为：

- `"none"`：点击后无任何响应
- `{ type: "runScript", scriptName: string }`：运行指定脚本
- `{ type: "openURL", url: string }`：打开指定 URL，可为 deeplink 或 https 链接

如果不设置 `tapAction`，默认行为是运行**当前脚本**，你可以通过 `Notification.current` 获取通知内容。

***

## 通知触发器

### TimeIntervalNotificationTrigger

在指定秒数后触发通知：

```ts
new TimeIntervalNotificationTrigger({
  timeInterval: 3600,
  repeats: true
})
```

- `timeInterval`: 延迟秒数
- `repeats`: 是否重复触发
- `nextTriggerDate()`: 返回下次预期触发的时间

***

### CalendarNotificationTrigger

根据特定日期和时间触发通知：

```ts
const components = new DateComponents({ hour: 8, minute: 0 })
new CalendarNotificationTrigger({
  dateMatching: components,
  repeats: true
})
```

- 支持设置 `year`、`month`、`day`、`hour` 等
- 适用于每日、每周或特定时间提醒

***

### LocationNotificationTrigger

当进入或离开某个地理区域时触发：

```ts
new LocationNotificationTrigger({
  region: {
    identifier: "公司",
    center: { latitude: 37.7749, longitude: -122.4194 },
    radius: 100,
    notifyOnEntry: true,
    notifyOnExit: false
  },
  repeats: false
})
```

- 支持进入/离开圆形区域的触发

***

## 通知操作按钮

通过 `actions` 参数添加通知操作按钮：

```ts
actions: [
  {
    title: "查看详情",
    url: Script.createRunURLScheme("详情脚本", { fromNotification: true })
  },
  {
    title: "忽略",
    url: Script.createRunURLScheme("忽略脚本", { dismissed: true }),
    destructive: true
  }
]
```

- 使用 `Script.createRunURLScheme(...)` 创建 URL
- 按钮在长按或下拉通知时显示

***

## 富通知（自定义 UI）

你可以使用 TSX 文件定义通知的展开视图：

1. 安排通知时设置 `customUI: true`
2. 在脚本中添加 `notification.tsx` 文件
3. 使用 `Notification.present(<JSX>)` 渲染 UI

### `Notification.present(element: JSX.Element): void`

在 `notification.tsx` 中调用，用于渲染富通知界面。

***

### 示例 `notification.tsx`

```tsx
import { Notification, VStack, Text, Button } from 'scripting'

function NotificationView() {
  return (
    <VStack>
      <Text>需要完成你的任务吗？</Text>
      <Button title="已完成" action={() => console.log("任务完成")} />
      <Button title="稍后提醒" action={() => console.log("稍后提醒")} />
    </VStack>
  )
}

Notification.present(<NotificationView />)
```

***

## 通知管理

| 方法名                                    | 说明              |
| -------------------------------------- | --------------- |
| `getAllDelivereds()`                   | 获取所有已送达的通知      |
| `getAllPendings()`                     | 获取所有已安排但尚未送达的通知 |
| `removeAllDelivereds()`                | 移除所有已送达的通知      |
| `removeAllPendings()`                  | 取消所有待发送通知       |
| `removeDelivereds(ids)`                | 移除指定 ID 的已送达通知  |
| `removePendings(ids)`                  | 取消指定 ID 的已安排通知  |
| `getAllDeliveredsOfCurrentScript()`    | 获取当前脚本发送的已送达通知  |
| `getAllPendingsOfCurrentScript()`      | 获取当前脚本安排的待发送通知  |
| `removeAllDeliveredsOfCurrentScript()` | 清除当前脚本的所有已送达通知  |
| `removeAllPendingsOfCurrentScript()`   | 清除当前脚本的所有待发送通知  |
| `setBadgeCount(count)`                 | 设置应用图标的角标数值     |

***

## 通知信息与请求结构

当脚本是通过点击通知启动时，可以通过 `Notification.current` 获取上下文信息：

```ts
if (Notification.current) {
  const { title, userInfo } = Notification.current.request.content
  console.log(`从通知启动：${title}`, userInfo)
}
```

### `NotificationRequest` 字段

| 字段名                        | 说明              |
| -------------------------- | --------------- |
| `identifier`               | 通知请求的唯一标识符      |
| `content.title`            | 通知标题            |
| `content.subtitle`         | 通知副标题           |
| `content.body`             | 通知正文            |
| `content.userInfo`         | 附加信息            |
| `content.threadIdentifier` | 分组标识            |
| `trigger`                  | 触发器对象，控制通知的投递逻辑 |

***

## 完整示例

以下示例展示了通知的完整用法：自定义 UI、交互按钮、点击行为、重复触发等。

### 第一步：安排通知

```ts
await Notification.schedule({
  title: "喝水提醒",
  body: "别忘了喝水哦！",
  interruptionLevel: "timeSensitive",
  iconImageData: UIImage
    .fromSFSymbol("waterbottle")!
    .withTintColor("systemBlue")!
    .toPNGData(),
  customUI: true,
  trigger: new TimeIntervalNotificationTrigger({
    timeInterval: 3600,
    repeats: true
  }),
  tapAction: {
    type: "runScript",
    scriptName: "喝水记录"
  },
  actions: [
    {
      title: "已喝水",
      url: Script.createRunURLScheme("喝水记录", { drank: true }),
    },
    {
      title: "忽略",
      url: Script.createRunURLScheme("喝水记录", { drank: false }),
      destructive: true
    }
  ]
})
```

### 第二步：创建 `notification.tsx`

```tsx
import { Notification, VStack, Text, Button } from 'scripting'

function HydrationUI() {
  return (
    <VStack>
      <Text>你刚刚喝水了吗？</Text>
      <Button title="是的" action={() => console.log("已确认喝水")} />
      <Button title="还没" action={() => console.log("忽略提醒")} />
    </VStack>
  )
}

Notification.present(<HydrationUI />)
```

***

## 总结

Scripting 中的 `Notification` API 提供了强大的本地通知功能：

- 支持时间、日历、位置触发器
- 支持操作按钮及跳转脚本
- 通过 `tapAction` 自定义点击通知的行为
- 使用 `notification.tsx` 创建富交互通知界面
- 提供全面的通知生命周期管理
