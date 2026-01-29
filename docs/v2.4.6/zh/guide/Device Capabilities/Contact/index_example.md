---
title: 示例
description: 该接口允许在脚本中访问和管理设备上的联系人数据，包括创建、查询、更新、删除联系人，以及操作联系人组和容器。

---

```tsx
import { Script } from "scripting"

async function run() {
  console.present().then(() => {
    Script.exit()
  })

  console.log("Start to fetch contacts")
  try {
    const contacts = await Contact.fetchAllContacts()

    const first = contacts.at(0)

    if (!first) {
      console.log("No contacts found")
    } else {
      console.log("There are " + contacts.length + " contacts")

      const name = [
        first.givenName,
        first.familyName
      ].join(" ")
      
      console.log("First contact name: " + name)
    }
  } catch (e) {
    console.error(e)
  }
}

run()
```