---
title: Example

---

```tsx
import { Divider, ForEach, Grid, GridRow, Image, List, Navigation, NavigationStack, Rectangle, Script, Section, Text, Toggle, useState, VStack } from "scripting"

function Example() {
  const [gridCellUnsizedAxes, setGridCellUnsizedAxes] = useState(false)

  return <NavigationStack>
    <List
      navigationTitle={"Grid"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section
        header={
          <Text>Grid</Text>
        }
      >
        <Grid>
          <GridRow>
            <Text>Hello</Text>
            <Image systemName={"globe"} />
          </GridRow>
          <GridRow>
            <Image systemName={"hand.wave"} />
            <Text>World</Text>
          </GridRow>
        </Grid>
      </Section>

      <Section
        header={<Text>Grid Divider</Text>}
      >
        <VStack>
          <Toggle
            title={"gridCellUnsizedAxes"}
            value={gridCellUnsizedAxes}
            onChanged={setGridCellUnsizedAxes}
          />
          <Grid>
            <GridRow>
              <Text>Hello</Text>
              <Image systemName={"globe"} />
            </GridRow>
            <Divider
              gridCellUnsizedAxes={gridCellUnsizedAxes
                ? 'horizontal'
                : undefined}
            />
            <GridRow>
              <Image systemName={"hand.wave"} />
              <Text>World</Text>
            </GridRow>
          </Grid>
        </VStack>
      </Section>

      <Section
        header={
          <Text>Column count, cell spacing, alignment</Text>
        }
      >
        <Grid
          alignment={"bottom"}
          verticalSpacing={1}
          horizontalSpacing={1}
        >
          <GridRow>
            <Text>Row 1</Text>
            <ForEach
              count={2}
              itemBuilder={index =>
                <Rectangle
                  fill={"red"}
                  key={index.toString()}
                />
              }
            />
          </GridRow>
          <GridRow>
            <Text>Row 2</Text>
            <ForEach
              count={5}
              itemBuilder={index =>
                <Rectangle
                  fill={"green"}
                  key={index.toString()}
                />
              }
            />
          </GridRow>
          <GridRow>
            <Text>Row 3</Text>
            <ForEach
              count={5}
              itemBuilder={index =>
                <Rectangle
                  fill={"blue"}
                  key={index.toString()}
                />
              }
            />
          </GridRow>
        </Grid>
      </Section>
    </List>
  </NavigationStack>
}

async function run() {
  await Navigation.present({
    element: <Example />
  })
  Script.exit()
}

run()
```