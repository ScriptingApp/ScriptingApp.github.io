# Example

```tsx
import { Script } from "scripting"

console.present().then(() => {
  Script.exit()
})

console.log("Requesting Current Weather...")

async function displayCurrentWeather() {
  let location: LocationInfo | null = null
  try {
    console.log("Requesting location... Please move your device to trigger a location update.")
    location = await Location.requestCurrent()

    if (location) {
      const placemarks = await Location.reverseGeocode(location)
      if (placemarks && placemarks.length) {
        console.log(`Your current location: ${JSON.stringify(placemarks[0], null, 2)}`)
      }
    }
  } catch (e) {
    console.log("Failed to request location", e)
  }

  if (!location) {
    console.error("Please approval the location permission request")
    return
  }

  // Use the WeatherKit
  const weather = await Weather.requestCurrent(
    location
  )

  console.log(
    `The temperature is ${weather.temperature.formatted
    } with ${weather.condition}`
  )
}

displayCurrentWeather()
```
