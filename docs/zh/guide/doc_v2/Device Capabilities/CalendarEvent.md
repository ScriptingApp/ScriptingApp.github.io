---
title: 日历事件
---
`CalendarEvent` API 使用户能够创建、管理和操作 iOS 日历中的事件。此 API 支持多种功能，例如设置事件详细信息、管理重复规则、邀请参与者以及处理事件操作。

## 类型

### `EventParticipant`
表示事件的参与者：
- `isCurrentUser: boolean`：指示参与者是否是当前用户。
- `name?: string`：参与者的姓名。
- `role: ParticipantRole`：参与者在事件中的角色。
- `type: ParticipantType`：参与者的类型。
- `status: ParticipantStatus`：参与者的出席状态。

#### `ParticipantRole`
事件参与者的角色：
- `"chair"`（主持人）
- `"nonParticipant"`（非参与者）
- `"optional"`（可选）
- `"required"`（必需）
- `"unknown"`（未知）

#### `ParticipantType`
参与者的类型：
- `"group"`（群组）
- `"person"`（个人）
- `"resource"`（资源）
- `"room"`（房间）
- `"unknown"`（未知）

#### `ParticipantStatus`
参与者的出席状态：
- `"unknown"`（未知）
- `"pending"`（待定）
- `"accepted"`（接受）
- `"declined"`（拒绝）
- `"tentative"`（暂定）
- `"delegated"`（已委托）
- `"completed"`（已完成）
- `"inProcess"`（处理中）

### `EventEditViewAction`
编辑事件后的操作：
- `"deleted"`（已删除）
- `"saved"`（已保存）
- `"canceled"`（已取消）

## 类：`CalendarEvent`

### 属性
- `identifier: string`：事件的唯一标识符。
- `calendar: Calendar`：与事件关联的日历。
- `title: string`：事件标题。
- `notes?: string`：事件的附加备注。
- `url?: string`：与事件相关联的 URL。
- `isAllDay: boolean`：事件是否是全天事件。
- `startDate: Date`：事件的开始日期和时间。
- `endDate: Date`：事件的结束日期和时间。
- `location?: string`：事件地点。
- `timeZone?: string`：事件的时区。
- `attendees?: EventParticipant[]`：参与者列表。
- `recurrenceRules?: RecurrenceRule[]`：事件的重复规则。
- `hasRecurrenceRules: boolean`：指示事件是否有重复规则。

### 方法

#### 实例方法
- **`addRecurrenceRule(rule: RecurrenceRule): void`**  
  为事件添加重复规则。
- **`removeRecurrenceRule(rule: RecurrenceRule): void`**  
  从事件中移除重复规则。
- **`remove(): Promise<void>`**  
  从日历中移除事件或重复事件。
- **`save(): Promise<void>`**  
  将事件或更新保存到日历。
- **`presentEditView(): Promise<EventEditViewAction>`**  
  显示一个编辑视图以修改事件。

#### 静态方法
- **`CalendarEvent.getAll(startDate: Date, endDate: Date, calendars?: Calendar[]): Promise<CalendarEvent[]>`**  
  获取指定日历中某日期范围内的事件。
- **`CalendarEvent.presentCreateView(): Promise<CalendarEvent | null>`**  
  显示一个视图以创建新的日历事件。

## 示例

### 创建重复规则
```ts
const rule = RecurrenceRule.create({
  frequency: "weekly",
  interval: 1,
  daysOfTheWeek: ["monday", "wednesday", "friday"],
  end: RecurrenceEnd.fromDate(new Date("2024-12-31"))
})
```

### 创建并保存事件
```ts
const defaultCalendar = await Calendar.defaultForEvents()
const event = new CalendarEvent()
event.title = "团队会议"
event.calendar = defaultCalendar! // 必须指定一个日历
event.startDate = new Date("2024-01-15T09:00:00")
event.endDate = new Date("2024-01-15T10:00:00")
event.location = "会议室"
event.recurrenceRules = [rule]

await event.save()
console.log(`事件已保存: ${event.title}`)
```

### 获取指定日期范围内的事件
```ts
const startDate = new Date("2024-01-01")
const endDate = new Date("2024-01-31")
const events = await CalendarEvent.getAll(startDate, endDate)

for (const event of events) {
  console.log(`事件: ${event.title}, 日期: ${event.startDate}`)
}
```

---

### 显示事件创建视图
```ts
const newEvent = await CalendarEvent.presentCreateView()
if (newEvent) {
  console.log(`新事件已创建: ${newEvent.title}`)
} else {
  console.log("事件创建已取消。")
}
```

---

### 编辑现有事件
```ts
await event.presentEditView()
console.log("事件已编辑。")
```

---

### 删除事件
```ts
await event.remove()
console.log("事件已从日历中移除。")
```

---

## 补充说明

- **时区支持：** 在处理跨时区的事件时，请确保设置 `timeZone` 属性以防止排程冲突。
- **重复规则：** 虽然可以为事件关联重复规则，但本文档省略了重复规则的详细用法。请参考相关 API 文档以获取更多信息。
- **参与者管理：** `attendees` 属性可用于管理参与者。每个参与者由一个 `EventParticipant` 对象表示，包括姓名、角色和出席状态等详细信息。