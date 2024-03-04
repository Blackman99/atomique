## Atomique 
> 芥子纳须弥 The smallest may hold the largest

An atomic state management prototype for React 18+

## Install

* With npm/yarn/pnpm
```sh
# via npm
npm i atomique

# via yarn
yarn add atomique

# via pnpm
pnpm i atomique
```
* With [jsr](https://jsr.io/)
```sh
# via npx
npx jsr add @ds/atomique

# via deno
deno add @ds/atomique

# via yarn
yarn dlx jsr add @ds/atomique

# via pnpm
pnpm dlx jsr add @ds/atomique

# via bun
bunx jsr add @ds/atomique
```

## Introduction 

The `atomique` accept a initial value and return two things:
* `useAtom` - a hook that can be used inside components
* `update` - a function that can be used outside components

> [!NOTE]
> The `atomique` function can accept complex values other than string, number, such as array and object.
> It is based on the hook [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) in React 18

## Usage

* count.js

```js
import atomique from 'atomique'

// import atomique from '@ds/atomique' // With jsr

export const { useAtom: useCount, update } = atomique(0)
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
