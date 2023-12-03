import { produce } from 'immer'
import createAtom from '../atom'

const createArray = <T>(initialVal: T[]) => {

  const val = createAtom<T[]>(initialVal)

  return {
    val,
  }
}