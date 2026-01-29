---
title: Example
description: How Liquid Glass materials animate during view changes.

---

```tsx
import { Button, GlassEffectContainer, HStack, NamespaceReader, Navigation, Script, VStack, useObservable } from "scripting"

function View() {

  const isAlternativeMenu = useObservable(false)

  return <NamespaceReader>{namespace => <VStack
    spacing={50}
    frame={{
      maxWidth: 'infinity',
      maxHeight: 'infinity'
    }}
    background="systemYellow"
  >
    <GlassEffectContainer
    >
      <HStack
        spacing={0}
        font="largeTitle"
        imageScale="large"
        buttonStyle="glass"
        labelStyle="iconOnly"
      >
        {
          isAlternativeMenu.value
            ? <>
              <Button
                title="Home"
                systemImage="house"
                action={() => { }}
                glassEffectID={{
                  id: 1,
                  namespace
                }}
                glassEffectUnion={{
                  id: 1,
                  namespace
                }}
              />
              <Button
                title="Settings"
                systemImage="gear"
                action={() => { }}
                glassEffectID={{
                  id: 2,
                  namespace
                }}
                glassEffectUnion={{
                  id: 1,
                  namespace
                }}
              />
            </>

            : <>
              <Button
                title="Edit"
                systemImage="pencil"
                action={() => { }}
                glassEffectID={{
                  id: 1,
                  namespace
                }}
                glassEffectUnion={{
                  id: 1,
                  namespace
                }}
              />
              <Button
                title="Erase"
                systemImage="eraser"
                action={() => { }}
                glassEffectID={{
                  id: 3,
                  namespace
                }}
                glassEffectUnion={{
                  id: 1,
                  namespace
                }}
                glassEffectTransition="materialize"
              />
              <Button
                title="Delete"
                systemImage="trash"
                action={() => { }}
                glassEffectID={{
                  id: 2,
                  namespace
                }}
                glassEffectUnion={{
                  id: 1,
                  namespace
                }}
              />
            </>
        }
      </HStack>
    </GlassEffectContainer>

    <Button
      title="Toggle"
      buttonStyle="bordered"
      action={() => {
        withAnimation(() => {
          isAlternativeMenu.setValue(
            !isAlternativeMenu.value
          )
        })
      }}
    />
  </VStack>
  }</NamespaceReader>
}

async function run() {
  await Navigation.present(<View />)

  Script.exit()
}

run()
```