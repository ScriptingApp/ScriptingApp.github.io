---
title: 本地存储
description: 为简单数据提供持久化存储。
---

`Storage` 模块为脚本提供轻量级的持久化存储能力。
开发者可以在脚本中保存与读取简单的数据类型（如字符串、数字、布尔值、JSON 对象）以及二进制数据（`Data`）。

所有数据默认存储在 **当前脚本的私有存储域**，不会被其他脚本访问。
若希望在多个脚本之间共享数据，可将 `shared: true` 作为选项传入，使数据写入 **共享存储域**。

数据会在后台异步持久化到磁盘，但写入方法同步返回执行结果。

---

## 支持的数据类型

Storage 支持以下类型的数据：

- `string`
- `number`
- `boolean`
- `JSON`（符合 JSON 可序列化类型的结构）
- `Data`（需使用 `setData` / `getData`）

以上类型均可安全持久化。

---

## 存储域说明

| 类型            | 默认                        | 可访问性         | 适用场景                                   |
| --------------- | --------------------------- | ---------------- | ------------------------------------------ |
| 私有（Private） | 是                          | 仅当前脚本       | 保存当前脚本的配置、状态、用户数据等       |
| 共享（Shared）  | 否（需设置 `shared: true`） | 所有脚本都可访问 | 多脚本之间共享数据，如全局设置、用户偏好等 |

---

## API 参考

## 1. `Storage.set(key, value, options?)`

```ts
function set<T>(key: string, value: T, options?: { shared: boolean }): boolean;
```

将值保存到持久化存储中。支持 `string`、`number`、`boolean` 和 `JSON` 类型。

### 参数

| 名称           | 类型      | 必须 | 说明                                |
| -------------- | --------- | ---- | ----------------------------------- |
| key            | `string`  | 是   | 要保存的键名                        |
| value          | `T`       | 是   | 要持久化的值                        |
| options.shared | `boolean` | 否   | 如果为 `true`，将数据写入共享存储域 |

### 返回值

- `boolean`：表示操作是否成功。

---

## 2. `Storage.get(key, options?)`

```ts
function get<T>(key: string, options?: { shared: boolean }): T | null;
```

读取已保存的值。如果不存在，返回 `null`。

### 参数

| 名称           | 类型      | 必须 | 说明                 |
| -------------- | --------- | ---- | -------------------- |
| key            | `string`  | 是   | 要读取的键名         |
| options.shared | `boolean` | 否   | 是否从共享存储域读取 |

### 返回值

- `T | null`：对应的值或 `null`。

---

## 3. `Storage.setData(key, data, options?)`

```ts
function setData(key: string, data: Data, options?: { shared: boolean }): void;
```

保存二进制数据 `Data` 到持久化存储。

### 参数

- 与 `set` 的参数格式一致，但 `value` 替换为 `Data`。

---

## 4. `Storage.getData(key, options?)`

```ts
function getData(key: string, options?: { shared: boolean }): Data | null;
```

读取保存的二进制数据。不存在时返回 `null`。

---

## 5. `Storage.remove(key, options?)`

```ts
function remove(key: string, options?: { shared: boolean }): void;
```

移除指定键的数据。

---

## 6. `Storage.contains(key, options?)`

```ts
function contains(key: string, options?: { shared: boolean }): boolean;
```

检测存储中是否包含某个键。

---

## 7. `Storage.clear()`

```ts
function clear(): void;
```

清空所有存储的键值对。
**注意：该操作仅清空当前脚本的私有存储，不会影响共享存储域。**

---

## 8. `Storage.keys()`

```ts
function keys(): string[];
```

返回当前存储域中所有键名数组。

---

## 使用示例

## 示例 1：保存与读取简单类型

```ts
import { Storage } from "scripting";

Storage.set("username", "Thom");
const name = Storage.get<string>("username");
console.log(name); // "Thom"
```

---

## 示例 2：保存 JSON 对象

```ts
Storage.set("profile", {
  name: "Alice",
  age: 30,
});

const profile = Storage.get<{ name: string; age: number }>("profile");
console.log(profile?.age); // 30
```

---

## 示例 3：保存与读取 Data

```ts
import { Data, Storage } from "scripting";

const bytes = Data.fromUTF8("hello");
Storage.setData("payload", bytes);

const result = Storage.getData("payload");
console.log(result?.toUTF8()); // "hello"
```

---

## 示例 4：使用 shared 共享数据

```ts
Storage.set("theme", "dark", { shared: true });

const value = Storage.get<string>("theme", { shared: true });
console.log(value); // "dark"
```

---

## 示例 5：检测与删除键

```ts
if (Storage.contains("token")) {
  Storage.remove("token");
}
```

---

## 示例 6：获取所有键

```ts
console.log(Storage.keys()); // ["username", "profile", ...]
```

---

## 注意事项

1. 所有写入操作异步持久化，但 API 会立即返回成功与否。
2. `Data` 类型不能通过 `Storage.set()` 保存，必须使用 `setData()`。
3. JSON 类型必须是可序列化的结构。
4. 避免将大型二进制数据保存在 Storage；此功能用于轻量级数据存储。
5. `Storage.clear()` 不会清空 shared 存储域。
