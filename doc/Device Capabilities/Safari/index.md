# Safari

The `Safari` module provides functions to open and display websites either externally using the system default browser or internally within the Scripting app using an in-app Safari view. It enables seamless web content access in both immersive and external browsing scenarios.

***

## Module: `Safari`

This module includes two functions:

***

### ▸ `Safari.openURL(url: string): Promise<boolean>`

Opens a URL using the system's default method for handling the specified URL scheme. This may launch Safari, another browser, or a different app altogether—depending on the scheme and installed apps.

#### Parameters

- **`url`** (`string`): The URL to open. Can begin with `http://`, `https://`, or any custom URL scheme (e.g., `mailto:`, `tel:`, `appname://`).

#### Returns

- A `Promise<boolean>` that resolves to `true` if the URL was successfully opened, or `false` if it failed (e.g., due to an invalid scheme or unsupported URL).

#### Example

```ts
const success = await Safari.openURL('mailto:hello@example.com')
if (!success) {
  console.error('Failed to open the URL')
}
```

***

### ▸ `Safari.present(url: string, fullscreen?: boolean): Promise<void>`

Presents a web page using an in-app Safari view. The page is shown modally within the Scripting app. The returned Promise resolves only after the user closes the web view.

#### Parameters

- **`url`** (`string`): The website URL to present.
- **`fullscreen`** (`boolean`, optional): Whether to show the view in fullscreen mode. Defaults to `true`.

#### Returns

- A `Promise<void>` that resolves when the user closes the web view.

#### Examples

Present a site in fullscreen (default):

```ts
await Safari.present('https://developer.apple.com')

// Code here runs after the web view is dismissed
console.log('The web view has been closed.')
```

Present a site in a non-fullscreen view (e.g., as part of an embedded interface):

```ts
await Safari.present('https://news.ycombinator.com', false)

// Code here runs after the web view is dismissed
console.log('The web view has been closed.')
```

***

## Use Cases

- Redirecting users to external links such as help docs, authentication pages, or App Store URLs.
- Displaying online content (e.g., blog posts, dashboards) directly in-app.
- Launching another app using its URL scheme.

***

## Notes

- Always provide a valid and fully qualified URL.
- Use `present()` to keep the user within the app.
- Use `openURL()` for external redirection or when launching another app via a URL scheme.
