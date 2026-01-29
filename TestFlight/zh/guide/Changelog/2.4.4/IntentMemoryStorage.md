IntentMemoryStorage 是一个用于 **在多个 AppIntent 执行之间保留临时数据** 的内存存储系统。然而，它的生命周期并不严格绑定在单次 AppIntent 或 Script.exit 以上，而是由系统对 Extension 环境（Intent Extension / Widget Extension）的运行状态决定，因此具有一定的非确定性。

以下文档基于你之前确认的完整版结构，并加入系统行为的解释。

***

# 概述

在 Scripting 中，每个 AppIntent 都运行在其所属脚本的 **脚本执行上下文（Script Execution Context）** 中。当 AppIntent 的 `perform()` 执行完成，或在 `intent.tsx` 中调用 `Script.exit()` 时，当前 AppIntent 的执行流程会结束。

但关键点是：

**IntentMemoryStorage 不会在 AppIntent 或 Script.exit 结束时被立即销毁**

它的生命周期依赖于：

- 系统是否继续保留当前 Extension 进程
- 系统是否因为内存压力或其他策略回收 Extension
- Widget 或 Live Activity 是否仍在使用同一 Extension

因此：

- 在 Shortcuts 再次运行同一个脚本时
  **有可能读取到上次设置的 MemoryStorage 值**
- 在 Widget 或 Live Activity 中调用 AppIntent
  **同一个脚本的 JS Context 可能被重用，因此 MemoryStorage 也会保留**
- 系统何时清除 MemoryStorage **不可预测**

MemoryStorage 的本质是：

**存储在当前 Extension 进程中的短期内存，非持久化、非可靠、非严格会话级**

***

# 作用范围（Scopes）

IntentMemoryStorage 提供两类存储区域：

## 1. 脚本级（Script-scoped）存储

默认行为。

- 属于单个脚本项目
- 脚本 A 不能访问脚本 B 的脚本级存储
- Extension 不被系统销毁时，会保留该脚本的存储
- Extension 一旦被销毁，存储也随之清空

适用于该脚本内部多步骤流程。

***

## 2. 共享（Shared）存储

使用 `{ shared: true }` 可访问一个共享区域：

- 所有脚本的 AppIntent 都可访问
- 在 Extension 未被系统释放前可以持续存在
- Extension 被销毁后清空

适合在多个脚本之间协调状态。

***

# Extension 生命周期与 JS Context 行为

## 情况一：在 Shortcuts 中运行 Intent

- Shortcuts 执行完成后：

  - 当前 JS Context 会被销毁
  - 当前 AppIntent 执行结束
- 但：**IntentMemoryStorage 不一定被销毁**
  因为系统未必会立即销毁 Intent Extension

因此：

### 再次运行同一个脚本时，可能读到上次的数据。

例：

```ts
IntentMemoryStorage.set("color", "red")
```

下一次 Shortcut 再运行时：

```ts
const c = IntentMemoryStorage.get("color")
```

可能仍然得到 `"red"`。

这是系统层面的行为，并非 Scripting 的行为。

***

## 情况二：在小组件（Widget/Control Widget）中调用 AppIntent

Widget Extension 的特点：

- Scripting 会尽量复用 JS Context
- 即使 AppIntent 执行结束，JS Context 也可能继续存在
- 因此 MemoryStorage 也可能持续存在

但：

### 系统随时可能回收 Extension（尤其在内存压力下），JS Context 和 MemoryStorage 都会被清空。

***

## 情况三：Live Activity 调用 AppIntent

Live Activity Extension 也可能复用上下文：

- 多次调用 AppIntent 通常复用同一 JS Context
- MemoryStorage 可能继续保留
- 但系统没有保证稳定性
- 扩展环境被杀死后 MemoryStorage 立即失效

***

## 总结生命周期（非常关键）

