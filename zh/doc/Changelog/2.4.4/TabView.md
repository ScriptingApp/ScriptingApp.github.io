Scripting 提供了与最新 iOS TabView 体系一致的 API：
通过 `TabView`、`Tab`、`TabSection` 组织界面结构，使应用能够在 iOS 18+ 环境下完整支持多标签视图、侧边栏标签、可定制布局等。

相比旧版本依赖 `tabItem` 修饰符的方式，新的结构更加灵活、分组更清晰，并能与 TabViewCustomization 等新特性无缝配合。

***

# 一、基础结构：TabView + Tab

在最基本的形式中，`TabView` 作为容器，内部包含多个 `Tab`。
每个 `Tab` 定义：

- 标签标题
- 图标
- 标识值（value）
- 角色（如 search）
- 对应的内容视图

示例：

```tsx
function RootView() {
  const selection = useObservable<number>(0)

  return (
    <TabView selection={selection}>
      <Tab
        title="首页"
        systemImage="house.fill"
        value={0}
      >
        <HomeView />
      </Tab>

      <Tab
        title="搜索"
        systemImage="magnifyingglass"
        value={1}
        role="search"
      >
        <SearchView />
      </Tab>

      <Tab
        title="设置"
        systemImage="gearshape.fill"
        value={2}
      >
        <SettingsView />
      </Tab>
    </TabView>
  )
}
```

要点：

- `selection` 通过 Observable 控制当前激活的标签
- `value` 必须与 `selection` 的泛型类型匹配（string 或 number）
- Search Tab 可使用 `role="search"` 与搜索相关行为联动

***

# 二、使用 TabSection 组织分组标签

当 Tab 数量较多、需要按功能分类、需要在侧边栏中显示复杂结构时，可以使用 `TabSection`。

结构关系为：

```
TabView
 ├─ TabSection
 │   ├─ Tab
 │   ├─ Tab
 │   └─ ...
 ├─ TabSection
 │   ├─ Tab
 │   └─ ...
```

## 1. 使用 title 作为分组标题

```tsx
<TabView selection={selection}>
  <TabSection title="收件箱">
    <Tab title="收件箱" systemImage="tray.fill" value="inbox">
      <InboxView />
    </Tab>
    <Tab title="已发送" systemImage="paperplane.fill" value="sent">
      <SentView />
    </Tab>
  </TabSection>

  <TabSection title="标签">
    <Tab title="重要" systemImage="star.fill" value="important">
      <ImportantView />
    </Tab>
  </TabSection>
</TabView>
```

## 2. 使用 header 作为自定义组头

如需显示图标、说明文字或复合内容，可用 `header`：

```tsx
<TabSection
  header={
    <HStack spacing={8}>
      <Image systemName="folder.fill" />
      <VStack>
        <Text fontWeight="bold">项目</Text>
        <Text fontSize={12} foregroundColor="secondary">
          最近打开的项目
        </Text>
      </VStack>
    </HStack>
  }
>
  <Tab title="项目 A" systemImage="doc.fill" value="projectA">
    <ProjectAView />
  </Tab>
</TabSection>
```

***

# 三、TabSection 的高级能力：布局、操作区、拖拽与可见性

`TabSection` 提供了丰富的分组级配置，让 Tab 分组的呈现方式更加灵活。

## 1. tabPlacement（标签位置策略）

支持：

- `automatic`
- `pinned`
- `sidebarOnly`

例如将某组仅显示在侧边栏：

```tsx
<TabSection title="标签" tabPlacement="sidebarOnly">
  <Tab title="重要" systemImage="star.fill" value="important">
    <ImportantView />
  </Tab>
</TabSection>
```

## 2. sectionActions（分组操作区）

为某一组提供额外操作按钮：

```tsx
<TabSection
  title="列表"
  sectionActions={
    <Button title="添加" systemImage="plus" action={addItem} />
  }
>
  ...
</TabSection>
```

## 3. 分组可见性与可定制行为

通过：

- `defaultVisibility`
- `customizationID`
- `customizationBehavior`
- `draggable`
- `dropDestination`

可以为每个分组提供：

- 默认显示策略
- 是否允许用户自定义排序或隐藏
- 是否可以拖动
- 外部拖拽数据的处理

例如：

```tsx
<TabSection
  title="文件"
  customizationID="file-section"
  customizationBehavior="reorderable"
  draggable="file-section"
  dropDestination={items => handleDrop(items)}
>
  ...
</TabSection>
```

***

# 四、TabView 级别的高级配置

TabView 本身提供了一系列属性，可用于构建高级 UI（iOS 18～26）。

包括：

