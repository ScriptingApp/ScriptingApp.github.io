`DateFormatter` 类用于将 `Date` 类型格式化为字符串，或将字符串解析为 `Date`。
该类封装了 iOS 的 `DateFormatter` 能力，适用于格式化日期、时间、本地化展示、农历日期展示（通过切换日历）、相对日期显示等场景。

***

# 枚举与类型定义

## DateFormatterStyle

用于指定日期或时间的格式化级别。

| 枚举值      | 含义                                |
| -------- | --------------------------------- |
| `none`   | 不显示日期或时间                          |
| `short`  | 短格式，例如 `12/1/25`、`3:20 PM`        |
| `medium` | 中等格式，例如 `Dec 1, 2025`             |
| `long`   | 长格式，例如 `December 1, 2025`         |
| `full`   | 全格式，例如 `Monday, December 1, 2025` |

***

## DateFormatterBehavior

指定格式化器的行为模式。

| 枚举值            | 含义                 |
| -------------- | ------------------ |
| `default`      | 系统默认行为             |
| `behavior10_4` | 兼容旧系统格式化行为（通常无需使用） |

***

## CalendarIdentifier

指定 `DateFormatter` 使用的历法类型。可用于格式化如：

- 公历（gregorian）
- 农历（chinese）
- 佛历（buddhist）
- 日本历（japanese）
- 伊斯兰历（islamic）
  等。

可选值示例：

```
"current" | "gregorian" | "chinese" | "japanese" | "islamic" | "iso8601" | ...
```

其中：

- `"current"` 代表当前系统日历
- `"autoupdatingCurrent"` 表示系统日历变更后自动更新

***

## TimeZoneIdentifier

指定时区。

可选值：

```
"current" | "autoupdatingCurrent" | "gmt" | string
```

当传入普通字符串时，可以使用任意合法时区 ID，例如：

- `"Asia/Shanghai"`
- `"America/Los_Angeles"`
- `"UTC"`

***

# 类：DateFormatter

## 初始化

### `new(): DateFormatter`

创建一个新的日期格式器实例。

***

# 静态方法

## `DateFormatter.localizedString(date, options)`

根据指定的日期格式与时间格式返回本地化后的字符串。

```ts
DateFormatter.localizedString(date: Date, options: {
  dateStyle: DateFormatterStyle
  timeStyle: DateFormatterStyle
}): string
```

适用于快速格式化，无需手动设置 formatter 属性。

***

## `DateFormatter.dateFormat(template, locale?)`

根据日期模板生成本地化后的格式化字符串。

```
static dateFormat(template: string, locale?: string): string | null
```

示例模板：`"yyyyMMdd"`, `"MMM d"`, `"HH:mm"`

如果传入 locale，则按指定语言区域生成；否则使用系统 locale。

***

# 实例方法

## `string(date: Date): string`

将 Date 转换为格式化字符串。

注意：如果设置了 `dateFormat`，则优先使用自定义格式；
否则根据 `dateStyle` 和 `timeStyle` 自动格式化。

***

## `date(string: string): Date | null`

将字符串解析为 Date。
解析能力依赖于当前 dateFormat、locale、calendar 等属性。

***

## `setLocalizedDateFormatFromTemplate(template: string): void`

根据模板生成本地化格式，并自动设置到 `dateFormat` 属性中。

***

# 属性说明

以下为所有可配置属性的功能说明。

## 日期与时间格式属性

### `calendar: CalendarIdentifier`

选择日期格式化使用的历法，如公历、农历、佛历等。

***

### `timeZone: TimeZoneIdentifier`

设置时区，例如 `"Asia/Shanghai"`。

***

### `locale: string`

指定区域语言，例如：

- `"zh_CN"`
- `"en_US"`
- `"ja_JP"`

***

### `dateFormat: string`

手动指定格式化模板。例如：

```
"yyyy-MM-dd HH:mm"
"MMM d, yyyy"
"EEEE"
```

如果设置该属性，则忽略 `dateStyle` 和 `timeStyle`。

***

### `dateStyle/timeStyle: DateFormatterStyle`

分别控制日期和时间格式级别。

***

## 行为属性

### `generatesCalendarDates: boolean`

是否生成历法日期，一般保持默认即可。

***

### `formatterBehavior: DateFormatterBehavior`

控制格式器行为，通常使用默认值。

***

### `isLenient: boolean`

是否宽松解析输入，例如解析模糊格式字符串。
一般保持 `false`，避免误解析。

***

### `twoDigitStartDate: Date | null`

设置双位数年份的起始范围。用于解析如 `"20"` 这样的年份值。

***

### `defaultDate: Date | null`

解析字符串无法获得时间时，使用的默认日期。

***

## 本地化符号与文案属性

以下属性用于自定义本地化符号，如月份名称、星期名称等。
这些属性通常无需手动设置，除非需要覆盖本地化字符串。

举例属性：

- `eraSymbols`
- `monthSymbols`
- `shortMonthSymbols`
- `weekdaySymbols`
- `shortWeekdaySymbols`
- `standaloneMonthSymbols`
- `amSymbol`
- `pmSymbol`
- `quarterSymbols`
- `standaloneQuarterSymbols`
- `veryShortWeekdaySymbols`
- `gregorianStartDate`

这些属性主要作用于需要深度定制本地化展示的场景。

***

## `doesRelativeDateFormatting: boolean`

启用相对日期格式化，例如：

- Today
- Yesterday
- Tomorrow

在中文环境中可显示为：

- 今天
- 昨天
- 明天

通常与 `dateStyle = .medium` 等组合使用。

***

# 示例代码

以下示例展示如何使用 `DateFormatter` 进行多种日期格式化场景。

***

## 示例一：使用 dateStyle 和 timeStyle 进行本地化格式化

```tsx
const df = new DateFormatter()
df.locale = "zh_CN"
df.dateStyle = DateFormatterStyle.full
df.timeStyle = DateFormatterStyle.short

const result = df.string(new Date())
// 输出示例： "2025年12月12日 星期五 下午3:20"
```

***

## 示例二：自定义日期格式模板

```tsx
const df = new DateFormatter()
df.locale = "en_US"
df.dateFormat = "yyyy-MM-dd HH:mm"

df.timeZone = "Asia/Shanghai"

const str = df.string(new Date())
// 输出示例： "2025-12-12 15:20"
```

***

## 示例三：使用农历格式化（chinese calendar）

```tsx
const df = new DateFormatter()

df.calendar = "chinese"
df.locale = "zh_CN"
df.dateFormat = "yyyy年MM月dd日 EEEE"

const lunar = df.string(new Date())
// 输出示例： "四十三年十月廿二日 星期五"
```

***

## 示例四：解析字符串为日期

```tsx
const df = new DateFormatter()
df.dateFormat = "yyyy/MM/dd HH:mm"

const date = df.date("2025/12/12 08:00")
```

***

## 示例五：使用模板生成本地化格式

```tsx
const df = new DateFormatter()
df.locale = "zh_CN"

// 自动设置为符合中文习惯的格式，例如 "12月12日"
df.setLocalizedDateFormatFromTemplate("MMdd")

const str = df.string(new Date())
```

***

## 示例六：使用静态快速格式化

```tsx
const str = DateFormatter.localizedString(new Date(), {
  dateStyle: DateFormatterStyle.medium,
  timeStyle: DateFormatterStyle.short
})
```
