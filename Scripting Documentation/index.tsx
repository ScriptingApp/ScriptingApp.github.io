import { Navigation, NavigationStack, Button, Script, EmptyView, ContentUnavailableView, Group, Widget, Picker, Text, useContext, Menu, } from 'scripting'
import { DocExampleView, DocReadMeView, NavListView } from './helper_views'
import { store } from './store'
import { supportedLanguages } from './l10n'
import { ModelContext, ModelProvider } from './model'
import { DocItem } from './types'
import { findDocByTitle, getTitle } from './utils'

function MainView() {
  const dismiss = Navigation.useDismiss()
  const {
    l10n,
    locale,
    setLocale,
    searchText,
    setSearchText,
    list,
  } = useContext(ModelContext)

  return <NavigationStack>
    <NavListView
      title={l10n.documentation}
      items={list}
      toolbar={{
        cancellationAction: <Button
          title={l10n.done}
          action={dismiss}
        />,
        confirmationAction: <Menu
          title={"Language"}
          systemImage={"globe"}
        >
          <Picker
            title={l10n.language}
            value={locale}
            onChanged={setLocale}
          >
            {supportedLanguages.map(item =>
              <Text
                tag={item.locale}
              >{item.name}</Text>
            )}
          </Picker>
        </Menu>
      }}
      searchable={{
        value: searchText,
        onChanged: setSearchText,
      }}
      overlay={
        list.length
          ? <EmptyView />
          : <ContentUnavailableView
            title={l10n.notFound}
            systemImage={"square.2.layers.3d"}
          />
      }
    />
  </NavigationStack>
}

function SingleDocViewer({
  doc,
}: {
  doc: DocItem
}) {
  const dismiss = Navigation.useDismiss()
  const {
    locale,
    l10n
  } = useContext(ModelContext)
  const title = getTitle(doc, locale)

  return <NavigationStack>
    <Group
      navigationTitle={title}
      navigationBarTitleDisplayMode={"inline"}
      toolbar={{
        cancellationAction: <Button
          title={l10n.done}
          action={dismiss}
        />,
      }}
    >
      {
        doc.readme
          ? <DocReadMeView
            title={title}
            readme={doc.readme}
            example={doc.example}
            items={doc.children}
          />
          : doc.example
            ? <DocExampleView
              title={title}
              example={doc.example}
            />
            : <ContentUnavailableView
              title={"You must provide a example path or a readme path."}
              systemImage={"tray"}
            />
      }
    </Group>
  </NavigationStack>
}

async function run() {
  const docTitle = Script.queryParameters["doc"]
  if (typeof docTitle === "string") {
    // If the script is opened by widget
    const doc = findDocByTitle(docTitle)

    if (doc != null) {
      await Navigation.present({
        element: (
          <ModelProvider>
            <SingleDocViewer
              doc={doc}
            />
          </ModelProvider>
        ),
        modalPresentationStyle: 'pageSheet',
      })

      // Mark as read.
      store.setRead(doc.title["en"])
      Widget.reloadAll()

      Script.exit()
      return
    } else {
      console.error(`Document of "${docTitle}" not found.`)
    }
  }

  await Navigation.present({
    element: (
      <ModelProvider>
        <MainView />
      </ModelProvider>
    ),
    modalPresentationStyle: 'pageSheet',
  })

  Script.exit()
}

run()