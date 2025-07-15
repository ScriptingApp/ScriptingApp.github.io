import { useState, useMemo, useCallback, createContext, VirtualNode, Device } from "scripting"
import { getL10n } from "./l10n"
import doc from './doc.json'
import { DocItem } from "./types"
import { getTitle } from "./utils"

const docList: DocItem[] = doc

const localeKey = "scripting.locale"

export function getLocale() {
  return Storage.get<string>(localeKey)
      || (Device.systemLocales[0]?.split("-")[0] || "en")
}

function useModel() {
  const [
    searchText,
    setSearchText
  ] = useState("")
  const [
    locale,
    setLocale
  ] = useState(() => {
    return getLocale()
  })
  const l10n = useMemo(() => {
    const l10n = getL10n(locale)
    return l10n
  }, [locale])

  const filteredDocs = useMemo(() => {
    if (searchText.length === 0) {
      return docList
    }

    const text = searchText.toLowerCase()
    const result: DocItem[] = []

    const traversal = (
      list: DocItem[]
    ) => {
      for (const item of list) {
        if (item.children) {
          traversal(
            item.children
          )
        }
        if (item
          .title["en"]
          .toLowerCase()
          .includes(text)
          || getTitle(
            item,
            locale
          )?.includes(text)
          || item
            .keywords
            ?.some(
              e => e
                .toLowerCase()
                .includes(text)
            )) {
          result.push(item)
        }
      }
    }

    traversal(docList)
    return result
  }, [searchText])

  const list = searchText.length !== 0
    ? filteredDocs
    : docList

  return {
    l10n,
    locale,
    setLocale: useCallback((locale: string) => {
      setLocale(locale)
      Storage.set(localeKey, locale)
    }, []),
    list,
    searchText,
    setSearchText,
  }
}

export const ModelContext = createContext<ReturnType<typeof useModel>>()
// ModelContext.debugLabel = "ModelContext"
// console.log(ModelContext.debugLabel, ModelContext.id)

export function ModelProvider({
  children,
}: {
  children: VirtualNode
}) {
  return <ModelContext.Provider
    value={
      useModel()
    }>
    {children}
  </ModelContext.Provider>
}