## Atomique 
> 芥子纳须弥 The smallest may hold the largest

An atomic state management prototype for React 18+

## Install

```sh
# via npm
npm i atomique

# via yarn
yarn add atomique

# via pnpm
pnpm i atomique
```

## Usage

* count.js

The `atomique` accept a initial value and return two things:
* `useAtom` - a hook that can be used in components
* `update` - a function that can be used outside components

> [!NOTE]
> The `atomique` function can accept complex values other than string, number, such as array and object.
> It is based on the hook [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) in React 18

```js
import atomique from 'atomique'

export const { useAtom: useCount, update } = negozio()
```

* count-button.jsx

```jsx
import { useCount } from '/path/to/use-count'

export default function CountButton() {
  const [, setCount] = useCount()
  return <button onClick={() => setCount(c => c + 1)}>
    +
  </button>
}
```

* count-display.jsx

```js
import { useCount } from '/path/to/use-count'

export default function CountDisplay() {
  const [count] = useCount()
  return <h3>Count is: {count}</h3>
}
```

* App.jsx

```jsx
import CountButton from '/path/to/count-button'
import CountDisplay from '/path/to/count-display'

export default function App() {
  return <div>
    <CountDisplay />
    <CountButton />
  </div>
}
```

![Count Gif](magasin-count.gif)

## LICENSE

MIT
