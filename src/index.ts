import { useSyncExternalStore } from 'react'

type NewValSetter<T> = (oldVal: T) => T

type NewValOrNewValSetter<T> = T | NewValSetter<T>

function isNewValSetter<T>(input: T | NewValSetter<T>): input is NewValSetter<T> {
  return typeof input === 'function'
}

/**
 * To create an minimal atom hook function to share states between components
 * @param initialVal any value you want this atom to hold
 * @returns a react hook
 */
function createAtom<T>(initialVal: T): () => [T, (newVal: NewValOrNewValSetter<T>) => void] {
  let listeners: Array<() => void> = []

  let val = initialVal

  const subscriber = (listener) => {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const getSnapShot = () => val

  return () => [
    useSyncExternalStore(subscriber, getSnapShot, getSnapShot),
    (newValOrNewValSetter) => {
      if (isNewValSetter(newValOrNewValSetter))
        val = newValOrNewValSetter(val)
      else
        val = newValOrNewValSetter

      listeners.forEach(l => l())
    }]
}

export default createAtom
