---
title: 视频预览
description: 使用 VideoRecorderPreviewView UI组件进行视频预览
tag: PRO
---

`VideoRecorderPreviewView` 是用于显示 `VideoRecorder` 实时视频画面的预览视图组件。
它本身 **不负责任何录制逻辑**，仅用于将 `VideoRecorder.session` 中的视频流渲染到 UI 层，并提供必要的显示与裁剪能力。

该组件通常与 `VideoRecorder` 搭配使用，用于：

* 实时显示摄像头画面
* 支持不同的视频填充模式（videoGravity）
* 处理镜像显示（常用于前置摄像头）
* 支持圆角、裁剪等视觉效果
* 与手势系统组合实现缩放、对焦等交互

---

## 设计原则

### 视图与录制逻辑解耦

* `VideoRecorderPreviewView` **不持有录制状态**
* 不触发 `prepare / start / stop`
* 不感知 `VideoRecorder.State`

它只依赖 `VideoRecorder.session`，并在内部将其绑定到系统的预览渲染层。

---

### 单向依赖关系

```
VideoRecorder  ──▶  AVCaptureSession  ──▶  VideoRecorderPreviewView
```

* Session 由 `VideoRecorder` 管理
* PreviewView 只负责显示

---

## Props 定义

```ts
type VideoRecorderPreviewViewProps = {
  videoGravity?: "resizeAspect" | "resizeAspectFill" | "resize"
  isVideoMirrored?: boolean
  cornerRadius?: number
  masksToBounds?: boolean
}
```

---

## videoGravity

```ts
videoGravity?: "resizeAspect" | "resizeAspectFill" | "resize"
```

控制视频内容在视图中的填充方式，对应 `AVLayerVideoGravity`：

* `resizeAspect`
  等比例缩放，完整显示视频内容，可能留黑边

* `resizeAspectFill`（默认）
  等比例填充，可能裁剪边缘

* `resize`
  拉伸填满视图，不保持比例

适合根据 UI 设计需求选择。

---

## isVideoMirrored

```ts
isVideoMirrored?: boolean
```

是否镜像显示视频画面，常用于前置摄像头。

* `true`
  画面左右翻转，符合自拍预期

* `false`（默认）
  保持原始方向

> 注意：
> 该属性只影响**预览显示**，不影响最终录制文件是否镜像。

---

## cornerRadius

```ts
cornerRadius?: number
```

设置预览视图背景的圆角半径。

* 默认值：`0`
* 仅对视图背景生效
* 若需要裁剪视频内容，需要同时设置 `masksToBounds = true`

---

## masksToBounds

```ts
masksToBounds?: boolean
```

是否裁剪子内容到视图边界。

* `false`（默认）
  圆角仅作用于背景，不裁剪视频内容

* `true`
  视频画面会被裁剪到圆角区域

通常与 `cornerRadius` 配合使用。

---

## 生命周期与更新行为

### 与 SwiftUI / 声明式 UI 的关系

`VideoRecorderPreviewView` 是一个声明式组件，其底层通常对应一个持久存在的原生预览视图（如 `AVCaptureVideoPreviewLayer`）。

在以下情况下需要特别注意：

* **重新创建视图实例**
  会导致底层预览层重新绑定 session

* **频繁触发视图重建**
  可能引起短暂卡顿或画面闪烁

---

### key 的重要性

在动态 UI 场景中（例如切换摄像头、切换配置）：

```tsx
<VideoRecorderPreviewView
  key="videoRecorder"
  ...
/>
```

* 建议显式提供稳定且唯一的 `key`
* 用于确保预览视图与当前 `AVCaptureSession` 正确绑定
* 防止 SwiftUI / React-style diff 误判导致多次销毁与重建

---

## 与 VideoRecorder 的协作方式

### 会话来源

`VideoRecorderPreviewView` 内部使用的是：

```ts
VideoRecorder.session
```

该 session 的生命周期由 `VideoRecorder` 控制。

---

### 会话重置时的行为

当调用：

```ts
await VideoRecorder.reset()
```

* 底层 `AVCaptureSession` 会被关闭
* 预览画面会停止更新或变为空白
* 重新 `prepare` 后画面恢复

PreviewView 本身无需额外处理。

---

## 手势与交互（组合方式）

`VideoRecorderPreviewView` 本身 **不内置任何手势逻辑**，但可以与手势系统组合使用：

```tsx
<VideoRecorderPreviewView
  gesture={
    MagnifyGesture()
      .onChanged(details => {
        VideoRecorder.setZoomFactor(...)
      })
  }
/>
```

常见交互包括：

* 双指缩放 → 调用 `setZoomFactor`
* 单击 → 转换为归一化坐标后调用 `setFocusPoint`
* 长按 → 锁定曝光

---

## 常见使用建议

* 不要在 `recording` 状态频繁重建 PreviewView
* 切换摄像头时建议：

  1. `reset`
  2. `prepare`
  3. 保持 PreviewView key 稳定
* 镜像、圆角等视觉效果应优先放在 PreviewView 层处理
* 所有录制控制逻辑应通过 `VideoRecorder` API 完成

---

## 典型使用示例（简化）

```tsx
<VideoRecorderPreviewView
  key="videoRecorder"
  videoGravity="resizeAspectFill"
  isVideoMirrored={true}
  cornerRadius={12}
  masksToBounds={true}
/>
```

---

## 总结

`VideoRecorderPreviewView` 是一个 **纯显示组件**：

* 负责实时视频画面的渲染
* 不参与录制状态与控制
* 与 `VideoRecorder` 通过 `AVCaptureSession` 单向协作
* 适合与手势、布局、动画等 UI 能力自由组合
