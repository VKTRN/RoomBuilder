import {getPolyline} from '../util/functions'
import {polyline} from '../types'
import {point} from '../types'
import {Polyline} from './Polyline'

export const Furniture = ({points}:polyline) => {

  
  const handleClick = () => {
    console.log('clicked')
  }
  
  return (
    <g onClick = {handleClick}>
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