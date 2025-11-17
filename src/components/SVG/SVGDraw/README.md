# SVGDraw Component

A reusable component for animating SVG drawings with customizable stroke animations.

## Features

- ✨ Animates any SVG by drawing paths one by one
- 🎨 Customizable stroke color, width, duration, and stagger
- 👁️ Trigger on mount or when scrolled into view
- 🔄 Replay animation by changing `replayKey`
- 🎨 Optional fill after drawing completes
- ⚡ Uses Web Animations API for smooth performance

## Basic Usage

```tsx
import SVGDraw from '../../components/SVG/SVGDraw'
import {ReactComponent as MySVG} from '../../assets/images/my-icon.svg'

function MyComponent() {
    return (
        <SVGDraw
            width={200}
            height={200}
            stroke="#6675FF"
            strokeWidth={3}
            duration={0.8}
            stagger={0.15}
            trigger="inView"
        >
            <MySVG/>
        </SVGDraw>
    )
}
```

## Props

| Prop              | Type                  | Default     | Description                                              |
|-------------------|-----------------------|-------------|----------------------------------------------------------|
| `children`        | `React.ReactElement`  | *required*  | The SVG component to animate                             |
| `width`           | `number \| string`    | `120`       | Width of the SVG container                               |
| `height`          | `number \| string`    | `120`       | Height of the SVG container                              |
| `stroke`          | `string`              | `'#5263FF'` | Stroke color for the animation                           |
| `strokeWidth`     | `number`              | `2`         | Stroke width for the animation                           |
| `duration`        | `number`              | `0.9`       | Duration in seconds for each path                        |
| `stagger`         | `number`              | `0.12`      | Delay in seconds between each path                       |
| `trigger`         | `'mount' \| 'inView'` | `'mount'`   | When to start the animation                              |
| `replayKey`       | `number`              | `0`         | Change this value to replay the animation                |
| `fillAfter`       | `string \| null`      | `null`      | Fill color after animation completes                     |
| `customDurations` | `number[]`            | `undefined` | Custom duration for each path (overrides `duration`)     |
| `threshold`       | `number`              | `0.3`       | Intersection observer threshold (for `trigger="inView"`) |
| `preserveStroke`  | `boolean`             | `false`     | Preserve original stroke from SVG instead of overriding  |
| `preserveColors`  | `boolean`             | `false`     | Preserve and restore original fill colors from SVG       |

## Examples

### Trigger on Mount

```tsx
<SVGDraw trigger="mount">
    <MySVG/>
</SVGDraw>
```

### Trigger on Scroll Into View

```tsx
<SVGDraw
    trigger="inView"
    threshold={0.5}
>
    <MySVG/>
</SVGDraw>
```

### Custom Speeds

```tsx
// Slow drawing
<SVGDraw
    duration={2.0}
    stagger={0.5}
>
    <MySVG/>
</SVGDraw>

// Fast drawing
<SVGDraw
    duration={0.3}
    stagger={0.05}
>
    <MySVG/>
</SVGDraw>
```

### Fill After Drawing

```tsx
<SVGDraw
    stroke="#6675FF"
    fillAfter="#6675FF"
>
    <MySVG/>
</SVGDraw>
```

### Custom Duration Per Path

```tsx
<SVGDraw
    customDurations={[0.5, 1.0, 0.8, 1.5]}
>
    <MySVG/>
</SVGDraw>
```

### Replay Animation

```tsx
function MyComponent() {
    const [key, setKey] = useState(0)

    return (
        <>
            <SVGDraw replayKey={key}>
                <MySVG/>
            </SVGDraw>
            <button onClick={() => setKey(k => k + 1)}>
                Replay
            </button>
        </>
    )
}
```

### Preserve Original SVG Colors and Stroke

```tsx
// Keep the SVG's original stroke and fill colors
<SVGDraw
    width={300}
    height="auto"
    duration={0.8}
    stagger={0.15}
    trigger="inView"
    threshold={0.5}
    preserveStroke={true}
    preserveColors={true}
>
    <MySVG/>
</SVGDraw>
```

## Usage in GoogleCodesignProjectPage

```tsx
import SVGDraw from '../../components/SVG/SVGDraw'
import {ReactComponent as CutieIllustrationSVG} from '../../assets/images/cutie-illustration.svg'

<
div
style = {
{
    display: 'block', margin
:
    '0 auto', width
:
    '300px'
}
}>
<
SVGDraw
width = {300}
height = "auto"
duration = {0.8}
stagger = {0.15}
trigger = "inView"
threshold = {0.5}
preserveStroke = {true}
preserveColors = {true}
    >
    < CutieIllustrationSVG / >
    < /SVGDraw>
</div>
```

## Available SVGs

You can use SVGDraw with any of these SVGs in the project:

- `sparkle-color.svg` / `sparkle-white.svg`
- `handshake-color.svg` / `handshake-white.svg`
- `drone-color.svg` / `drone-white.svg`
- `magic-wand.svg`
- `gem_light.svg` / `gem_dark.svg` (already wrapped in GemDraw component)
- Any custom SVG you import

## How It Works

1. The component finds all drawable SVG elements (paths, lines, circles, etc.)
2. Sets up stroke dasharray/dashoffset to hide the paths
3. Animates strokeDashoffset from full length to 0 for each path
4. Staggers the animation across all paths
5. Optionally fills the shapes when complete
