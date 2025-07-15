import { Button, Capsule, Divider, HStack, Image, Link, Script, Spacer, Text, Toggle, VirtualNode, VStack, Widget } from "scripting"
import { RefreshDocsIntent, ToggleReadIntent } from "./app_intents"
import { store } from "./store"
import { getDocTotalCount, getSubtitle, getTitle } from "./utils"
import { getLocale } from "./model"

const readRecord = store.getReadRecord()
const readCount = Object.keys(readRecord).length
const totalCount = getDocTotalCount()
const isAllDone = readCount == totalCount
const locale = getLocale()

const displayCountMap: Record<string, number> = {
  "systemExtraLarge": 8,
  "systemLarge": 6,
  "systemMedium": 3,
  "systemSmall": 3,
  "accessoryRectangular": 1,
}

function RandomDocsView() {
  const displayCount = displayCountMap[Widget.family]

  // If the current widget size is too small, 
  // only an icon is displayed, 
  // and a random document is opened after tapping it. 
  if (displayCount == null) {
    const doc = store.docsToRead[0]

    return <Link
      url={
        Script.createRunURLScheme(
          Script.name,
          {
            doc: doc.title.en
          }
        )
      }
    >
      {isAllDone
        ? <Image
          systemName={"checkmark.circle.fill"}
          foregroundStyle={"systemGreen"}
        />
        : <VStack
          font={12}
        >
          <Text
            fontWeight={"light"}
          >Read</Text>
          <HStack>
            <Text
              fontWeight={"medium"}
            >{readCount}</Text>
            <Text
              fontWeight={"bold"}
            >/{totalCount}</Text>
          </HStack>
        </VStack>}
    </Link>
  }

  const docs = store.docsToRead.slice(0, displayCount)
  const rows: VirtualNode[] = []

  docs.map((doc, index) => {
    let hasRead = !!readRecord[doc.title.en]
    let title = getTitle(doc, locale)
    let subtitle = getSubtitle(doc, locale)

    rows.push(
      <Link url={
        Script.createRunURLScheme(
          Script.name,
          {
            doc: doc.title.en
          }
        )
      }>
        <HStack
          padding={{
            trailing: 8
          }}
        >
          <Toggle
            value={hasRead}
            intent={ToggleReadIntent(doc.title.en)}
            toggleStyle={"button"}
            buttonStyle={"plain"}
          >
            <Image
              systemName={
                hasRead
                  ? "checkmark.circle.fill"
                  : "circle"}
              imageScale="small"
              foregroundStyle={
                hasRead
                  ? "purple"
                  : "secondaryLabel"
              }
            />
          </Toggle>
          <VStack
            alignment={"leading"}
            padding={{
              trailing: true
            }}
          >
            <Text
              font={14}
              fontWeight={"medium"}
            >{title}</Text>
            {subtitle != null
              ? <Text
                font={12}
                foregroundStyle={"secondaryLabel"}
                lineLimit={2}
              >{subtitle}</Text>
              : null
            }
          </VStack>
        </HStack>
      </Link>
    )

    if (index < docs.length - 1) {
      rows.push(
        <Divider
        />
      )
    }
  })

  return <VStack
    alignment={"leading"}
    padding={{
      leading: true,
      top: true,
      bottom: true,
    }}
    frame={{
      maxHeight: "infinity",
      maxWidth: "infinity"
    }}
    clipShape={
      Widget.family === "accessoryRectangular"
        ? "capsule"
        : undefined
    }
  >
    <HStack
      padding={{
        trailing: true
      }}
    >
      <Image
        systemName={"book.fill"}
        foregroundStyle={"purple"}
      />
      {Widget.family !== "systemSmall"
        ? <Text
          font={14}
          fontWeight={"bold"}
          foregroundStyle={"purple"}
        >Scripting Documentation</Text>
        : null}
      {isAllDone
        ?
        <Text
          fontWeight={"medium"}
          font={12}
          padding={{
            horizontal: 8,
            vertical: 4,
          }}
          background={
            <Capsule
              fill={"systemGreen"}
            />
          }
          foregroundStyle={"white"}
        >All Done</Text>
        : <HStack
          spacing={0}
          font={12}
          padding={{
            horizontal: 8,
            vertical: 4,
          }}
          background={
            <Capsule
              stroke={"purple"}
            />
          }
          foregroundStyle={"purple"}
        >
          <Text>{readCount}</Text>
          <Text
            fontWeight={"bold"}
          >/{totalCount}</Text>
        </HStack>
      }
      <Spacer />
      <Button
        intent={RefreshDocsIntent(undefined)}
        tint={"purple"}
        buttonStyle={"plain"}
      >
        <Image
          systemName={"arrow.clockwise"}
          imageScale={"small"}
          foregroundStyle={"purple"}
        />
      </Button>
    </HStack>
    <Spacer />
    {rows}
  </VStack>
}

// Present the widget UI.
Widget.present(<RandomDocsView />)
