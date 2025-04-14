`Keychain` API 用于安全存储、检索和管理敏感数据。本指南介绍如何有效使用 `Keychain` API 的方法和选项。

---

## **模块：Keychain**

### **方法**

---

#### **`Keychain.set(key: string, value: string, options?: KeychainOptions): void`**

**描述**  
加密并保存指定的 `key` 和对应的 `value`。如果 `key` 已存在于 Keychain 中，其关联的值将被更新。

**参数**  
- **`key`**：存储值的唯一标识符（字符串）  
- **`value`**：需要安全存储的值（字符串）  
- **`options`** *(可选)*：Keychain 项目的配置选项

**使用示例**
```tsx
// 使用可访问性选项存储用户令牌
Keychain.set('userToken', 'abc123', { accessibility: 'unlocked', synchronizable: true })
```

---

#### **`Keychain.get(key: string, options?: KeychainOptions): string | null`**

**描述**  
解密并检索与指定 `key` 关联的值。如果 `key` 不存在，返回 `null`。

**参数**  
- **`key`**：检索值的唯一标识符（字符串）  
- **`options`** *(可选)*：访问 Keychain 项目的配置选项  

**返回值**  
- 存储的值（字符串），或如果 `key` 未找到则返回 `null`。

**使用示例**
```tsx
// 检索已存储的令牌
const token = Keychain.get('userToken', { accessibility: 'unlocked' })
if (token) {
  console.log(`检索到的令牌：${token}`)
} else {
  console.log('未找到令牌')
}
```

---

#### **`Keychain.remove(key: string, options?: KeychainOptions): void`**

**描述**  
删除与指定 `key` 关联的值。如果 `key` 不存在，该方法无任何操作。

**参数**  
- **`key`**：要删除值的唯一标识符（字符串）  
- **`options`** *(可选)*：Keychain 项目的配置选项

**使用示例**
```tsx
// 删除存储的令牌
Keychain.remove('userToken')
console.log('令牌已删除')
```

---

#### **`Keychain.contains(key: string, options?: KeychainOptions): boolean`**

**描述**  
检查 Keychain 中是否包含指定 `key` 的值。

**参数**  
- **`key`**：要检查的值的唯一标识符（字符串）  
- **`options`** *(可选)*：Keychain 项目的配置选项

**返回值**  
- 如果 Keychain 包含 `key`，返回 `true`，否则返回 `false`。

**使用示例**
```tsx
// 检查 Keychain 中是否存在某个键
if (Keychain.contains('userToken')) {
  console.log('令牌存在')
} else {
  console.log('令牌不存在')
}
```

---

## **类型**

### **KeychainOptions**
Keychain 项目的配置选项。

| 属性                | 类型                   | 描述                                                                 |
|-------------------|----------------------|----------------------------------------------------------------------|
| `accessibility`   | `KeychainAccessibility` | 指定 Keychain 项目的访问权限 |
| `synchronizable`  | `boolean`            | 指定 Keychain 项目是否通过 iCloud 同步                                |

---

### **KeychainAccessibility**
指定 Keychain 项目的访问权限。  
可用值：

- **`passcode`**：数据仅在设备解锁时可访问。需要密码，不会迁移到新设备。
- **`unlocked`**：数据在用户解锁设备时可访问。
- **`unlocked_this_device`**：与 `unlocked` 相同，但不会迁移到新设备。
- **`first_unlock`**：数据在设备重新启动后的首次解锁后可访问。
- **`first_unlock_this_device`**：与 `first_unlock` 相同，但不会迁移到新设备。

---

## **常见使用场景**

### **存储和检索用户令牌**
```tsx
// 存储用户令牌
Keychain.set('authToken', 'secureToken', { accessibility: 'unlocked', synchronizable: true })

// 检索令牌
const token = Keychain.get('authToken')
console.log(token ? `令牌：${token}` : '未找到令牌')
```

---

### **安全存储敏感数据**
```tsx
// 保存敏感凭据
Keychain.set('username', 'user123')
Keychain.set('password', 'password123', { accessibility: 'first_unlock' })

// 检索凭据
const username = Keychain.get('username')
const password = Keychain.get('password')
if (username && password) {
  console.log(`欢迎，${username}`)
} else {
  console.log('未找到凭据')
}
```

---

### **在注销时移除安全数据**
```tsx
// 清除用户数据
Keychain.remove('authToken')
Keychain.remove('username')
Keychain.remove('password')
console.log('用户数据已清除')
```