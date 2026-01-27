---
title: MediaComposer 示例

---

本示例演示如何使用 `MediaComposer` 将 **视频 + 图片 + 音频** 组合成一个最终视频文件，并导出到脚本目录中。

示例流程包括：

1. 选择音频文件
2. 选择一张图片
3. 选择一个视频
4. 构建视频时间线（Video + Image）
5. 在指定时间点插入音频
6. 导出合成后的视频

---

## 示例代码

```tsx
import { Path, Script } from "scripting"

console.present().then(() => Script.exit())

async function run() {
  try {

    const audioPath = (await DocumentPicker.pickFiles({
      types: ["public.audio"]
    })).at(0)

    if (audioPath == null) {
      console.error("no audio")
      return
    }

    console.log("Audio Picked")

    const imageResult = (await Photos.pick({
      filter: PHPickerFilter.images()
    })).at(0)

    const imagePath = await imageResult?.itemProvider.loadFilePath("public.image")

    if (!imagePath) {
      console.log("No image")
      return
    }

    console.log("Image picked")

    const videoResult = (await Photos.pick({
      filter: PHPickerFilter.videos()
    })).at(0)

    const videoPath = await videoResult?.itemProvider.loadFilePath("public.movie")

    if (videoPath == null) {
      console.log("No video")
      return
    }

    console.log("Video Picked")

    console.log("Start composing...")

    const exportPath = Path.join(
      Script.directory,
      "dest.mp4"
    )

    const exportResult = await MediaComposer.composeAndExport({
      exportPath,
      timeline: {
        videoItems: [{
          videoPath: videoPath
        }, {
          imagePath: imagePath,
          duration: MediaTime.make({
            seconds: 5,
            preferredTimescale: 600
          })
        }],
        audioClips: [{
          path: audioPath,
          at: MediaTime.make({
            seconds: 5,
            preferredTimescale: 600
          })
        }]
      }
    })

    console.log(
      "Result:",
      exportResult.exportPath,
      "\n",
      exportResult.duration.getSeconds()
    )

  } catch (e) {
    console.error(e)
  }
}

run()
```

---

## 时间线解析

### 视频 / 图片时间线（videoItems）

```ts
videoItems: [
  { videoPath },
  {
    imagePath,
    duration: MediaTime.make({
      seconds: 5,
      preferredTimescale: 600
    })
  }
]
```

* 第一个 `VideoItem` 是完整视频
* 第二个 `VideoItem` 是一张图片，显示 5 秒
* 所有 `videoItems` **按顺序依次拼接**
* 最终视频总时长 = 视频时长 + 图片 5 秒

---

### 音频时间线（audioClips）

```ts
audioClips: [{
  path: audioPath,
  at: MediaTime.make({
    seconds: 5,
    preferredTimescale: 600
  })
}]
```

* 音频在最终视频的 **第 5 秒开始播放**
* 不指定 `at` 时，音频会顺序接在前一个外部音频之后
* 音频不会影响最终视频时长

---

## 导出结果

```ts
{
  exportPath: string
  duration: MediaTime
}
```

* `exportPath`：导出文件的完整路径
* `duration`：最终视频时长（仅由 `videoItems` 决定）

---

## 常见错误与边界情况

### 1. ImageClip 未指定 duration

```ts
{
  imagePath: "...",
  //  缺少 duration
}
```

**问题：**

* ImageClip 没有天然时长
* 不指定 `duration` 会导致合成失败

**解决方案：**

* 必须显式提供 `MediaTime`

---

### 2. 使用浮点秒数而非 MediaTime

```ts
// 错误
at: 5
```

**正确做法：**

```ts
at: MediaTime.make({
  seconds: 5,
  preferredTimescale: 600
})
```

MediaComposer 中 **所有时间必须使用 MediaTime**。

---

### 3. 混合不同 timescale 导致精度问题

**问题：**

* 不同音视频资源使用不同 timescale
* 在剪辑、拼接、淡入淡出时可能出现边界误差

**建议：**

* 在脚本中统一使用 `preferredTimescale: 600`
* 对外部时间先做 `convertScale`

---

### 4. 音频超出视频范围

**行为说明：**

* 音频即使超过视频末尾，也不会延长最终视频
* 超出部分会被自动截断

---

### 5. 同时存在视频原音与外部音频但音量异常

**原因：**

* 默认情况下，外部音频与视频原音会同时混合
* 未配置 ducking 时，可能出现人声被盖住的问题

---

## 音频 Ducking 行为说明

### 什么是 Ducking

Ducking 指的是：

> 当视频原音（如人声）存在时，自动降低外部音频（如背景音乐）的音量

---

### Ducking 配置

```ts
exportOptions: {
  ducking: {
    enabled: true,
    duckedVolume: 0.25,
    attackSeconds: 0.15,
    releaseSeconds: 0.25
  }
}
```

#### 参数说明

* **enabled**
  是否启用 ducking，默认 `true`

* **duckedVolume**
  被压低后的外部音频音量（0…1）

* **attackSeconds**
  在视频原音开始前，音量下降的过渡时间

* **releaseSeconds**
  在视频原音结束后，音量恢复的过渡时间

---

### Ducking 生效条件

Ducking 仅在以下条件同时满足时生效：

1. `VideoClip.keepOriginalAudio === true`
2. 存在外部 `audioClips`
3. `exportOptions.ducking.enabled !== false`

---

## 音频混音规则总结

1. **视频原音**

   * 只有在 `keepOriginalAudio: true` 时才参与混音

2. **外部音频**

   * 可指定时间点或顺序拼接
   * 可设置 `volume`、`fade`、`loopToFitVideoDuration`

3. **最终混音顺序**

   * 所有音频会被混合到单一音轨
   * 不会改变视频时长
   * Ducking 在混音阶段自动应用

