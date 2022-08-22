import {getPolyline} from '../util/functions'
import {polyline} from '../types'
import {point} from '../types'
import {Polyline} from './Polyline'
import {useState} from 'react'

export const Furniture = ({points}:polyline) => {

  const [selected, setSelected] = useState(false)
  
  const handleClick = () => {
    setSelected(!selected)
  }

  const className = selected ? 'furniture selected' : 'furniture'
  
  return (
    <g className={className} onClick={handleClick} >
      <Polyline points={getRectangle(points[0], points[1])}/>
    </g>
  )
}

// a function that takes two points and returns a rectangle as an array of four points
const getRectangle = (p1:point, p2:point) => {
  return [
    {x: p1.x, y: p1.y},
    {x: p2.x, y: p1.y},
    {x: p2.x, y: p2.y},
    {x: p1.x, y: p2.y}
  ]
}