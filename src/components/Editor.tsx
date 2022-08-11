import {useState}   from 'react'
import {rectangle}  from '../shapes'
import {Rectangle}  from './Rectangle'

export const Editor = () => {
  
  const handleMouseMove = (e:any) => {
    setX(prev => prev + e.movementX)
  }
  
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }
  
  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const [x, setX] = useState(100)

  return (
    <svg className = 'editor'>
      <Rectangle x={x} {...rectangle} onMouseDown={handleMouseDown}/>
    </svg>
  )
}


