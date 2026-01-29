---
title: Contact
description: This interface allows you to access and manage contacts on the device. You can create, query, update, and delete contacts, as well as manage contact groups and containers.

---
        
The `Contact` module in the Scripting app allows you to access and manage contacts on the device. You can create, query, update, and delete contacts, as well as manage contact groups and containers.

## Overview of Data Structures

| Type | Description |
| --- | --- |
| **ContactInfo** | Represents detailed information of a single contact. |
| **ContactContainer** | Represents a contact storage container, such as local, Exchange, or CardDAV. |
| **ContactGroup** | Represents a contact group for categorizing contacts. |
| **ContactLabeledValue** | A labeled value, such as phone number or email address. |
| **ContactPostalAddress** | Represents a postal address. |
| **ContactSocialProfile** | Represents social profile information. |
| **ContactInstantMessageAddress** | Represents instant messaging account information. |

---

## Creating a Contact

```ts
try {
  const contact = await Contact.createContact({
    givenName: 'John',
    familyName: 'Doe',
    phoneNumbers: [{ label: 'mobile', value: '+1234567890' }],
    emailAddresses: [{ label: 'work', value: 'john.doe@example.com' }]
  })
  console.log('Contact created:', contact)
} catch (error) {
  console.error('Failed to create contact:', error)
}
```

- Either `givenName` or `familyName` is required.
- You may specify an optional `containerIdentifier`. If not provided, the contact is added to the default container.
- Always handle potential errors due to permission issues or invalid input.

---

## Updating a Contact

```ts
try {
  const updated = await Contact.updateContact({
    identifier: contact.identifier,
    phoneNumbers: [{ label: 'home', value: '+9876543210' }]
  })
  console.log('Contact updated:', updated)
} catch (error) {
  console.error('Failed to update contact:', error)
}
```

- `identifier` is required.
- Only the provided fields will be updated; others remain unchanged.

---

## Fetching Contacts

### Fetch a Contact by Identifier

```ts
try {
  const contact = await Contact.fetchContact(contactId, { fetchImageData: true })
  console.log('Contact fetched:', contact)
} catch (error) {
  console.error('Failed to fetch contact:', error)
}
```

### Fetch All Contacts

```ts
try {
  const contacts = await Contact.fetchAllContacts({ fetchImageData: false })
  console.log('All contacts:', contacts)
} catch (error) {
  console.error('Failed to fetch contacts:', error)
}
```

### Fetch Contacts in a Container or Group

```ts
try {
  const contacts = await Contact.fetchContactsInContainer(containerId)
  console.log('Contacts in container:', contacts)
} catch (error) {
  console.error('Failed to fetch contacts in container:', error)
}

try {
  const groupContacts = await Contact.fetchContactsInGroup(groupId)
  console.log('Contacts in group:', groupContacts)
} catch (error) {
  console.error('Failed to fetch contacts in group:', error)
}
```

- Set `fetchImageData` to `true` only if you need the contact's image data.

---

## Deleting a Contact

```ts
try {
  await Contact.deleteContact(contactId)
  console.log('Contact deleted')
} catch (error) {
  console.error('Failed to delete contact:', error)
}
```

---

## Contact Container Management

### Fetch All Containers

```ts
try {
  const containers = await Contact.fetchContainers()
  console.log('Contact containers:', containers)
} catch (error) {
  console.error('Failed to fetch containers:', error)
}
```

### Get the Default Container Identifier

```ts
try {
  const defaultContainerId = await Contact.defaultContainerIdentifier
  console.log('Default container ID:', defaultContainerId)
} catch (error) {
  console.error('Failed to fetch default container:', error)
}
```

Container types:
- `unassigned`
- `local`
- `exchange`
- `cardDAV`

---

## Contact Group Management

### Create a Contact Group

```ts
try {
  const group = await Contact.createGroup('Friends', defaultContainerId)
  console.log('Group created:', group)
} catch (error) {
  console.error('Failed to create group:', error)
}
```

### Fetch Groups

```ts
try {
  const groups = await Contact.fetchGroups()
  console.log('Groups:', groups)
} catch (error) {
  console.error('Failed to fetch groups:', error)
}
```

### Delete a Group

```ts
try {
  await Contact.deleteGroup(groupId)
  console.log('Group deleted')
} catch (error) {
  console.error('Failed to delete group:', error)
}
```

---

## Managing Contact and Group Relationship

### Add Contact to a Group

```ts
try {
  await Contact.addContactToGroup(contactId, groupId)
  console.log('Contact added to group')
} catch (error) {
  console.error('Failed to add contact to group:', error)
}
```

### Remove Contact from a Group

```ts
try {
  await Contact.removeContactFromGroup(contactId, groupId)
  console.log('Contact removed from group')
} catch (error) {
  console.error('Failed to remove contact from group:', error)
}
```

---

## Example ContactInfo Structure

```json
{
  "identifier": "XXXX-XXXX",
  "givenName": "John",
  "familyName": "Doe",
  "phoneNumbers": [{ "label": "mobile", "value": "+1234567890" }],
  "emailAddresses": [{ "label": "work", "value": "john@example.com" }],
  "postalAddresses": [{
    "label": "home",
    "street": "123 Apple St.",
    "city": "Cupertino",
    "state": "CA",
    "postalCode": "95014",
    "country": "USA",
    "isoCountryCode": "US"
  }]
}
```

---

## Important Notes
- All API operations can fail due to reasons such as lack of permission or invalid parameters. Always use `try-catch`.
- User permission is required to access contacts.
- `imageData` should only be fetched if necessary to reduce memory usage.
- Ensure the `identifier` is valid when performing update or delete operations.

---

## Complete Example: Create and Fetch a Contact

```ts
try {
  const contact = await Contact.createContact({
    givenName: 'Alice',
    familyName: 'Smith',
    phoneNumbers: [{ label: 'mobile', value: '+19876543210' }]
  })
  console.log('Contact created:', contact)

  const fetched = await Contact.fetchContact(contact.identifier)
  console.log('Fetched contact:', fetched.givenName)
} catch (error) {
  console.error('Operation failed:', error)
}
```