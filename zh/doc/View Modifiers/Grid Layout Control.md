# 网格布局控制

这些修饰符用于控制视图在 `Grid` 网格布局中的行为，包括单元格的跨列、对齐方式、尺寸限制等，适用于构建灵活且精细的二维界面布局。

***

### `gridCellColumns`

设置某个视图在网格中跨越的列数。

#### 类型

```ts
gridCellColumns?: number
```

#### 说明

用于让单个视图占据多个列，常见用法包括用作区块标题或需要额外水平空间的内容。

#### 示例

```tsx
<Grid>
  <GridRow>
    <Text gridCellColumns={2}>跨越两列的文本</Text>
  </GridRow>
  <GridRow>
    <Text>单元格 A</Text>
    <Text>单元格 B</Text>
  </GridRow>
</Grid>
```

***

### `gridCellAnchor`

设置当前视图在网格单元格内的对齐锚点。

#### 类型

```ts
gridCellAnchor?: KeywordPoint | Point
```

#### 说明

使用关键词（如 `"center"`、`"topLeading"`）或自定义点（如 `{ x: 0.5, y: 0.0 }`）来控制该视图在其单元格中的对齐位置。

#### 示例

```tsx
<Grid>
  <GridRow>
    <Text gridCellAnchor="topLeading">顶部左对齐</Text>
  </GridRow>
</Grid>
```

***

### `gridCellUnsizedAxes`

阻止网格在指定方向上为视图分配额外空间。

#### 类型

```ts
gridCellUnsizedAxes?: AxisSet
```

#### 说明

此修饰符用于告诉网格布局：不要在特定方向（水平或垂直）扩展该视图的尺寸，使其内容尺寸更紧凑。

#### 可选值

- `"horizontal"` – 禁止水平扩展
- `"vertical"` – 禁止垂直扩展
- `"all"` – 禁止两个方向的扩展

#### 示例

```tsx
<Grid>
  <GridRow>
    <Image
      gridCellUnsizedAxes="horizontal"
      imageUrl="https://example.com/icon.png"
    />
    <Text>图标说明</Text>
  </GridRow>
</Grid>
```

***

### `gridColumnAlignment`

设置该视图所在列的水平对齐方式。

#### 类型

```ts
gridColumnAlignment?: "leading" | "center" | "trailing"
```

#### 说明

此修饰符将影响该列中所有视图的水平对齐方式。通常只需要对列中的第一个视图设置即可。

#### 示例

```tsx
<Grid>
  <GridRow>
    <Text gridColumnAlignment="trailing">右对齐列</Text>
    <Text>下一单元格</Text>
  </GridRow>
</Grid>
```

***

## Grid 与 GridRow 结构说明

上述修饰符需在 `Grid` 和 `GridRow` 结构内使用，结构类似 SwiftUI 的 `Grid` 布局系统。

### `Grid`

二维容器，按照行和列排列子视图。

#### 可用属性

- `alignment?: Alignment` — 网格中单元格的默认对齐方式
- `horizontalSpacing?: number` — 列之间的水平间距
- `verticalSpacing?: number` — 行之间的垂直间距

#### 示例

```tsx
<Grid>
  <GridRow>
    <Text>Hello</Text>
    <Image systemName="globe" />
  </GridRow>
  <Divider />
  <GridRow>
    <Image systemName="hand.wave" />
    <Text>World</Text>
  </GridRow>
</Grid>
```

### `GridRow`

表示网格中的一行，包含若干水平排列的单元格。

#### 可用属性

- `alignment?: VerticalAlignment` — 控制整行中内容的垂直对齐方式

***

## 总结

| 修饰符                   | 功能描述              |
| --------------------- | ----------------- |
| `gridCellColumns`     | 设置视图跨越的列数         |
| `gridCellAnchor`      | 设置视图在单元格中的对齐锚点    |
| `gridCellUnsizedAxes` | 指定视图不在特定方向上自动扩展   |
| `gridColumnAlignment` | 控制当前列中所有视图的水平对齐方式 |
