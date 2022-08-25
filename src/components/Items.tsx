import {useContext}   from 'react'
import {SyntheticEvent} from 'react'
import {getRectangle} from '../util/functions'
import {clone}        from '../util/functions'
import {context}      from '../context'
import {Polyline}     from './Polyline'

export const Items = () => {

  const {items, setItems}       = useContext(context)
  const {mode}                  = useContext(context)

  const handleMouseMove = (e:SyntheticEvent<SVGElement, MouseEvent> , i: number) => {
    if(e.nativeEvent.buttons === 1){
      const newItems = clone(items)
      newItems[i][0].x += e.nativeEvent.movementX
      newItems[i][1].x += e.nativeEvent.movementX
      newItems[i][0].y += e.nativeEvent.movementY
      newItems[i][1].y += e.nativeEvent.movementY
      setItems(newItems)
    } 
  }

  {
    return items[items.length-1]?.length === 2 ?  (
      <>
      {items.map((item, i) => {

        const handler = mode === 'edit' ? (e: SyntheticEvent<SVGElement, MouseEvent>)=> handleMouseMove(e,i) : undefined

        return (
          <g className='item' onMouseMove={handler}>
            <Polyline points={getRectangle(item)}/>
          </g>
        )
      })}
    </>
    )
    :
    <></>
  }
}

