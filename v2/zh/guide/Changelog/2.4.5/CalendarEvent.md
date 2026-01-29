`CalendarEvent` API 用于在 iOS 日历中创建、读取、编辑与管理事件。
开发者可以操作事件的标题、时间、地点、参与者、重复规则、提醒（EventAlarm）、事件可用性以及地理位置信息，并且可以使用系统提供的创建/编辑界面。

***

# 一、类型说明

## EventParticipant

表示事件的参与者：

- `isCurrentUser: boolean`：是否为当前用户
- `name?: string`：姓名
- `role: ParticipantRole`：角色
- `type: ParticipantType`：类型
- `status: ParticipantStatus`：出席状态

### ParticipantRole

- `chair`（主持人）
- `nonParticipant`（非参与者）
- `optional`（可选）
- `required`（必需）
- `unknown`（未知）

### ParticipantType

- `group`（群组）
- `person`（个人）
- `resource`（资源）
- `room`（房间）
- `unknown`（未知）

### ParticipantStatus

- `unknown`（未知）
- `pending`（待定）
- `accepted`（接受）
- `declined`（拒绝）
- `tentative`（暂定）
- `delegated`（已委托）
- `completed`（已完成）
- `inProcess`（处理中）

***

## EventAvailability

用于表明事件在日程中的可用性状态：

- `notSupported`：日历不支持可用性设置
- `busy`：忙碌
- `free`：空闲
- `tentative`：暂定
- `unavailable`：不可用

***

## EventStructuredLocation

用于地理位置提醒的结构化位置：

- `title: string | null`：名称
- `geoLocation: LocationInfo | null`：地理位置（经纬度）
- `radius: number`：触发半径（米）

此结构与 `EventAlarm.structuredLocation` 配合使用。

***

## AlarmProximity

位置提醒的触发方式：

- `none`：不使用位置触发
- `enter`：进入区域时触发
- `leave`：离开区域时触发

***

# 二、EventAlarm（事件提醒）

CalendarEvent 支持添加多个 `EventAlarm`，包括：

- **绝对时间提醒**
- **相对事件开始时间提醒**
- **位置提醒（geofence）**

详细说明请参考独立的 EventAlarm 文档。

***

# 三、CalendarEvent 类

## 构造函数

```ts
new(): CalendarEvent
```

创建一个新的事件实例（尚未保存到日历）。

***

# 四、属性说明

## 基本信息

### identifier: string

事件的唯一标识符。

### title: string

事件标题。

### notes: string | null

事件备注。

### url: string | null

关联 URL。

### calendar: Calendar | null

事件所属的日历。
不可设为 `null`。
如果需要删除事件，请使用 `remove()`。

***

## 时间与地点

### isAllDay: boolean

是否为全天事件。

### startDate: Date

开始时间。

### endDate: Date

结束时间。

### timeZone: string | null

事件使用的时区。

### location: string | null

纯文本地点信息。

### structuredLocation: EventStructuredLocation | null

结构化位置（支持 geofence 提醒）。

***

## 事件状态与生成信息（新增）

### creationDate: Date | null

事件创建日期（只读）。

### lastModifiedDate: Date | null

事件最后修改时间（只读）。

### occurrenceDate: Date

对于重复事件中的“单个实例”，此属性表示该实例原始发生日期。

### isDetached: boolean

是否为重复事件的“脱离实例”。
例如用户单独修改某一发生日期的事件时，该实例会成为 detached instance。

***

## 参与者与可用性（新增相关属性）

### attendees: EventParticipant\[] | null

参与者数组（只读）。

### organizer: EventParticipant | null

事件组织者（只读）。

### hasAttendees: boolean

是否包含参与者。

### availability: EventAvailability

事件在日程中的可用性状态。

***

## 提醒（Alarm）相关

### alarms: EventAlarm\[] | null

事件绑定的提醒列表。

### hasAlarm: boolean

事件是否包含提醒。

***

## 重复规则

### recurrenceRules: RecurrenceRule\[] | null

事件的重复规则数组。

### hasRecurrenceRules: boolean

是否包含重复规则。

***

## 其他状态属性（新增）

### hasNotes: boolean

是否包含备注。

### hasChanges: boolean

事件或其内部对象是否有未保存的更改。

***

# 五、实例方法

## 1. 提醒管理

### addAlarm(alarm: EventAlarm): void

为事件添加一个提醒。

### removAlarm(alarm: EventAlarm): void

从事件移除一个提醒。
（注意拼写：API 为 `removAlarm`）

***

## 2. 重复规则

### addRecurrenceRule(rule: RecurrenceRule): void

添加一条重复规则。

### removeRecurrenceRule(rule: RecurrenceRule): void

移除一条重复规则。

***

## 3. 事件保存与删除

### `save(): Promise<void>`

保存事件（或重复事件的变化）。

### `remove(): Promise<void>`

从日历中移除事件。

***

## 4. 显示编辑界面

### `presentEditView(): Promise<EventEditViewAction>`

显示系统提供的事件编辑界面，并返回用户执行的操作：

- `"saved"`
- `"deleted"`
- `"canceled"`

***

# 六、静态方法

## `getAll(startDate: Date, endDate: Date, calendars?: Calendar[]): Promise<CalendarEvent[]>`

获取指定日期范围内的事件。

- 可传入 `calendars` 数组过滤事件
- 若不传或传 `null`，则搜索所有可访问的日历

***

## `presentCreateView(): Promise<CalendarEvent | null>`

显示事件创建界面。

- 用户点击保存时返回创建的事件
- 用户取消时返回 `null`

***

# 七、使用示例

## 1. 创建并保存事件

```ts
const defaultCalendar = await Calendar.defaultForEvents()
const event = new CalendarEvent()
event.title = "团队会议"
event.calendar = defaultCalendar!
event.startDate = new Date("2024-01-15T09:00:00")
event.endDate = new Date("2024-01-15T10:00:00")
event.location = "会议室"

await event.save()
```

***

## 2. 添加重复规则

```ts
const rule = RecurrenceRule.create({
  frequency: "weekly",
  interval: 1,
  daysOfTheWeek: ["monday", "wednesday", "friday"],
  end: RecurrenceEnd.fromDate(new Date("2024-12-31")),
})

event.addRecurrenceRule(rule)
await event.save()
```

***

## 3. 添加提醒（Alarm）

```ts
const alarm = EventAlarm.fromRelativeOffset(-600)
event.addAlarm(alarm)
await event.save()
```

***

## 4. 获取日期范围内的事件

```ts
const events = await CalendarEvent.getAll(
  new Date("2024-01-01"),
  new Date("2024-01-31")
 )

for (const e of events) {
  console.log(`事件: ${e.title} 开始时间: ${e.startDate}`)
}
```

***

## 5. 使用事件创建界面

```ts
const created = await CalendarEvent.presentCreateView()
if (created) {
  console.log("新事件已创建:", created.title)
}
```

***

## 6. 编辑事件

```ts
const result = await event.presentEditView()
console.log("编辑操作:", result)
```

***

## 7. 删除事件

```ts
await event.remove()
console.log("事件已移除")
```

***

# 八、补充说明

### 时区处理

当处理跨时区事件时，请务必设置 `timeZone`，否则可能出现偏移时间或显示错误。

### 重复事件编辑

- 修改单个重复事件实例会创建一个 detached instance
- `occurrenceDate` 可用于识别该实例对应的原始日期

### 参与者

参与者信息由系统从日历源（如 iCloud、Exchange）读取。
部分字段可能因日历源不同而缺失。

### structuredLocation 与 geofence

若使用位置提醒，请确保用户授权位置权限。
