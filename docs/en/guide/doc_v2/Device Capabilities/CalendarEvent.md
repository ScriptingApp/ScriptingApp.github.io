---
title: CalendarEvent
---
The `CalendarEvent` API enables users to create, manage, and interact with events in iOS calendars. This API supports various features such as setting event details, managing recurrence rules, inviting attendees, and handling event actions.

## Types

### `EventParticipant`
Represents an attendee of an event:
- `isCurrentUser: boolean`: Indicates if the attendee is the current user.
- `name?: string`: The attendee's name.
- `role: ParticipantRole`: The attendee's role in the event.
- `type: ParticipantType`: The type of participant.
- `status: ParticipantStatus`: The attendee's attendance status.

#### `ParticipantRole`
Roles for event participants:
- `"chair"`
- `"nonParticipant"`
- `"optional"`
- `"required"`
- `"unknown"`

#### `ParticipantType`
Types of participants:
- `"group"`
- `"person"`
- `"resource"`
- `"room"`
- `"unknown"`

#### `ParticipantStatus`
Attendance statuses:
- `"unknown"`
- `"pending"`
- `"accepted"`
- `"declined"`
- `"tentative"`
- `"delegated"`
- `"completed"`
- `"inProcess"`

### `EventEditViewAction`
Actions taken after editing an event:
- `"deleted"`
- `"saved"`
- `"canceled"`

## Class: `CalendarEvent`

### Properties
- `identifier: string`: Unique identifier for the event.
- `calendar: Calendar`: The calendar associated with the event.
- `title: string`: The event title.
- `notes?: string`: Additional notes for the event.
- `url?: string`: The URL associated with the event.
- `isAllDay: boolean`: Whether the event lasts all day.
- `startDate: Date`: Start date and time of the event.
- `endDate: Date`: End date and time of the event.
- `location?: string`: The event's location.
- `timeZone?: string`: The time zone for the event.
- `attendees?: EventParticipant[]`: List of attendees.
- `recurrenceRules?: RecurrenceRule[]`: Recurrence rules for the event.
- `hasRecurrenceRules: boolean`: Indicates if the event has recurrence rules.

### Methods

#### Instance Methods
- **`addRecurrenceRule(rule: RecurrenceRule): void`**  
  Adds a recurrence rule to the event.
- **`removeRecurrenceRule(rule: RecurrenceRule): void`**  
  Removes a recurrence rule from the event.
- **`remove(): Promise<void>`**  
  Removes the event or recurring events from the calendar.
- **`save(): Promise<void>`**  
  Saves the event or updates to the calendar.
- **`presentEditView(): Promise<EventEditViewAction>`**  
  Presents an edit view for modifying the event.

#### Static Methods
- **`CalendarEvent.getAll(startDate: Date, endDate: Date, calendars?: Calendar[]): Promise<CalendarEvent[]>`**  
  Fetches events within a date range from specified calendars.
- **`CalendarEvent.presentCreateView(): Promise<CalendarEvent | null>`**  
  Presents a view to create a new calendar event.

## Examples

### Create a Recurrence Rule
```ts
const rule = RecurrenceRule.create({
  frequency: "weekly",
  interval: 1,
  daysOfTheWeek: ["monday", "wednesday", "friday"],
  end: RecurrenceEnd.fromDate(new Date("2024-12-31"))
})
```

### Create and Save an Event
```ts
const defaultCalendar = await Calendar.defaultForEvents()
const event = new CalendarEvent()
event.title = "Team Meeting"
event.calendar = defaultCalendar! // You must set a calendar.
event.startDate = new Date("2024-01-15T09:00:00")
event.endDate = new Date("2024-01-15T10:00:00")
event.location = "Conference Room"
event.recurrenceRules = [rule]

await event.save()
console.log(`Event saved: ${event.title}`)
```

### Fetch Events Within a Date Range
```ts
const startDate = new Date("2024-01-01")
const endDate = new Date("2024-01-31")
const events = await CalendarEvent.getAll(startDate, endDate)

for (const event of events) {
  console.log(`Event: ${event.title}, Date: ${event.startDate}`)
}
```

---

### Present the Event Creation View
```ts
const newEvent = await CalendarEvent.presentCreateView()
if (newEvent) {
  console.log(`New event created: ${newEvent.title}`)
} else {
  console.log("Event creation was canceled.")
}
```

---

### Edit an Existing Event
```ts
await event.presentEditView()
console.log("Event has been edited.")
```

---

### Remove an Event
```ts
await event.remove()
console.log("Event removed from the calendar.")
```

---

## Additional Notes

- **Time Zone Support:** Ensure that the `timeZone` property is set when dealing with events across different time zones to prevent scheduling conflicts.
- **Recurrence Rules:** While recurrence rules can be associated with events, detailed usage of recurrence rules has been omitted in this document. Refer to the recurrence-related API documentation for more details.
- **Attendees Management:** The `attendees` property can be used to manage participants. Each attendee is represented by an `EventParticipant` object that includes details such as name, role, and attendance status. 
