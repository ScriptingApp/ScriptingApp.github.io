---
title: 发送信息
description: 该接口允许您使用设备的消息功能发送信息，例如短信或 iMessage。

---

`MessageUI` 命名空间提供了一组 API，用于检测设备的短信发送能力，并展示系统级的短信撰写界面。你可以通过脚本向一个或多个联系人发送短信或彩信，还可以添加主题和附件（如果设备支持）。

## 可用性属性

### `MessageUI.isAvailable: boolean`

如果设备支持发送纯文本短信，返回 `true`。

```ts
if (!MessageUI.isAvailable) {
  console.log("此设备无法发送短信")
}
```

### `MessageUI.canSendSubject: boolean`

如果设备支持添加“主题”字段，返回 `true`。

### `MessageUI.canSendAttachments: boolean`

如果设备支持在短信中添加“附件”，返回 `true`。

---

## `MessageUI.present(options): Promise<"cancelled" | "sent" | "failed">`

展示系统的短信撰写界面，并在用户操作完成后返回结果。

### 参数

| 参数名           | 类型             | 是否必填 | 说明                                           |
| ------------- | -------------- | ---- | -------------------------------------------- |
| `recipients`  | `string[]`     | 是    | 收件人电话号码数组                                    |
| `body`        | `string`       | 是    | 短信正文内容                                       |
| `subject`     | `string`       | 否    | 可选的主题内容，仅在 `canSendSubject` 为 `true` 时有效     |
| `attachments` | `Attachment[]` | 否    | 可选的附件列表，仅在 `canSendAttachments` 为 `true` 时有效 |

### 附件对象结构

| 字段名        | 类型       | 是否必填 | 说明                                               |
| ---------- | -------- | ---- | ------------------------------------------------ |
| `data`     | `Data`   | 是    | 要附加的二进制数据                                        |
| `type`     | `UTType` | 是    | 附件的统一类型标识符，例如 `"public.image"`、`"public.text"` 等 |
| `fileName` | `string` | 是    | 附件在消息中显示的文件名                                     |

---

### 返回值

返回一个 `Promise`，其结果为以下字符串之一：

* `"sent"`：用户已成功发送短信；
* `"cancelled"`：用户取消了发送；
* `"failed"`：系统发送失败（如网络或权限问题）。

---

## 示例：发送普通短信

```ts
if (MessageUI.isAvailable) {
  const result = await MessageUI.present({
    recipients: ["1234567890"],
    body: "你好，这是一条脚本发送的短信！"
  })

  console.log("发送结果：", result) // 可能为 sent、cancelled 或 failed
}
```

---

## 示例：发送带主题和附件的短信

```ts
const fileData = Data.fromString("这是文档的内容")

if (MessageUI.isAvailable && MessageUI.canSendAttachments) {
  const result = await MessageUI.present({
    recipients: ["1234567890"],
    body: "请查收附件文件。",
    subject: "你请求的文件",
    attachments: [
      {
        data: fileData,
        type: "public.text",
        fileName: "说明.txt"
      }
    ]
  })

  if (result === "sent") {
    console.log("短信发送成功")
  } else {
    console.log("短信未发送，原因：", result)
  }
}
```

---

## 注意事项

* 如果设备不支持主题或附件功能，相关选项会被自动忽略。
* 撰写界面由系统提供，用户必须手动发送或取消。
* 该 API 只能在前台交互式脚本中使用，不能在后台任务中调用。
