import { DocItem } from "./types"
import doc from './doc.json'

const docList: DocItem[] = doc

const readKey = "scripting.doc.read"
const dateKey = "scripting.doc.date"
const docsKey = "scripting.doc.list"
const docCount = 8

class DocStore {

  docsToRead!: DocItem[]

  constructor() {
    let today = new Date().toLocaleDateString()

    if (Storage.get<string>(dateKey) != today) {
      Storage.set(dateKey, today)
      this.saveRandomDocsToRead()
    } else {
      let docsToRead = this.docsToRead = Storage.get<DocItem[]>(docsKey) ?? []

      if (docsToRead.length && docsToRead.some(
        e => e.example == null && e.readme == null)
      ) {
        this.saveRandomDocsToRead()
      }
    }
  }

  saveRandomDocsToRead() {
    const docs: DocItem[] = []

    while (docs.length < docCount) {
      const route = this.getRandomDocItem(docList)

      if (!docs.includes(route)) {
        docs.push(route)
      }
    }

    this.docsToRead = docs
    Storage.set(docsKey, docs)
  }

  private getRandomDocItem(routes: DocItem[]): DocItem {
    const index = Math.random() * routes.length | 0
    const route = routes[index]

    return route.children != null
      ? this.getRandomDocItem(route.children)
      : route
  }

  getReadRecord(): Record<string, boolean> {
    return Storage.get<Record<string, boolean>>(readKey) ?? {}
  }

  setRead(title: string) {
    let record = this.getReadRecord()
    if (record[title]) {
      return
    }

    record[title] = true
    Storage.set(readKey, record)
  }

  toggleRead(title: string) {
    let record = this.getReadRecord()
    if (record[title]) {
      delete record[title]
    } else {
      record[title] = true
    }

    Storage.set(readKey, record)
  }
}

export const store = new DocStore()