# 形状

`Shape` 类型用于定义视图的裁剪形状或背景形状，常用于 `clipShape`、`background`、`border` 等修饰符中，对应 SwiftUI 中的 `Shape` 协议。支持内建关键字形状，也支持自定义圆角矩形（包括统一圆角、椭圆角或每个角独立控制）。

***

## 内建形状

### `'rect'`（矩形）

标准矩形，默认无圆角。如需圆角请使用对象形式配置。

```tsx
clipShape="rect"
```

***

### `'circle'`（圆形）

在视图框架中居中显示的圆形，半径等于视图框架最短边的一半。

```tsx
clipShape="circle"
```

***

### `'capsule'`（胶囊）

填充整个宽度或高度的椭圆形。等效于圆角半径为短边一半的矩形。

```tsx
clipShape="capsule"
```

***

### `'ellipse'`（椭圆）

在视图框架中对齐并填满的椭圆。

```tsx
clipShape="ellipse"
```

***

### `'buttonBorder'`（按钮边框）

一个系统定义的按钮边框形状，具体外观由平台和上下文决定。

```tsx
clipShape="buttonBorder"
```

***

### `'containerRelative'`（继承容器）

继承父级容器定义的形状作为自身形状。如果未定义容器形状，则默认为矩形。

```tsx
clipShape="containerRelative"
```

***

## 自定义矩形形状（圆角矩形）

当你需要更精细地控制圆角半径或不同角的圆角时，可以使用以下三种对象形式：

***

### 统一圆角矩形

```ts
{
  type: 'rect',
  cornerRadius: number,
  style?: RoundedCornerStyle
}
```

- `cornerRadius`: 所有角的统一圆角半径。
- `style`（可选）: 圆角风格，可选 `'circular'` 或 `'continuous'`。

#### 示例：

```tsx
clipShape={{
  type: 'rect',
  cornerRadius: 12,
  style: 'continuous'
}}
```

***

### 椭圆角尺寸（宽高不同）

```ts
{
  type: 'rect',
  cornerSize: {
    width: number
    height: number
  },
  style?: RoundedCornerStyle
}
```

- 使用不同的 `width` 和 `height` 来生成椭圆形圆角。

#### 示例：

```tsx
clipShape={{
  type: 'rect',
  cornerSize: { width: 10, height: 20 }
}}
```

***

### 每个角分别设置圆角半径

```ts
{
  type: 'rect',
  cornerRadii: {
    topLeading: number,
    topTrailing: number,
    bottomLeading: number,
    bottomTrailing: number
  },
  style?: RoundedCornerStyle
}
```

- 分别指定四个角的圆角半径。

#### 示例：

```tsx
clipShape={{
  type: 'rect',
  cornerRadii: {
    topLeading: 10,
    topTrailing: 20,
    bottomLeading: 0,
    bottomTrailing: 30
  }
}}
```

***

## `RoundedCornerStyle`（圆角风格）

可选参数，用于定义圆角的表现风格：

- `"circular"`: 传统的圆形圆角，适合经典 UI。
- `"continuous"`（默认）: 连续平滑的圆角曲线，适用于现代设计风格。

***

## 总结表

| 形状类型                  | 描述说明                                        |
| --------------------- | ------------------------------------------- |
| `'rect'`              | 普通矩形                                        |
| `'circle'`            | 基于最短边生成的居中圆形                                |
| `'capsule'`           | 胶囊形状，适应整个宽或高                                |
| `'ellipse'`           | 填满框架的椭圆                                     |
| `'buttonBorder'`      | 系统决定的按钮边框形状                                 |
| `'containerRelative'` | 继承容器的形状或使用矩形作为默认                            |
| 自定义 `'rect'`          | 通过 cornerRadius、cornerSize 或 cornerRadii 配置 |
