---
title: 定位

---

全局 `Location` API 提供对设备地理位置信息的访问能力，包括一次性定位、逆地理编码、用户手动选点、定位精度控制、以及用于小组件的权限检测等功能。

---

## 功能概览

你可以通过该 API 实现以下功能：

* 获取设备当前位置（支持缓存）
* 用户通过地图界面手动选择位置
* 将经纬度转换为可读的地址（逆地理编码）
* 设置定位精度（耗电量和等待时间可控）
* 检查小组件是否获得定位权限

> **注意：** 该 API 为全局 API，无需额外导入。

---

## 接口文档

### `Location.isAuthorizedForWidgetUpdates(): Promise<boolean>`

检查小组件是否拥有获取定位更新的权限。

```ts
const isAuthorized = await Location.isAuthorizedForWidgetUpdates()
if (!isAuthorized) {
  console.log("小组件没有获取定位的权限")
}
```

---

### `Location.setAccuracy(accuracy: LocationAccuracy): Promise<void>`

设置期望的定位精度。精度越高，耗电和等待时间也可能增加。

#### 可选值

| 精度值                 | 描述      |
| ------------------- | ------- |
| `"best"`            | 最高可用精度  |
| `"tenMeters"`       | 10 米以内  |
| `"hundredMeters"`   | 100 米以内 |
| `"kilometer"`       | 1 公里以内  |
| `"threeKilometers"` | 3 公里以内  |

```ts
await Location.setAccuracy("hundredMeters")
```

---

### `Location.requestCurrent(options?: { forceRequest?: boolean }): Promise<LocationInfo | null>`

请求一次设备当前的位置信息。

默认情况下，如果存在缓存位置（例如启动时从系统获取到的位置），将立即返回该缓存值。如果未缓存，则会触发新的定位请求。

你可以通过传入 `{ forceRequest: true }` 强制跳过缓存，始终发起新请求。

#### 参数

| 参数名            | 类型        | 是否必填 | 描述                          |
| -------------- | --------- | ---- | --------------------------- |
| `forceRequest` | `boolean` | 否    | 若为 `true`，将忽略缓存，始终发起新的定位请求。 |

```ts
const location = await Location.requestCurrent({ forceRequest: true })
if (location) {
  console.log("纬度:", location.latitude)
  console.log("经度:", location.longitude)
  console.log("时间戳:", location.timestamp)
}
```

---

### `Location.pickFromMap(): Promise<LocationInfo | null>`

打开内置地图界面，允许用户手动选择一个位置。

```ts
const selected = await Location.pickFromMap()
if (selected) {
  console.log("用户选择的位置:", selected.latitude, selected.longitude)
}
```

---

### `Location.reverseGeocode(options): Promise<LocationPlacemark[] | null>`

将经纬度转换为人类可读的地理信息（如街道、城市、国家等）。

#### 参数

| 字段          | 类型       | 是否必填 | 描述                             |
| ----------- | -------- | ---- | ------------------------------ |
| `latitude`  | `number` | 是    | 纬度（单位：度）                       |
| `longitude` | `number` | 是    | 经度（单位：度）                       |
| `locale`    | `string` | 否    | 可选语言区域（如 `"zh-CN"`），默认使用设备语言设置 |

```ts
const placemarks = await Location.reverseGeocode({
  latitude: 31.2304,
  longitude: 121.4737,
  locale: "zh-CN"
})

if (placemarks?.length) {
  const place = placemarks[0]
  console.log("城市:", place.locality)
  console.log("国家:", place.country)
}
```

---

## 类型定义

### `LocationAccuracy`

表示定位精度选项：

```ts
type LocationAccuracy =
  | "best"
  | "tenMeters"
  | "hundredMeters"
  | "kilometer"
  | "threeKilometers"
```

---

### `LocationInfo`

表示一个带有时间戳的地理坐标点：

