# 前景色和背景样式

`foregroundStyle` 和 `background` 是用于设置视图前景与背景视觉效果的两个常用属性，支持颜色、渐变、系统材质，以及深浅模式自动切换等丰富的样式能力。

***

## `foregroundStyle`

### 定义

```ts
foregroundStyle?: ShapeStyle | DynamicShapeStyle | {
  primary: ShapeStyle | DynamicShapeStyle
  secondary: ShapeStyle | DynamicShapeStyle
  tertiary?: ShapeStyle | DynamicShapeStyle
}
```

用于设置视图前景的样式，如文字、图形或符号的颜色。支持单一样式或三层样式（primary、secondary、tertiary），可用于 SF Symbols 或富文本等需要多层渲染的内容。

### 示例

#### 基础颜色前景

```tsx
<Text foregroundStyle="white">
  Hello World!
</Text>
```

#### 动态前景色（根据深浅模式切换）

```tsx
<Text
  foregroundStyle={{
    light: "black",
    dark: "white"
  }}
>
  自适应文本
</Text>
```

#### 多层前景样式

```tsx
<Text
  foregroundStyle={{
    primary: "red",
    secondary: "orange",
    tertiary: "yellow"
  }}
>
  多层样式
</Text>
```

> 多层样式常用于 SF Symbols 或支持图层渲染的系统图标。

***

## `background`

### 定义

```ts
background?: 
  | ShapeStyle 
  | DynamicShapeStyle 
  | { style: ShapeStyle | DynamicShapeStyle, shape: Shape }
  | VirtualNode 
  | { content: VirtualNode, alignment: Alignment }
```

设置视图的背景。支持使用颜色、渐变、材质等样式，也可以自定义形状或组件作为背景，甚至指定对齐方式。

### 支持格式说明

1. **`ShapeStyle`**：颜色、渐变或材质等。
2. **`DynamicShapeStyle`**：根据系统深浅模式切换样式。
3. **`shape + style`**：将样式应用于指定形状，如圆角矩形。
4. **`VirtualNode`**：使用另一个组件作为背景。
5. **`content + alignment`**：设置背景内容并指定对齐方式。

### 示例

#### 纯色背景

```tsx
<Text background="systemBlue">
  Hello
</Text>
```

#### 渐变背景

```tsx
<Text
  background={{
    gradient: [
      { color: "purple", location: 0 },
      { color: "blue", location: 1 }
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 }
  }}
>
  渐变背景
</Text>
```

#### 动态背景（根据系统模式自动切换）

```tsx
<Text
  background={{
    light: "white",
    dark: "black"
  }}
>
  模式自适应背景
</Text>
```

#### 使用形状作为背景

```tsx
<Text
  background={
    <RoundedRectangle fill="systemBlue" />
  }
>
  Hello World!
</Text>
```

#### 自定义背景内容与对齐方式

```tsx
<Text
  background={{
    content: <Image filePath="path/to/background.jpg" />,
    alignment: "center"
  }}
>
  覆盖文字
</Text>
```

***

## 相关类型说明

- **`ShapeStyle`**
  定义颜色、渐变或材质的样式，可使用字符串颜色（如 `"red"`、`"#FF0000"`）、渐变对象、系统材质等。

- **`DynamicShapeStyle`**
  根据浅色或深色模式分别定义不同的样式，系统自动切换。

- **`VirtualNode`**
  表示一个视图组件，例如 `<Image />`、`<RoundedRectangle />` 等 JSX 元素。

- **`Shape`**
  用于设置背景形状，如 `RoundedRectangle`、`Circle`、`Capsule` 等。

***

## 小结

| 属性名称              | 功能描述          | 支持的类型说明                                       |
| ----------------- | ------------- | --------------------------------------------- |
| `foregroundStyle` | 设置前景样式（如文字颜色） | `ShapeStyle`、`DynamicShapeStyle` 或三层样式对象      |
| `background`      | 设置背景内容        | `ShapeStyle`、`DynamicShapeStyle`、形状样式、组件或对齐配置 |

通过灵活使用 `foregroundStyle` 与 `background`，你可以快速构建出具有丰富视觉表现力且适应系统样式的 UI 界面。
