---
title: 天气
description: 该接口提供对实时天气和天气预报数据的访问。

---
        
Scripting 的天气 API 提供对实时天气和天气预报数据的访问，包括当前天气状况、每小时预报和每日预报。用户可以获取指定位置的温度、风速、湿度和降水等天气信息。

## 类型定义

### `UnitType`
表示带有数值、符号和格式化字符串的测量单位。

```ts
type UnitType = {
  value: number
  symbol: string
  formatted: string
}
```

### `UnitTemperature`, `UnitSpeed`, `UnitLength`, `UnitAngle`, `UnitPressure`
这些类型基于 `UnitType`，分别表示温度、速度、长度、角度和气压。


## `WeatherCondition`
字符串枚举，描述各种天气状况，包括：

- `clear`（晴朗）
- `rain`（雨）
- `snow`（雪）
- `thunderstorms`（雷暴）
- `cloudy`（多云）
- `windy`（有风）
- ...


## API 方法

### `Weather.requestCurrent(location: LocationInfo): Promise<CurrentWeather>`
获取指定位置的当前天气状况。

#### 参数
- `location: LocationInfo` – 需要查询天气的位置。

#### 返回值
返回一个 `Promise`，解析为 `CurrentWeather` 对象。

#### 示例
```ts
const location = { latitude: 37.7749, longitude: -122.4194 }
const weather = await Weather.requestCurrent(location)
console.log(`当前温度：${weather.temperature.formatted}`)
```


### `Weather.requestDailyForecast(location: LocationInfo, options?: { startDate: Date, endDate: Date }): Promise<WeatherDailyForecast>`
获取指定位置每日天气预报。你可以选择传入开始日期和结束日期以自定义查询范围。

#### 参数
- `location: LocationInfo` – 查询的位置。
- `options.startDate` – 预报开始日期。
- `options.endDate` – 预报结束日期。

#### 返回值
返回一个 `Promise`，解析为 `WeatherDailyForecast` 对象。

#### 示例
```ts
const forecast = await Weather.requestDailyForecast(location, {
  startDate: new Date(),
  endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
})
console.log(`明天天气：${forecast.forecast[1].condition}`)
```


### `Weather.requestHourlyForecast(location: LocationInfo, options?: { startDate: Date, endDate: Date }): Promise<WeatherHourlyForecast>`
获取指定位置每小时的天气预报。你可以选择传入开始日期和结束日期以自定义查询范围。

#### 参数
- `location: LocationInfo` – 查询的位置。
- `options.startDate` – 预报开始时间。
- `options.endDate` – 预报结束时间。

#### 返回值
返回一个 `Promise`，解析为 `WeatherHourlyForecast` 对象。

#### 示例
```ts
const hourlyForecast = await Weather.requestHourlyForecast(location, {
  startDate: new Date(),
  endDate: new Date(Date.now() + 3 * 60 * 60 * 1000)
})
console.log(`下一小时温度：${hourlyForecast.forecast[0].temperature.formatted}`)
```


## `CurrentWeather`
表示当前天气状况。

```ts
type CurrentWeather = {
  temperature: UnitTemperature
  apparentTemperature: UnitTemperature
  humidity: number
  wind: WeatherWind
  condition: WeatherCondition
  date: number
  symbolName: string
}
```


## `WeatherDailyForecast`
表示每日天气预报。

```ts
type WeatherDailyForecast = {
  metadata: WeatherMetadata
  forecast: DayWeather[]
}
```


## `WeatherHourlyForecast`
表示每小时天气预报。

```ts
type WeatherHourlyForecast = {
  metadata: WeatherMetadata
  forecast: HourWeather[]
}
```


## `DayWeather`
表示每日天气详情。

```ts
type DayWeather = {
  highTemperature: UnitTemperature
  lowTemperature: UnitTemperature
  wind: WeatherWind
  condition: WeatherCondition
  date: number
  symbolName: string
}
```


## `HourWeather`
表示每小时天气详情。

```ts
type HourWeather = {
  temperature: UnitTemperature
  humidity: number
  wind: WeatherWind
  condition: WeatherCondition
  date: number
  symbolName: string
}
```


## 使用示例

### 获取并显示当前天气
```ts
async function displayCurrentWeather() {
  const location = { latitude: 37.7749, longitude: -122.4194 }
  const weather = await Weather.requestCurrent(location)
  console.log(`温度：${weather.temperature.formatted}，天气：${weather.condition}`)
}

displayCurrentWeather()
```

### 获取并显示每日天气预报
```ts
async function displayDailyForecast() {
  const location = { latitude: 37.7749, longitude: -122.4194 }
  const forecast = await Weather.requestDailyForecast(location, {
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })
  forecast.forecast.forEach(day => {
    console.log(`日期：${new Date(day.date).toDateString()}，天气：${day.condition}`)
  })
}

displayDailyForecast()
```

### 获取并显示每小时天气预报
```ts
async function displayHourlyForecast() {
  const location = { latitude: 37.7749, longitude: -122.4194 }
  const hourlyForecast = await Weather.requestHourlyForecast(location, {
    startDate: new Date(),
    endDate: new Date(Date.now() + 5 * 60 * 60 * 1000)
  })
  hourlyForecast.forecast.forEach(hour => {
    console.log(`时间：${new Date(hour.date).toLocaleTimeString()}，温度：${hour.temperature.formatted}`)
  })
}

displayHourlyForecast()
```