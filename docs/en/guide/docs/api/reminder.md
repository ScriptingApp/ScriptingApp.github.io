The `Reminder` API allows users to create, edit, and manage reminders in iOS calendars. It supports features such as setting titles, due dates, priorities, and recurrence rules, enabling comprehensive reminder management.

---

## Class: `Reminder`

The `Reminder` class provides methods and properties for creating and managing reminders within a calendar.

---

### Properties

- **`identifier: string`**  
  A unique identifier for the reminder, assigned by the system when the reminder is created.

- **`calendar: Calendar`**  
  The calendar associated with the reminder. Reminders must be linked to a specific calendar.

- **`title: string`**  
  The title of the reminder, typically a brief description of the task.

- **`notes?: string`**  
  Additional notes or details about the reminder.

- **`isCompleted: boolean`**  
  Indicates whether the reminder is marked as completed.  
  - Setting this property to `true` automatically sets `completionDate` to the current date.
  - Setting this property to `false` sets `completionDate` to `null`.

  *Special Considerations:*  
  If the reminder was completed using another client, `isCompleted` may be `true`, but `completionDate` could still be `null`.

- **`priority: number`**  
  The priority level of the reminder. Higher values indicate higher priority.

- **`completionDate?: Date`**  
  The date the reminder was completed.  
  - Setting a value automatically marks the reminder as completed (`isCompleted = true`).
  - Setting it to `null` unmarks the reminder as completed (`isCompleted = false`).

- **`dueDate?: Date`**  
  The date by which the reminder should be completed.

- **`dueDateIncludesTime: boolean`**  
  Indicates whether the `dueDate` includes a time component. Defaults to `true`.  
  - If `false`, the time component of `dueDate` is ignored.

- **`recurrenceRules?: RecurrenceRule[]`**  
  The recurrence rules associated with the reminder.

- **`hasRecurrenceRules: boolean`**  
  Indicates whether the reminder has recurrence rules.

---

### Methods

#### Instance Methods

- **`addRecurrenceRule(rule: RecurrenceRule): void`**  
  Adds a recurrence rule to the reminder.

- **`removeRecurrenceRule(rule: RecurrenceRule): void`**  
  Removes a recurrence rule from the reminder.

- **`remove(): Promise<void>`**  
  Deletes the reminder from the calendar.

- **`save(): Promise<void>`**  
  Saves changes to the reminder. If the reminder is new, it is created in the associated calendar.

---

#### Static Methods

- **`Reminder.getAll(calendars?: Calendar[]): Promise<Reminder[]>`**  
  Fetches all reminders from the specified calendars. If no calendars are specified, retrieves reminders from all calendars.

- **`Reminder.getIncompletes(options?: { startDate?: Date; endDate?: Date; calendars?: Calendar[] }): Promise<Reminder[]>`**  
  Fetches all incomplete reminders within the specified date range and calendars.  
  - **`startDate`**: Only include reminders due after this date. Defaults to `null`.  
  - **`endDate`**: Only include reminders due before this date. Defaults to `null`.  
  - **`calendars`**: Specifies which calendars to search. Defaults to all calendars.

- **`Reminder.getCompleteds(options?: { startDate?: Date; endDate?: Date; calendars?: Calendar[] }): Promise<Reminder[]>`**  
  Fetches all completed reminders within the specified date range and calendars.  
  - **`startDate`**: Only include reminders completed after this date. Defaults to `null`.  
  - **`endDate`**: Only include reminders completed before this date. Defaults to `null`.  
  - **`calendars`**: Specifies which calendars to search. Defaults to all calendars.

---

## Examples

### Create a New Reminder
```ts
const reminder = new Reminder()
reminder.title = "Buy groceries"
reminder.notes = "Milk, eggs, and bread"
reminder.dueDate = new Date("2024-01-15T18:00:00")
reminder.dueDateIncludesTime = true
reminder.priority = 1

await reminder.save()
console.log(`Reminder created: ${reminder.title}`)
```

---

### Fetch All Reminders
```ts
const reminders = await Reminder.getAll()
for (const reminder of reminders) {
  console.log(`Reminder: ${reminder.title}, Due: ${reminder.dueDate}`)
}
```

---

### Fetch Incomplete Reminders
```ts
const incompleteReminders = await Reminder.getIncompletes({
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
})

for (const reminder of incompleteReminders) {
  console.log(`Incomplete Reminder: ${reminder.title}, Due: ${reminder.dueDate}`)
}
```

---

### Fetch Completed Reminders
```ts
const completedReminders = await Reminder.getCompleteds({
  startDate: new Date("2023-12-01"),
  endDate: new Date("2023-12-31"),
})

for (const reminder of completedReminders) {
  console.log(`Completed Reminder: ${reminder.title}, Completed On: ${reminder.completionDate}`)
}
```

---

### Mark a Reminder as Completed
```ts
reminder.isCompleted = true
await reminder.save()
console.log(`Reminder marked as completed: ${reminder.title}`)
```

---

### Remove a Reminder
```ts
await reminder.remove()
console.log(`Reminder removed: ${reminder.title}`)
```

---

## Additional Notes

- **Time Management:** Use the `dueDateIncludesTime` property to specify whether the time component is relevant for the reminder.  
- **Recurrence Rules:** Recurrence rules are optional and can be added or removed using the provided methods.  
- **Priority Levels:** Customize priorities to organize reminders effectively.  
- **Date Range Queries:** Use `getIncompletes` and `getCompleteds` to filter reminders by their status and a specified date range.  