- `tabBarMinimizeBehavior`
- `tabViewBottomAccessory`
- `tabViewSearchActivation`
- `tabViewCustomization`
- `tabViewSidebarHeader`
- `tabViewSidebarFooter`
- `tabViewSidebarBottomBar`

以下为每项能力的说明。

***

## 1. tabBarMinimizeBehavior（iOS 26.0+）

控制 TabBar 是否根据滚动方向自动最小化：

- `automatic`
- `never`
- `onScrollDown`
- `onScrollUp`

示例：

```tsx
<TabView
  selection={selection}
  tabBarMinimizeBehavior="onScrollDown"
>
  ...
</TabView>
```

***

## 2. tabViewBottomAccessory（iOS 26.0+）

为 TabView 添加底部附加视图，例如提示栏：

```tsx
<TabView
  selection={selection}
  tabViewBottomAccessory={
    <HStack>
      <Text>左右滑动切换标签</Text>
      <Spacer />
      <Button title="知道了" action={dismiss} />
    </HStack>
  }
>
  ...
</TabView>
```

***

## 3. tabViewSearchActivation（iOS 26.0+）

控制搜索 Tab 的激活方式：

- `automatic`
- `searchTabSelection`

与 `role="search"` 搭配使用：

```tsx
<TabView
  selection={selection}
  tabViewSearchActivation="searchTabSelection"
>
  ...
</TabView>
```

***

## 4. 侧边栏附属视图（iOS 18.0+）

包括：

- `tabViewSidebarHeader`
- `tabViewSidebarFooter`
- `tabViewSidebarBottomBar`

示例：

```tsx
<TabView
  selection={selection}
  tabViewSidebarHeader={<UserHeader />}
  tabViewSidebarFooter={<SettingsButton />}
  tabViewSidebarBottomBar={<UpgradeButton />}
>
  ...
</TabView>
```

***

# 五、TabViewCustomization：标签页可定制化体系（重点补充）

`TabViewCustomization` 是一个可序列化的状态对象，用于存储和恢复用户对 Tab 布局的自定义行为，包括：

- Tab 分组顺序
- 分组内部的 Tab 排序
- Tab 可见性（在 TabBar 与 Sidebar 中分别独立管理）
- 重置各种设置
- 持久化与恢复

它通常放在 TabView 根视图中，通过：

```tsx
tabViewCustomization={customizationState}
```

来注入。

## 1. 创建与加载 TabViewCustomization

创建方式通常是：

```tsx
const customization = useObservable<TabViewCustomization >(() => {
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

如需创建一个新的空自定义对象，可使用：

```tsx
const customizationState = useObservable(() => new TabViewCustomization())
```

## 2. 保存自定义内容

你可以将用户调整后的 Tab 布局序列化保存：

```tsx
const data = customization.value?.toData()
Storage.set('tab_customization', data)
```

`toData()` 会将内部状态转换为可存储的 `Data` 对象。

## 3. 获取并操作分组（Section）

```ts
getSection(id: string): TabViewCustomizationSection | null
```

`TabSection` 通常带有 `customizationID`，这样就可以获取特定分组并操作它：

```tsx
const section = customization.value?.getSection('file-section')

section?.tabOrder        // 一个包含 tab ID 顺序的数组，或 null
section?.resetTabOrder() // 重置排序
```

场景示例：

- 用户将“文件”分组中的 Tab 重新排序
- 用户将某些 Tab 移动到“更多”区域
- 应用需要根据用户排序更新 UI

## 4. 获取并操作单个 Tab

```ts
getTab(id: string): TabViewCustomizationTab | null
```

可通过 Tab 的 `customizationID` 获取并调整其可见性：

```tsx
const tab = customization.value?.getTab('important-tab')

tab?.tabBarVisibility         // Visibility 类型
tab.sidebarVisibility = 'hidden'
```

适用场景：

- 控制 Tab 在 TabBar 或 Sidebar 中是否显示
- 用户可通过自定义界面操作 Tab 可见性
- 程序自动隐藏某些 Tab

## 5. 全局重置

```ts
resetSectionOrder(): void
resetVisibility(): void
```

通常用于：

- 点击“恢复默认布局”按钮
- 版本更新后清理已有布局逻辑

示例：

```tsx
<Button
  title="恢复默认"
  action={() => {
    customization.value?.resetSectionOrder()
    customization.value?.resetVisibility()
  }}
/>
```

***

# 六、与旧的 tabItem 写法的关系

此文档采用全新的结构化写法：

- TabView
- Tab
- TabSection
- TabViewCustomization

旧的 `tabItem` 写法仍可用于简单场景以及兼容iOS 17，但与侧边栏、Tab 分组、自定义布局等高级能力不兼容。
在复杂应用中，建议全面迁移到新的组件体系。
