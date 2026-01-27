---
title: Send Mail

---

The `MailUI` module allows your script to present a native mail compose view, enabling users to send emails with recipients, subject, body, and attachments prefilled. It also provides a way to check whether the device is capable of sending emails.

The original `Mail` module is deprecated and has been replaced by `MailUI`.

---

## `MailUI.isAvailable: boolean`

Returns `true` if the device is configured to send emails using the built-in Mail app.

```ts
if (!MailUI.isAvailable) {
  console.log("Mail is not available on this device.")
}
```

---

## `MailUI.present(options): Promise<"cancelled" | "sent" | "failed" | "saved">`

Presents the system mail composer with the provided options. Users can edit the message, then send, cancel, or save it as a draft.

### Parameters

| Name                           | Type           | Required | Description                                                                                  |
| ------------------------------ | -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `toRecipients`                 | `string[]`     | Yes      | List of email addresses to include in the **To** field.                                      |
| `ccRecipients`                 | `string[]`     | No       | List of email addresses for the **CC** (carbon copy) field.                                  |
| `bccRecipients`                | `string[]`     | No       | List of email addresses for the **BCC** (blind carbon copy) field.                           |
| `preferredSendingEmailAddress` | `string`       | No       | If the user has multiple accounts configured, this can specify the preferred sender's email. |
| `subject`                      | `string`       | No       | Email subject line.                                                                          |
| `body`                         | `string`       | No       | The content of the email body.                                                               |
| `attachments`                  | `Attachment[]` | No       | Array of files to attach to the email.                                                       |

### Attachment Object

Each attachment must include the following fields:

| Property   | Type     | Required | Description                                               |
| ---------- | -------- | -------- | --------------------------------------------------------- |
| `data`     | `Data`   | Yes      | The binary content to attach.                             |
| `mimeType` | `string` | Yes      | The MIME type (e.g., `"image/png"`, `"application/pdf"`). |
| `fileName` | `string` | Yes      | Name of the file as it will appear in the eMailUI.          |

---

### Return Value

Returns a `Promise` that resolves to one of the following result strings:

* `"sent"` – The user sent the email.
* `"cancelled"` – The user cancelled email composition.
* `"failed"` – Sending failed due to an error (e.g., no email account configured).
* `"saved"` – The email was saved as a draft.

---

### Throws

This method will throw an error if:

* `MailUI.isAvailable` is `false`
* The options are malformed or missing required fields

---

## Example: Simple Email

```ts
if (MailUI.isAvailable) {
  const result = await MailUI.present({
    toRecipients: ["user@example.com"],
    subject: "Hello from script",
    body: "This email was sent using the Scripting app!"
  })

  console.log("Result:", result) // sent, cancelled, failed, or saved
}
```

---

## Example: Email with Attachment

```ts
const fileData = Data.fromString("Here is the content of the attached file.")

if (MailUI.isAvailable) {
  const result = await MailUI.present({
    toRecipients: ["user@example.com"],
    subject: "Document attached",
    body: "Please find the document attached.",
    attachments: [
      {
        data: fileData,
        mimeType: "text/plain",
        fileName: "notes.txt"
      }
    ]
  })

  if (result === "sent") {
    console.log("Email successfully sent.")
  } else {
    console.log("Email not sent:", result)
  }
}
```

---

## Notes

* The system mail composer must be presented in an interactive context (not in background-only scripts).
* The user controls the final sending of the message.
* This API requires a properly configured mail account.
