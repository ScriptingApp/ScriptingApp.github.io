# 接收外部拖拽内容

`onDropContent` 是 Scripting 提供的一个视图修饰符，用于将当前视图设置为**拖放目标（Drop Target）**，以接收从其他 App 拖拽进入的文件、图片或文本内容。

***

## 功能说明

通过 `onDropContent`，你可以实现以下能力：

- 接收来自其他 App 的拖拽内容
- 使用 UTType 精确限制可接收的数据类型
- 实时感知拖拽指针是否悬停在视图上方
- 在内容被放下时，通过 `ItemProvider` 启动数据加载流程
- 对安全作用域文件建立持久访问权限

***

## 修饰符定义

```ts
onDropContent?: {
  types: UTType[]
  isTarget: {
    value: boolean
    onChanged: (value: boolean) => void
  } | Observable<boolean>
  perform: (attachments: ItemProvider[]) => boolean
}
```

***

## 参数说明

### types

用于指定当前视图**可以接收的内容类型列表**，类型值为 UTType 字符串。

当拖拽内容不包含任意匹配的类型时：

- 当前视图不会激活为放置目标
- `isTarget` 不会发生变化
- `perform` 不会被调用

示例：

```ts
types: ["public.image", "public.movie"]
```

***

### isTarget

用于表示拖拽操作是否悬停在当前视图上方。

- 当拖拽进入视图区域时，值为 `true`
- 当拖拽移出视图区域时，值为 `false`

支持以下两种形式：

- 绑定对象形式

  ```ts
  {
    value: boolean
    onChanged: (value: boolean) => void
  }
  ```

- Observable 形式

  ```ts
  Observable<boolean>
  ```

Observable 形式适合与 `useObservable` 搭配使用，语义更简洁。

***

### perform

当符合 `types` 要求的内容被成功放下时触发。

```ts
perform: (attachments: ItemProvider[]) => boolean
```

- 参数 `attachments` 为 `ItemProvider` 数组
- 每一个 `ItemProvider` 表示一个被拖入的内容项
- 函数返回值表示是否成功处理了此次拖放操作

返回值说明：

- 返回 `true` 表示拖放被成功接收
- 返回 `false` 表示未处理该拖放内容

***

## perform 的执行规则（重要）

在 `perform` 中需要遵循以下规则：

- 必须在 `perform` 函数的同步执行过程中**启动对 ItemProvider 的加载**
- 允许使用 `Promise` / `then` 等方式延迟完成加载
- 不允许在 `perform` 返回之后，再通过其他回调或事件启动加载
- 返回 `false` 时，系统会认为该拖放未被接受

原因说明：

- 拖放内容受系统安全机制保护
- 只有在 `perform` 执行期间，脚本才拥有对拖放数据的访问权限
- 若未在此期间启动加载，后续将无法访问对应资源

***

## ItemProvider 的使用方式

在 `perform` 中，开发者应当通过 `ItemProvider` 判断类型并启动加载。

常见流程包括：

- 使用 `hasItemConforming` 判断内容类型
- 根据内容类型选择合适的加载方式
- 对文件类资源获取路径并进行后续处理

***

## 示例用法

```tsx
const isTarget = useObservable(false)

return <VStack
  onDropContent={{
    types: ["public.image", "public.movie"],
    isTarget: isTarget,
    perform: (attachments) => {
      const images: UIImage[] = []
      const videos: string[] = []

      let found = false

      for (const attachment of attachments) {
        if (attachment.hasItemConforming("public.png")) {
          found = true
          attachment.loadUIImage().then(image => {
            if (image != null) {
              images.push(image)
            }
          })
        } else if (attachment.hasItemConforming("public.movie")) {
          found = true
          attachment.loadFilePath("public.movie").then(filePath => {
            if (filePath != null) {
              // 为安全作用域文件创建书签
              FileManager.addFileBookmark(filePath)
              videos.push(filePath)
            }
          })
        }
      }

      return found
    }
  }}
>
  ...
</VStack>
```

***

## 安全作用域文件访问

通过 `onDropContent` 获取的文件路径，通常属于**安全作用域资源**。

这类路径在以下情况下可能失效：

- `perform` 返回之后
- App 重启
- 脚本生命周期结束

为保证后续仍可访问文件，建议在获取路径后创建文件书签。

***

## FileManager.addFileBookmark

```ts
FileManager.addFileBookmark(path: string, name?: string): string | null
```

说明：

- 为指定文件或文件夹创建安全作用域书签
- 适用于通过 `Photos`、`onDropContent` 等 API 获取的路径
- 返回书签名称，用于后续访问或移除

示例：

```ts
const bookmarkName = FileManager.addFileBookmark(filePath)
```

***

## FileManager.removeFileBookmark

```ts
FileManager.removeFileBookmark(name: string): boolean
```

说明：

- 移除指定名称的文件书签
- 当不再需要访问对应文件时应及时调用
- 返回是否成功移除

示例：

```ts
FileManager.removeFileBookmark(bookmarkName)
```

***

## 使用建议

- 在 `types` 中尽量明确声明可接收的内容类型
- 在 `perform` 中只负责启动加载，不要等待加载完成
- 对图片等轻量内容可直接加载为对象
- 对视频、音频、文档等资源优先使用文件路径
- 对需要长期访问的文件务必创建书签
- 在资源不再使用时移除对应书签
