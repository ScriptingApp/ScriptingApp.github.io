# ItemProvider

`ItemProvider` represents a **deferred data provider** used to access content such as files, images, text, or URLs in a controlled and secure way.
It is commonly used in scenarios like drag and drop, file importing, and content selection from Photos or Files.

An `ItemProvider` does not store the data itself. Instead, it describes **how and under what constraints the data can be accessed**.

***

## Core Concepts

- `ItemProvider` describes capabilities, not concrete data
- Data loading is always subject to system security restrictions
- File-based resources can only be accessed within a limited, controlled scope
- Whether a file can be accessed in place is determined by the underlying system

***

## Properties

### registeredTypes

```ts
readonly registeredTypes: UTType[]
```

Represents all types that the item provider can supply at a semantic level.

- Includes both concrete types and inferred parent types
- Useful for high-level content classification or debugging
- Does not guarantee that a concrete file representation exists

***

### registeredInPlaceTypes

```ts
readonly registeredInPlaceTypes: UTType[]
```

Represents the set of types that support open-in-place access.

- Typically applies to large resources such as videos, audio files, or documents
- Actual in-place access is determined at load time

***

## Capability Checks

### hasItemConforming

```ts
hasItemConforming(type: UTType): boolean
```

Checks whether the content semantically conforms to the specified type.

- Performs a broad, semantic check
- Considers UTType inheritance
- Suitable for branching logic and content classification

***

### hasRepresentationConforming

```ts
hasRepresentationConforming(type: UTType): boolean
```

Checks whether a concrete, loadable representation exists for the specified type.

- Performs a strict check
- Suitable for file processing and format-specific workflows

***

### hasInPlaceRepresentationConforming

```ts
hasInPlaceRepresentationConforming(type: UTType): boolean
```

Checks whether a representation supporting open-in-place access exists.

- Commonly used to choose loading strategies for large files

***

## Object Loading Capabilities

### canLoadUIImage

```ts
canLoadUIImage(): boolean
```

Indicates whether the content can be loaded as a `UIImage`.

- Intended for UI display
- Does not guarantee preservation of original format or metadata

***

### canLoadLivePhoto

```ts
canLoadLivePhoto(): boolean
```

Indicates whether the content can be loaded as a `LivePhoto`.

- Used to distinguish Live Photos from static images
- When true, `loadLivePhoto` can be called

***

## Loading Methods

### loadUIImage

```ts
loadUIImage(): Promise<UIImage | null>
```

Loads a `UIImage` object.

- Suitable for lightweight display
- Not intended for file-level processing or asset preservation

***

### loadLivePhoto

```ts
loadLivePhoto(): Promise<LivePhoto | null>
```

Loads a `LivePhoto` object.

- Includes both the still image and paired video
- Suitable for display, saving, or further processing

***

### loadURL

```ts
loadURL(): Promise<string | null>
```

Loads a URL and returns it as a string.

- May represent a web URL or a file URL

***

### loadText

```ts
loadText(): Promise<string | null>
```

Loads plain text content.

- Supports plain text
- Rich text is automatically converted to plain text

***

### loadData

```ts
loadData(type: UTType): Promise<Data | null>
```

Loads raw binary data for the specified type.

- The entire data payload is loaded into memory
- Suitable for JSON, configuration files, or small resources
- Not recommended for large files such as video or audio

***

## File Path Loading and Security Scope

Access to file paths is subject to strict security rules.
All file access must occur within a limited callback scope provided by the API.

***

### loadFilePath

```ts
loadFilePath(type: UTType): Promise<string | null>
```

Loads a file path for the specified type. If the item provider can load data as the specified type, this file will be copied to the app group's temporary directory and the file path will be returned, otherwise null will be returned. You should delete the file when it is no longer needed.

Example:

```ts
const filePath = provider.loadFilePath("public.movie")
```

***

## Creating an ItemProvider

### fromUIImage

```ts
ItemProvider.fromUIImage(image: UIImage): ItemProvider
```

Creates an `ItemProvider` from a `UIImage`.

- Provides static image capabilities only
- Does not include Live Photo or original asset information

***

### fromText

```ts
ItemProvider.fromText(text: string): ItemProvider
```

Creates an `ItemProvider` from a text string.

***

### fromURL

```ts
ItemProvider.fromURL(url: string): ItemProvider | null
```

Creates an `ItemProvider` from a URL string.

- Returns `null` if the URL is invalid
- Supports both web URLs and file URLs

***

### fromFilePath

```ts
ItemProvider.fromFilePath(path: string): ItemProvider
```

Creates an `ItemProvider` from a file path.

- Preserves the original file
- Suitable for videos, audio, and documents
- Supports open-in-place capability checks

***

## Usage Guidelines

- Use `hasItemConforming` to determine content categories
- Use object loading methods for UI display
- Use file path loading methods for large resources
- Always access files only within the provided callback scope
- Never defer access to security-scoped files outside the callback
