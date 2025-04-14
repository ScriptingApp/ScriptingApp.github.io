import { DocItem } from "./types"
import doc from "./doc.json"

const docList: DocItem[] = doc

export function findDocByTitle(
  title: string,
  list = docList
): DocItem | undefined {
  for (let i = 0, length = list.length; i < length; i++) {
    const doc = list[i]
    if (doc.title["en"] === title) {
      return doc
    }

    if (doc.children != null) {
      const result = findDocByTitle(title, doc.children)
      if (result != null) {
        return result
      }
    }
  }
}

export function getDocTotalCount(
  list = docList
): number {
  return list.reduce((total, c) => {
    let childrenTotal = c.children != null ? getDocTotalCount(c.children) : 0
    return total + 1 + childrenTotal
  }, 0)
}

export function getTitle(doc: DocItem, locale: string): string {
  return doc.title[locale] ?? doc.title["en"]
}

export function getSubtitle(doc: DocItem, locale: string): string | undefined {
  return doc.subtitle?.[locale] ?? doc.subtitle?.["en"]
}
