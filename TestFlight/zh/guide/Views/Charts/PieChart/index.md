# 饼图（PieChart）

`PieChart`（饼图）组件用于以圆形扇区的方式展示各分类在整体中的占比。每一个扇区代表一个分类，其角度根据该分类对应数值在总值中的占比自动计算，适合用于展示比例、分布或市场份额等数据。

***

## 使用示例

```tsx
<PieChart
  marks={[
    { category: "Cachapa", value: 9631 },
    { category: "Crêpe", value: 6959 },
    { category: "Injera", value: 4891 },
    ...
  ]}
/>
```

***

## 属性说明

### `marks: Array<object>` **（必填）**

定义图表中每一个扇区的数据项。

每个数据项需包含以下字段：

- `category: string`
  分类标签，用于标识该扇区所代表的内容（例如产品名称、国家、类型等）。

- `value: number`
  数值，用于计算该分类所占的角度比例。所有值会被加总，并按比例生成各扇区。

- 支持继承 `ChartMarkProps` 中的可选样式属性，包括：

  - `foregroundStyle`（前景颜色样式）
  - `annotation`（注释或标签）
  - `opacity`（透明度）
  - `cornerRadius`（圆角）
  - `zIndex`（绘制层级）等

***

## 完整示例

```tsx
const data = [
  { name: "Cachapa", sales: 9631 },
  { name: "Crêpe", sales: 6959 },
  { name: "Injera", sales: 4891 },
  { name: "Jian Bing", sales: 2506 },
  { name: "American", sales: 1777 },
  { name: "Dosa", sales: 625 },
]

<PieChart
  marks={data.map(item => ({
    category: item.name,
    value: item.sales
  }))}
/>
```

***

## 适用场景

`PieChart` 适合用于：

- 展示固定分类的占比关系
- 表达销售构成、投票分布、市场份额等
- 可视化整体数据在不同部分间的拆分情况
