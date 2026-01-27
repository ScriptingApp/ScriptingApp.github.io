# 分类折线图（LineCategoryChart）

`LineCategoryChart` 是一款用于展示多类别折线图的组件，支持在共享的标签轴上，对多个分类的数值趋势进行对比。每条折线代表一个分类，其在每个标签上的数值以点连接成线。

此图表非常适合可视化多个子类别（如产品线、部门、地区）在某些阶段、步骤或时间点上的对比和变化趋势。

***

## 示例场景

本示例展示了多个部门（如 `Production`、`Marketing`、`Finance`）的数值表现，并通过三条线分别代表不同的产品分类（`Gizmos`、`Gadgets`、`Widgets`）。

***

## 使用方式

```tsx
<LineCategoryChart
  labelOnYAxis={false}
  marks={[
    { label: "Production", value: 4000, category: "Gizmos" },
    { label: "Marketing", value: 2000, category: "Gizmos" },
    ...
  ]}
/>
```

***

## 属性说明

### `labelOnYAxis?: boolean`

- 如果为 `true`，标签（如 `"Production"`、`"Marketing"`）显示在 **Y 轴**，折线图将以 **横向** 展示。
- 默认为 `false`，标签显示在 **X 轴**，折线图以 **纵向** 展示。

***

### `marks: Array<object>` **（必填）**

每个数据项表示图表中的一个点，需包含以下字段：

- `label: string | Date`
  标签轴的值（例如：阶段、部门、月份），所有分类共享此轴。

- `value: number`
  此分类在该标签位置上的数值。

- `category: string`
  分类标识，相同分类的点将自动连接成一条折线。

此外还支持 `ChartMarkProps` 中的样式扩展字段，如：

- `foregroundStyle`（颜色）
- `symbol`（标记符号）
- `annotation`（注释）等

***

## 完整示例

```tsx
const data = [
  { label: "Production", value: 4000, category: "Gizmos" },
  { label: "Marketing", value: 2000, category: "Gizmos" },
  { label: "Finance", value: 2000.5, category: "Gizmos" },

  { label: "Production", value: 5000, category: "Gadgets" },
  { label: "Marketing", value: 1000, category: "Gadgets" },
  { label: "Finance", value: 3000, category: "Gadgets" },

  { label: "Production", value: 6000, category: "Widgets" },
  { label: "Marketing", value: 5000.9, category: "Widgets" },
  { label: "Finance", value: 5000, category: "Widgets" },
]

<LineCategoryChart
  labelOnYAxis={labelOnYAxis}
  marks={data}
/>
```

***

## 适用场景

`LineCategoryChart` 适合用于：

- 展示多个分类在各阶段的趋势对比
- 可视化结构化标签（如月份、部门、步骤）上的分类数据演变
- 比较多维业务指标（如营收、预算、产能等）的走势
