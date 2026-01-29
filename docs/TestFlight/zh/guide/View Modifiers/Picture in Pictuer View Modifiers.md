---
title: Picture in Picture （画中画）
description: 这些 API 允许开发者在系统画中画窗口中渲染任何视图。
tag: PRO
---

Scripting 提供了一组 PiP（Picture in Picture，画中画）相关的 View Modifiers，用于将任意 SwiftUI View 以系统级 PiP 窗口的形式呈现。
开发者无需直接接触底层 AVPictureInPicture API，即可完整控制 PiP 的展示、隐藏、交互行为及生命周期。

PiP 适用于以下典型场景：

* 实时状态展示（计时、运动、任务进度）
* 音频 / 视频播放的辅助 UI
* 应用进入后台后仍需持续展示的轻量信息视图

---

## 一、PiPProps API 定义

```ts
type PiPProps = {
  pip?: {
    isPresented: Observable<boolean>
    maximumUpdatesPerSecond?: number
    content: VirtualNode
  }
  
  onPipStart?: () => void
  onPipStop?: () => void
  onPipPlayPauseToggle?: (isPlaying: boolean) => void
  onPipSkip?: (isForward: boolean) => void
  onPipRenderSizeChanged?: (size: Size) => void

  pipHideOnForeground?: boolean
  pipShowOnBackground?: boolean
}
```

---

## 二、核心属性详解

### 1. `pip.isPresented`

```ts
isPresented: Observable<boolean>
```

* PiP 的**唯一控制开关**
* `true`：系统 PiP 窗口展示
* `false`：PiP 窗口关闭

通常由用户操作（按钮、手势）或应用生命周期驱动。

---

### 2. `pip.content`

```ts
content: VirtualNode
```

* 指定 PiP 窗口中实际渲染的视图
* 强烈建议使用**专门为 PiP 设计的 View**
* 视图结构应尽量简单、稳定、可预测

---

### 3. `pip.maximumUpdatesPerSecond`

```ts
maximumUpdatesPerSecond?: number
```

* **默认值：30**
* 用于限制 PiP 视图每秒最大刷新次数
* 是影响 PiP 稳定性和性能的关键参数

#### 使用建议

* **无动画 / 低频更新场景**
  建议设置为 `1 ~ 5`

* **包含动画的 PiP 视图**
  可设置为 `60`

**重要提示**
将该值设置为 `60` 会显著增加 CPU 与 GPU 压力，对系统性能影响非常明显，应谨慎使用，仅适用于确有必要的动画场景。

---

## 三、PiP 生命周期回调（仅限 PipView 使用）

### `onPipStart`

```ts
onPipStart?: () => void
```

* 当 PiP 窗口**成功开始展示**时触发
* 适合执行以下操作：

  * 启动定时器
  * 开始状态更新
  * 订阅数据流

---

### `onPipStop`

```ts
onPipStop?: () => void
```

* 当 PiP 被关闭或系统回收时调用
* 必须在此清理所有副作用：

  * 定时器
  * 订阅
  * 长时间运行任务

---

## 四、PiP 交互回调（仅限 PipView 使用）

### 1. 播放 / 暂停切换

```ts
onPipPlayPauseToggle?: (isPlaying: boolean) => void
```

* 当用户点击 PiP 控制区的播放 / 暂停按钮
* `isPlaying` 表示切换后的状态
* 常用于音频、视频、运动记录等场景

---

### 2. 快进 / 快退按钮

```ts
onPipSkip?: (isForward: boolean) => void
```

* `true`：向前
* `false`：向后

---

## 五、PiP 渲染尺寸变化

### `onPipRenderSizeChanged`

```ts
onPipRenderSizeChanged?: (size: Size) => void
```

* 当 PiP 窗口尺寸发生变化时触发
* 可根据尺寸动态调整布局
* 适用于横竖屏切换或系统自动调整 PiP 大小时

---

## 六、前后台行为控制（仅限 PipView 使用）

### `pipHideOnForeground`

```ts
pipHideOnForeground?: boolean
```

* 当应用进入前台时：

  * 若 PiP 正在运行，是否自动关闭
* 默认：`false`

---

### `pipShowOnBackground`

```ts
pipShowOnBackground?: boolean
```

* 当应用进入后台时是否自动启动 PiP
* 常用于音频播放、实时状态展示类场景

---

## 七、完整代码示例

### 1. PiP 内容视图（PipView）

```tsx
function PipView() {
  const started = useObservable(false)
  const count = useObservable(0)

  useEffect(() => {
    if (!started.value) {
      return
    }

    let timerId: number

    function startTimer() {
      timerId = setTimeout(() => {
        count.setValue(count.value + 1)
        startTimer()
      }, 1000)
    }

    startTimer()

    return () => {
      clearTimeout(timerId)
    }
  }, [started.value])

  return <HStack
    onPipStart={() => {
      started.setValue(true)
    }}
    frame={{
      width: Device.screen.width,
      height: 50
    }}
    background="systemBlue"
  >
    <Image
      systemName="figure.walk"
      font="title"
    />
    <Text foregroundStyle="white">
      Count: {count.value}
    </Text>
  </HStack>
}
```

---

### 2. 页面中启用 PiP

```tsx
function PageView() {
  const dismiss = Navigation.useDismiss()
  const pipPresented = useObservable(false)

  return <NavigationStack>
    <List
      navigationTitle="PiP Demo"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        topBarLeading: <Button
          title="Done"
          action={dismiss}
        />
      }}
      pip={{
        isPresented: pipPresented,
        content: <PipView />
      }}
    >
      <Button
        title="Toggle PiP"
        action={() => {
          pipPresented.setValue(!pipPresented.value)
        }}
      />
    </List>
  </NavigationStack>
}
```

---

## 八、重要注意事项（必须阅读）

### 1. PiPView 在 `isPresented = false` 时仍会被构建

* PiPView **不可见**
* 但仍然参与状态绑定与生命周期
* 不应在构建阶段执行任何重计算或副作用

**推荐做法**

* 所有逻辑延迟到 `onPipStart`
* 在 `onPipStop` 中彻底释放资源

---

### 2. PiP 专用修饰符只能在 PipView 中使用

以下属性和回调：

* `onPipStart`
* `onPipStop`
* `onPipPlayPauseToggle`
* `onPipSkip`
* `onPipRenderSizeChanged`
* `pipHideOnForeground`
* `pipShowOnBackground`

**只能定义在 PiP 内容视图（PipView）中**

如果定义在普通页面 View 中：

* 不会触发
* 无法获取正确状态
* 行为不可预测

---

### 3. PiP 不适合复杂 UI

不建议在 PiP 中使用：

* `List`、`ScrollView`
* 复杂动画
* 高频状态更新
* 网络请求驱动的 UI

PiP 的设计目标是：

> 轻量、稳定、可持续展示的系统级辅助视图

---

## 九、推荐实践总结

* 为 PiP 单独设计一个最小化 View
* 控制更新频率，合理设置 `maximumUpdatesPerSecond`
* 所有副作用延迟到 `onPipStart`
* 始终在 `onPipStop` 中清理资源
* 不在 PiP 中复用页面级复杂视图
