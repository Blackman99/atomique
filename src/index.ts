import { useSyncExternalStore } from 'react'

type NewValSetter<T> = (oldVal: T) => T

type NewValOrNewValSetter<T> = T | NewValSetter<T>

type Updater<T> = (newVal: NewValOrNewValSetter<T>) => void

type UseAtom<T> = () => [T, Updater<T>]

function isNewValSetter<T>(input: T | NewValSetter<T>): input is NewValSetter<T> {
  return typeof input === 'function'
}

/**
 * To create an minimal atom hook function to share states between components
 * @param initialVal any value you want this atom to hold
 * @returns A hook `useAtom` and a normal function `update`. `useAtom` can be used inside components. `update` function can be used outside components.
 */
function createAtom<T>(initialVal: T): {
  useAtom: UseAtom<T>
  update: Updater<T>
  get: () => T
} {
  let listeners: Array<() => void> = []

  let val = initialVal

  const subscriber = (listener: () => void) => {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const getSnapShot = () => val

  const useAtom: UseAtom<T> = () => [
    useSyncExternalStore(subscriber, getSnapShot, getSnapShot),
    (newValOrNewValSetter) => {
      if (isNewValSetter(newValOrNewValSetter))
        val = newValOrNewValSetter(val)
      else
        val = newValOrNewValSetter

      listeners.forEach(l => l())
    }]

  const update: Updater<T> = (newValOrNewValSetter) => {
    if (isNewValSetter(newValOrNewValSetter))
      val = newValOrNewValSetter(val)

    else
      val = newValOrNewValSetter

    listeners.forEach(l => l())
  }

  return {
    useAtom,
    update,
    get: () => val
  }
}

export default createAtom
