import {getPolyline} from '../util/functions'
import {rectangle} from '../types'
import {Polyline} from './Polyline'

export const Furniture = ({rect}:rectangle) => {
  
  const handleClick = () => {
    console.log('clicked')
  }
  
  return (
    <g onClick = {handleClick}>
      <Polyline points={getRectangle(rect.p1, rect.p2)}/>
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