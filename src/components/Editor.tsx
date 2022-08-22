import {useState}   from 'react'
import {initialPoints}  from '../shapes'
import {Polyline}   from './Polyline'
import {Walls}      from './Walls'
import {point}     from '../types'
import {Furniture}  from './Furniture'
import {useEffect}  from 'react'
import {useRef}     from 'react'

export const Editor = ({furnitureDrawing, setFurnitureDrawing}: {furnitureDrawing: boolean, setFurnitureDrawing: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const [points, setPoints]           = useState(initialPoints)
  const [furniture, setFurniture]     = useState<point[]>([])
  const ref                           = useRef<SVGSVGElement>(null)

  const handleMouseDown = (e: React.SyntheticEvent) => {
    const {offsetX, offsetY} = e.nativeEvent
    setFurniture([{x: offsetX, y: offsetY}]) // set the first point of the furniture
  }

  const handleMouseMove = (e: React.SyntheticEvent) => {
    const {offsetX, offsetY} = e.nativeEvent
    e.buttons === 1 && setFurniture(prev => [prev[0],{x: offsetX, y: offsetY}]) // set the second point of the furniture
  }

  const handleMouseUp = (e: React.SyntheticEvent) => {
    setFurnitureDrawing(false)
  }

  const handlers = {
    onMouseDown: furnitureDrawing ? handleMouseDown : undefined,
    onMouseMove: furnitureDrawing ? handleMouseMove : undefined,
    onMouseUp:   furnitureDrawing ? handleMouseUp   : undefined
  }

  return (
    <svg ref = {ref} className='editor' {...handlers}>
      {furniture.length === 2 && <Furniture points={furniture}/>}
      {/* <Polyline points = {points} /> */}
      {/* <Walls points = {points} setPoints={setPoints}/> */}
    </svg>
  )
}

