Scripting 提供与 SwiftUI 类似的手势支持，可以为任何视图（如 `<VStack>`、`<HStack>`）添加点击、长按和拖动交互。每种手势都支持灵活的参数配置和回调处理。

---

## `onTapGesture`

在识别到点击手势时执行指定操作。

### 类型

```ts
onTapGesture?: (() => void) | {
  count: number
  perform: () => void
}
```

### 用法

* 基本用法（单击）：

  ```tsx
  <VStack onTapGesture={() => console.log('点击了')} />
  ```

* 指定点击次数（如双击）：

  ```tsx
  <HStack
    onTapGesture={{
      count: 2,
      perform: () => console.log('双击了')
    }}
  />
  ```

### 默认值

* `count`: `1`（默认为单击）

---

## `onLongPressGesture`

在识别到长按手势时执行指定操作。

### 类型

```ts
onLongPressGesture?: (() => void) | {
  minDuration?: number
  maxDuration?: number
  perform: () => void
  onPressingChanged?: (state: boolean) => void
}
```

### 用法

* 简单用法：

  ```tsx
  <VStack onLongPressGesture={() => console.log('长按触发')} />
  ```

* 自定义长按时间和状态监听：

  ```tsx
  <HStack
    onLongPressGesture={{
      minDuration: 800,
      maxDuration: 3000,
      perform: () => console.log('长按成功'),
      onPressingChanged: isPressing =>
        console.log(isPressing ? '正在按压' : '已松开')
    }}
  />
  ```

### 默认值

* `minDuration`: `500` 毫秒
* `maxDuration`: `10000` 毫秒

---

## `onDragGesture`

为视图添加拖动手势，支持实时变化和拖动结束的回调。

### 类型

```ts
onDragGesture?: {
  minDistance?: number
  coordinateSpace?: 'local' | 'global'
  onChanged?: (details: DragGestureDetails) => void
  onEnded?: (details: DragGestureDetails) => void
}
```

### 用法

* 基本拖动：

  ```tsx
  <VStack
    onDragGesture={{
      onChanged: details =>
        console.log('拖动位置', details.location),
      onEnded: details =>
        console.log('拖动结束，速度', details.velocity)
    }}
  />
  ```

* 指定最小拖动距离和全局坐标空间：

  ```tsx
  <HStack
    onDragGesture={{
      minDistance: 5,
      coordinateSpace: 'global',
      onChanged: details => {
        console.log('当前坐标:', details.location)
        console.log('偏移量:', details.translation)
      },
      onEnded: details => {
        console.log('预测结束位置:', details.predictedEndLocation)
      }
    }}
  />
  ```

### 默认值

* `minDistance`: `10` 点
* `coordinateSpace`: `'local'`

---

## `DragGestureDetails`

`onChanged` 和 `onEnded` 回调中传入的拖动信息对象，包含位置、偏移量、速度等信息。

```ts
type DragGestureDetails = {
  time: number
  location: Point
  startLocation: Point
  translation: Size
  velocity: Size
  predictedEndLocation: Point
  predictedEndTranslation: Size
}
```

### 字段说明

* `time`: 当前拖动事件的时间戳（毫秒）
* `location`: 当前手指或指针的位置 `{ x, y }`
* `startLocation`: 拖动开始的位置
* `translation`: 从开始拖动至当前的总偏移量，等同于 `location - startLocation`
* `velocity`: 当前拖动速度 `{ x, y }`，单位为每秒点数（points/second）
* `predictedEndLocation`: 根据当前速度预测的最终位置
* `predictedEndTranslation`: 根据当前速度预测的总偏移量