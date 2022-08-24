import {createContext} from 'react'
import {State} from './types'

const initial: State = {
  mode: 'edit',
  points: [],
  items: [],
  setMode: () => {},
  setPoints: () => {},
  setItems: () => {},
}

export const context  = createContext<State>(initial)
export const Provider = context.Provider