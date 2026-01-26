# 通讯录

Scripting 提供 `Contact` 模块，允许在脚本中访问和管理设备上的联系人数据，包括创建、查询、更新、删除联系人，以及操作联系人组和容器。

## 基本概念

| 类型                               | 描述                                |
| -------------------------------- | --------------------------------- |
| **ContactInfo**                  | 表示单个联系人的完整信息。                     |
| **ContactContainer**             | 联系人存储容器，来源如本地、Exchange、CardDAV 等。 |
| **ContactGroup**                 | 联系人组，用于将联系人分类管理。                  |
| **ContactLabeledValue**          | 带标签的值，如电话、邮箱。                     |
| **ContactPostalAddress**         | 邮寄地址信息。                           |
| **ContactSocialProfile**         | 社交账号信息。                           |
| **ContactInstantMessageAddress** | 即时通讯信息。                           |

***

## 创建联系人

```ts
try {
  const contact = await Contact.createContact({
    givenName: 'John',
    familyName: 'Doe',
    phoneNumbers: [{ label: 'mobile', value: '+1234567890' }],
    emailAddresses: [{ label: 'work', value: 'john.doe@example.com' }]
  })
  console.log('联系人创建成功:', contact)
} catch (error) {
  console.error('创建联系人失败:', error)
}
```

说明：

- `givenName` 或 `familyName` 至少填写一项
- 可指定 `containerIdentifier`，否则加入默认容器
- 建议捕获异常，避免因权限或参数问题导致脚本崩溃

***

## 更新联系人

```ts
try {
  const updated = await Contact.updateContact({
    identifier: contact.identifier,
    phoneNumbers: [{ label: 'home', value: '+9876543210' }]
  })
  console.log('联系人更新成功:', updated)
} catch (error) {
  console.error('更新联系人失败:', error)
}
```

更新说明：

- 必须传入 `identifier`
- 仅修改提供的字段，其他信息不变

***

## 查询联系人

### 通过唯一标识符查询

```ts
try {
  const contact = await Contact.fetchContact(contactId, { fetchImageData: true })
  console.log('联系人信息:', contact)
} catch (error) {
  console.error('查询联系人失败:', error)
}
```

### 查询所有联系人

```ts
try {
  const contacts = await Contact.fetchAllContacts({ fetchImageData: false })
  console.log('联系人列表:', contacts)
} catch (error) {
  console.error('获取联系人列表失败:', error)
}
```

### 查询指定容器或组内的联系人

```ts
try {
  const contacts = await Contact.fetchContactsInContainer(containerId)
  console.log('容器内联系人:', contacts)
} catch (error) {
  console.error('查询容器内联系人失败:', error)
}

try {
  const groupContacts = await Contact.fetchContactsInGroup(groupId)
  console.log('组内联系人:', groupContacts)
} catch (error) {
  console.error('查询组内联系人失败:', error)
}
```

***

## 删除联系人

```ts
try {
  await Contact.deleteContact(contactId)
  console.log('联系人已删除')
} catch (error) {
  console.error('删除联系人失败:', error)
}
```

***

## 容器管理

### 获取所有容器

```ts
try {
  const containers = await Contact.fetchContainers()
  console.log('联系人容器:', containers)
} catch (error) {
  console.error('获取容器失败:', error)
}
```

### 获取默认容器

```ts
try {
  const defaultContainerId = await Contact.defaultContainerIdentifier
  console.log('默认容器ID:', defaultContainerId)
} catch (error) {
  console.error('获取默认容器失败:', error)
}
```

***

## 联系人组管理

### 创建联系人组

```ts
try {
  const group = await Contact.createGroup('Friends', defaultContainerId)
  console.log('联系人组创建成功:', group)
} catch (error) {
  console.error('创建联系人组失败:', error)
}
```

### 获取联系人组

```ts
try {
  const groups = await Contact.fetchGroups()
  console.log('联系人组列表:', groups)
} catch (error) {
  console.error('获取联系人组失败:', error)
}
```

### 删除联系人组

```ts
try {
  await Contact.deleteGroup(groupId)
  console.log('联系人组已删除')
} catch (error) {
  console.error('删除联系人组失败:', error)
}
```

***

## 联系人与组的关系管理

### 添加联系人到指定组

```ts
try {
  await Contact.addContactToGroup(contactId, groupId)
  console.log('联系人已添加到组')
} catch (error) {
  console.error('添加联系人到组失败:', error)
}
```

### 从组中移除联系人

```ts
try {
  await Contact.removeContactFromGroup(contactId, groupId)
  console.log('联系人已从组中移除')
} catch (error) {
  console.error('从组中移除联系人失败:', error)
}
```

***

## ContactInfo 数据结构示例

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

***

## 注意事项

- 所有 API 操作都可能因权限、数据错误等原因失败，建议统一加上 `try-catch`
- 访问联系人前，请确保获取用户授权
- `imageData` 建议按需加载，避免性能问题
- 更新和删除操作必须确保 `identifier` 正确有效

***

## 完整示例：创建并查询联系人

```ts
try {
  const contact = await Contact.createContact({
    givenName: 'Alice',
    familyName: 'Smith',
    phoneNumbers: [{ label: 'mobile', value: '+19876543210' }]
  })
  console.log('联系人创建成功:', contact)

  const fetched = await Contact.fetchContact(contact.identifier)
  console.log('查询到联系人:', fetched.givenName)
} catch (error) {
  console.error('操作失败:', error)
}
```
