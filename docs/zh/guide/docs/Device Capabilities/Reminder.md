---
title: 提醒事项
---
`Reminder` API 允许用户在 iOS 日历中创建、编辑和管理提醒。它支持设置标题、截止日期、优先级和重复规则等功能，从而实现全面的提醒管理。

---

## 类：`Reminder`

`Reminder` 类提供用于在日历中创建和管理提醒的方法和属性。

---

### 属性

- **`identifier: string`**  
  提醒的唯一标识符，由系统在创建提醒时分配。

- **`calendar: Calendar`**  
  与提醒关联的日历。提醒必须与特定日历链接。

- **`title: string`**  
  提醒的标题，通常是任务的简要描述。

- **`notes?: string`**  
  提醒的附加备注或详细信息。

- **`isCompleted: boolean`**  
  指示提醒是否标记为已完成。  
  - 将此属性设置为 `true` 会自动将 `completionDate` 设置为当前日期。  
  - 将此属性设置为 `false` 会将 `completionDate` 设置为 `null`。

  *特别注意：*  
  如果提醒通过其他客户端完成，`isCompleted` 可能为 `true`，但 `completionDate` 仍然可能为 `null`。

- **`priority: number`**  
  提醒的优先级。较高的值表示较高的优先级。

- **`completionDate?: Date`**  
  提醒的完成日期。  
  - 设置此属性会自动将提醒标记为已完成 (`isCompleted = true`)。  
  - 将其设置为 `null` 会将提醒标记为未完成 (`isCompleted = false`)。

- **`dueDate?: Date`**  
  提醒的截止日期。

- **`dueDateIncludesTime: boolean`**  
  指示 `dueDate` 是否包含时间部分，默认值为 `true`。  
  - 如果设置为 `false`，则忽略 `dueDate` 的时间部分。

- **`recurrenceRules?: RecurrenceRule[]`**  
  与提醒关联的重复规则。

- **`hasRecurrenceRules: boolean`**  
  指示提醒是否具有重复规则。

---

### 方法

#### 实例方法

- **`addRecurrenceRule(rule: RecurrenceRule): void`**  
  为提醒添加重复规则。

- **`removeRecurrenceRule(rule: RecurrenceRule): void`**  
  从提醒中移除重复规则。

- **`remove(): Promise<void>`**  
  从日历中删除提醒。

- **`save(): Promise<void>`**  
  保存提醒的更改。如果提醒是新建的，它会被创建到关联的日历中。

---

#### 静态方法

- **`Reminder.getAll(calendars?: Calendar[]): Promise<Reminder[]>`**  
  从指定日历中获取所有提醒。如果未指定日历，则从所有日历中检索提醒。

- **`Reminder.getIncompletes(options?: { startDate?: Date; endDate?: Date; calendars?: Calendar[] }): Promise<Reminder[]>`**  
  在指定日期范围和日历中获取所有未完成的提醒。  
  - **`startDate`**：仅包含此日期之后到期的提醒，默认值为 `null`。  
  - **`endDate`**：仅包含此日期之前到期的提醒，默认值为 `null`。  
  - **`calendars`**：指定要搜索的日历，默认为所有日历。

- **`Reminder.getCompleteds(options?: { startDate?: Date; endDate?: Date; calendars?: Calendar[] }): Promise<Reminder[]>`**  
  在指定日期范围和日历中获取所有已完成的提醒。  
  - **`startDate`**：仅包含此日期之后完成的提醒，默认值为 `null`。  
  - **`endDate`**：仅包含此日期之前完成的提醒，默认值为 `null`。  
  - **`calendars`**：指定要搜索的日历，默认为所有日历。

---

## 示例

### 创建新提醒
```ts
const reminder = new Reminder()
reminder.title = "买杂货"
reminder.notes = "牛奶、鸡蛋和面包"
reminder.dueDate = new Date("2024-01-15T18:00:00")
reminder.dueDateIncludesTime = true
reminder.priority = 1

await reminder.save()
console.log(`已创建提醒：${reminder.title}`)
```

---

### 获取所有提醒
```ts
const reminders = await Reminder.getAll()
for (const reminder of reminders) {
  console.log(`提醒：${reminder.title}, 截止日期：${reminder.dueDate}`)
}
```

---

### 获取未完成的提醒
```ts
const incompleteReminders = await Reminder.getIncompletes({
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
})

for (const reminder of incompleteReminders) {
  console.log(`未完成的提醒：${reminder.title}, 截止日期：${reminder.dueDate}`)
}
```

---

### 获取已完成的提醒
```ts
const completedReminders = await Reminder.getCompleteds({
  startDate: new Date("2023-12-01"),
  endDate: new Date("2023-12-31"),
})

for (const reminder of completedReminders) {
  console.log(`已完成的提醒：${reminder.title}, 完成时间：${reminder.completionDate}`)
}
```

---

### 标记提醒为已完成
```ts
reminder.isCompleted = true
await reminder.save()
console.log(`提醒已标记为完成：${reminder.title}`)
```

---

### 删除提醒
```ts
await reminder.remove()
console.log(`提醒已删除：${reminder.title}`)
```

---

## 附加说明

- **时间管理：** 使用 `dueDateIncludesTime` 属性指定提醒是否需要包含时间部分。  
- **重复规则：** 重复规则是可选的，可以通过提供的方法添加或移除。  
- **优先级：** 通过优先级自定义提醒的组织方式。  
- **日期范围查询：** 使用 `getIncompletes` 和 `getCompleteds` 根据状态和日期范围筛选提醒。  