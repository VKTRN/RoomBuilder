import {useState}       from 'react'
import {useRef}         from 'react'
import {SyntheticEvent} from 'react'
import {useContext}     from 'react'
import {clone}          from '../util/functions'
import {initialPoints}  from '../shapes'
import {context}        from '../context'
import {Walls}          from './Walls'
import {Polyline}       from './Polyline'
import {Items}          from './Items'

export const Editor = () => {

  const [points, setPoints] = useState(initialPoints)
  const {items, setItems}   = useContext(context)
  const {mode, setMode}     = useContext(context)

  // handlers

  const handleMouseDown = (e: SyntheticEvent<SVGElement, MouseEvent>) => {
    console.log('handleMouseDown')
    console.log(e)
    const {offsetX, offsetY} = e.nativeEvent
    const newItems = clone(items)
    newItems.push([{x: offsetX, y: offsetY}])
    setItems(newItems) // set the first point of the Item
  }

  const handleMouseMove = (e: SyntheticEvent<SVGElement, MouseEvent>) => {
    console.log('handleMouseMove')
    const {offsetX, offsetY} = e.nativeEvent
    
    if(e.nativeEvent.buttons === 1) {
      const newItems           = clone(items)
      const i                  = newItems.length - 1
      newItems[i]              = [newItems[i][0],{x: offsetX, y: offsetY}]
      setItems(newItems)
    } 
  }

  const handleMouseUp = (e: SyntheticEvent<SVGElement, MouseEvent>) => {
    console.log('handleMouseUp')
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
      <Polyline points={points} />
      <Walls points={points} setPoints={setPoints}/>
      <Items/>
    </svg>
  )
}



