# HealthKit 权限行为 PRO

在使用 Scripting 提供的 Health 模块访问 iOS 健康数据时，开发者需要了解 iOS HealthKit 特有的授权机制，以及 Scripting API 的行为设计。本说明文档将帮助你正确处理无权限时的情况，并提供开发建议。

***

## iOS HealthKit 授权机制特性

1. **无法主动查询授权状态**
   iOS 不提供 API 用于判断某个健康数据类型是否已授权或被拒绝。授权状态不可直接获知。

2. **授权弹窗仅在首次请求时弹出**
   系统只会在数据类型的授权状态为 `notDetermined` 时自动弹出授权弹窗。一旦用户做出决定（允许或拒绝），后续请求不会再次触发弹窗。

3. **无权限不会返回系统错误**
   如果请求了未被授权的数据，HealthKit 不会抛出错误。部分接口会返回空数据，部分接口则通过 `Promise.reject` 报错。

***

## Scripting 中的权限处理逻辑

### 自动请求权限

当你调用任意需要健康数据权限的方法时，Scripting 会根据接口涉及的数据类型，自动触发系统授权弹窗（如果该类型尚未请求过权限）。

例如：

```ts
await Health.dateOfBirth()
await Health.bloodType()
await Health.queryQuantitySamples("stepCount", { startDate: ..., endDate: ... })
```

***

## 不同方法的行为对比

| 方法                              | 无权限时行为     | 是否触发 `Promise.reject` |
| ------------------------------- | ---------- | --------------------- |
| `Health.queryQuantitySamples()` | 返回空数组 `[]` | 否                     |
| `Health.queryCategorySamples()` | 返回空数组 `[]` | 否                     |
| `Health.dateOfBirth()`          | 无返回值       | 是                     |
| `Health.bloodType()` 等档案方法      | 无返回值       | 是                     |

***

## 示例代码

### 示例 1：读取样本数据（无权限返回空数组）

```ts
const samples = await Health.queryQuantitySamples('stepCount')

if (samples.length === 0) {
  console.log("未返回步数数据，可能未授权或无记录")
}
```

### 示例 2：读取用户档案（无权限时 Promise 会 reject）

```ts
try {
  const dob = await Health.dateOfBirth()
  console.log(`出生日期：${dob.year}-${dob.month}-${dob.day}`)
} catch (err) {
  console.warn("未能读取出生日期，用户可能未授权")
}
```

***

## 多接口同时调用时的权限合并

当你同时调用多个需要健康权限的方法（例如通过 `Promise.all()`），Scripting 会自动合并这些接口所需的权限，并在**同一个系统弹窗中**请求授权。这样可以避免多次弹窗打断用户体验。

```ts
try {
  const [dob, blood] = await Promise.all([
    Health.dateOfBirth(),
    Health.bloodType()
  ])
  console.log(dob, blood)
} catch (err) {
  console.warn("用户可能拒绝了部分或全部权限")
}
```

***

## 开发建议与提示

| 场景                      | 建议处理方式                           |
| ----------------------- | -------------------------------- |
| 首次请求健康数据                | 在 UI 中预告权限用途，引导用户理解授权目的          |
| 接口返回空数组                 | 判断数据长度，提示“可能未授权或无数据记录”           |
| 接口发生异常（如 `dateOfBirth`） | 使用 `try...catch` 捕获异常并提示用户手动检查权限 |

***

## 如何开启授权

前往「健康」App，依次打开「数据访问与设备 > Scripting」，确认是否已授予相关权限。
