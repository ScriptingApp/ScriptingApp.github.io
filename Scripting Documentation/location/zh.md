`Location` 是一个全局 API，无需导入，可用于访问设备当前的地理位置、反向地理编码地址信息、在地图上手动选择位置、配置定位精度，并支持小组件的定位权限检测。

---

## 功能概览

你可以使用 Location API 实现以下功能：

* 获取一次性的当前地理位置
* 使用地图界面让用户选择位置
* 将经纬度转换为可读地址（反向地理编码）
* 设置所需的定位精度
* 检查小组件是否具备位置权限

> 注意：这是一个全局 API，无需导入。

---

## API 参考

### `Location.isAuthorizedForWidgetUpdates(): Promise<boolean>`

检测当前小组件是否具备获取位置信息的权限。

```ts
const isAuthorized = await Location.isAuthorizedForWidgetUpdates()
if (!isAuthorized) {
  console.log("小组件没有定位权限")
}
```

---

### `Location.setAccuracy(accuracy: LocationAccuracy): Promise<void>`

设置定位精度，决定后续位置请求的精确程度。精度越高，耗电量和等待时间可能也越高。

#### 可选参数值：

| 精度值                 | 描述          |
| ------------------- | ----------- |
| `"best"`            | 最高精度        |
| `"tenMeters"`       | 精度在 10 米以内  |
| `"hundredMeters"`   | 精度在 100 米以内 |
| `"kilometer"`       | 精度在 1 公里以内  |
| `"threeKilometers"` | 精度在 3 公里以内  |

```ts
await Location.setAccuracy("hundredMeters")
```

---

### `Location.requestCurrent(): Promise<LocationInfo | null>`

获取用户当前位置，仅请求一次。如果未授权，会弹出系统定位权限请求。

```ts
const location = await Location.requestCurrent()
if (location) {
  console.log("纬度:", location.latitude)
  console.log("经度:", location.longitude)
}
```

---

### `Location.pickFromMap(): Promise<LocationInfo | null>`

打开原生地图界面，让用户手动选择一个地理位置。

```ts
const selected = await Location.pickFromMap()
if (selected) {
  console.log("用户选择的位置：", selected.latitude, selected.longitude)
}
```

---

### `Location.reverseGeocode(options): Promise<LocationPlacemark[] | null>`

根据经纬度进行反向地理编码，返回地址信息（如街道、城市、国家等）。

#### 参数说明：

| 参数名         | 类型       | 是否必填 | 描述                            |
| ----------- | -------- | ---- | ----------------------------- |
| `latitude`  | `number` | 是    | 纬度，单位为度                       |
| `longitude` | `number` | 是    | 经度，单位为度                       |
| `locale`    | `string` | 否    | 可选语言代码（如 `"zh-CN"`），默认为设备当前语言 |

```ts
const placemarks = await Location.reverseGeocode({
  latitude: 39.9042,
  longitude: 116.4074,
  locale: "zh-CN"
})

if (placemarks?.length) {
  const place = placemarks[0]
  console.log("城市：", place.locality)
  console.log("国家：", place.country)
}
```

---

## 类型定义

### `LocationAccuracy`

表示定位精度的选项：

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

表示经纬度地理坐标：

```ts
type LocationInfo = {
  latitude: number
  longitude: number
}
```

---

### `LocationPlacemark`

用于表示通过反向地理编码获得的地址信息，包含多个层级的地理描述字段，可用于展示地址、生成提示文本、或者进行位置信息分类。

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

#### 字段详解：

| 字段名                     | 类型             | 说明                               |
| ----------------------- | -------------- | -------------------------------- |
| `location`              | `LocationInfo` | 对应的经纬度信息（可选），与输入经纬度基本一致          |
| `region`                | `string`       | 所在的行政区域名称，如“北京市”或“加利福尼亚州”        |
| `timeZone`              | `string`       | 所在位置的时区标识（如 `"Asia/Shanghai"`）   |
| `name`                  | `string`       | 地点的常规名称，例如建筑物名、地标名               |
| `thoroughfare`          | `string`       | 街道名，例如“中关村大街”                    |
| `subThoroughfare`       | `string`       | 街道附加信息，例如门牌号“59号”                |
| `locality`              | `string`       | 城市名，例如“北京市”、“San Francisco”      |
| `subLocality`           | `string`       | 城市的下属区域，如城区、社区、乡镇等               |
| `administrativeArea`    | `string`       | 州、省或自治区名称，例如“广东省”或“California”   |
| `subAdministrativeArea` | `string`       | 行政区域的下属单位，例如“广州市天河区”             |
| `postalCode`            | `string`       | 邮政编码                             |
| `isoCountryCode`        | `string`       | 国家/地区的 ISO 代码，例如 `"CN"`、`"US"`   |
| `country`               | `string`       | 国家/地区名称，例如“中国”、“United States”   |
| `inlandWater`           | `string`       | 附近的内陆水体名称（如湖泊、河流），例如“长江”、“太湖”    |
| `ocean`                 | `string`       | 附近的海洋名称，例如“太平洋”                  |
| `areasOfInterest`       | `string[]`     | 相关兴趣区域名称，例如“天安门广场”、“Googleplex”等 |

---

#### 用途示例：

```ts
const placemarks = await Location.reverseGeocode({
  latitude: 31.2304,
  longitude: 121.4737,
  locale: "zh-CN"
})

if (placemarks?.length) {
  const place = placemarks[0]

  console.log("国家：", place.country)
  console.log("城市：", place.locality)
  console.log("街道：", place.thoroughfare, place.subThoroughfare)
  console.log("完整地址：", place.name)
  console.log("邮编：", place.postalCode)
  console.log("兴趣点：", place.areasOfInterest?.join(", "))
}
```

---

#### 开发建议：

* 构建地址字符串时可以根据需要选择不同层级组合，例如：

```ts
function formatAddress(p: LocationPlacemark): string {
  return [
    p.country,
    p.administrativeArea,
    p.locality,
    p.subLocality,
    p.thoroughfare,
    p.subThoroughfare
  ].filter(Boolean).join("")
}
```

* `areasOfInterest` 可用于显示更具辨识度的位置名称，适合用作 UI 中的提示文字或地图标注。
* `timeZone` 可用于基于位置的时间显示或提醒设置。

---

## 使用说明

* 反向地理编码可能返回多个结果，通常第一个最为准确。
* 若定位或编码失败，会返回 `null`。
* 建议在调用 `requestCurrent` 之前先通过 `setAccuracy` 设置合适的精度。
* 在小组件中使用定位功能前，请先使用 `isAuthorizedForWidgetUpdates()` 检查权限状态。
