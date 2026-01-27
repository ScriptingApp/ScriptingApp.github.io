# Reminder

The `Reminder` API provides the ability to create, edit, and manage reminders in the iOS calendar system.
It supports configuring due dates through `DateComponents`, assigning priorities, adding notes, managing recurrence rules, working with alarms, and tracking completion state.
This API is suitable for a wide range of task and schedule reminder scenarios.

***

## 1. Class: `Reminder`

The `Reminder` class represents an individual reminder item and provides properties and methods to read and modify its data.

***

## 2. Properties

### identifier: string

A unique identifier assigned by the system (read-only).

### calendar: Calendar

The calendar to which the reminder belongs.
Each reminder must be associated with a calendar.

### title: string

The title or summary of the reminder.

### notes: string | null

Optional notes providing additional context.

***

## Completion State

### isCompleted: boolean

Indicates whether the reminder is marked as completed.

- Setting this property to `true` automatically sets `completionDate` to the current date.
- Setting it to `false` sets `completionDate` to `null`.

Special consideration:
If a reminder is completed on another device or client, `isCompleted` may be `true` while `completionDate` remains `null`.

### completionDate: Date | null

The date on which the reminder was completed.

- Assigning a date sets `isCompleted = true`.
- Assigning `null` clears the completed state.

***

## Due Date

### dueDateComponents: DateComponents | null

Represents the reminder’s due date using date components.
Supports partially specified date or time fields.
Useful for date-based or recurring reminders.

You may use `DateComponents.isValidDate` to check whether the components form a valid date.

### dueDate: Date | null

Deprecated.
Use `dueDateComponents` instead.
You can read the equivalent date using `dueDateComponents?.date`.

### dueDateIncludesTime: boolean

Deprecated.
Use `dueDateComponents?.hour != null && dueDateComponents?.minute != null` to determine whether the due date includes a time component.

***

## Priority

### priority: number

An integer representing the reminder’s priority.
Higher values typically indicate greater importance or urgency.

***

## Recurrence

### recurrenceRules: RecurrenceRule\[] | null

An array of recurrence rules associated with the reminder.

### hasRecurrenceRules: boolean

Indicates whether the reminder contains recurrence rules (read-only).

***

## Alarms

### alarms: EventAlarm\[] | null

A collection of alarms associated with the reminder.
Alarms may be based on:

- absolute dates
- relative offsets
- structured locations (geofence triggers)

### hasAlarm: boolean

Indicates whether the reminder contains any alarms.

***

## Attendees

### attendees: EventParticipant\[] | null

An array of attendee objects (read-only).
Not all reminder sources support attendee data.

### hasAttendees: boolean

Indicates whether the reminder has attendees.

***

## State Indicators

### hasNotes: boolean

Indicates whether the reminder contains notes.

### hasChanges: boolean

Indicates whether the reminder or any of its nested objects contains unsaved changes.

***

## 3. Instance Methods

### addAlarm(alarm: EventAlarm): void

Adds an alarm to the reminder.

### removAlarm(alarm: EventAlarm): void

Removes the specified alarm.
(Method name is `removAlarm`.)

***

### addRecurrenceRule(rule: RecurrenceRule): void

Adds a recurrence rule.

### removeRecurrenceRule(rule: RecurrenceRule): void

Removes a recurrence rule.

***

### `save(): Promise<void>`

Saves changes to the reminder.
If the reminder has not been saved before, it is added to its associated calendar.

### `remove(): Promise<void>`

Deletes the reminder from the calendar.

***

## 4. Static Methods

### `Reminder.getAll(calendars?: Calendar[]): Promise<Reminder[]>`

Returns all reminders, optionally filtered by the specified calendars.

***

### `Reminder.getIncompletes(options?): Promise<Reminder[]>`

Returns incomplete reminders filtered by due date range and/or calendar set.

Options:

- `startDate?: Date`
  Includes reminders whose due date is after this date.

- `endDate?: Date`
  Includes reminders whose due date is before this date.

- `calendars?: Calendar[]`
  Specifies which calendars to search.

This method does not expand recurrence rules; it only returns reminders with concrete due dates.

***

### `Reminder.getCompleteds(options?): Promise<Reminder[]>`

Returns completed reminders filtered by completion date range and/or calendar set.

Options:

- `startDate?: Date`
  Includes reminders completed after this date.

- `endDate?: Date`
  Includes reminders completed before this date.

- `calendars?: Calendar[]`
  Specifies which calendars to search.

***

## 5. Usage Examples

## Creating a Reminder with DateComponents

```ts
const reminder = new Reminder();
reminder.title = "Prepare meeting materials";
reminder.notes = "Finish before Monday’s team meeting";

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

***

## Creating a Date-Only Reminder

```ts
reminder.dueDateComponents = new DateComponents({
  year: 2025,
  month: 10,
  day: 6,
});
```

***

## Creating DateComponents from a Date

```ts
const now = new Date();
reminder.dueDateComponents = DateComponents.fromDate(now);
```

***

## Fetching All Reminders

```ts
const reminders = await Reminder.getAll();
for (const r of reminders) {
  console.log(`Reminder: ${r.title}`);
}
```

***

## Fetching Incomplete Reminders

```ts
const incompletes = await Reminder.getIncompletes({
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-01-31"),
});
```

***

## Marking a Reminder as Completed

```ts
reminder.isCompleted = true;
await reminder.save();
```

***

## Deleting a Reminder

```ts
await reminder.remove();
```

***

## 6. Additional Notes

### Date Management

Using `dueDateComponents` is recommended for all due-date handling.
It supports:

- date-only values
- date with time
- partial components
- validity checks through `isValidDate`

### Recurrence

Reminder queries do not expand recurrence rules.
They operate only on the reminder objects that have concrete due dates.
Recurrence rules can be added or removed through the API.

### Alarms

Alarms may be absolute, relative, or location-based, and are shared with the `CalendarEvent` API.

### Attendees

Some reminder sources do not support attendee data; in such cases, the attendees array may be `null`.
