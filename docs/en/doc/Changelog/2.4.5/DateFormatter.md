---
title: DateFormatter
---

The `DateFormatter` class provides comprehensive date and time formatting capabilities. It allows converting `Date` objects into localized strings and parsing strings back into `Date` values.
This API wraps iOS-native date formatting behavior and supports multiple calendars, time zones, localized formats, and custom formatting templates.

---

## Enums and Type Definitions

## DateFormatterStyle

Defines the level of detail used for date or time formatting.

| Value    | Description                                   |
| -------- | --------------------------------------------- |
| `none`   | No date or time displayed                     |
| `short`  | Short format, e.g., `12/1/25`, `3:20 PM`      |
| `medium` | Medium format, e.g., `Dec 1, 2025`            |
| `long`   | Long format, e.g., `December 1, 2025`         |
| `full`   | Full format, e.g., `Monday, December 1, 2025` |

---

## DateFormatterBehavior

Controls the formatter behavior mode.

| Value          | Description                                  |
| -------------- | -------------------------------------------- |
| `default`      | System default behavior                      |
| `behavior10_4` | Compatibility mode for older system behavior |

---

## CalendarIdentifier

Specifies the calendar used for formatting. This enables formatting using:

- Gregorian calendar
- Chinese lunar calendar
- Japanese calendar
- Islamic calendars
- Buddhist calendar
- ISO 8601 calendar
  and more.

Example values:

```
"current" | "gregorian" | "chinese" | "japanese" | "islamic" | "iso8601" | ...
```

Notes:

- `"current"` uses the system’s current calendar
- `"autoupdatingCurrent"` automatically updates when system settings change

---

## TimeZoneIdentifier

Specifies the time zone.

Available values:

```
"current" | "autoupdatingCurrent" | "gmt" | string
```

If a string is used, it must be a valid time-zone identifier such as:

- `"Asia/Shanghai"`
- `"America/Los_Angeles"`
- `"UTC"`

---

## Class: DateFormatter

## Initialization

### `new(): DateFormatter`

Creates a new date formatter instance.

---

## Static Methods

## `DateFormatter.localizedString(date, options)`

Returns a localized date string based on the specified date and time styles.

```ts
DateFormatter.localizedString(date: Date, options: {
  dateStyle: DateFormatterStyle
  timeStyle: DateFormatterStyle
}): string
```

Useful for quick formatting without manually configuring a formatter instance.

---

## `DateFormatter.dateFormat(template, locale?)`

Generates a localized date format string based on a template.

```
static dateFormat(template: string, locale?: string): string | null
```

Examples of templates:

- `"yyyyMMdd"`
- `"MMM d"`
- `"HH:mm"`

If `locale` is omitted, the system locale is used.

---

## Instance Methods

## `string(date: Date): string`

Formats a `Date` into a string.

Behavior:

- If `dateFormat` is set, it takes priority.
- Otherwise, formatting is based on `dateStyle` and `timeStyle`.

---

## `date(string: string): Date | null`

Parses a string into a `Date` object.
Parsing behavior depends on properties such as `dateFormat`, `locale`, and `calendar`.

---

## `setLocalizedDateFormatFromTemplate(template: string): void`

Generates a localized format string from the template and assigns it to `dateFormat`.

---

## Properties

## Core Formatting Properties

### `calendar: CalendarIdentifier`

Determines the calendar system used for formatting.
Examples: `"gregorian"`, `"chinese"`, `"buddhist"`.

---

### `timeZone: TimeZoneIdentifier`

Defines the time zone, such as `"Asia/Shanghai"`.

---

### `locale: string`

Specifies the formatting locale, such as:

- `"zh_CN"`
- `"en_US"`
- `"ja_JP"`

---

### `dateFormat: string`

Manually sets a custom date format template. Examples:

```
"yyyy-MM-dd HH:mm"
"MMM d, yyyy"
"EEEE"
```

When set, it overrides `dateStyle` and `timeStyle`.

---

### `dateStyle: DateFormatterStyle`

### `timeStyle: DateFormatterStyle`

Control the granularity of date and time output.

---

## Behavior Control

### `generatesCalendarDates: boolean`

Controls whether the formatter generates calendar-based dates. Typically left as default.

---

### `formatterBehavior: DateFormatterBehavior`

Controls the formatter behavior mode.

---

### `isLenient: boolean`

Enables lenient parsing of input strings, allowing more flexible interpretation.
Defaults to `false` to avoid accidental incorrect parsing.

---

### `twoDigitStartDate: Date | null`

Determines the interpretation range for two-digit years.

---

### `defaultDate: Date | null`

Used when parsing strings that do not specify a full date.

---

## Localization Symbol Properties

These properties customize how months, weekdays, quarters, and eras are displayed:

- `eraSymbols`
- `monthSymbols`
- `shortMonthSymbols`
- `weekdaySymbols`
- `shortWeekdaySymbols`
- `standaloneMonthSymbols`
- `quarterSymbols`
- `veryShortWeekdaySymbols`
- `amSymbol`
- `pmSymbol`
- `gregorianStartDate`

These are typically used only when overriding the system-provided localized symbols.

---

## Relative Date Formatting

### `doesRelativeDateFormatting: boolean`

Enables output like:

- Today
- Yesterday
- Tomorrow

in the corresponding locale.

Example in Chinese:

- 今天
- 昨天

Only works with certain date styles (e.g., medium and long).

---

## Code Examples

---

## Example 1: Localized formatting using dateStyle and timeStyle

```tsx
import { DateFormatter, DateFormatterStyle } from "scripting";

const df = new DateFormatter();
df.locale = "zh_CN";
df.dateStyle = DateFormatterStyle.full;
df.timeStyle = DateFormatterStyle.short;

const result = df.string(new Date());
// Example output: "Friday, December 12, 2025 at 3:20 PM"
```

---

## Example 2: Custom date format

```tsx
const df = new DateFormatter();
df.locale = "en_US";
df.dateFormat = "yyyy-MM-dd HH:mm";
df.timeZone = "Asia/Shanghai";

const str = df.string(new Date());
// Example output: "2025-12-12 15:20"
```

---

## Example 3: Formatting using the Chinese lunar calendar

```tsx
const df = new DateFormatter();
df.calendar = "chinese";
df.locale = "zh_CN";
df.dateFormat = "yyyy年MM月dd日 EEEE";

const lunar = df.string(new Date());
// Example output: "四十三年十月二十二日 星期五"
```

---

## Example 4: Parsing a date string

```tsx
const df = new DateFormatter();
df.dateFormat = "yyyy/MM/dd HH:mm";

const date = df.date("2025/12/12 08:00");
```

---

## Example 5: Using a localized template

```tsx
const df = new DateFormatter();
df.locale = "zh_CN";

// Automatically becomes a localized format, e.g., "12月12日"
df.setLocalizedDateFormatFromTemplate("MMdd");

const result = df.string(new Date());
```

---

## Example 6: Quick formatting using localizedString

```tsx
const str = DateFormatter.localizedString(new Date(), {
  dateStyle: DateFormatterStyle.medium,
  timeStyle: DateFormatterStyle.short,
});
```
