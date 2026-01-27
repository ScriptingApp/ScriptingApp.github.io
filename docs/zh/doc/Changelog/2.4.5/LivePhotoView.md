---
title: LivePhotoView

---

LivePhoto 表示一张 **系统级 Live Photo**，它由以下两部分组成：

* 一张高分辨率静态图片
* 一段与图片绑定的短视频（通常为 MOV）

在 Scripting 中，LivePhoto 是一个 **不可直接 new 的系统对象**，通常来源于：

* 照片选择器返回的结果
* 使用本地图片与视频文件动态构建

LivePhoto 的主要用途包括：

* 在界面中实时展示 Live Photo
* 读取并处理其底层资源（图片 / 视频）
* 将其拆解、重建或重新保存到系统相册

---

## LivePhoto 类

### LivePhoto.size

```
readonly size: Size
```

表示 Live Photo 的尺寸信息，对应其 **主图像（静态图片）** 的像素宽高。

该属性常用于：

* UI 布局约束
* 计算缩放比例
* 判断 Live Photo 的原始分辨率

---

### LivePhoto.getAssetResources()

```
getAssetResources(): Promise<{
  data: Data
  assetLocalIdentifier: string
  contentType: UTType
  originalFilename: string
  pixelHeight: number
  pixelWidth: number
}[]>
```

用于获取 Live Photo 的 **底层资源列表**。

一个 Live Photo 通常至少包含以下资源：

* 静态图片资源（JPEG / HEIC）
* 视频资源（QuickTime MOV）

返回数组中每一项代表一个资源，其字段含义如下：

* `data`
  资源的二进制数据，可直接用于写入文件、保存或传输

* `assetLocalIdentifier`
  Photos 框架中该资源的本地唯一标识

* `contentType`
  资源的统一类型标识（UTType），用于区分图片或视频类型

* `originalFilename`
  系统中该资源的原始文件名

* `pixelWidth` / `pixelHeight`
  该资源的实际像素尺寸

典型使用场景包括：

* 手动保存 Live Photo（避免中间临时文件）
* 将 Live Photo 拆解为独立的图片与视频
* 对 Live Photo 进行自定义导出或重建

---

### LivePhoto.from(options)

```
static from(options: {
  imagePath: string
  videoPath: string
  targetSize?: Size | null
  placeholderImage: UIImage | null
  contentMode?: "aspectFit" | "aspectFill"
  onResult: (result: LivePhoto | null, info: {
    error: string | null
    degraded: boolean | null
    cancelled: boolean | null
  }) => void
}): Promise<() => void>
```

用于 **从本地图片文件与视频文件异步构建 Live Photo**。

该方法的特点如下：

* 构建过程是异步的
* `onResult` 可能会被调用多次
* 支持降级结果（低质量预览）
* 支持主动取消请求

#### 参数说明

* `imagePath`
  静态图片文件路径，通常为 JPEG 或 HEIC

* `videoPath`
  与图片对应的视频文件路径，通常为 MOV

* `targetSize`
  指定返回 Live Photo 的目标尺寸
  传入 `null` 表示使用原始尺寸

* `placeholderImage`
  Live Photo 尚未加载完成时用于占位显示的 UIImage

* `contentMode`
  占位图的显示方式

  * `aspectFit`：完整显示，保持比例
  * `aspectFill`：填满区域，可能裁剪

* `onResult(result, info)`
  Live Photo 加载完成或状态更新时触发的回调

#### info 参数说明

* `error`
  构建失败时的错误信息

* `degraded`
  表示当前结果是否为低质量版本

* `cancelled`
  表示请求是否被取消

#### 返回值

该方法返回一个 Promise，成功后解析为一个 **可取消函数**：

```
() => void
```

调用该函数可立即取消 Live Photo 的加载过程。

---

## LivePhotoView 组件

LivePhotoView 是用于 **在界面中展示 Live Photo 的原生视图组件**，行为与系统 Photos App 中的 Live Photo 播放体验一致。

---

### LivePhotoViewProps

```
type LivePhotoViewProps = {
  livePhoto: Observable<LivePhoto | null>
}
```

#### livePhoto

* 类型：`Observable<LivePhoto | null>`
* 必填

该属性用于绑定当前要显示的 Live Photo。

设计为 `Observable` 的原因是：

* Live Photo 通常是异步获取的
* 允许在同一个视图中动态切换 Live Photo
* 便于与选择器、加载逻辑解耦

当 Observable 的值发生变化时，LivePhotoView 会自动更新显示内容。

---

## 使用示例说明

以下示例展示了一个典型使用流程：

* 用户选择一张 Live Photo
* 将 Live Photo 存入 Observable
* LivePhotoView 自动展示并播放该 Live Photo

```tsx
import { LivePhotoView, Button, useObservable } from "scripting"

function Example() {
  const livePhoto = useObservable<LivePhoto | null>(null)

  return <>
    <Button
      title="Set Live Photo"
      action={async () => {
        const lp = await getLivePhotoSomehow()
        livePhoto.setValue(lp)
      }}
    />

    <LivePhotoView
      livePhoto={livePhoto}
      frame={{ idealHeight: 300 }}
    />
  </>
}
```

### 核心流程说明

* 使用 `useObservable<LivePhoto | null>` 创建可观察状态
* 在用户选择 Live Photo 后，通过 `setValue` 更新状态
* LivePhotoView 自动响应状态变化并展示内容

LivePhotoView 不负责：

* Live Photo 的获取
* 权限处理
* 数据保存

它仅专注于 **展示与交互体验**。

---

## 设计原则与注意事项

* LivePhoto 是系统资源对象，生命周期由系统管理
* LivePhotoView 必须绑定 Observable，而不是直接传值
* 同一个 LivePhoto 实例可被多个 LivePhotoView 使用
* Live Photo 的加载与 UI 渲染解耦，推荐始终通过 Observable 驱动

---

## 总结

LivePhoto 相关能力在 Scripting 中主要由两部分组成：

* **LivePhoto 数据模型**
  用于表示、构建和解析系统 Live Photo

* **LivePhotoView 展示组件**
  用于以原生方式展示 Live Photo，并支持动态更新
