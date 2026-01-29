# 小组件 API

`Widget` 类提供了一组静态方法和属性，用于在 Scripting app 中创建、预览和刷新主屏幕小组件。通过此 API，可以渲染小组件 UI，访问用户配置参数，并控制小组件的刷新策略。

***

## 类：`Widget`

此类为静态类，不能实例化，所有成员均为静态。

***

### 静态属性

#### `Widget.family: WidgetFamily`

获取用户当前配置的小组件尺寸类型（即小组件的 family）。
常见取值包括：

- `"systemSmall"` – 小尺寸组件
- `"systemMedium"` – 中尺寸组件
- `"systemLarge"` – 大尺寸组件
- `"accessoryRectangular"` – 锁屏矩形组件
- `"accessoryCircular"` – 锁屏圆形组件

> **类型：** `WidgetFamily`

***

#### `Widget.displaySize: WidgetDisplaySize`

获取当前小组件的显示尺寸（单位为点）。根据小组件的 family 和设备分辨率决定具体大小。

> **类型：** `{ width: number; height: number }`

***

#### `Widget.parameter: string`

如果用户在主屏幕小组件中设置了 `参数` 字段，并通过点击该小组件打开并运行脚本，可以通过该属性访问该参数的值。
适用于根据不同用户配置动态渲染不同的小组件内容。

> **类型：** `string`

***

### 静态方法

#### `Widget.present(element: VirtualNode, reloadPolicy?: WidgetReloadPolicy): void`

用于在小组件上渲染 UI。传入一个 React 风格的 JSX 节点（即 VirtualNode）作为渲染内容。可选地传入刷新策略以控制 WidgetKit 请求新时间线的时机。

##### 参数说明

- `element` (`VirtualNode`) – 小组件 UI 的 JSX 树。
- `reloadPolicy` (`WidgetReloadPolicy`，可选) – 控制 WidgetKit 请求新时间线的策略，默认为 `atEnd`。

##### 示例

```tsx
function WidgetView() {
  return <VStack>
    <Image
      systemName="globe"
      resizable
      scaleToFit
      frame={{
        width: 28,
        height: 28
      }}
    />
    <Text>Hello Scripting!</Text>
  </VStack>
}

Widget.present(<WidgetView />, {
  policy: "after",
  date: new Date(Date.now() + 1000 * 60 * 5) // 5分钟后刷新
})
```

> **返回值：** `void`

***

#### `Widget.preview(options?: PreviewOptions): Promise<void>`

用于在 `index.tsx` 中预览小组件效果。可以为小组件配置不同参数选项，模拟其在不同参数下的外观。
此方法仅支持在 `index.tsx` 中调用，在 `widget.tsx` 或 `intent.tsx` 中不可用。

##### 参数说明

- `options`（可选）– 预览配置项。

```ts
interface PreviewOptions {
  family?: WidgetFamily
  parameters?: {
    options: Record<string, string> // 参数名到 JSON 字符串的映射
    default: string                 // 默认使用的参数键
  }
}
```

##### 示例

```tsx
const options = {
  "Param 1": JSON.stringify({ color: "red" }),
  "Param 2": JSON.stringify({ color: "blue" }),
}

await Widget.preview({
  family: "systemSmall",
  parameters: {
    options,
    default: "Param 1"
  }
})
console.log("Widget preview dismissed")
```

> **返回值：** `Promise<void>`
> 如果参数设置不正确，将抛出异常。

***

#### `Widget.reloadAll(): void`

请求 WidgetKit 重新加载所有由 Scripting 创建的小组件时间线。
在小组件依赖的数据变化时调用此方法可以立即触发刷新。

> **返回值：** `void`

***

## 相关类型

### `WidgetFamily`

表示小组件的尺寸类型：

```ts
type WidgetFamily =
  | "systemSmall"
  | "systemMedium"
  | "systemLarge"
  | "accessoryCircular"
  | "accessoryRectangular"
```

***

### `WidgetDisplaySize`

表示小组件当前的显示尺寸（单位：点）：

```ts
interface WidgetDisplaySize {
  width: number
  height: number
}
```

***

### `WidgetReloadPolicy`

定义小组件的刷新策略：

```ts
type WidgetReloadPolicy =
  | { policy: "atEnd" } // 时间线结束后刷新（默认）
  | { policy: "after", date: Date } // 指定时间之后刷新
```

***

## 使用说明

- `Widget.present` 应在 `widget.tsx` 中调用，用于定义和显示小组件实际内容。
- `Widget.preview` 仅用于 `index.tsx` 中测试和预览小组件，不会被系统实际渲染。
- 使用 `Widget.parameter` 时，若参数为结构化数据（如对象），需使用 `JSON.parse()` 解析。
- 脚本结束后应调用 `Script.exit()` 以确保小组件正常退出。

***

如需导出为 Markdown 文档或用于帮助中心，请告诉我，我可以为你生成格式化版本。
