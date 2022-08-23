import {useState}       from 'react'
import {useRef}         from 'react'
import {SyntheticEvent} from 'react'
import {initialPoints}  from '../shapes'
import {point}          from '../types'
import {editor}         from '../types'
import {Walls}          from './Walls'
import {Polyline}       from './Polyline'
import {Furniture}      from './Furniture'

export const Editor = ({mode, setMode}: editor) => {

  const [points, setPoints]       = useState(initialPoints)
  const [furniture, setFurniture] = useState<point[]>([])
  const ref                       = useRef<SVGSVGElement>(null)

  // handlers

  const handleMouseDown = (e: SyntheticEvent) => {
    const {offsetX, offsetY} = e.nativeEvent
    setFurniture([{x: offsetX, y: offsetY}]) // set the first point of the furniture
  }

  const handleMouseMove = (e: SyntheticEvent) => {
    const {offsetX, offsetY} = e.nativeEvent
    e.buttons === 1 && setFurniture(prev => [prev[0],{x: offsetX, y: offsetY}]) // set the second point of the furniture
  }

  const handleMouseUp = (e: SyntheticEvent) => {
    setMode('edit')
  }

  const drawHandlers = {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp
  }

  const editHandlers = {}

  const handlersMap = {
    'draw': drawHandlers,
    'edit': editHandlers
  }

  const handlers = handlersMap[mode]

  return (
    <svg ref = {ref} className='editor' {...handlers}>
      {furniture.length === 2 && <Furniture points={furniture} setPoints = {setFurniture}/>}
      {/* <Polyline points = {points} /> */}
      {/* <Walls points = {points} setPoints={setPoints}/> */}
    </svg>
  )
}



