---
title: WebView
description: An view that displays interactive web content.

---

```tsx
import { Button, HStack, Image, List, Navigation, NavigationStack, Script, Section, Text, TextField, useMemo, useState, VStack, WebView } from "scripting"

function WebViewControllerExample() {
  const [logs, setLogs] = useState<{
    content: string
    error: boolean
  }[]>([])

  function addLog(content: string, error = false) {
    setLogs(logs => [...logs, { content, error }])
  }

  async function runCode() {
    setLogs([])
    const controller = new WebViewController()

    addLog("WebViewController created.")
    addLog("Start loading...")

    if (await controller.loadURL("https://github.com")) {
      addLog("Website is loaded.")
      addLog("Calling controller.evaluateJavaScript...")
      const title = await controller.evaluateJavaScript<string>("document.title")

      if (title != null) {
        addLog(`Title: ${title}`)
      } else {
        addLog("Failed to get the title.", true)
      }
    } else {
      addLog("Failed to load the website.", true)
    }

    controller.dispose()
    addLog("The controller is disposed.")
  }

  return <Section
    header={
      <Text>WebView controller</Text>
    }
  >
    <VStack
      frame={{
        maxWidth: "infinity"
      }}
      alignment={"leading"}
    >
      <Text font={"headline"}>This example will follow these steps:</Text>
      <VStack
        padding={{
          leading: 16
        }}
        spacing={16}
        foregroundStyle={"secondaryLabel"}
        alignment={"leading"}
      >
        <Text>Create a WebViewController instane</Text>
        <Text>Load https://github.com</Text>
        <Text>Call evaluateJavaScript and get the title of the website</Text>
      </VStack>
      <HStack
        alignment={"center"}
        frame={{
          maxWidth: "infinity"
        }}
      >
        <Button
          title={"Run"}
          action={runCode}
        />
      </HStack>

      <VStack
        alignment={"leading"}
        spacing={8}
      >
        {logs.map(log =>
          <Text
            font={"caption"}
            monospaced
            padding={{
              leading: 16
            }}
            foregroundStyle={log.error ? "systemRed" : "systemGreen"}
          >{log.content}</Text>
        )}
      </VStack>
    </VStack>
  </Section>
}

function PresentWebViewExample() {

  function run() {
    const controller = new WebViewController()
    controller.loadURL("https://github.com")

    controller.present({
      fullscreen: true,
      navigationTitle: "Github"
    }).then(() => {
      console.log("WebView is dismissed")
      controller.dispose()
    })
  }

  return <Section
    header={
      <Text>Present a WebView as a independent page</Text>
    }
  >
    <Button
      title={"Present"}
      action={run}
    />
  </Section>
}

function EmbedAWebViewExample() {
  const controller = useMemo(() => new WebViewController(), [])
  const [url, setUrl] = useState("")

  return <Section
    header={
      <Text>Embed a WebView</Text>
    }
  >
    <VStack>
      <HStack>
        <Button action={() => {
          controller.goBack()
        }}>
          <Image
            systemName={"arrow.left"}
          />
        </Button>
        <Button action={() => {
          controller.goForward()
        }}>
          <Image
            systemName={"arrow.right"}
          />
        </Button>
        <Button action={() => {
          controller.reload()
        }}>
          <Image
            systemName={"arrow.clockwise"}
          />
        </Button>
        <TextField
          title={"Website URL"}
          textFieldStyle={"roundedBorder"}
          value={url}
          onChanged={setUrl}
          keyboardType={"URL"}
          textInputAutocapitalization={"never"}
          frame={{
            maxWidth: "infinity"
          }}
        />
        <Button
          action={() => controller.loadURL(url)}
        >
          <Image
            systemName={"arrow.right.circle"}
          />
        </Button>
      </HStack>
      <WebView
        controller={controller}
        frame={{
          height: 400
        }}
      />
    </VStack>
  </Section>
}

function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"WebView"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <WebViewControllerExample />
      <PresentWebViewExample />
      <EmbedAWebViewExample />
    </List>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })

  Script.exit()
}

run()

```