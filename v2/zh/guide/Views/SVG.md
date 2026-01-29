# SVG

`SVG` 是一个用于显示 SVG 矢量图像的视图组件，支持从以下三种来源加载 SVG 内容：

- **网络图片 URL**
- **本地文件路径**
- **内联 SVG 代码**

SVG 图像在显示时会作为位图进行渲染（不再支持矢量绘制）。你可以选择以模板图像的方式渲染，从而实现着色功能。

***

## 使用方式

```tsx
import { SVG } from 'scripting'
```

***

## Props（属性）

### 图像来源（3选1，必须指定一个）

| 属性         | 类型                                     | 说明                 |
| ---------- | -------------------------------------- | ------------------ |
| `url`      | `string \| DynamicImageSource<string>` | 从网络 URL 加载 SVG 图像  |
| `filePath` | `string \| DynamicImageSource<string>` | 从本地文件路径加载 SVG 图像   |
| `code`     | `string \| DynamicImageSource<string>` | 使用内联 SVG 字符串代码渲染图像 |

注意：以上三个属性**互斥**，只能设置其中一个。

***

### 图像渲染行为（ImageRenderingBehaviorProps）

| 属性                            | 类型                                      | 默认值          | 说明                                           |
| ----------------------------- | --------------------------------------- | ------------ | -------------------------------------------- |
| `resizable`                   | `boolean \| object`                     | `false`      | 控制图像是否自适应尺寸（详见下方）                            |
| `renderingMode`               | `'original' \| 'template'`              | `'original'` | 设置图像渲染模式，`template` 可使用 `foregroundColor` 着色 |
| `interpolation`               | `'none' \| 'low' \| 'medium' \| 'high'` | `'medium'`   | 设置图像缩放时的插值质量                                 |
| `antialiased`                 | `boolean`                               | `false`      | 是否开启抗锯齿边缘渲染                                  |
| `widgetAccentedRenderingMode` | `WidgetAccentedRenderingMode`           | -            | 控制在 Widget 的强调模式下的图像渲染方式（仅 Widget 有效）        |

***

### `resizable` 属性详细说明

| 类型                            | 含义                          |
| ----------------------------- | --------------------------- |
| `true`                        | 使用默认拉伸模式使图像适应容器大小           |
| `false`                       | 不对图像进行缩放                    |
| `{ capInsets, resizingMode }` | 设置切片边距和缩放模式（用于九宫格图像或复杂缩放需求） |

***

## 示例

### 从本地文件加载 SVG 并作为模板图像渲染

```tsx
<SVG
  filePath="/path/to/local/image.svg"
  resizable
  frame={{ width: 50, height: 50 }}
  renderingMode="template"
  foregroundColor="red"
/>
```

***

### 使用内联 SVG 代码渲染图像

```tsx
<SVG
  code={`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>`}
  frame={{ width: 100, height: 100 }}
/>
```

***

## 注意事项

- `SVG` 图像现在统一以**位图方式渲染**，不再支持 `vectorDrawing` 属性。
- 若希望对图像进行着色，可设置 `renderingMode="template"` 并搭配 `foregroundColor`。
- 所有图像来源字段（`url`、`filePath`、`code`）只能设置一个，不能同时使用。
