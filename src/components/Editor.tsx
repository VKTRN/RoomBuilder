import {useState}   from 'react'
import {rectangle}  from '../shapes'
import {Rectangle}  from './Rectangle'
import {Line}       from './Line'
import {Polyline}   from './Polyline'

const getDirection = (p1: any, p2: any) => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  if (dx === 0){
    return 'vertical'
  }
  if (dy === 0){
    return 'horizontal'
  }
}

const initialPoints = [
  {x: 100, y: 100},
  {x: 200, y: 100},
  {x: 200, y: 200},
  {x: 100, y: 200},
]

export const Editor = () => {

  const [points, setPoints] = useState(initialPoints)
  
  // const handleMouseMove = (e:any) => {
  //   setPoints(prev => prev + e.movementX)
  // }
  
  // const handleMouseUp = () => {
  //   window.removeEventListener('mousemove', handleMouseMove)
  //   window.removeEventListener('mouseup', handleMouseUp)
  // }
  
  // const handleMouseDown = () => {
  //   window.addEventListener('mousemove', handleMouseMove)
  //   window.addEventListener('mouseup', handleMouseUp)
  // }

  

  return (
    <svg className = 'editor'>
      <Polyline points = {points} />
      {
        points.map((p, i) => {
          const direction = i === points.length - 1 
            ? getDirection(points[i], points[0]) 
            : getDirection(points[i], points[i+1])
          
          return <Line key={i} i={i} points={points} setPoints={setPoints} direction={direction} />
        }
        )
      }
    </svg>
  )
}

