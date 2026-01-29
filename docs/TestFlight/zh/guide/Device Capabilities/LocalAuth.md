---
title: 本地认证
description: 该接口提供使用指纹或面部识别等生物特征进行认证的功能。

---

`LocalAuth` API 是一个 iOS 本地认证框架的封装，用于在 Scripting 应用的脚本中启用生物识别或密码认证。本文档介绍了如何高效使用 `LocalAuth` API。

## 概览
`LocalAuth` 模块提供了检查认证可用性和执行用户认证的方法和属性。它支持的生物识别包括 Face ID、Touch ID 和 Optic ID，并提供密码作为备选方案。

---

## 属性

### `LocalAuth.isAvailable`
- **类型：** `boolean`
- **描述：** 表示是否可以使用任何可用的认证策略进行认证。
- **示例：**
  ```tsx
  if (LocalAuth.isAvailable) {
    console.log("认证功能可用。")
  } else {
    console.log("认证功能不可用。")
  }
  ```

### `LocalAuth.isBiometricsAvailable`
- **类型：** `boolean`
- **描述：** 表示是否可以使用生物识别认证。
- **示例：**
  ```tsx
  if (LocalAuth.isBiometricsAvailable) {
    console.log("生物识别认证可用。")
  } else {
    console.log("生物识别认证不可用。")
  }
  ```

### `LocalAuth.biometryType`
- **类型：** `LocalAuthBiometryType`
- **描述：** 指定设备支持的生物识别认证类型。可能的值包括：
  - `"faceID"`
  - `"touchID"`
  - `"opticID"`
  - `"none"`
  - `"unknown"`
- **示例：**
  ```tsx
  const biometry = LocalAuth.biometryType
  console.log(`生物识别类型：${biometry}`)
  ```

---

## 方法

### `LocalAuth.authenticate(reason: string, useBiometrics?: boolean): Promise<boolean>`
- **描述：** 使用可用的生物识别或备选方法（如密码）对用户进行认证。返回一个 Promise，当认证成功时解析为 `true`，认证失败时解析为 `false`。
- **参数：**
  - `reason`（string）：向用户提示认证时显示的消息。此消息不能为空。例如：`'请认证以访问 MyScript。'`
  - `useBiometrics`（boolean，可选）：默认值为 `true`。如果为 `true`，则方法使用生物识别认证；否则，允许使用生物识别或备选方法（如密码）。
- **示例：**
  ```tsx
  async function authenticateUser() {
    const reason = "请认证以访问 MyScript。"
    const result = await LocalAuth.authenticate(reason, true)
    if (result) {
      console.log("认证成功。")
    } else {
      console.log("认证失败。")
    }
  }

  authenticateUser()
  ```

---

## 使用示例

### 检查生物识别可用性
```tsx
if (LocalAuth.isBiometricsAvailable) {
  console.log("设备支持生物识别认证。")
  console.log(`生物识别类型：${LocalAuth.biometryType}`)
} else {
  console.log("设备不支持生物识别认证。")
}
```

### 使用生物识别认证
```tsx
async function accessSecureData() {
  const authenticated = await LocalAuth.authenticate(
    "请认证以访问安全数据。"
  )
  if (authenticated) {
    console.log("访问已授权。")
  } else {
    console.log("访问被拒绝。")
  }
}

accessSecureData()
```

### 回退到密码认证
```tsx
async function authenticateWithFallback() {
  const authenticated = await LocalAuth.authenticate(
    "请认证以继续。",
    false // 允许生物识别或密码认证
  )
  console.log(authenticated ? "认证成功" : "认证失败")
}

authenticateWithFallback()
```

---

## 注意事项
- 始终在 `reason` 参数中提供有意义的消息，帮助用户理解为什么需要认证。
- 在调用 `LocalAuth.authenticate` 之前，使用 `LocalAuth.isAvailable` 和 `LocalAuth.isBiometricsAvailable` 检查认证选项的可用性。
- 优雅地处理认证成功和失败的情况，为用户提供无缝体验。