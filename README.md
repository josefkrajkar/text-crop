# React Text Cropper

A React component that automatically crops text to fit within a container's dimensions while maintaining readability. The component intelligently handles text overflow by adding ellipsis and responds to container size changes in real-time.

## Features

- ✂️ Automatically crops text to fit container dimensions
- 🔄 Responsive to container size changes
- ⚡ Optimized performance with debounced calculations
- 🎨 Customizable ellipsis
- 📏 Configurable line height
- 📦 TypeScript support
- 🎯 Zero dependencies (except for React)

## Installation

```bash
npm install react-text-cropper
# or
yarn add react-text-cropper
```

## Usage

```tsx
import { TextCropper } from 'react-text-cropper';

function App() {
  return (
    <div style={{ width: '200px', height: '100px' }}>
      <TextCropper
        text="Your long text content that needs to be cropped goes here..."
        className="custom-class"
        ellipsis="..."
        defaultLineHeight={1.2}
        debounceWait={300}
      />
    </div>
  );
}
```

## Props

| Prop                | Type   | Default    | Description                         |
| ------------------- | ------ | ---------- | ----------------------------------- |
| `text`              | string | (required) | The text content to be cropped      |
| `className`         | string | `''`       | Optional CSS class name for styling |
| `ellipsis`          | string | `'...'`    | Custom ellipsis string              |
| `defaultLineHeight` | number | `1.2`      | Default line height multiplier      |
| `debounceWait`      | number | `300`      | Debounce wait time in milliseconds  |

## How It Works

The component:

1. Measures the container's dimensions
2. Calculates how much text can fit within the available space
3. Automatically adds ellipsis when text overflows
4. Recalculates on container size changes
5. Uses a canvas for text measurements to ensure accuracy
6. Implements debouncing to optimize performance during resize events

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build the library
yarn build

# Run linting
yarn lint

# Format code
yarn format
```

## License

MIT
