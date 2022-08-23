import {useState}     from 'react'
import {useContext}   from 'react'
import {point}        from '../types'
import {getRectangle} from '../util/functions'
import {polyline}     from '../types'
import {context}      from '../App'
import {Polyline}     from './Polyline'

export const Furniture = ({points, setPoints}:polyline) => {

  const [selected, setSelected] = useState(false)
  const {mode} = useContext(context)
  
  const handleClick = () => {
    // setSelected(!selected)
  }

  const handleMouseMove = (e) => {
    if(e.buttons === 1){
      const newPoints = [...points]
      newPoints[0].x += e.nativeEvent.movementX
      newPoints[1].x += e.nativeEvent.movementX
      newPoints[0].y += e.nativeEvent.movementY
      newPoints[1].y += e.nativeEvent.movementY
      setPoints(newPoints)
    } 
  }

  const className = selected ? 'furniture selected' : 'furniture'

  const handlers = {
    onClick: handleClick,
    onMouseMove: mode === 'edit' ? handleMouseMove : undefined
  }
  
  return (
    <g className={className} {...handlers}>
      <Polyline points={getRectangle(points[0], points[1])}/>
    </g>
  )
}

