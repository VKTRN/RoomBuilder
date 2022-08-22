import {useState} from 'react'
import {Editor}   from './components/Editor'
import                 './scss/style.scss'

export const App = () => {

  const [furnitureDrawing, setFurnitureDrawing] = useState(false)

  const handleClick = () => {
    setFurnitureDrawing(!furnitureDrawing)
  }

  return (
    <div className = 'app'>
      <Editor furnitureDrawing={furnitureDrawing} setFurnitureDrawing={setFurnitureDrawing}/>
      <button onClick = {handleClick}>draw furniture</button>
    </div>
  )
}