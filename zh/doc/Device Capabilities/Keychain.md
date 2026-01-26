# 钥匙串

`Keychain` 提供对系统钥匙串（Keychain）的安全访问接口，用于在 **Scripting 脚本环境中安全、持久地存储敏感数据**，典型用途包括：

- 登录凭证
- Token
- 许可证信息
- 订阅状态
- 加密密钥
- 用户隐私数据

所有数据均使用系统级 Keychain 安全机制存储，具备高安全性与持久性。

***

## 一、Keychain 的脚本作用域隔离规则

在 Scripting 中，`Keychain` 采用 **按脚本隔离（Per-Script Sandbox）** 的安全模型：

### 1. 作用域规则

- **每一个脚本拥有独立的 Keychain 作用域**

- 每个脚本 **只能访问自己写入的 Keychain 数据**

- 不同脚本之间：

- 即使 Key 名相同

- 即使 `synchronizable: true`

- 也 **无法互相读取或覆盖数据**

- 脚本被视为独立安全单元

***

### 2. 该规则的安全意义

该设计确保：

- 不同脚本之间的数据完全隔离
- 防止第三方脚本窃取用户隐私数据
- 防止恶意脚本读取登录态、订阅状态、授权信息
- 提供比系统 Keychain 更细粒度的安全隔离层

***

### 3. 脚本卸载对 Keychain 的影响

- 当脚本被删除后：

  - 该脚本作用域下的 Keychain 数据将被系统回收
- 其他脚本的数据不会受到任何影响

***

## 二、API 命名空间

```ts
namespace Keychain
```

***

## 三、支持的数据类型

`Keychain` 支持以下三种数据类型：

| 类型    | 写入        | 读取        |
| ----- | --------- | --------- |
| 字符串   | `set`     | `get`     |
| 布尔值   | `setBool` | `getBool` |
| 二进制数据 | `setData` | `getData` |

***

## 四、KeychainAccessibility 可访问性策略

```ts
type KeychainAccessibility =
  | 'passcode'
  | 'unlocked'
  | 'unlocked_this_device'
  | 'first_unlock'
  | 'first_unlock_this_device'
```

| 值                          | 说明                  |
| -------------------------- | ------------------- |
| `passcode`                 | 仅在设备设置锁屏密码时可访问，不会迁移 |
| `unlocked`                 | 仅在设备解锁状态下可访问        |
| `unlocked_this_device`     | 仅限本设备访问，不会迁移        |
| `first_unlock`             | 重启后首次解锁即可访问         |
| `first_unlock_this_device` | 重启后首次解锁即可访问，不会迁移    |

默认值：

```ts
accessibility: "unlocked"
```

***

## 五、iCloud 同步（synchronizable）

```ts
synchronizable?: boolean
```

| 值       | 说明                 |
| ------- | ------------------ |
| `true`  | 在同一 Apple ID 设备间同步 |
| `false` | 仅存储在本设备            |

默认值：

```ts
synchronizable: false
```

***

## 六、写入数据

### 1. 写入字符串

```ts
Keychain.set(key: string, value: string, options?): boolean
```

```ts
Keychain.set("token", "abcdef")
```

```ts
Keychain.set("token", "abcdef", {
  accessibility: "first_unlock",
  synchronizable: true
})
```

***

### 2. 写入布尔值

```ts
Keychain.setBool(key: string, value: boolean, options?): boolean
```

```ts
Keychain.setBool("is_login", true)
```

***

### 3. 写入二进制数据

```ts
Keychain.setData(key: string, value: Data, options?): boolean
```

```ts
Keychain.setData("avatar", imageData)
```

***

### 4. 覆盖规则

- Key 已存在时会自动覆盖
- 成功返回 `true`
- 失败返回 `false`

***

## 七、读取数据

### 字符串

```ts
Keychain.get(key: string, options?): string | null
```

### 布尔值

```ts
Keychain.getBool(key: string, options?): boolean | null
```

### 二进制数据

```ts
Keychain.getData(key: string, options?): Data | null
```

***

## 八、删除数据

```ts
Keychain.remove(key: string, options?): boolean
```

- Key 存在：删除并返回 `true`
- Key 不存在：安全返回 `true`

***

## 九、是否存在

```ts
Keychain.contains(key: string, options?): boolean
```

***

## 十、获取所有 Key

```ts
Keychain.keys(options?): string[]
```

***

## 十一、清空 Keychain

```ts
Keychain.clear(options?): boolean
```

- 仅清空当前脚本作用域内的数据
- 不影响其他脚本
- 不影响 App 自身或其他 App 的系统 Keychain 数据

***

## 十二、synchronizable 的读写一致性规则

如果某 Key 使用：

```ts
synchronizable: true
```

则后续所有操作必须带相同参数：

```ts
Keychain.set("token", "abc", { synchronizable: true })

Keychain.get("token") // 读取不到
Keychain.get("token", { synchronizable: true }) // 可读取
```

***

## 十三、安全性与使用建议

### 适合存储的数据

- 登录 Token
- 订阅与授权状态
- 用户唯一标识
- 加密密钥

### 不建议存储

- 大体积文件
- 高频变化的缓存数据
- 可公开的普通配置

***

## 十四、典型使用示例

```ts
// 写入
Keychain.set("token", "abcdef")
Keychain.setBool("is_login", true)
Keychain.setData("avatar", avatarData)

// 读取
const token = Keychain.get("token")
const isLogin = Keychain.getBool("is_login")
const avatar = Keychain.getData("avatar")

// 删除
Keychain.remove("token")

// 判断是否存在
Keychain.contains("token")

// 获取所有 Key
Keychain.keys()

// 清空
Keychain.clear()
```
