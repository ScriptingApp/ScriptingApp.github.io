# 环形图（DonutChart）

`DonutChart`（环形图）组件用于以圆环的形式展示各分类在整体中的占比。每一个扇形区域代表一个数据项，角度大小与其数值成比例。相比传统的饼图，`DonutChart` 中央有一个空心区域，视觉上更清晰且易于叠加标签或图标。

## 属性

### `marks: Array<object>` **（必填）**

用于定义每个环形扇区的数据项。每个标记包含以下字段：

***

### `category: string`

分类名称，表示该扇区所属的标签（例如产品名、地区等）。

### `value: number`

用于计算该扇区的角度，数值越大，所占比例越大。角度将与该值在所有值中的占比成正比。

***

### `innerRadius?: MarkDimension`

**内半径**，即环形中间空心区域的大小。

- 格式如下：

  ```ts
  {
    type: 'ratio' | 'inset';
    value: number;
  }
  ```

- `type: 'ratio'`
  使用外半径的比例（如 `0.618`）表示内半径大小。

- `type: 'inset'`
  表示从外边缘向内缩进的固定距离（单位为 pt）。

***

### `outerRadius?: MarkDimension`

**外半径**，控制每个扇区向外延伸的范围。

- 格式如下：

  ```ts
  {
    type: 'inset';
    value: number;
  }
  ```

- `type: 'inset'`
  指定从绘图区域边缘向内缩进的距离。

***

### `angularInset?: number`

设置每个扇区之间的间隙角度（单位为度），可用于增加视觉分隔效果或实现圆角扇形。

***

### 继承自 `ChartMarkProps`

还支持所有 `ChartMarkProps` 提供的样式和行为属性，包括：

- `foregroundStyle` – 设置扇区颜色
- `annotation` – 为扇区添加标签或图标
- `opacity`、`cornerRadius`、`offset`、`shadow` 等

## 示例代码

```tsx
<DonutChart
  marks={data.map(item => ({
    category: item.name,
    value: item.sales,
    innerRadius: {
      type: 'ratio',
      value: 0.618
    },
    outerRadius: {
      type: 'inset',
      value: 10
    },
    angularInset: 1
  }))}
/>
```

## 适用场景

- 展示不同产品的销售占比
- 可视化市场份额、人口结构等整体分布
- 对多个分类在总体中的比例进行对比
