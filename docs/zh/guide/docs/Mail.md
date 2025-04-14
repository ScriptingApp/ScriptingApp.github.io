---
title: 邮件
---
`Mail` 模块提供了在应用内直接唤起邮件撰写视图的能力，支持添加收件人、抄送、密送、主题、正文以及附件。

## 是否可用

```ts
Mail.isAvailable: boolean
```

- 说明：用于判断当前设备和环境是否支持邮件发送功能。
- 返回值：`true` 表示可用，`false` 表示不可用

### 示例

```ts
if (Mail.isAvailable) {
  console.log('邮件功能可用')
} else {
  console.log('邮件功能不可用')
}
```

---

## 方法：Mail.present

```ts
Mail.present(options: MailOptions): Promise<void>
```

### 参数 `options`（必填）

用于配置邮件的内容和附件，包含以下字段：

| 参数名                          | 类型           | 是否必填 | 说明 |
|-------------------------------|---------------|--------|------|
| `toRecipients`                | `string[]`    | 是     | 收件人邮箱地址数组 |
| `ccRecipients`                | `string[]`    | 否     | 抄送邮箱地址数组 |
| `bccRecipients`               | `string[]`    | 否     | 密送邮箱地址数组 |
| `preferredSendingEmailAddress`| `string`      | 否     | 优先使用的发件邮箱地址 |
| `subject`                     | `string`      | 否     | 邮件主题 |
| `body`                        | `string`      | 否     | 邮件正文内容 |
| `attachments`                 | `Attachment[]`| 否     | 邮件附件列表 |

---

### 附件结构 `Attachment`

每个附件包含以下字段：

| 参数名   | 类型     | 说明 |
|--------|---------|------|
| `data`     | `Data`   | 附件数据（文件内容） |
| `mimeType` | `string` | 附件的 MIME 类型（例如 `image/png`、`application/pdf`）|
| `fileName` | `string` | 附件文件名（例如 `photo.png`）|

---

## 返回值

- 返回一个 `Promise<void>`，表示邮件撰写视图已成功弹出。
- 用户完成或取消邮件发送后，Promise 结束（不返回邮件发送状态，仅表示 UI 弹出结束）。

---

## 使用示例

### 最简单示例：发送一封邮件

```ts
if (Mail.isAvailable) {
  await Mail.present({
    toRecipients: ['example@example.com'],
    subject: '你好',
    body: '这是一封来自应用的邮件'
  })
}
```

---

### 添加抄送和密送

```ts
await Mail.present({
  toRecipients: ['recipient1@example.com'],
  ccRecipients: ['cc1@example.com', 'cc2@example.com'],
  bccRecipients: ['bcc@example.com'],
  subject: '会议通知',
  body: '请查收会议通知邮件'
})
```

---

### 添加附件发送

```ts
const imageData = await FileManager.readAsData('/path/to/photo.png') // 假设读取到 Data 类型

await Mail.present({
  toRecipients: ['user@example.com'],
  subject: '查看附件',
  body: '请查看附件图片',
  attachments: [
    {
      data: imageData,
      mimeType: 'image/png',
      fileName: 'photo.png'
    }
  ]
})
```

---

## 注意事项

- `Mail.isAvailable` 在发送邮件前务必检查，避免因设备不支持而导致错误。
- 邮件发送是否成功由系统邮件应用决定，接口不返回发送结果。
- 支持多附件发送，附件请合理设置 MIME 类型，确保邮件客户端可识别。

---

## 相关链接

- [MIME 类型列表参考](http://www.iana.org/assignments/media-types/media-types.xhtml)
