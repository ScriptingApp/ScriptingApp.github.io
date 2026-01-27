---
title: 发送邮件

---

`MailUI` 模块允许你的脚本调用系统的邮件撰写视图，预填收件人、主题、正文和附件，并由用户发送邮件。它还提供一个属性用于检测设备是否支持发送邮件。

原 `Mail` API 已废弃。

---

## `MailUI.isAvailable: boolean`

如果当前设备已配置邮箱账户，并支持通过系统的 Mail 应用发送邮件，返回 `true`。

```ts
if (!MailUI.isAvailable) {
  console.log("当前设备不支持发送邮件。")
}
```

---

## `MailUI.present(options): Promise<"cancelled" | "sent" | "failed" | "saved">`

展示系统级的邮件撰写界面，预填内容并等待用户操作。用户可编辑内容后选择发送、取消或保存草稿。

### 参数说明

| 参数名                            | 类型             | 是否必填 | 说明                         |
| ------------------------------ | -------------- | ---- | -------------------------- |
| `toRecipients`                 | `string[]`     | 是    | 邮件主收件人列表，填写在“收件人”字段        |
| `ccRecipients`                 | `string[]`     | 否    | 抄送收件人列表，填写在“抄送”字段          |
| `bccRecipients`                | `string[]`     | 否    | 密送收件人列表，填写在“密送”字段          |
| `preferredSendingEmailAddress` | `string`       | 否    | 指定用于发送邮件的发件邮箱（如果配置了多个邮箱账户） |
| `subject`                      | `string`       | 否    | 邮件主题内容                     |
| `body`                         | `string`       | 否    | 邮件正文内容                     |
| `attachments`                  | `Attachment[]` | 否    | 附件数组，添加文件至邮件中              |

### 附件对象结构

每个附件应包含以下字段：

| 字段名        | 类型       | 是否必填 | 说明                                               |
| ---------- | -------- | ---- | ------------------------------------------------ |
| `data`     | `Data`   | 是    | 要附加的二进制数据内容                                      |
| `mimeType` | `string` | 是    | 附件的 MIME 类型，例如 `"image/png"`、`"application/pdf"` |
| `fileName` | `string` | 是    | 附件在邮件中显示的文件名                                     |

---

### 返回值

此方法返回一个 `Promise`，其结果为下列字符串之一：

* `"sent"`：邮件已成功发送；
* `"cancelled"`：用户取消了发送操作；
* `"failed"`：发送失败（如无邮箱账户配置或发送错误）；
* `"saved"`：邮件已保存为草稿。

---

### 抛出异常

当满足以下条件时，此方法会抛出异常：

* 当前设备不支持发送邮件（`MailUI.isAvailable` 为 `false`）；
* 参数格式错误或缺少必填项；

---

## 示例：发送简单邮件

```ts
if (MailUI.isAvailable) {
  const result = await MailUI.present({
    toRecipients: ["user@example.com"],
    subject: "来自脚本的问候",
    body: "这封邮件由 Scripting 脚本发送。"
  })

  console.log("发送结果：", result) // 可能为 sent、cancelled、failed 或 saved
}
```

---

## 示例：发送带附件的邮件

```ts
const fileData = Data.fromString("这是附件的内容。")

if (MailUI.isAvailable) {
  const result = await MailUI.present({
    toRecipients: ["user@example.com"],
    subject: "附加文件",
    body: "请查收附件。",
    attachments: [
      {
        data: fileData,
        mimeType: "text/plain",
        fileName: "说明.txt"
      }
    ]
  })

  if (result === "sent") {
    console.log("邮件已成功发送。")
  } else {
    console.log("邮件未发送，状态：", result)
  }
}
```

---

## 注意事项

* 邮件撰写界面必须在具有用户交互的上下文中调用，不能在后台脚本中使用；
* 邮件发送行为由用户最终确认；
* 此 API 需要设备上已正确配置 Mail 应用的邮箱账户。
