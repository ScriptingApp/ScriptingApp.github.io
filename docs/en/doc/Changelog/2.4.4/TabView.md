---
title: TabView

---

Scripting provides a modern Tab system aligned with iOS 18+:

* `TabView` — container that manages multiple tabs and switching between them
* `Tab` — a single tab and its associated content
* `TabSection` — a way to group tabs into sections, each with its own configuration and header

Combined with TabView-level options and `TabViewCustomization`, this enables rich tab layouts, including sidebar representations, customization, and persistence.

This document focuses on:

* How to structure tab content using `TabView`, `Tab`, and `TabSection`
* How to configure tab bar and sidebar behaviors
* How to use `TabViewCustomization` to persist and restore user customizations

---

## 1. Basic Usage: TabView + Tab

In the simplest case, `TabView` hosts multiple `Tab` elements. Each `Tab` defines:

* A title and system image for the tab item
* A value used for selection
* An optional role (for example `search`)
* The actual view content

```tsx
import { TabView, Tab, useObservable } from 'scripting'

function RootView() {
  const selection = useObservable<number>(0)

  return (
    <TabView selection={selection}>
      <Tab
        title="Home"
        systemImage="house.fill"
        value={0}
      >
        <HomeView />
      </Tab>

      <Tab
        title="Search"
        systemImage="magnifyingglass"
        value={1}
        role="search"
      >
        <SearchView />
      </Tab>

      <Tab
        title="Settings"
        systemImage="gearshape.fill"
        value={2}
      >
        <SettingsView />
      </Tab>
    </TabView>
  )
}
```

Key points:

* `TabView selection={selection}` binds the **current tab** to an observable value.
* Each `Tab`’s `value` must match the observable’s type (`number` or `string`).
* Tabs with `role="search"` integrate with `tabViewSearchActivation` behavior (see below).

---

## 2. Grouping Tabs with TabSection

When you have many tabs, or when you want a sidebar-like structure, use `TabSection` to group related tabs.

The structure becomes:

```text
TabView
 ├─ TabSection
 │   ├─ Tab
 │   ├─ Tab
 │   └─ ...
 ├─ TabSection
 │   ├─ Tab
 │   └─ ...
```

### 2.1 Using `title` as a section header

```tsx
function MailRootView() {
  const selection = useObservable<string>('inbox')

  return (
    <TabView selection={selection}>
      <TabSection title="Mailboxes">
        <Tab
          title="Inbox"
          systemImage="tray.full.fill"
          value="inbox"
        >
          <InboxView />
        </Tab>

        <Tab
          title="Sent"
          systemImage="paperplane.fill"
          value="sent"
        >
          <SentView />
        </Tab>
      </TabSection>

      <TabSection title="Labels">
        <Tab
          title="Important"
          systemImage="star.fill"
          value="important"
        >
          <ImportantView />
        </Tab>
      </TabSection>
    </TabView>
  )
}
```

### 2.2 Using `header` for a custom section header

If you need a richer header (icon + text + description, etc.), use `header` instead of `title`:

```tsx
<TabSection
  header={
    <HStack spacing={8}>
      <Image systemName="folder.fill" />
      <VStack alignment="leading">
        <Text fontWeight="bold">Projects</Text>
        <Text fontSize={12} foregroundColor="secondary">
          Recently opened projects
        </Text>
      </VStack>
    </HStack>
  }
>
  <Tab title="Project A" systemImage="doc.fill" value="projectA">
    <ProjectAView />
  </Tab>

  <Tab title="Project B" systemImage="doc.fill" value="projectB">
    <ProjectBView />
  </Tab>
</TabSection>
```

`title` and `header` are mutually exclusive: use one or the other per section.

---

## 3. Section-Level Configuration: Layout, Actions, Drag & Drop

`TabSection` can control how a section is presented and how it behaves.

### 3.1 `tabPlacement`

Controls where and how the section’s tabs appear. Common values:

* `automatic` — let the system decide based on environment.
* `pinned` — pins tabs so they remain visible in the bar.
* `sidebarOnly` — show tabs only in the sidebar representation.

Example: a section that only appears in the sidebar:

```tsx
<TabSection
  title="Tags"
  tabPlacement="sidebarOnly"
>
  <Tab title="Important" systemImage="star.fill" value="important">
    <ImportantView />
  </Tab>
</TabSection>
```

