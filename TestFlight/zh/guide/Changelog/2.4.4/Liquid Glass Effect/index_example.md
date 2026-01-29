# 示例

```tsx
import { Button, Navigation, NavigationStack, Script, Text, VStack, ZStack, Image, Path, GlassEffectContainer, HStack } from "scripting"

function View({
  image
}: {
  image: UIImage
}) {
  // Access dismiss function.
  const dismiss = Navigation.useDismiss()

  return <NavigationStack>
    <VStack
      navigationTitle="GlassEffect DEMO"
      navigationBarTitleDisplayMode="inline"
      toolbar={{
        topBarLeading: <Button
          title="Done"
          action={dismiss}
        />
      }}
    >
      <ZStack>
        <Image
          image={image}
          resizable
          scaleToFill
        />
        <VStack>
          <HStack>
            <Button
              title="Glass"
              action={() => { }}
              buttonStyle="glass"
            />
            <Button
              title="Glass & Tint"
              action={() => { }}
              buttonStyle="glass"
              tint="red"
            />
          </HStack>
          <HStack>
            <Button
              title="Glass Prominent"
              action={() => { }}
              buttonStyle="glassProminent"
            />
            <Button
              title="Glass Prominent & Tint"
              action={() => { }}
              buttonStyle="glassProminent"
              tint="red"
            />
          </HStack>
          <GlassEffectContainer>
            <HStack spacing={40}>
              <Image
                systemName="1.circle"
                frame={{ width: 80, height: 80 }}
                font={36}
                glassEffect
                offset={{ x: 30, y: 0 }}
              />
              <Image
                systemName="2.circle"
                frame={{ width: 80, height: 80 }}
                font={36}
                glassEffect
                offset={{ x: -30, y: 0 }}
              />
            </HStack>
          </GlassEffectContainer>
          <HStack spacing={12}>
            <Text
              padding
              glassEffect
            >Foo</Text>
            <Text
              padding
              glassEffect={{
                type: 'rect',
                cornerRadius: 10
              }}
            >Foo</Text>
            <Text
              padding
              glassEffect={UIGlass.regular().interactive()}
            >Foo</Text>
            <Text
              padding
              glassEffect={UIGlass.regular().tint("red")}
              foregroundStyle="white"
            >Foo</Text>
          </HStack>
        </VStack>
      </ZStack>
    </VStack>
  </NavigationStack>
}

async function run() {
  try {
    const image = (await Photos.pickPhotos(1))?.at(0)
    if (!image) {
      throw new Error("You must pick an image as the background.")
    }
    // Present view.
    await Navigation.present({
      element: <View
        image={image}
      />
    })
  } catch (e) {
    console.present()
    console.error(e)
  }

  // Avoiding memory leaks.
  Script.exit()
}

run()
```
