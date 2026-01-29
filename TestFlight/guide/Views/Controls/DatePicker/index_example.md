# Example

```tsx
import { DatePicker, DatePickerComponents, DatePickerStyle, HStack, Image, List, Navigation, NavigationStack, Picker, Script, Section, Spacer, Text, Toggle, useMemo, useState, } from "scripting"

const oneDay = 1000 * 60 * 60 * 24

 function Example() {
  const [date, setDate] = useState(() => Date.now())
  const [startDateEnabled, setStartDateEnabled] = useState(false)
  const [endDateEnabled, setEndDateEnabled] = useState(false)
  const startDate = useMemo(() => Date.now() - oneDay * 7, [])
  const endDate = useMemo(() => Date.now() + oneDay * 7, [])
  const components = useMemo<DatePickerComponents[]>(() => [
    'date',
    'hourAndMinute'
  ], [])
  const [displayedComponents, setDisplayedComponents] = useState<DatePickerComponents[]>([
    'date', 'hourAndMinute'
  ])
  const datePickerStyles = useMemo<DatePickerStyle[]>(() => [
    'compact',
    'graphical',
    'wheel',
  ], [])
  const [selectedStyle, setSelectedStyle] = useState<DatePickerStyle>('graphical')

  return <NavigationStack>
    <List
      navigationTitle={"DatePicker"}
      navigationBarTitleDisplayMode={"inline"}
    >
      <Section>
        <Toggle
          title={"Use startDate"}
          value={startDateEnabled}
          onChanged={setStartDateEnabled}
        />

        <Toggle
          title={"Use endDate"}
          value={endDateEnabled}
          onChanged={setEndDateEnabled}
        />
        {components.map(name =>
          <HStack
            contentShape={'rect'}
            onTapGesture={() => {
              if (displayedComponents.includes(name)) {
                if (displayedComponents.length > 1) {
                  setDisplayedComponents(displayedComponents.filter(e => e !== name))
                }
              } else {
                setDisplayedComponents([name, ...displayedComponents])
              }
            }}
          >
            <Text>Display: {name}</Text>
            <Spacer />
            {displayedComponents.includes(name)
              ? <Image
                systemName={"checkmark"}
                foregroundStyle={"systemBlue"}
              />
              : undefined}
          </HStack>
        )}

        <Picker
          title={"DatePicker Style"}
          value={selectedStyle}
          onChanged={setSelectedStyle as any}
          pickerStyle={'menu'}
        >
          {datePickerStyles.map(style =>
            <Text tag={style}>{style}</Text>
          )}
        </Picker>
      </Section>

      <DatePicker
        title={"DatePicker"}
        value={date}
        onChanged={setDate}
        startDate={startDateEnabled ? startDate : undefined}
        endDate={endDateEnabled ? endDate : undefined}
        displayedComponents={displayedComponents}
        datePickerStyle={selectedStyle}
      />
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
