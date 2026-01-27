---
title: 仪表盘样式

---

通过设置 `GaugeStyle`，你可以定义仪表（Gauge）的视觉表示方式，从而控制其外观是否显示为环形、条形或通过标记指示当前值。一些样式仅适用于特定平台（如 watchOS），其他样式则具有更广泛的适用性。

---

## 概述

`Gauge` 组件用来以视觉方式表示指定范围内的值。例如，你可以用它显示电池电量、下载进度或温度读数。通过结合 `Gauge` 和指定的 `GaugeStyle`，你可以调整仪表的外观，以匹配应用的设计语言或功能需求。

**关键点：**

- 根据数据的性质选择合适的样式——环形适用于圆形上下文，条形适用于线性上下文。
- 有些样式使用标记指示当前值；其他样式使用填充段表示部分容量。
- 某些样式仅适用于 watchOS，具体见下文说明。

---

## 可用样式

- **`automatic`**：  
  使用系统为当前平台和上下文选择的默认样式。如果你没有特定偏好，这是一个很好的起点。

- **`accessoryCircular`**：  
  显示一个开口的环形，标记指针沿环的圆周指向当前值。适用于以紧凑圆形表示水平或百分比的场景。

- **`accessoryCircularCapacity`**：  
  类似于 `accessoryCircular`，但显示一个闭合的部分环形，填充到当前值。这种样式非常适合显示容量级别，例如存储使用情况。

- **`circular`** *(仅适用于 watchOS)*：  
  类似于 `accessoryCircular`，显示一个带标记指针的开口环形。适合用于 watchOS 的复杂功能或类似小型设备显示。

- **`linearCapacity`**：  
  显示一个水平条，从左侧填充到右侧，表示值的增长。非常适合用作进度条、电池电量或内存使用指示器。

- **`accessoryLinear`**：  
  一个线性仪表，通过条形上的标记指示当前值，而不是填充段。

- **`accessoryLinearCapacity`**：  
  结合了 `linearCapacity` 和 `accessoryLinear` 样式，显示一个随值增长的填充条段，非常适合显示容量或整体进度。

- **`linear`** *(仅适用于 watchOS)*：  
  类似于 `accessoryLinear`，但专为 watchOS 提供。通过条形上的标记指示当前值。

---

## 使用示例

### 环形容量仪表

```tsx
<Gauge
  value={0.7}
  min={0}
  max={1}
  label={<Text>电池</Text>}
  currentValueLabel={<Text>70%</Text>}
  minValueLabel={<Text>0%</Text>}
  maxValueLabel={<Text>100%</Text>}
  gaugeStyle="accessoryCircularCapacity"
/>
```

此示例展示了一个部分填充的环形仪表，表示电池电量为 70%。

---

### 线性容量样式

```tsx
<Gauge
  value={0.7}
  min={0}
  max={1}
  label={<Text>下载进度</Text>}
  currentValueLabel={<Text>70%</Text>}
  gaugeStyle="linearCapacity"
/>
```

此示例展示了一个从左到右填充 70% 的水平条形进度仪表。

---

### 标记样式仪表

```tsx
<Gauge
  value={0.7}
  min={0}
  max={1}
  label={<Text>温度</Text>}
  currentValueLabel={<Text>温暖</Text>}
  gaugeStyle="accessoryCircular"
/>
```

此示例使用标记样式显示一个开口环形，标记指针指向当前值（70%），而不是显示填充段。

---

## 适用场景

- **`circular` 和 `accessoryCircular` 样式：**  
  适用于直观表示圆形数据的场景，例如计时器、速度表或以环形显示容量的情况。

- **`linear` 和 `accessoryLinear` 样式：**  
  最适合用于线性数据的场景，如进度条、完成百分比或从左到右读取的水平值。

- **`Capacity` 样式：**  
  适用于需要通过填充段表示“已满”或“已完成”状态的场景，例如电池电量、存储空间使用情况或加载进度。

- **`automatic`：**  
  让系统根据上下文选择样式，适合用作默认选择。

---

## 总结

通过为 `Gauge` 设置 `gaugeStyle`，你可以完全控制数据的视觉表示方式。无论是环形仪表、线性条形、简单标记还是填充容量指示器，`GaugeStyle` 提供了灵活的选项，让信息的呈现既直观又美观，满足不同的设计需求和功能要求。