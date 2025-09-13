The `Reminder` API provides tools for creating, editing, and managing task reminders in iOS calendars. It supports flexible due dates via `DateComponents`, priorities, notes, recurrence rules, and completion tracking.

---

## Class: `Reminder`

The `Reminder` class provides properties and methods to represent and control a single reminder item.

---

### Properties

* **`identifier: string`**
  A read-only unique identifier for the reminder, assigned by the system.

* **`calendar: Calendar`**
  The calendar to which the reminder belongs.

* **`title: string`**
  The title or summary of the reminder task.

* **`notes?: string`**
  Optional additional details for the reminder.

* **`isCompleted: boolean`**
  Indicates whether the reminder is marked as completed.

  * Setting this to `true` assigns the current date to `completionDate`.
  * Setting it to `false` clears `completionDate`.

  **Note:** If the reminder was completed from another device or app, `isCompleted` may be `true` even when `completionDate` is `null`.

* **`priority: number`**
  A numeric value indicating the urgency or importance of the task. Higher values denote higher priority.

* **`completionDate?: Date`**
  The date and time the reminder was marked completed.

  * Setting this field will automatically set `isCompleted = true`.
  * Setting it to `null` clears the completion status.

* **`dueDateComponents?: DateComponents`**
  The due date expressed as individual date and time components.

  * Offers precise control over the structure of the due date (e.g., only a day, or day and time).
  * Supports complex scheduling and recurrence scenarios.

  **Note:** `DateComponents` allows partial specification (e.g., just a date without time), and validity should be checked using its `isValidDate` property.

* **`dueDate?: Date`**
  *(Deprecated)* Previously used for specifying the due date. Use `dueDateComponents` instead.

* **`dueDateIncludesTime: boolean`**
  *(Deprecated)* Used with `dueDate` to indicate whether the time portion is relevant. No longer necessary when using `dueDateComponents`.

* **`recurrenceRules?: RecurrenceRule[]`**
  Optional array of recurrence rules that define repetition patterns.

* **`hasRecurrenceRules: boolean`**
  Read-only flag indicating whether the reminder has associated recurrence rules.

---

### Instance Methods

* **`addRecurrenceRule(rule: RecurrenceRule): void`**
  Adds a recurrence rule to the reminder.

* **`removeRecurrenceRule(rule: RecurrenceRule): void`**
  Removes a specified recurrence rule.

* **`remove(): Promise<void>`**
  Deletes the reminder from its calendar.

* **`save(): Promise<void>`**
  Persists changes to the reminder. If the reminder is new, it is created in the specified calendar.

---

### Static Methods

* **`Reminder.getAll(calendars?: Calendar[]): Promise<Reminder[]>`**
  Retrieves all reminders from the specified calendars.
  If no calendars are passed, all calendars are searched.

* **`Reminder.getIncompletes(options?: { startDate?: Date; endDate?: Date; calendars?: Calendar[] }): Promise<Reminder[]>`**
  Retrieves all incomplete reminders matching the criteria.

  * **`startDate`**: Filter reminders due after this date.

  * **`endDate`**: Filter reminders due before this date.

  * **`calendars`**: Optionally specify which calendars to query.

  > Note: This method does not expand recurrence rules. Only the base instances of reminders with due dates in the given range are returned.

* **`Reminder.getCompleteds(options?: { startDate?: Date; endDate?: Date; calendars?: Calendar[] }): Promise<Reminder[]>`**
  Retrieves completed reminders within a given date range.

  * **`startDate`**: Filter reminders completed after this date.
  * **`endDate`**: Filter reminders completed before this date.
  * **`calendars`**: Optionally specify which calendars to query.

---

## Examples

### Create a Reminder Using Date Components

```ts
const reminder = new Reminder()
reminder.title = "Prepare meeting notes"
reminder.notes = "For Monday team sync"

reminder.dueDateComponents = new DateComponents({
  year: 2025,
  month: 10,
  day: 6,
  hour: 9,
  minute: 30
})

reminder.priority = 2
await reminder.save()
console.log(`Reminder created: ${reminder.title}`)
```

---

### Create a Reminder Without Time

```ts
reminder.dueDateComponents = new DateComponents({
  year: 2025,
  month: 10,
  day: 6
})
```

---

### Create from Date

```ts
const now = new Date()
reminder.dueDateComponents = DateComponents.fromDate(now)
```

---

### Fetch All Reminders

```ts
const reminders = await Reminder.getAll()
for (const reminder of reminders) {
  console.log(`Reminder: ${reminder.title}`)
}
```

---

### Fetch Incomplete Reminders in Date Range

```ts
const incompletes = await Reminder.getIncompletes({
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-01-31")
})
```

---

### Mark a Reminder as Completed

```ts
reminder.isCompleted = true
await reminder.save()
```

---

### Remove a Reminder

```ts
await reminder.remove()
```

---

## Notes

* **Date Management**
  `dueDateComponents` replaces the deprecated `dueDate` and `dueDateIncludesTime`. Use it to represent both full and partial date-time configurations. Always check `isValidDate` before converting to a `Date`.

* **Recurring Tasks**
  Use `recurrenceRules` to define repeated behavior. These rules are not automatically expanded in static query methods.

* **Reminder Filtering**
  When using `getIncompletes` and `getCompleteds`, only top-level reminders are returned; recurring instances are not automatically expanded.

* **Deprecated Fields**

  * `dueDate` and `dueDateIncludesTime` should no longer be used in new code.
  * They are preserved only for backward compatibility.
