---
title: 提醒事项
description: 该接口允许您在日历中创建、编辑和管理提醒事项，包括设置标题、到期日、优先级和重复规则。
---

`Reminder` API 用于在 iOS 日历系统中创建、编辑和管理提醒事项。
它支持通过 `DateComponents` 设置截止日期、管理完成状态、设置优先级、添加备注、配置重复规则，以及使用提醒的各种相关属性，例如闹钟（EventAlarm）、参与者信息、状态检测属性等。

---

## 类：`Reminder`

`Reminder` 类用于操作单个提醒事项，包括读取与修改其属性、管理重复规则与闹钟，以及执行保存或删除操作。

---

## 一、属性说明

### identifier: string

唯一标识符，由系统分配（只读）。

### calendar: Calendar

提醒所属的日历。必须为有效的日历对象。

### title: string

提醒的标题或摘要。

### notes: string | null

备注信息，用于补充提醒内容。

---

## 完成状态相关属性

### isCompleted: boolean

记录提醒是否已完成。

- 设置为 `true` 时，会自动将 `completionDate` 设为当前时间。
- 设置为 `false` 时，会将 `completionDate` 设为 `null`。

说明：如果在其他设备完成了提醒，系统可能出现 `isCompleted = true` 但 `completionDate = null` 的情况。

### completionDate: Date | null

提醒被完成的时间。

- 设置为某个日期时，会自动令 `isCompleted = true`。
- 设置为 `null` 会将提醒标记为未完成。

---

## 截止时间相关属性

### dueDateComponents: DateComponents | null

表示提醒的截止时间，使用 `DateComponents` 可只设置日期部分或同时包含时间部分。

可使用 `DateComponents.isValidDate` 检查是否为有效日期组合。

### dueDate: Date | null

（已被替代的旧字段）

请使用 `dueDateComponents?.date` 获取实际日期。

### dueDateIncludesTime: boolean

（遗留字段）

可通过以下判断是否包含时间字段：
`dueDateComponents?.hour != null && dueDateComponents?.minute != null`

---

## 优先级

### priority: number

提醒的优先级，数值越大表示越重要或紧急。

---

## 重复规则

### recurrenceRules: RecurrenceRule[] | null

重复规则数组。

### hasRecurrenceRules: boolean

是否存在重复规则（只读）。

---

## 闹钟（Alarm）相关

### alarms: EventAlarm[] | null

提醒绑定的提醒闹钟列表。

支持：

- 绝对时间闹钟
- 相对截止时间的闹钟（基于事件开始时间时使用）
- 地理围栏位置提醒

### hasAlarm: boolean

是否包含闹钟。

---

## 参与者相关

### attendees: EventParticipant[] | null

提醒可包含参与者对象（只读）。

说明：并非所有来源的提醒都支持参与者。

### hasAttendees: boolean

指示是否存在参与者。

---

## 状态标识属性

### hasNotes: boolean

是否包含备注信息。

### hasChanges: boolean

当前实例或其内部对象是否含有尚未保存的更改。

---

## 二、实例方法

### addAlarm(alarm: EventAlarm): void

为提醒添加一个闹钟。

### removAlarm(alarm: EventAlarm): void

移除提醒中的某个闹钟。
（方法名称为 `removAlarm`）

---

### addRecurrenceRule(rule: RecurrenceRule): void

向提醒添加一条重复规则。

### removeRecurrenceRule(rule: RecurrenceRule): void

移除指定的重复规则。

---

### `save(): Promise<void>`

保存提醒的修改。若为新建提醒，将自动添加到所属日历。

### `remove(): Promise<void>`

从日历中删除该提醒事项。

---

## 三、静态方法

### `Reminder.getAll(calendars?: Calendar[]): Promise<Reminder[]>`

获取所有提醒，可选指定日历列表。

---

### `Reminder.getIncompletes(options?): Promise<Reminder[]>`

获取未完成的提醒事项，可按截止时间与日历过滤。

选项说明：

- `startDate?: Date`
  仅包含截止时间在该日期之后的提醒。

- `endDate?: Date`
  仅包含截止时间在该日期之前的提醒。

- `calendars?: Calendar[]`
  可选指定要查询的日历。

说明：
该方法不会展开重复提醒实例，仅返回基础提醒条目。

---

### `Reminder.getCompleteds(options?): Promise<Reminder[]>`

获取已完成的提醒事项，可按完成日期范围与日历过滤。

选项说明：

- `startDate?: Date`
  仅包含完成时间在该日期之后的提醒。

- `endDate?: Date`
  仅包含完成时间在该日期之前的提醒。

- `calendars?: Calendar[]`
  可选指定要查询的日历。

---

## 四、示例

## 使用 DateComponents 设置提醒

```ts
const reminder = new Reminder();
reminder.title = "准备会议资料";
reminder.notes = "周一会议前完成";

reminder.dueDateComponents = new DateComponents({
  year: 2025,
  month: 10,
  day: 6,
  hour: 9,
  minute: 30,
});

reminder.priority = 2;
await reminder.save();
```

---

## 创建仅包含日期的提醒（无时间）

```ts
reminder.dueDateComponents = new DateComponents({
  year: 2025,
  month: 10,
  day: 6,
});
```

---

## 从 Date 创建 DateComponents

```ts
const now = new Date();
reminder.dueDateComponents = DateComponents.fromDate(now);
```

---

## 获取提醒事项

```ts
const reminders = await Reminder.getAll();
for (const r of reminders) {
  console.log(`提醒：${r.title}`);
}
```

---

## 获取未完成的提醒

```ts
const incompletes = await Reminder.getIncompletes({
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-01-31"),
});
```

---

## 标记提醒完成

```ts
reminder.isCompleted = true;
await reminder.save();
```

---

## 删除提醒

```ts
await reminder.remove();
```

---

## 五、补充说明

### 日期管理

建议使用 `dueDateComponents` 统一处理截止时间相关逻辑。
支持：

- 仅日期
- 完整日期与时间
- 部分字段指定（如只指定小时与分钟）

可使用 `.isValidDate` 判断组件组合是否有效。

---

### 重复提醒

查询方法不展开重复实例，而是返回提醒对象本身。
可通过 `addRecurrenceRule` 与 `removeRecurrenceRule` 管理重复模式。

---

### 闹钟（EventAlarm）

Reminder 与 CalendarEvent 均可使用 `EventAlarm`。
闹钟可基于绝对时间、相对时间或地理位置触发。

---

### 参与者字段

部分提醒来源不一定支持参与者，因此 `attendees` 可能为 `null`。
