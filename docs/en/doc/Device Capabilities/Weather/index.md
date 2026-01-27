---
title: Weather

---
        
The Weather API in Scripting provides access to real-time and forecast weather data, including current conditions, hourly forecasts, and daily forecasts. This API allows users to fetch weather details such as temperature, wind speed, humidity, and precipitation for a specified location.


## Types

### `UnitType`
Represents a unit of measurement with its value, symbol, and formatted string.

```ts
type UnitType = {
  value: number
  symbol: string
  formatted: string
}
```

### `UnitTemperature`, `UnitSpeed`, `UnitLength`, `UnitAngle`, `UnitPressure`
These types extend `UnitType` to represent temperature, speed, length, angle, and pressure.


## `WeatherCondition`
A string enum describing various weather conditions, including:

- `clear`
- `rain`
- `snow`
- `thunderstorms`
- `cloudy`
- `windy`
- ...


## Functions

### `Weather.requestCurrent(location: LocationInfo): Promise<CurrentWeather>`
Retrieves the current weather conditions for a given location.

#### Parameters
- `location: LocationInfo` – The location for which weather data is requested.

#### Returns
A `Promise` resolving to a `CurrentWeather` object.

#### Example
```ts
const location = { latitude: 37.7749, longitude: -122.4194 }
const weather = await Weather.requestCurrent(location)
console.log(`Current temperature: ${weather.temperature.formatted}`)
```



### `Weather.requestDailyForecast(location: LocationInfo, options?: { startDate: Date, endDate: Date }): Promise<WeatherDailyForecast>`
Retrieves the daily weather forecast for the specified location. You can optionally provide a start and end date to specify the forecast range.

#### Parameters
- `location: LocationInfo` – The location to query.
- `options.startDate` – The start date for the forecast.
- `options.endDate` – The end date for the forecast.

#### Returns
A `Promise` resolving to a `WeatherDailyForecast` object.

#### Example
```ts
const forecast = await Weather.requestDailyForecast(location, {
  startDate: new Date(),
  endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
})
console.log(`Tomorrow's weather: ${forecast.forecast[1].condition}`)
```



### `Weather.requestHourlyForecast(location: LocationInfo, options?: { startDate: Date, endDate: Date }): Promise<WeatherHourlyForecast>`
Retrieves the hourly weather forecast for the specified location. You can optionally provide a start and end date to specify the forecast range.

#### Parameters
- `location: LocationInfo` – The location to query.
- `options.startDate` – The start date for the forecast.
- `options.endDate` – The end date for the forecast.

#### Returns
A `Promise` resolving to a `WeatherHourlyForecast` object.

#### Example
```ts
const hourlyForecast = await Weather.requestHourlyForecast(location, {
  startDate: new Date(),
  endDate: new Date(Date.now() + 3 * 60 * 60 * 1000)
})
console.log(`Next hour's temperature: ${hourlyForecast.forecast[0].temperature.formatted}`)
```


## `CurrentWeather`
Represents the current weather conditions.

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
Represents the daily forecast.

```ts
type WeatherDailyForecast = {
  metadata: WeatherMetadata
  forecast: DayWeather[]
}
```


## `WeatherHourlyForecast`
Represents the hourly forecast.

```ts
type WeatherHourlyForecast = {
  metadata: WeatherMetadata
  forecast: HourWeather[]
}
```


## `DayWeather`
Represents daily weather details.

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
Represents hourly weather details.

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



## Example Usage

### Fetch and Display Current Weather
```ts
async function displayCurrentWeather() {
  const location = { latitude: 37.7749, longitude: -122.4194 }
  const weather = await Weather.requestCurrent(location)
  console.log(`The temperature is ${weather.temperature.formatted} with ${weather.condition}`)
}

displayCurrentWeather()
```

### Fetch and Display Daily Forecast
```ts
async function displayDailyForecast() {
  const location = { latitude: 37.7749, longitude: -122.4194 }
  const forecast = await Weather.requestDailyForecast(location, {
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })
  forecast.forecast.forEach(day => {
    console.log(`Date: ${new Date(day.date).toDateString()}, Condition: ${day.condition}`)
  })
}

displayDailyForecast()
```

### Fetch and Display Hourly Forecast
```ts
async function displayHourlyForecast() {
  const location = { latitude: 37.7749, longitude: -122.4194 }
  const hourlyForecast = await Weather.requestHourlyForecast(location, {
    startDate: new Date(),
    endDate: new Date(Date.now() + 5 * 60 * 60 * 1000)
  })
  hourlyForecast.forecast.forEach(hour => {
    console.log(`Time: ${new Date(hour.date).toLocaleTimeString()}, Temp: ${hour.temperature.formatted}`)
  })
}

displayHourlyForecast()
```

