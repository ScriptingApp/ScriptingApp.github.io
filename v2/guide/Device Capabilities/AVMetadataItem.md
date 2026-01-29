# AVMetadataItem

The `AVMetadataItem` class represents a single metadata entry within a media file, such as an audio or video resource.
Instances of this class are typically returned by the methods `AVPlayer.loadMetadata()` and `AVPlayer.loadCommonMetadata()` and provide access to metadata embedded in media resources.

Each metadata item describes one piece of information—such as the title, artist, album name, artwork, or encoding details—and can be accessed in multiple typed forms.

***

## Class Definition

### `class AVMetadataItem`

***

### **Properties**

#### `key: string`

The metadata item’s key.
This value identifies the specific metadata field and is usually tied to the underlying media format (e.g., ID3, QuickTime, iTunes).

**Example**

```ts
console.log(item.key) // e.g. "id3/TIT2"
```

***

#### `commonKey?: string`

The **common key** corresponding to the metadata item.
This key maps the format-specific `key` to a general, standardized key within the “common key space.”
It allows accessing metadata fields across different media formats in a unified way.

**Example**

```ts
console.log(item.commonKey) // e.g. "title"
```

***

#### `identifier?: string`

A unique identifier for the metadata item.
Used to distinguish multiple entries of the same type.

***

#### `extendedLanguageTag?: string`

The extended language tag of the metadata item (e.g., `"en-US"` or `"zh-Hans"`).
Indicates the language of the metadata content, if applicable.

***

#### `locale?: string`

The locale associated with this metadata item.
This may contain additional region or language localization information.

***

#### `time?: number`

The timestamp (in seconds) of the metadata item within the media’s timeline.
Useful for time-based metadata, such as subtitles or synchronized lyrics.

**Example**

```ts
console.log(item.time) // e.g. 12.53
```

***

#### `duration?: number`

The duration (in seconds) that this metadata item applies to.
Some visual metadata (such as timed artwork or lyric frames) may have an active duration.

***

#### `startDate?: Date`

The start date of the metadata item, if available.
Returns `null` when no date information is provided.

***

#### `dataType?: string`

The data type of the metadata item’s value (e.g., `"com.apple.metadata.datatype.UTF-8"`, `"public.jpeg"`).
This can help determine how to interpret the metadata’s underlying data.

***

#### `extraAttributes: Promise<Record<string, any> | null>`

Extra attributes associated with the metadata item.
These attributes are format-specific and depend on the metadata container and keyspace.

For example, an ID3 tag’s `"APIC"` frame (attached picture) may include a picture description or type.

**Example**

```ts
const extras = await item.extraAttributes
console.log(extras)
// Example output: { description: "Cover (front)", pictureType: 3 }
```

***

#### `dataValue: Promise<Data | null>`

Returns the metadata value as a `Data` object.
Useful for binary content such as embedded artwork or other non-text data.

**Example**

```ts
const imageData = await item.dataValue
if (imageData) {
  const image = UIImage.fromData(imageData)
  // Use image
}
```

***

#### `stringValue: Promise<string | null>`

Returns the metadata value as a `string`.
This is the most common form for textual metadata such as titles, artists, and album names.

**Example**

```ts
const title = await item.stringValue
console.log("Title:", title)
```

***

#### `numberValue: Promise<number | null>`

Returns the metadata value as a `number`.
Useful for numeric fields such as bitrate, sample rate, or track number.

**Example**

```ts
const bitrate = await item.numberValue
console.log("Bitrate:", bitrate)
```

***

#### `dateValue: Promise<Date | null>`

Returns the metadata value as a `Date` object.
Applicable to time-related metadata such as recording or release dates.

**Example**

```ts
const date = await item.dateValue
console.log("Release Date:", date?.toISOString())
```

***

## Example Usage

```ts
const metadata = await player.loadMetadata()
for (const item of metadata) {
  const key = item.commonKey ?? item.key
  const value =
    (await item.stringValue) ??
    (await item.numberValue) ??
    (await item.dateValue)
  console.log(`${key}: ${value}`)
}
```

**Notes:**

- Prefer using `commonKey` when available for format-agnostic access.
- Asynchronous properties (`stringValue`, `dataValue`, `extraAttributes`) return Promises and should be awaited.
- Use `AVPlayer.loadCommonMetadata()` for standardized metadata fields such as title, album, artist, and artwork.

***

## Common Use Cases

| Purpose       | Common Key (`commonKey`) | Description                         |
| ------------- | ------------------------ | ----------------------------------- |
| Title         | `"title"`                | The media’s title                   |
| Artist        | `"artist"`               | The performer or author             |
| Album         | `"albumName"`            | The album name                      |
| Artwork       | `"artwork"`              | Embedded artwork image (JPEG/PNG)   |
| Encoder       | `"encoder"`              | The software or encoder used        |
| Creation Date | `"creationDate"`         | The recording or creation timestamp |