| 行为                         | 是否导致 MemoryStorage 清空 |
| -------------------------- | --------------------- |
| AppIntent 执行结束             | 否                     |
| Script.exit()              | 否                     |
| Shortcut 流程结束              | 不一定                   |
| Widget 更新 AppIntent        | 不一定                   |
| Live Activity 调用 AppIntent | 不一定                   |
| 系统回收 Extension 进程          | 是（彻底清空）               |

MemoryStorage 的生命周期与 **Extension 进程生命周期** 完全一致，而 Extension 何时被系统保留/销毁是不可预测的系统行为。

***

# API 定义

```ts
namespace IntentMemoryStorage {
  function get<T>(key: string, options?: { shared?: boolean }): T | null
  function set(key: string, value: any, options?: { shared?: boolean }): void
  function remove(key: string, options?: { shared?: boolean }): void
  function contains(key: string, options?: { shared?: boolean }): boolean
  function clear(): void
  function keys(): string[]
}
```

说明：

- `shared` 仅作用于 get / set / remove / contains
- clear() 和 keys() 始终只针对脚本级存储区域

***

# API 详细说明

## get

```ts
function get<T>(key: string, options?: { shared?: boolean }): T | null
```

读取键值。注意：

- 若 Extension 尚未被销毁，则可能读到上一次执行留下的值
- 若系统已清理 Extension，则可能返回 null

脚本级：

```ts
const color = IntentMemoryStorage.get<string>("color")
```

shared：

```ts
const token = IntentMemoryStorage.get<string>("token", { shared: true })
```

***

## set

```ts
function set(key: string, value: any, options?: { shared?: boolean }): void
```

写入存储区域。

脚本级：

```ts
IntentMemoryStorage.set("color", "systemBlue")
```

shared：

```ts
IntentMemoryStorage.set("sessionID", "abc123", { shared: true })
```

***

## remove

```ts
function remove(key: string, options?: { shared?: boolean }): void
```

删除键值。

脚本级：

```ts
IntentMemoryStorage.remove("color")
```

shared：

```ts
IntentMemoryStorage.remove("sessionID", { shared: true })
```

***

## contains

```ts
function contains(key: string, options?: { shared?: boolean }): boolean
```

检查键是否存在。
注意：此结果取决于当前 Extension 是否仍在。

***

## clear

```ts
function clear(): void
```

清空脚本级存储。
shared 区域不会被清空。

***

## keys

```ts
function keys(): string[]
```

返回脚本级存储的 key 列表。

***

# 使用场景

## 脚本级（默认）

适用于：

- 单脚本的多步骤流程
- 融合 SnippetIntent → AppIntent → SnippetIntent
- 临时保存当前 UI 状态、表单数据、步骤编号

示例：

```ts
IntentMemoryStorage.set("step", 2)
```

***

## shared（跨脚本）

适用于：

- 多脚本协同
- 工作流中跨多个项目传递会话状态
- 保存当前 Shortcut 全局状态

示例：

```ts
IntentMemoryStorage.set("workflowID", "xyz", { shared: true })
```

***

# 不适用用途

- 不保证一定存在
- 不保证一定被清理
- 不适合存储大对象
- 不适合存储持久数据
- 不适合跨天或长期使用（可能在任何时间丢失）

推荐持久方案：

- `Storage`
- `FileManager`

***

# 示例

## 脚本级示例

```ts
IntentMemoryStorage.set("color", "red")

const color = IntentMemoryStorage.get<string>("color")
```

***

## shared 跨脚本示例

Script A：

```ts
IntentMemoryStorage.set("sessionID", "12345", { shared: true })
```

Script B：

```ts
const id = IntentMemoryStorage.get<string>("sessionID", { shared: true })
```

***

# 存储结构示例

脚本级：

```json
{
  "color": "green",
  "step": 2
}
```

shared：

```json
{
  "token": "xyz"
}
```

***

# 最佳实践

- 不保证 MemoryStorage 一定存在或一定被清理
- 不要用于关键数据
- 不要用于大数据存储
- 对 shared 使用清晰命名，例如：

  - `"global.sessionID"`
  - `"workflow.status"`
- 在依赖该存储前考虑数据可能不存在
