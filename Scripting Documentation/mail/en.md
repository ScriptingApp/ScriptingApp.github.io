The `Mail` module allows you to present a mail compose view within your app. You can specify recipients, subject, body, and attachments.

## Availability Check

```ts
Mail.isAvailable: boolean
```

- **Description**: Indicates whether the device supports sending emails.
- **Returns**: `true` if available, `false` if not

### Example

```ts
if (Mail.isAvailable) {
  console.log('Mail service is available')
} else {
  console.log('Mail service is not available')
}
```

---

## Method: `Mail.present`

```ts
Mail.present(options: MailOptions): Promise<void>
```

### Parameters: `options` (required)

Defines the email content and attachments. The following fields are supported:

| Field                           | Type           | Required | Description |
|---------------------------------|---------------|----------|-------------|
| `toRecipients`                  | `string[]`    | Yes      | Array of recipient email addresses |
| `ccRecipients`                  | `string[]`    | No       | Array of CC (carbon copy) email addresses |
| `bccRecipients`                 | `string[]`    | No       | Array of BCC (blind carbon copy) email addresses |
| `preferredSendingEmailAddress`  | `string`      | No       | Preferred sender email address |
| `subject`                       | `string`      | No       | Email subject |
| `body`                          | `string`      | No       | Email body content |
| `attachments`                   | `Attachment[]`| No       | List of attachments |

---

### Attachment Structure

Each attachment should include the following fields:

| Field      | Type    | Description |
|----------- |-------- |------------ |
| `data`     | `Data`  | The file data to attach |
| `mimeType` | `string`| The MIME type of the attachment (e.g., `image/png`, `application/pdf`) |
| `fileName` | `string`| The file name of the attachment (e.g., `photo.png`) |

---

## Return Value

- Returns a `Promise<void>`
- Resolves when the mail compose view is presented and dismissed
- Does not indicate whether the email was sent successfully (handled by the system)

---

## Usage Examples

### Basic Example: Send an Email

```ts
if (Mail.isAvailable) {
  await Mail.present({
    toRecipients: ['example@example.com'],
    subject: 'Hello',
    body: 'This is a test email sent from the app'
  })
}
```

---

### Example with CC and BCC

```ts
await Mail.present({
  toRecipients: ['recipient1@example.com'],
  ccRecipients: ['cc1@example.com', 'cc2@example.com'],
  bccRecipients: ['bcc@example.com'],
  subject: 'Meeting Reminder',
  body: 'Please find the meeting details below'
})
```

---

### Example with Attachment

```ts
const imageData = await FileManager.readAsData('/path/to/photo.png') // Assume this returns Data type

await Mail.present({
  toRecipients: ['user@example.com'],
  subject: 'Check the Attachment',
  body: 'Please see the attached image',
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

## Notes

- Always check `Mail.isAvailable` before calling `Mail.present` to avoid runtime errors.
- The actual sending of the email is handled by the system mail app. This API only presents the compose view.
- Supports multiple attachments. Make sure to provide the correct MIME type for each file.

---

## Reference

- [MIME Types List (IANA)](http://www.iana.org/assignments/media-types/media-types.xhtml)
