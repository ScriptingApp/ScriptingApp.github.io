import { NavigationLink, ContentUnavailableView, List, Text, VStack, useContext, NavigationStack, ScrollView, Markdown, useState, useEffect, Path, Script, useMemo, Editor, } from "scripting"
import { ModelContext } from "./model"
import { DocItem } from "./types"
import { getSubtitle, getTitle } from "./utils"

function NavItemView({
  item
}: {
  item: DocItem
}) {
  const {
    locale
  } = useContext(ModelContext)

  const title = getTitle(item, locale)
  const subtitle = getSubtitle(item, locale)

  return <NavigationLink
    destination={
      item.readme != null
        ? <DocReadMeView
          title={title}
          readme={item.readme}
          example={item.example}
          items={item.children}
        />
        :
        item.example != null
          ? <DocExampleView
            title={title}
            example={item.example}
          />
          : item.children != null
            ? <NavListView
              title={title}
              items={item.children}
            />
            : <ContentUnavailableView
              title={"You must provide an example path or a readme path."}
              systemImage={"tray"}
            />
    }
  >
    <VStack
      alignment={"leading"}
    >
      <Text>{title}</Text>
      {subtitle != null
        ? <Text
          font={"caption"}
          foregroundStyle={"secondaryLabel"}
        >{subtitle}</Text>
        : null
      }
    </VStack>
  </NavigationLink>
}

export function DocReadMeView({
  title, example, readme, items
}: {
  title: string
  readme: string
  example?: string
  items?: DocItem[]
}) {
  const {
    l10n,
    locale,
  } = useContext(ModelContext)

  const [
    content,
    setContent
  ] = useState("")

  useEffect(() => {
    let filePath = Path.join(
      Script.directory,
      readme + locale + '.md'
    )
    if (!FileManager.existsSync(
      filePath
    )) {
      filePath = Path.join(
        Script.directory,
        readme + 'en.md'
      )
    }

    FileManager.readAsString(
      filePath
    ).then(content => {
      setContent(content)
    }).catch(e => {
      Dialog.alert({
        message: l10n.failedToLoadDocument
      })
    })
  }, [])

  return <NavigationStack>
    <ScrollView
      navigationTitle={title}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        confirmationAction: example != null
          ? <NavigationLink
            title={l10n.example}
            destination={
              <DocExampleView
                title={title}
                example={example}
              />
            }
          />
          : items != null
            ? <NavListView
              title={title}
              items={items}
            />
            : undefined
      }}
    >
      <VStack
        padding
      >
        <Markdown
          content={content}
        />
      </VStack>
    </ScrollView>
  </NavigationStack>
}

export function DocExampleView({
  title, example
}: {
  title: string
  example: string
}) {
  const {
    l10n
  } = useContext(ModelContext)

  const controller = useMemo(() =>
    new EditorController({
      readOnly: true
    }), [])

  useEffect(() => {
    const filePath = Path.join(
      Script.directory,
      example + ".tsx"
    )
    FileManager.readAsString(
      filePath
    ).then(content => {
      controller.content = content
    }).catch(e => {
      Dialog.alert({
        message: l10n.failedToLoadDocument
      })
    })
  }, [])

  return <NavigationStack>
    <Editor
      navigationTitle={title}
      navigationBarTitleDisplayMode={"inline"}
      scriptName={Script.name}
      controller={controller}
      ignoresSafeArea={{
        edges: "bottom"
      }}
    />
  </NavigationStack>
}

export function NavListView({
  title,
  items,
}: {
  title: string
  items: DocItem[]
}) {
  return <List
    navigationTitle={title}
    navigationBarTitleDisplayMode={"inline"}
    listStyle={"inset"}
  >
    {items.map(item =>
      <NavItemView
        item={item}
      />
    )}
  </List>
}
