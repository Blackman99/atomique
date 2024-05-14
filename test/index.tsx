import { createRoot } from 'react-dom/client'
import App from './App'
import { get, update } from './store'
createRoot(document.getElementById('root') as HTMLDivElement).render(<App />)

document.getElementById('add2-btn')?.addEventListener('click', () => {
  update(v => v + 2)
  console.log(get());
  
})
