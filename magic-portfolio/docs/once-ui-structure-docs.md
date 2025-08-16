# Structure

*Last update: May 4, 2025*

## Flex

Once UI layouts are built using **Flex** and **Grid**, prop-based abstractions over CSS flexbox and grid. These primitives are the foundation of the system, enabling layout logic through composition rather than CSS.

## Syntax

We expose two convenience wrappers: **Row** and **Column**. These are semantically expressive Flex elements with pre-set directions. Use them instead of the Flex for better semantics and code quality.

### Flex Layout

```jsx
<Row fillWidth fitHeight gap="16" s={{direction: "column"}}>
  <Column fillWidth center>
      col
  </Column>
  <Column fill gap="16">
    <Row fill center>
        row
    </Row>
    <Row fill center>
        row
    </Row>
  </Column>
  <Column fillWidth center>
      col
  </Column>
</Row>
```

## Alignment

Rather than wrestling with `justifyContent` and `alignItems`, we use semantic **horizontal** and **vertical** props that auto-adjust based on direction.

### Basic Alignment

```jsx
<Column fillWidth minHeight={10}>
  <Button label="Continue"/>
</Column>
<Column fillWidth center minHeight={10}>
  <Button label="Continue"/>
</Column>
<Column fillWidth horizontal="end" vertical="end" minHeight={10}>
  <Button label="Continue"/>
</Column>
```

The `start` is the default value for both alignments, so we don't declare them. The `center` prop is shorthand for both `horizontal="center"` and `vertical="center"`.

### Space Distribution

We can also use `around` and `between` values for the alignment props:

```jsx
<Column fillWidth horizontal="between">
  <IconButton icon="chevronLeft"/>
  <Button label="Continue"/>
</Column>
<Column fillWidth horizontal="center" vertical="around">
  <IconButton icon="chevronLeft"/>
  <Button label="Continue"/>
</Column>
```

## Size

### Fill Properties

Use the `fillWidth`, `fillHeight`, or shorthand `fill` to fill up the remaining space. These properties also apply `minWidth` and `minHeight` of 0 if not specified.

Use `fit`, `fitWidth`, `fitHeight` to apply `fit-content`.

```jsx
<Column fit>
  <Button label="Continue"/>
</Column>
<Column fillWidth fitHeight horizontal="center">
  <Button label="Continue"/>
</Column>
```

### Flex Distribution

Use the `flex` prop to create asymmetric space distributions, like a bento grid:

```jsx
<Column fillWidth gap="16">
  <Row fillWidth gap="16" s={{direction: "column"}}>
    <Row flex="2" height={8}/>
    <Row flex="3" height={8}/>
  </Row>
  <Row fillWidth gap="16" s={{direction: "column"}}>
    <Row flex="3" height={8}/>
    <Row flex="2" height={8}/>
  </Row>
</Column>
```

### Constraints

You can also use `maxWidth`, `minHeight`, and `aspectRatio`. `maxWidth` will also apply `fillWidth`.

```jsx
<Column maxWidth={20}>
  maxWidth: 20
</Column>
<Column fillWidth aspectRatio="16/9">
  aspectRatio: 16 / 9
</Column>
```

## Position

Override the default relative position with `absolute`, `fixed`, `sticky`, or `static`. Use `top`, `right`, `bottom`, and `left` to position the element. Set SpacingToken values for `top`, `right`, `bottom`, and `left`.

```jsx
<Column padding="24">
  <Row fill/>
  <Icon position="absolute" top="12" right="12" name="close"/>
</Column>
```

## Color

### Background and Text Colors

Use the `background` and `solid` props to apply colors, and the `onBackground` and `onSolid` props respectively to apply text colors.

#### Background + onBackground

```jsx
<Row background="brand-medium">
  <Text onBackground="brand-medium">
    Text on background
  </Text>
</Row>
```

#### Solid + onSolid

The `solid` prop is commonly used for interactive element backgrounds, such as the button and checkbox.

```jsx
<Row solid="accent-medium">
  <Text onSolid="accent-strong">
    Text on solid
  </Text>
</Row>
```

#### Alpha Properties

The alpha properties let you design subtle backgrounds and overlays.

```jsx
<Row background="success-alpha-weak" border="success-alpha-weak">
  <Text onBackground="success-medium">
    Text on alpha
  </Text>
</Row>
```

#### Surface Properties

The surface background and border property allows you to style elements differently in light- and dark mode. By default:
- Surface background: `neutral-medium` in dark mode, `neutral-weak` in light mode
- Border color: transparent in dark mode, `neutral-medium` in light mode

The surface properties are designed for large layout container elements such as headers or sidebars.

```jsx
<Row
  background="surface"
  border="surface">
  <Logo dark wordmark="/trademark/type-dark.svg" size="xs"/>
  <Logo light wordmark="/trademark/type-light.svg" size="xs"/>
  <Avatar/>
</Row>
```

## Spacing

Use utility props to apply spacing consistently, such as the `padding`, `paddingX`, `marginTop`, etc. Values can be spacing tokens or numbers (converted to rem). Use the `gap` to set the internal spacing between children.

```jsx
<Column fillWidth>
  <Row fillWidth height="48" radius="m"/>
  <Column fillWidth paddingX="xl" paddingY="24" gap="40" marginTop="40" radius="m">
    <Row fillWidth height="64" radius="m" padding="16"/>
    <Row fillWidth height="64" radius="m" padding="16"/>
  </Column>
</Column>
```

## Border

