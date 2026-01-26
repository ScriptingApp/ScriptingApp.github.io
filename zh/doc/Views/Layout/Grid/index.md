# 网格布局（Grid）

**Scripting 应用**中的 `Grid` 组件提供了一个灵活的容器，用于将子视图排列为二维网格布局。它支持自定义对齐、间距以及嵌套子组件，从而创建美观的布局。

***

### `Grid` 组件

一个容器视图，用于将其他视图排列为二维布局。

### 导入路径

```ts
import { Grid, GridRow } from 'scripting'
```

***

### 类型：`GridProps`

| 属性                  | 类型                                                                                            | 默认值      | 描述                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| `alignment`         | `Alignment`                                                                                   | `center` | 子视图在每个网格单元格中的对齐方式。可选值包括 `leading`（靠左对齐）、`center`（居中对齐）或 `trailing`（靠右对齐）。 |
| `horizontalSpacing` | `number`                                                                                      | 平台默认值    | 每个单元格之间的水平距离（以点为单位）。如果未设置，则为平台定义的默认值。                                     |
| `verticalSpacing`   | `number`                                                                                      | 平台默认值    | 每个单元格之间的垂直距离（以点为单位）。如果未设置，则为平台定义的默认值。                                     |
| `children`          | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | N/A      | 要在网格中排列的子组件或节点。                                                           |

***

### `GridRow` 组件

`Grid` 的子组件，表示网格布局中的水平行。使用 `GridRow` 可水平分组并对齐网格中的子视图。

***

### 类型：`GridRowProps`

| 属性          | 类型                                                                                            | 默认值      | 描述                                                           |
| ----------- | --------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| `alignment` | `VerticalAlignment`                                                                           | `center` | 将内容在行内垂直对齐。可选值包括 `top`（顶部对齐）、`center`（居中对齐）或 `bottom`（底部对齐）。 |
| `children`  | `(VirtualNode \| undefined \| null \| (VirtualNode \| undefined \| null)[])[] \| VirtualNode` | N/A      | 要在行内水平排列的子组件或节点。                                             |

***

## 使用示例

以下示例展示了如何使用 `Grid` 和 `GridRow` 组件创建包含行、文本、图像和分隔符的布局。

```tsx
<Grid
  alignment="center"
  horizontalSpacing={10}
  verticalSpacing={15}
>
  <GridRow alignment="center">
    <Text>Hello</Text>
    <Image systemName="globe" />
  </GridRow>
  <Divider />
  <GridRow alignment="bottom">
    <Image systemName="hand.wave" />
    <Text>World</Text>
  </GridRow>
</Grid>
```

**输出布局**

- **第一行：** 包含一个 `Text` 元素（“Hello”）和一个显示 `globe` 图标的 `Image`，垂直居中对齐。
- **分隔符：** 分隔两行。
- **第二行：** 包含一个显示 `wave` 图标的 `Image` 和一个 `Text` 元素（“World”），垂直底部对齐。

***

### 属性详细说明

1. **Grid: Alignment（对齐）**
   - 设置每个单元格内内容的对齐方式。
   - 可选值：
     - `leading`：内容对齐到单元格的起始位置。
     - `center`：内容居中对齐（默认值）。
     - `trailing`：内容对齐到单元格的结束位置。
   - 示例：
     ```tsx
     <Grid alignment="leading">
       <GridRow>
         <Text>Aligned to start</Text>
       </GridRow>
     </Grid>
     ```

2. **GridRow: Alignment（行对齐）**
   - 设置每行内容的垂直对齐方式。
   - 可选值：
     - `top`：内容对齐到行顶部。
     - `center`：内容垂直居中（默认值）。
     - `bottom`：内容对齐到行底部。
   - 示例：
     ```tsx
     <Grid>
       <GridRow alignment="top">
         <Text>Top-aligned</Text>
       </GridRow>
       <GridRow alignment="bottom">
         <Text>Bottom-aligned</Text>
       </GridRow>
     </Grid>
     ```

3. **水平和垂直间距**
   - 自定义单元格和行之间的间距。
   - 示例：
     ```tsx
     <Grid horizontalSpacing={5} verticalSpacing={20}>
       <GridRow>
         <Text>Item 1</Text>
         <Text>Item 2</Text>
       </GridRow>
     </Grid>
     ```

4. **Children（子组件）**
   - 接受任意组合的 `VirtualNode` 组件，包括 `Text`、`Image`、`GridRow` 和自定义组件。
   - 支持嵌套数组或空值，以便灵活创建动态布局。

***

## 嵌套组件

`Grid` 和 `GridRow` 组件可与其他支持的 UI 元素无缝结合使用：

- **`Divider`：** 在行之间添加视觉分隔。
- **`Text`、`Image` 和自定义组件：** 可将任意支持的 UI 组件作为 `GridRow` 的子元素。

***

## 图像示例

以下示例展示了输出布局的图像：

![Grid 示例](https://docs-assets.developer.apple.com/published/f20954fd2b30390306220984d444d0cf/Grid-2-iOS@2x.png)

此布局对应前述示例，显示了两行内容及一个分隔符。

***

## 注意事项

- **默认间距：** 水平和垂直间距值针对 iOS 进行了优化，但可根据具体设计需求进行自定义。
- **对齐选项：** 将 `Grid` 的单元格对齐与 `GridRow` 的垂直对齐结合使用，实现精确的布局控制。
- **动态布局：** `Grid` 和 `GridRow` 的灵活性使其适用于具有可变内容的响应式设计。

欢迎尝试使用不同的子组件和间距配置，创建适合您 UI 的定制设计！
