import {useState}       from 'react'
import {useRef}         from 'react'
import {SyntheticEvent} from 'react'
import {initialPoints}  from '../shapes'
import {point}          from '../types'
import {editor}         from '../types'
import {clone}          from '../util/functions'
import {Walls}          from './Walls'
import {Polyline}       from './Polyline'
import {Items}          from './Items'

export const Editor = ({mode, setMode}: editor) => {

  const [points, setPoints]       = useState(initialPoints)
  const [items, setItems]         = useState<point[][]>([])
  const ref                       = useRef<SVGSVGElement>(null)

  // handlers

  const handleMouseDown = (e: SyntheticEvent) => {
    const {offsetX, offsetY} = e.nativeEvent
    const newItems = clone(items)
    newItems.push([{x: offsetX, y: offsetY}])
    setItems(newItems) // set the first point of the Item
  }

  const handleMouseMove = (e: SyntheticEvent) => {
    const {offsetX, offsetY} = e.nativeEvent
    
    if(e.buttons === 1) {
      const newItems           = clone(items)
      const i                  = newItems.length - 1
      newItems[i]              = [newItems[i][0],{x: offsetX, y: offsetY}]
      setItems(newItems)
    } // set the second point of the Item
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
      {items[items.length-1]?.length === 2 && <Items points={items} setPoints = {setItems}/>}
      {/* <Polyline points = {points} /> */}
      {/* <Walls points = {points} setPoints={setPoints}/> */}
    </svg>
  )
}



