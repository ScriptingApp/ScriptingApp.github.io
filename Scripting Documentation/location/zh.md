`Location` API 提供方法来访问设备的当前位置，将坐标反向地理编码为地址信息，并使用 iOS 内置地图选择位置。此 API 支持设置位置精度并在应用中处理地理位置信息。

---

## 类：`Location`

`Location` 类使您能够与设备的位置服务交互。使用此 API 可获取当前位置、反向地理编码坐标，或允许用户在地图上选择位置。

---

### 方法

#### **`Location.setAccuracy(accuracy: LocationAccuracy): Promise<void>`**  
设置应用请求的位置数据的精度级别。  
- **`accuracy`**: 所需的精度级别，例如 `high` 或 `low`。（具体值请参考 `LocationAccuracy` 文档。）

#### **`Location.requestCurrent(): Promise<LocationInfo | null>`**  
请求一次性获取用户的当前位置。  
- 返回包含纬度、经度及其他位置信息的 `LocationInfo` 对象；如果无法获取位置，则返回 `null`。

#### **`Location.pickFromMap(): Promise<LocationInfo | null>`**  
展示 iOS 内置地图界面，让用户选择一个位置。  
- 返回包含所选位置详细信息的 `LocationInfo` 对象；如果用户取消选择，则返回 `null`。

#### **`Location.reverseGeocode(options: { latitude: number; longitude: number; locale?: string }): Promise<LocationPlacemark[] | null>`**  
对指定坐标提交反向地理编码请求以检索地址信息。  
- **参数**：
  - `latitude: number`: 纬度（以度为单位）。
  - `longitude: number`: 经度（以度为单位）。
  - `locale?: string`: 返回地址信息的语言环境。指定 `null` 以使用用户的默认语言环境。  
- 返回表示地址详细信息的 `LocationPlacemark` 对象数组；如果反向地理编码失败，则返回 `null`。

---

### 类型

#### **`LocationInfo`**
表示从设备或用户选择中获取的位置信息。  
- `latitude: number`: 位置的纬度。
- `longitude: number`: 位置的经度。
- `altitude?: number`: 位置的海拔（如果可用）。
- `horizontalAccuracy?: number`: 位置数据的水平精度。
- `verticalAccuracy?: number`: 位置数据的垂直精度。
- `timestamp: Date`: 获取位置信息的时间戳。

#### **`LocationPlacemark`**
表示特定位置的地址详细信息。  
- `name?: string`: 地点名称（例如地标名称）。
- `thoroughfare?: string`: 街道名称。
- `subThoroughfare?: string`: 街道号码。
- `locality?: string`: 城市名称。
- `subLocality?: string`: 区域或街区名称。
- `administrativeArea?: string`: 州或省份。
- `subAdministrativeArea?: string`: 县或其他次级行政区划。
- `postalCode?: string`: 邮政编码或 ZIP 码。
- `country?: string`: 国家名称。
- `isoCountryCode?: string`: ISO 国家代码。

#### **`LocationAccuracy`**
定义位置数据的所需精度级别。  
- 可能的值：`"high"`，`"medium"`，`"low"`。

---

## 示例

### 设置位置精度
```ts
await Location.setAccuracy("high")
console.log("位置精度已设置为高。")
```

---

### 获取当前位置
```ts
const currentLocation = await Location.requestCurrent()
if (currentLocation) {
  console.log(`纬度：${currentLocation.latitude}, 经度：${currentLocation.longitude}`)
} else {
  console.log("无法获取当前位置。")
}
```

---

### 在地图上选择位置
```ts
const selectedLocation = await Location.pickFromMap()
if (selectedLocation) {
  console.log(`用户选择的位置：纬度 ${selectedLocation.latitude}, 经度 ${selectedLocation.longitude}`)
} else {
  console.log("位置选择已取消。")
}
```

---

### 反向地理编码坐标
```ts
const placemarks = await Location.reverseGeocode({
  latitude: 37.7749,
  longitude: -122.4194,
  locale: "zh-CN"
})

if (placemarks) {
  for (const placemark of placemarks) {
    console.log(`地址：${placemark.name}, ${placemark.locality}, ${placemark.country}`)
  }
} else {
  console.log("无法获取地址信息。")
}
```

---

## 附加说明

- **权限要求：** 在使用 `Location` API 之前，请确保应用在系统设置中启用了适当的位置权限。  
- **精度权衡：** 较高的精度设置可能会消耗更多电量，并需要更长时间来获取位置信息。对于非关键任务，请使用较低精度以节省资源。  
- **错误处理：** 在处理位置信息时始终处理可能的 `null` 值，因为由于连接问题或用户权限限制，服务可能会失败。  