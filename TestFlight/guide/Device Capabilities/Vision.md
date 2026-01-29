# Vision

The `Vision` module provides APIs for **text recognition** tasks.\
It supports recognizing text from static images or by scanning documents using the camera.

***

## Types

### `RecognizedText`

Represents a block of recognized text.

- `content: string`\
  The recognized text content.

- `confidence: number`\
  Confidence level (between `0.0` and `1.0`) where `1.0` indicates the highest confidence.

- `boundingBox: { x: number, y: number, width: number, height: number }`\
  The bounding box of the recognized text in normalized coordinates.

***

### `RecognizeTextOptions`

Configuration options for text recognition.

- `recognitionLevel?: "accurate" | "fast"`\
  Recognition mode:
  - `"accurate"` (default): Prioritizes accuracy.
  - `"fast"`: Prioritizes speed.

- `recognitionLanguages?: string[]`\
  Preferred recognition languages in ISO language codes, in priority order.

- `usesLanguageCorrection?: boolean`\
  Whether to apply automatic language correction during recognition.

- `minimumTextHeight?: number`\
  Minimum text height to recognize, relative to image height (default `0.03125`).

- `customWords?: string[]`\
  Custom vocabulary to prioritize during word recognition. Only effective when `usesLanguageCorrection` is `true`.

***

## Functions

### `recognizeText(image: UIImage, options?: RecognizeTextOptions): Promise<{ text: string, candidates: RecognizedText[] }>`

Recognizes text from the provided image.

- **Parameters**:
  - `image`: A `UIImage` object.
  - `options` _(optional)_: Recognition options.

- **Returns**:\
  A Promise resolving with:
  - `text`: All recognized text combined into a single string.
  - `candidates`: Array of recognized text blocks with details.

***

### `scanDocument(options?: RecognizeTextOptions): Promise<string[]>`

Scans a document using the device's camera and recognizes text.

- **Parameters**:
  - `options` _(optional)_: Recognition options.

- **Returns**:\
  A Promise resolving with an array of recognized text documents.\
  If the user cancels, the Promise rejects with an error.

***

## Usage Examples

### Recognize text from an image file

```tsx
const image = UIImage.fromFile('/path/to/image.png')
if (image) {
  const result = await Vision.recognizeText(image, {
    recognitionLevel: 'accurate',
    recognitionLanguages: ['en', 'zh-Hans'],
    usesLanguageCorrection: true
  })
  console.log('Recognized Text:', result.text)

  for (const block of result.candidates) {
    console.log(`Text: ${block.content}, Confidence: ${block.confidence}`)
  }
}
```

***

### Scan a document with camera

```tsx
try {
  const documents = await Vision.scanDocument({
    recognitionLevel: 'fast',
    recognitionLanguages: ['en']
  })
  console.log('Scanned Documents:', documents)
} catch (error) {
  console.error('Scan cancelled or failed:', error)
}
```