```ts
type LocationInfo = {
  /**
   * 纬度，单位：度
   */
  latitude: number
  /**
   * 经度，单位：度
   */
  longitude: number
  /**
   * 获取该位置的时间戳（单位：毫秒）
   */
  timestamp: number
}
```

---

### `LocationPlacemark`

表示一个可读的地理位置，通常由逆地理编码返回，包含详细的地址结构信息：

```ts
type LocationPlacemark = {
  location?: LocationInfo
  region?: string
  timeZone?: string
  name?: string
  thoroughfare?: string
  subThoroughfare?: string
  locality?: string
  subLocality?: string
  administrativeArea?: string
  subAdministrativeArea?: string
  postalCode?: string
  isoCountryCode?: string
  country?: string
  inlandWater?: string
  ocean?: string
  areasOfInterest?: string[]
}
```

#### 字段说明

| 字段                      | 类型             | 描述                                |
| ----------------------- | -------------- | --------------------------------- |
| `location`              | `LocationInfo` | 坐标点信息（通常等于请求的经纬度）                 |
| `region`                | `string`       | 区域名，如省/州                          |
| `timeZone`              | `string`       | 时区标识（如 `"Asia/Shanghai"`）         |
| `name`                  | `string`       | 地点名称，如建筑物、地标等                     |
| `thoroughfare`          | `string`       | 街道名称，如 `"中关村大街"`                  |
| `subThoroughfare`       | `string`       | 详细地址，如门牌号                         |
| `locality`              | `string`       | 城市或镇                              |
| `subLocality`           | `string`       | 区、街道等子区域                          |
| `administrativeArea`    | `string`       | 省份、州或其他一级行政区域                     |
| `subAdministrativeArea` | `string`       | 县、区等次级行政区域                        |
| `postalCode`            | `string`       | 邮政编码                              |
| `isoCountryCode`        | `string`       | 国家代码（ISO 3166-1 alpha-2，如 `"CN"`） |
| `country`               | `string`       | 国家全名，如 `"中国"`                     |
| `inlandWater`           | `string`       | 附近的内陆水体名称，如湖泊、河流                  |
| `ocean`                 | `string`       | 附近的海洋名称                           |
| `areasOfInterest`       | `string[]`     | 附近的兴趣点/地标数组，如 `"东方明珠"`            |

---

## 示例用法

### 逆地理编码

```ts
const placemarks = await Location.reverseGeocode({
  latitude: 39.9042,
  longitude: 116.4074,
  locale: "zh-CN"
})

if (placemarks?.length) {
  const place = placemarks[0]
  console.log("国家:", place.country)
  console.log("城市:", place.locality)
  console.log("街道:", place.thoroughfare, place.subThoroughfare)
  console.log("地标名称:", place.name)
  console.log("邮编:", place.postalCode)
  console.log("兴趣点:", place.areasOfInterest?.join(", "))
}
```

---

### 地址格式化工具

```ts
function formatAddress(p: LocationPlacemark): string {
  return [
    p.country,
    p.administrativeArea,
    p.locality,
    p.subLocality,
    p.thoroughfare,
    p.subThoroughfare
  ].filter(Boolean).join(", ")
}
```

---

## 最佳实践与使用建议

* 使用 `areasOfInterest` 和 `name` 显示更友好的位置信息（如地标名）
* 使用 `postalCode`、`locality`、`administrativeArea` 自动填写表单或记录标签
* 使用 `timestamp` 判断位置数据是否新鲜
* 使用 `timeZone` 进行本地时间转换或事件提醒
* 在调用 `requestCurrent` 前使用 `setAccuracy` 控制精度
* 对小组件使用 `isAuthorizedForWidgetUpdates()` 检查权限

---

## 说明

* 逆地理编码可能返回多个结果，通常第一个最相关
* 若获取失败，API 将返回 `null`
* 若未强制刷新，系统会优先使用缓存位置，响应更快
* 小组件受限于系统权限机制，务必检测权限状态