Apply borders using the `border`, `borderWidth` and `borderStyle` props. Since most borders are 1px solid, this will be the default if not specified. Border naming follows the same color naming as background and solid.

```jsx
<Background
  border="success-medium"
/>
<Background
  border="warning-medium"
  borderWidth="2"
/>
<Background
  border="danger-medium"
  borderWidth="2"
  borderStyle="dashed"
/>
```

## Radius

Border radius convention follows the extended T-shirt size model.

### Standard Radius

```jsx
<Row radius="xs-8" padding="8">
  <Row radius="xs-4" padding="4">
    <Row radius="xs"/>
  </Row>
</Row>
<Row radius="s-8" padding="8">
  <Row radius="s-4" padding="4">
    <Row radius="s"/>
  </Row>
</Row>
<Row radius="m-8" padding="8">
  <Row radius="m-4" padding="4">
    <Row radius="m"/>
  </Row>
</Row>
<Row radius="l-8" padding="8">
  <Row radius="l-4" padding="4">
    <Row radius="l"/>
  </Row>
</Row>
<Row radius="xl-8" padding="8">
  <Row radius="xl-4" padding="4">
    <Row radius="xl"/>
  </Row>
</Row>
```

### Selective Radius

Apply radius to specific sides or corners of a Flex.

```jsx
<Row>
  <Row leftRadius="l" rightRadius="xs"/>
  <Row leftRadius="xs" rightRadius="l"/>
</Row>
```

### Radius Overrides

Define a radius and then override it at specific corners:

```jsx
<Row>
  <Row radius="xs" topLeftRadius="l"/>
  <Row radius="xs" topRightRadius="l"/>
</Row>
<Row>
  <Row radius="xs" bottomLeftRadius="l"/>
  <Row radius="xs" bottomRightRadius="l"/>
</Row>
```

## Shadow

Use the `shadow` prop to apply box-shadows with the default T-shirt size model.

```jsx
<Row shadow="xs"/>
<Row shadow="s"/>
<Row shadow="m"/>
<Row shadow="l"/>
<Row shadow="xl"/>
```

## Opacity

You can set opacity from 0 to 100 in steps of 10.

```jsx
<Row opacity="0"/>
<Row opacity="10"/>
<Row opacity="20"/>
<Row opacity="30"/>
<Row opacity="40"/>
<Row opacity="50"/>
<Row opacity="60"/>
<Row opacity="70"/>
<Row opacity="80"/>
<Row opacity="90"/>
<Row opacity="100"/>
```

## Conditionals

### Hide/Show Based on Breakpoint

Use the `hide` prop to conditionally render elements based on breakpoint.

```jsx
<Row m={{hide: true}}>
  <Text>Shown above the "m" breakpoint</Text>
</Row>
<Row hide m={{hide: false}}>
  <Text>Hidden on / below the "m" breakpoint</Text>
</Row>
```

### Theme-Based Rendering

Use the `dark` and `light` props to limit rendering by theme.

```jsx
<Media dark src="/image-dark.jpg"/>
<Media light src="/image-light.jpg"/>
```

## Cursor

Adjust the cursor with the `cursor` prop. Use the `interactive` value to utilize a tokenized variable for the pointer, so you can update all instances simultaneously.

### Standard Cursors

```jsx
<Row cursor="interactive">
  Interactive
</Row>
<Row cursor="text">
  text
</Row>
<Row cursor="wait">
  wait
</Row>
<Row cursor="zoom-in">
  zoom-in
</Row>
```

### Custom Cursors

Custom cursor options include:
- Loading
- Crosshair
- Circle
- Poko

## zIndex

You can set zIndex from -1 to 10.

```jsx
<Row zIndex="10"/>
<Row zIndex="8"/>
<Row zIndex="6"/>
<Row zIndex="4"/>
<Row zIndex="2"/>
<Row zIndex="0"/>
```

## Text

Use the `textVariant` prop to apply text styles to children elements. Use the `align` to set their alignment, and the `onBackground` to set their color.

```jsx
<Row textVariant="display-strong-xs">
  Display text
</Row>
<Row textVariant="heading-strong-l">
  Heading text
</Row>
<Row textVariant="body-default-m" onBackground="neutral-weak">
  Body text
</Row>
<Row textVariant="code-default-m" onBackground="success-weak">
  Code text
</Row>
<Row textVariant="label-default-s" onBackground="brand-weak">
  Label text
</Row>
```

## Responsiveness

Override layout flow with `s` or `m` props.

```jsx
<Row s={{direction: "column"}}>
  <Row fillWidth height={6}/>
  <Row fillWidth height={6}/>
  <Row fillWidth height={6}/>
  <Row fillWidth height={6}/>
</Row>
```

## Additional Properties

- `overflowX`, `overflowY`, or `overflow` for overflow control
- `transition="micro-medium"` sets duration presets

## Grid

All non-flex-specific properties of the Flex are also available on the Grid.

### Columns

Use the `columns` prop to define the number of columns. Use the `s` and `m` props to define the number of columns on mobile and tablet devices.

```jsx
<Grid fillWidth columns="4"/>
  <Row fillWidth/>
  <Row fillWidth/>
  <Row fillWidth/>
  <Row fillWidth/>
  <Row fillWidth/>
  <Row fillWidth/>
</Grid>
```

## Composition

Both Flex and Grid components:
- Use `forwardRef`
- Expose `className`, `style`, and full layout props
- Furthermore, Flex spreads props on the outermost Flex wrapper of components

---

That's the Once UI layout model — composable, prop-based, responsive by default, and production-oriented.

You now have a low-code layouting language.