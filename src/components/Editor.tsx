import {SyntheticEvent} from 'react'
import {useContext}     from 'react'
import {clone}          from '../util/functions'
import {initialPoints}  from '../shapes'
import {context}        from '../context'
import {Items}          from './Items'
import {Room}           from './Room'

export const Editor = () => {

  const {items, setItems}   = useContext(context)
  const {mode, setMode}     = useContext(context)

  // handlers

  const handleMouseDown = (e: SyntheticEvent<SVGElement, MouseEvent>) => {
    const {offsetX, offsetY} = e.nativeEvent
    const newItems = clone(items)
    newItems.push([{x: offsetX, y: offsetY}])
    setItems(newItems) // set the first point of the Item
  }

  const handleMouseMove = (e: SyntheticEvent<SVGElement, MouseEvent>) => {
    const {offsetX, offsetY} = e.nativeEvent
    
    if(e.nativeEvent.buttons === 1) {
      const newItems           = clone(items)
      const n                  = newItems.length - 1
      const x1                 = newItems[n][0].x
      const y1                 = newItems[n][0].y
      const x2                 = offsetX
      const y2                 = offsetY

      const p1                = {x: x1, y: y1}
      const p2                = {x: x2, y: y1}
      const p3                = {x: x2, y: y2}
      const p4                = {x: x1, y: y2}

      newItems[n]              = [p1,p2,p3,p4]
      setItems(newItems)
    } 
  }

  const handleMouseUp = () => {
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
    <svg className='editor' {...handlers}>
      <Room initialPoints={initialPoints}/>
      <Items/>
    </svg>
  )
}



