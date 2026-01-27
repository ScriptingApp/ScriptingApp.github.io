---
title: Search

---
        
The Scripting app supports advanced search interactions similar to SwiftUI. You can add a search bar, control its visibility and placement, react to changes in input, and display dynamic suggestions.

---

## `searchable`

Marks a view as searchable by displaying a search field and binding it to a state value.

### Type

```ts
searchable?: {
  value: string
  onChanged: (value: string) => void
  placement?: SearchFieldPlacement
  prompt?: string
  presented?: {
    value: boolean
    onChanged: (value: boolean) => void
  }
}
```

### Description

* Displays a search field in the view (typically above a `<List>`).
* The `value` is the current search query, which you control via state.
* The `onChanged` callback updates the state when the user types.
* Optionally provide a `prompt` as placeholder text.
* Use `placement` to customize where the search field appears.
* Use `presented` to programmatically show or dismiss the search field.

### Example

```tsx
function SearchExample() {
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  return (
    <List
      searchable={{
        value: query,
        onChanged: setQuery,
        placement: "navigationBarDrawer",
        prompt: "Search items",
        presented: {
          value: showSearch,
          onChanged: setShowSearch,
        }
      }}
    >
      <Text>Searching: {query}</Text>
    </List>
  )
}
```

### `SearchFieldPlacement` options

| Value                                   | Description                                                |
| --------------------------------------- | ---------------------------------------------------------- |
| `'automatic'`                           | Default behavior, automatically selected placement.        |
| `'navigationBarDrawer'`                 | Appears as a drawer below the navigation bar.              |
| `'navigationBarDrawerAlwaysDisplay'`    | Always shows the drawer, even when inactive.               |
| `'navigationBarDrawerAutomaticDisplay'` | Shows drawer only when needed.                             |
| `'toolbar'`                             | Displays the search field in the toolbar.                  |
| `'sidebar'`                             | Places the search field in the sidebar (iPad/macOS-style). |

---

## `searchSuggestions`

Displays a list of suggestions below the search field as the user types.

### Type

```ts
searchSuggestions?: VirtualNode
```

### Description

Use this to return a list of suggestions, typically based on the user's input.

### Example

```tsx
const suggestions = useMemo(() => [
  {
    label: "🍎 Apple",
    value: "Apple"
  },
  {
    label: "🍌 Bananer",
    value: "Bananer"
  }
], [])
const filteredSuggestions = useMemo(() => {
  if (!/\S+/.test(query)) {
    return suggestions
  }
  const q = query.toLowerCase()
  return suggestions.filter(s =>
    s.label.toLowerCase().includes(q) ||
    s.value.toLowerCase().includes(q))
}, [query, suggestions])

<List
  searchable={{
    value: query,
    onChanged: setQuery
  }}
  searchSuggestions={
    <>
      {filteredSuggestions.map(s =>
        <Text
          searchCompletion={s.value}
        >{s.label}</Text>
      )}
    </>
  }
/>
```

---

## `searchSuggestionsVisibility`

Controls when and where search suggestions are shown.

### Type

```ts
searchSuggestionsVisibility?: {
  visibility: 'visible' | 'hidden'
  placements: SearchSuggestionsPlacementSet
}
```

### `SearchSuggestionsPlacementSet` options

| Value       | Description                                 |
| ----------- | ------------------------------------------- |
| `'content'` | Shows suggestions inline with the content.  |
| `'menu'`    | Shows suggestions in a popover or dropdown. |
| `'all'`     | Applies to all available placements.        |

### Example

```tsx
<List
  searchSuggestionsVisibility={{
    visibility: 'visible',
    placements: 'menu'
  }}
/>
```

---

## `searchCompletion`

Associates a tappable search suggestion with a complete search query string.

### Type

```ts
searchCompletion?: string
```

### Description

Apply this modifier to suggestion views (such as `<Text>`) to indicate what value should be filled into the search field when the user taps the suggestion.

### Example

```tsx
<Text searchCompletion="Mango">🥭 Mango</Text>
```

When tapped, this will set the search field to `"Mango"`.

---

## Summary

| Modifier                      | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| `searchable`                  | Adds a search field with bindings and customization.  |
| `searchSuggestions`           | Provides a list of custom suggestions.                |
| `searchSuggestionsVisibility` | Controls where and when suggestions are shown.        |
| `searchCompletion`            | Defines the value used when a suggestion is selected. |

These modifiers work together to create a responsive, interactive search experience in any scrollable view like `<List>`.