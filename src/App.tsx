import {useState}      from 'react'
import {createContext} from 'react'
import {Editor}        from './components/Editor'
import                      './scss/style.scss'

export const context = createContext({})
const Provider = context.Provider

export const App = () => {

  const [mode, setMode] = useState('edit')

  const handleClick = () => {
    setMode(mode === 'draw' ? 'edit' : 'draw')
  }

  const state = {
    mode,
    setMode
  }

  return (
    <div className = 'app'>
      <Provider value={state}>
        <Editor mode={mode} setMode={setMode}/>
        <button onClick = {handleClick}>draw Item</button>
        <span>{mode}</span>
      </Provider>
    </div>
  )
}