---
title: Send Message

---

The `MessageUI` namespace provides functions to detect messaging capabilities and present a system message compose view from within a script. You can send SMS or MMS messages with optional subject and attachments, depending on device capabilities.

## Availability Properties

### `MessageUI.isAvailable: boolean`

Returns `true` if the device is capable of sending plain text messages.

```ts
if (!MessageUI.isAvailable) {
  console.log("This device cannot send messages.")
}
```

### `MessageUI.canSendSubject: boolean`

Returns `true` if the device supports adding a **subject** to messages.

### `MessageUI.canSendAttachments: boolean`

Returns `true` if the device supports including **attachments** in messages.

---

## `MessageUI.present(options): Promise<"cancelled" | "sent" | "failed">`

Displays the system’s message composer with the specified content and resolves with the result of the user’s action.

### Parameters

| Name          | Type           | Required | Description                                                               |
| ------------- | -------------- | -------- | ------------------------------------------------------------------------- |
| `recipients`  | `string[]`     | Yes      | An array of recipient phone numbers.                                      |
| `body`        | `string`       | Yes      | The text content of the message body.                                     |
| `subject`     | `string`       | No       | Optional subject line. Ignored if `canSendSubject` is `false`.            |
| `attachments` | `Attachment[]` | No       | Optional list of attachments. Ignored if `canSendAttachments` is `false`. |

### Attachment Object

Each item in the `attachments` array must include:

| Property   | Type     | Required | Description                                                                                                                                               |
| ---------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`     | `Data`   | Yes      | The binary data to be attached to the message.                                                                                                            |
| `type`     | `UTType` | Yes      | A [Uniform Type Identifier](https://developer.apple.com/documentation/uniformtypeidentifiers/uttype) string, such as `"public.image"` or `"public.text"`. |
| `fileName` | `string` | Yes      | The name that will appear for the attachment in the message.                                                                                              |

---

### Return Value

Returns a `Promise` that resolves to one of the following values:

* `"sent"`: The message was successfully sent by the user.
* `"cancelled"`: The user canceled the message.
* `"failed"`: The message failed to send due to an error (e.g., connectivity or system failure).

---

## Example: Basic Text Message

```ts
if (MessageUI.isAvailable) {
  const result = await MessageUI.present({
    recipients: ["1234567890"],
    body: "Hello from Scripting!"
  })

  console.log("Message result:", result) // sent, cancelled, or failed
}
```

---

## Example: Message with Subject and Attachment

```ts
const fileData = Data.fromString("This is the document content.")

if (MessageUI.isAvailable && MessageUI.canSendAttachments) {
  const result = await MessageUI.present({
    recipients: ["1234567890"],
    body: "Here is the document.",
    subject: "Requested File",
    attachments: [
      {
        data: fileData,
        type: "public.text",
        fileName: "document.txt"
      }
    ]
  })

  if (result === "sent") {
    console.log("Message successfully sent.")
  } else {
    console.log("Message was not sent:", result)
  }
}
```

---

## Notes

* The `subject` and `attachments` options are automatically ignored if not supported on the device.
* This API only presents the UI; sending is user-controlled.
* Can only be used in interactive scripts (not background-only scripts).
