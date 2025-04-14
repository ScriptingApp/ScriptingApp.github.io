---
title: Example - Request
---
```tsx
import { Button, fetch, List, Markdown, Navigation, NavigationStack, Script, Section, Text, } from "scripting"

function Example() {
  return <NavigationStack>
    <List
      navigationTitle={"Request"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section
        footer={
          <Text>The fetch() method starts the process of fetching a resource from the network, returning a promise that is fulfilled once the response is available.</Text>
        }
      >
        <Button
          title={"fetch"}
          action={async () => {
            console.present()
            console.log("Start fetching...")
            try {
              const html = await fetch(
                "https://github.com"
              ).then(
                response => response.text()
              )

              if (html != null) {
                const controller = new WebViewController()
                controller.loadHTML(html, "https://github.com/")
                await controller.present()
                controller.dispose()
              } else {
                console.log("Failed to fetch the HTML content.")
              }
            } catch (e) {
              console.error("Failed to fetch the HTML content, " + e)
            }
          }}
        />
      </Section>

      <Section
        footer={
          <Text>Use a CancelToken object to cancel the request.</Text>
        }
      >
        <Markdown
          content={`\`\`\`ts
const cancelToken = new CancelToken()
fetch("https://example.com/api/data.json", {
  cancelToken: cancelToken
})
.then(res => res.json())
.then(data => {
  // handle data
})

// Cancel the request after 2 seconds.
setTimeout(() => {
  cancelToken.cancel()
}, 2000)
\`\`\``}
        />
      </Section>

      <Section
        footer={
          <Text>Options of the fetch() function</Text>
        }
      >
        <Markdown
          content={`\`\`\`ts
fetch("https://example.com/api", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(params),
  connectTimeout: 5000, // 5 seconds
  receiveTimeout: 10000, // 10 seconds
  cancelToken: cancelToken, // CancelToken object
})
\`\`\`` }
        />
      </Section>

      <Section
        footer={
          <Text>Get various data types based on different methods of the Response object</Text>
        }
      >
        <Markdown
          content={`\`\`\`ts
const response = await fetch("https://example.com/api")

response.text().then(text => {
  // handle text content
})

response.json().then(jsonObject => {
  // handle json data
})

response.arrayBuffer().then(arrayBuffer => {
  // handle array buffer
})
\`\`\``}
        />
      </Section>

      <Section
        footer={
          <Text>Programmatically reading and manipulating streams of data received over the network, chunk by chunk, is very useful</Text>
        }
      >
        <Button
          title={"Using readable streams for response"}
          action={async () => {
            console.present()

            const response = await fetch(
              "https://x.com",
            )

            const reader = response.body.getReader()

            async function read() {
              try {
                while (true) {
                  const {
                    done,
                    value
                  } = await reader.read()

                  if (done) {
                    break
                  } else if (value != null) {
                    const text = value.toRawString()
                    console.log("Received: " + text)
                  }
                }
              } catch (e) {
                console.error(String(e))
              }
            }

            read()
          }}
        />
      </Section>
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