### 3.2 `sectionActions`

Provides extra actions associated with a section, such as “Add” or “More”.

```tsx
<TabSection
  title="Lists"
  sectionActions={
    <Button
      title="Add"
      systemImage="plus"
      action={addNewList}
    />
  }
>
  <Tab title="Today" systemImage="sun.max.fill" value="today">
    <TodayView />
  </Tab>
</TabSection>
```

### 3.3 Visibility and customization behavior

At the section level you can configure:

* Default visibility in different placements (tab bar, sidebar)
* Customization behavior (whether users can reorder or adjust the section)

Typical use-case: a section that users can reorder in a Tab layout editor:

```tsx
<TabSection
  title="Files"
  customizationID="files-section"
  customizationBehavior="reorderable"
>
  <Tab title="Recent" systemImage="clock.fill" value="recent">
    <RecentFilesView />
  </Tab>
</TabSection>
```

### 3.4 Drag & drop integration

Both `TabSection` and `Tab` can participate in drag & drop via:

* `draggable` — logical drag identifier
* `dropDestination` — handler for dropped items

Example:

```tsx
<TabSection
  title="Files"
  draggable="files-section"
  dropDestination={items => handleDroppedItems(items)}
>
  <Tab title="Recent" systemImage="clock.fill" value="recent">
    <RecentFilesView />
  </Tab>
</TabSection>
```

---

## 4. TabView-Level Configuration

On the TabView (or the view owning the TabView) you can configure global behavior such as:

* Tab bar minimization
* Bottom accessories
* Search activation behavior
* Sidebar header/footer/bottom bar
* Customization state (`tabViewCustomization`)

### 4.1 `tabBarMinimizeBehavior` (iOS 26.0+)

Controls how the tab bar minimizes in response to scrolling:

* `automatic`
* `never`
* `onScrollDown`
* `onScrollUp`

```tsx
<TabView
  selection={selection}
  tabBarMinimizeBehavior="onScrollDown"
>
  {/* sections + tabs */}
</TabView>
```

### 4.2 `tabViewBottomAccessory` (iOS 26.0+)

Places a view at the bottom of the TabView—below the tab bar or tab area.

```tsx
<TabView
  selection={selection}
  tabViewBottomAccessory={
    <HStack spacing={8}>
      <Text fontSize={12}>Swipe left or right to switch tabs</Text>
      <Spacer />
      <Button title="Got it" action={dismissHint} />
    </HStack>
  }
>
  {/* sections + tabs */}
</TabView>
```

### 4.3 `tabViewSearchActivation` (iOS 26.0+)

Configures how search is activated for tabs with `role="search"`:

* `automatic`
* `searchTabSelection` — activate search when the search tab is selected

```tsx
<TabView
  selection={selection}
  tabViewSearchActivation="searchTabSelection"
>
  <Tab title="Home" systemImage="house.fill" value="home">
    <HomeView />
  </Tab>

  <Tab
    title="Search"
    systemImage="magnifyingglass"
    value="search"
    role="search"
  >
    <SearchView />
  </Tab>
</TabView>
```

### 4.4 Sidebar-specific views (iOS 18.0+)

For sidebar-style TabView, you can add:

* `tabViewSidebarHeader` — top area (user info, app logo, etc.)
* `tabViewSidebarFooter` — bottom area (settings, logout)
* `tabViewSidebarBottomBar` — bar between main content and bottom edge

```tsx
<TabView
  selection={selection}
  tabViewSidebarHeader={
    <VStack alignment="leading" spacing={4}>
      <Image systemName="person.circle.fill" fontSize={32} />
      <Text fontWeight="bold">User Name</Text>
      <Text fontSize={12} foregroundColor="secondary">
        Welcome back
      </Text>
    </VStack>
  }
  tabViewSidebarFooter={
    <Button title="Settings" systemImage="gearshape" action={openSettings} />
  }
  tabViewSidebarBottomBar={
    <Button title="Upgrade to Pro" systemImage="star.fill" action={upgrade} />
  }
>
  {/* sections + tabs */}
</TabView>
```

---

## 5. TabViewCustomization: Persisting Layout and Visibility

