---
title: 值线图（RuleLineForValueChart）
description: 一个将数据表示为一系列线条的图表，规则指示特定值或阈值。

---

`RuleLineForValueChart` 组件用于在图表上绘制一条或多条参考线（水平或垂直），基于指定的数值位置。常用于标示阈值、目标线或参考线，增强图表的可读性与数据对比。

---

## 使用示例

```tsx
<Chart>
  <RuleLineForValueChart
    marks={[
      { value: 50 },
      { value: 75, lineStyle: { dash: [2, 4] } },
    ]}
  />
</Chart>
```

上面的示例会绘制两条规则线：

* 在值为 `50` 的位置绘制一条实线
* 在值为 `75` 的位置绘制一条虚线，样式为 2 点实线 + 4 点间隔

---

## 参数说明

### `labelOnYAxis`（可选）

* **类型：** `boolean`
* **默认值：** `false`
* **说明：**
  是否在 Y 轴显示标签：

  * 若设为 `true`，线条将 **垂直显示**，标签显示在 Y 轴。
  * 若设为 `false`，线条将 **水平显示**，标签显示在 X 轴。

---

### `marks`（必填）

* **类型：**

  ```ts
  Array<{
    value: number;
  } & ChartMarkProps>
  ```
* **说明：**
  用于定义所有参考线的位置和样式。

#### `value`

* 要绘制规则线的数值位置。

#### 附加属性（继承 `ChartMarkProps`）：

你可以通过这些属性进一步自定义每条线的外观：

* `foregroundStyle`：设置颜色或渐变
* `opacity`：设置线条透明度
* `lineStyle`：设置线条样式（如虚线）

---

## 使用场景

* 标注统计阈值（如平均值、中位数）
* 标示上下限、控制范围
* 显示目标线、指标值

---

## 总结

`RuleLineForValueChart` 是一个简洁的叠加图组件，能够帮助你在任意图表中标注关键数值，使图表更加直观易读。它可以与其他图表类型（如 `BarChart`、`LineChart`、`PointChart` 等）搭配使用，提升数据展示的专业度与清晰度。
