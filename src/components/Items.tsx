import {useContext}   from 'react'
import {getRectangle} from '../util/functions'
import {clone}        from '../util/functions'
import {context}      from '../context'
import {Polyline}     from './Polyline'

export const Items = () => {

  const {items, setItems}       = useContext(context)
  const {mode}                  = useContext(context)

  const handleMouseMove = (e:any , i: number) => {
    if(e.buttons === 1){
      const newItems = clone(items)
      newItems[i][0].x += e.nativeEvent.movementX
      newItems[i][1].x += e.nativeEvent.movementX
      newItems[i][0].y += e.nativeEvent.movementY
      newItems[i][1].y += e.nativeEvent.movementY
      setItems(newItems)
    } 
  }
  
  return (
    <>
      {items.map((item, i) => {
        return (
          <g className='item' onMouseMove = {mode === 'edit' ? (e)=> handleMouseMove(e,i) : undefined}>
            <Polyline points={getRectangle(item[0], item[1])}/>
          </g>
        )
      })}
    </>
  )
}

