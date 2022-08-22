import {useState}   from 'react'
import {initialPoints}  from '../shapes'
import {Polyline}   from './Polyline'
import {Walls}      from './Walls'
import {point}     from '../types'
import {Furniture}  from './Furniture'
import {useEffect}  from 'react'
import {useRef}     from 'react'

export const Editor = () => {

  const [points, setPoints]           = useState(initialPoints)
  const [furniture, setFurniture]     = useState<point[]>([])
  const [virtualRect, setVirtualRect] = useState<point[]>([])
  const ref                           = useRef<SVGSVGElement>(null)

  const handleMouseDown = (e: React.SyntheticEvent) => {
    // console.log('mouse down')
    const {offsetX, offsetY} = e.nativeEvent
    setVirtualRect([{x: offsetX, y: offsetY}])
    setFurniture([{x: offsetX, y: offsetY}])
  }
  
  const handleMouseUp = (e: React.SyntheticEvent) => {
    const {offsetX, offsetY} = e.nativeEvent
    setFurniture(prev => [prev[0],{x: offsetX, y: offsetY}])
    setVirtualRect([])
  }

  const handleMouseMove = (e: React.SyntheticEvent) => {
    if (e.buttons === 1) {
      const {offsetX, offsetY} = e.nativeEvent
      setVirtualRect(prev => [prev[0],{x: offsetX, y: offsetY}])
    }
  }

  const handlers = {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove
  }

  return (
    <svg ref = {ref} className = 'editor' {...handlers}>
      {furniture.length === 2 && <Furniture points={furniture}/>}
      {virtualRect.length === 2 && <Furniture points={virtualRect}/>}
      {/* <Polyline points = {points} /> */}
      {/* <Walls points = {points} setPoints={setPoints}/> */}
    </svg>
  )
}

