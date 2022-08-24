import {useState}      from 'react'
import {Provider}      from './context'
import {Editor}        from './components/Editor'
import {Mode}          from './types'
import {State}         from './types'
import {point}         from './types'
import                      './scss/style.scss'

export const App = () => {

  const [mode, setMode]    = useState<Mode>('edit')
  const [points, setPoints] = useState<point[]>([])
  const [items, setItems]   = useState<point[][]>([])

  const handleClick = () => {
    setMode(mode === 'draw' ? 'edit' : 'draw')
  }

  const state: State = {
    mode,
    points,
    items,
    setMode,
    setPoints,
    setItems
  }

  return (
    <div className = 'app'>
      <Provider value={state}>
        <Editor/>
        <button onClick = {handleClick}>draw Item</button>
        <span>{mode}</span>
      </Provider>
    </div>
  )
}