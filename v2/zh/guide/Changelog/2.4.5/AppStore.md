# AppStore

`AppStore` API 用于在 **不离开 Scripting 应用** 的情况下，展示 App Store 中某个应用的详情页面。
该能力基于系统原生的 App Store 展示组件，适合用于实现 **应用推荐、应用收藏夹、关联应用跳转、生态扩展入口** 等场景。

***

## 命名空间：`AppStore`

```ts
namespace AppStore
```

***

## 功能概述

- 在 Scripting App 内以 **模态窗口（Modal）** 方式展示指定 App 的 App Store 页面
- 用户可直接查看应用介绍、截图、评分、更新日志
- 用户可在该页面中完成 **下载 / 更新 / 打开应用**
- 关闭后自动返回当前脚本页面
- 不会跳转到系统 App Store 应用

***

## 方法一览

| 方法                       | 说明                      |
| ------------------------ | ----------------------- |
| `presentApp(id: string)` | 打开指定 App 的 App Store 页面 |
| `dismissApp()`           | 主动关闭当前展示的 App Store 页面  |

***

## 方法说明

### `presentApp(id: string): Promise<void>`

在 Scripting App 内展示指定 App 的 App Store 页面。

#### 参数

| 参数   | 类型       | 说明                              |
| ---- | -------- | ------------------------------- |
| `id` | `string` | App 的 **App Store 标识符（App ID）** |

- 该 ID 是 App Store 中的数字 ID
- 通常可从 App Store URL 中获取
  例如：
  `https://apps.apple.com/app/id123456789`
  则 `id` 为 `"123456789"`

#### 返回值

- 返回一个 `Promise<void>`
- 当用户 **关闭 App Store 模态页面** 时，Promise resolve
- 如果当前已经有一个 App Store 页面在展示中，则会抛出错误

#### 行为说明

- 以模态方式打开 App Store 页面
- 同一时间 **只能存在一个 App Store 模态窗口**
- 如果重复调用 `presentApp`，将导致 Promise reject

#### 示例

```ts
await AppStore.presentApp("123456789")
```

***

### `dismissApp(): Promise<void>`

关闭当前通过 `presentApp` 打开的 App Store 页面。

#### 返回值

- 返回一个 `Promise<void>`
- 当模态页面成功关闭后 resolve

#### 使用说明

- 一般情况下不需要手动调用
- 适用于：

  - 自定义 UI 控制关闭行为
  - 脚本中需要在特定逻辑点强制关闭 App Store 页面

#### 示例

```ts
await AppStore.dismissApp()
```

***

## 使用示例

### 示例一：应用推荐入口

```ts
import { Button } from "scripting"

function AppRecommendation() {
  return (
    <Button
      title="查看推荐应用"
      action={() => {
        AppStore.presentApp("123456789")
      }}
    />
  )
}
```

***

### 示例二：应用收藏夹

```ts
const favoriteApps = [
  { name: "App A", id: "123456789" },
  { name: "App B", id: "987654321" }
]

function AppList() {
  return favoriteApps.map(app => (
    <Button
      title={app.name}
      action={() => {
        AppStore.presentApp(app.id)
      }}
    />
  ))
}
```

***

## 错误与注意事项

### 常见错误

- **已有 App Store 页面正在展示**

  - 再次调用 `presentApp` 会抛出错误
  - 建议在逻辑层控制调用时机

### 使用限制

- 仅支持 App Store 应用页面
- 不支持展示订阅页、开发者主页等其他 App Store 内容
- 必须传入有效的 App Store App ID
