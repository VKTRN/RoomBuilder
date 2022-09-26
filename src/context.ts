import {createContext} from 'react'
import {State} from './types'

const initial: State = {
  mode: 'edit',
  points: [],
  items: [],
  selected: -1,
  setMode: () => {},
  setPoints: () => {},
  setItems: () => {},
  setSelected: () => {},
}

export const context  = createContext<State>(initial)
export const Provider = context.Provider