import type { ReactNode } from 'react'
import { useCount } from './store'

export default function App(): ReactNode {
  const [count, setCount] = useCount()
  return <div>
    <h3>
      Count is: {count}
    </h3>
    <button onClick={() => setCount(c => c + 1)}>
      +
    </button>
  </div>
}