`TabViewCustomization` is the core object that represents the customization state of a TabView. It can:

* Track section order
* Track tab order within each section
* Track tab visibility (tab bar vs sidebar)
* Reset section order or visibility
* Be serialized to / from `Data` for persistence

The typical pattern is:

1. Initialize `TabViewCustomization` from storage (if present), otherwise create a new instance.
2. Observe changes to it and save serialized data back to storage.
3. Use it to query and modify section and tab customizations.
4. Pass it into the TabView via `tabViewCustomization`.

### 5.1 Initializing and persisting TabViewCustomization

Below is the **correct example** using `useObservable` and `Storage`:

```tsx
const customization = useObservable<TabViewCustomization>(() => {
  const data = Storage.get('tab_customization')
  if (data) {
    return TabViewCustomization.fromData(data) ?? new TabViewCustomization()
  }
  return new TabViewCustomization()
})

useEffect(() => {
  const listener = (newValue: TabViewCustomization) => {
    const data = newValue.toData()
    if (data) {
      Storage.set('tab_customization', data)
    }
  }
  customization.subscribe(listener)
  return () => {
    customization.unsubscribe(listener)
  }
}, [])
```

Explanation:

* The initializer:

  * Reads raw `Data` from `Storage` using the key `tab_customization`.
  * Uses `TabViewCustomization.fromData(data)` to recreate a customization object.
  * Falls back to `new TabViewCustomization()` if the data is invalid or missing.
* The `useEffect`:

  * Subscribes to changes on the observable.
  * Every time the `TabViewCustomization` changes, `toData()` is called and persisted.
  * Cleans up the subscription on unmount.

This ensures the layout is restored on launch and any user changes are saved automatically.

### 5.2 Using TabViewCustomization with TabView

You typically pass the observable itself into the TabView:

```tsx
<TabView
  selection={selection}
  tabViewCustomization={customization}
>
  {/* TabSection + Tab structure */}
</TabView>
```

Internally, the Tab system updates the `TabViewCustomization` object as the user edits the layout, reorders sections, hides tabs, and so on. The observable subscription persists these updates.

### 5.3 Working with sections: getSection and section order

You can query a section by its `customizationID`:

```tsx
const filesSection = customization.value.getSection('files-section')
```

A section customization can:

* Expose `tabOrder`: the array of tab IDs in this section (or `null` if not customized).
* Provide `resetTabOrder()`: to restore the original system-defined order of tabs in this section.

Example:

```tsx
function resetFilesSectionOrder() {
  const section = customization.value.getSection('files-section')
  section?.resetTabOrder()
}
```

### 5.4 Working with tabs: getTab and visibility

You can query a tab by its `customizationID`:

```tsx
const importantTab = customization.value.getTab('important-tab')
```

A tab customization exposes:

* `tabBarVisibility` — read-only current visibility in the tab bar.
* `sidebarVisibility` — read/write visibility in the sidebar representation.

Example: hiding a tab from the sidebar only:

```tsx
const importantTab = customization.value.getTab('important-tab')
if (importantTab) {
  importantTab.sidebarVisibility = 'hidden'
}
```

This allows you to:

* Implement “show/hide in sidebar” toggles.
* Sync visibility with user preferences or other settings.

### 5.5 Global resets: section order and visibility

Two convenience methods reset parts of the customization:

```tsx
customization.value.resetSectionOrder()
customization.value.resetVisibility()
```

Typical usage: a “Reset layout” button.

```tsx
<Button
  title="Restore Default Layout"
  action={() => {
    customization.value.resetSectionOrder()
    customization.value.resetVisibility()
  }}
/>
```

This restores both:

* Section ordering
* Tab visibility (in tab bar and sidebar)

to their original default state.

---

## 6. Relationship with `tabItem`-based API

Earlier examples in the project may use a `tabItem` view modifier to configure tab labels. That approach is documented elsewhere and is suitable for simple Tab views.

However, for:

* Grouped tabs (`TabSection`)
* Sidebar representations
* Tab reordering and visibility customization (`TabViewCustomization`)
* Per-section actions and layouts

you should use the `TabView + Tab + TabSection + TabViewCustomization` structure described here.

It provides a clearer model, matches modern iOS Tab APIs, and is designed to work seamlessly with customization and persistence.
