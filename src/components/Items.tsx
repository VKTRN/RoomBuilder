import {useState}       from 'react'
import {useContext}     from 'react'
import {SyntheticEvent} from 'react'
import {clone}          from '../util/functions'
import {context}        from '../context'
import {Polyline}       from './Polyline'
import {Walls}          from './Walls'

export const Items = () => {

  const {items, setItems} = useContext(context)
  const {setSelected}     = useContext(context)
  const {mode}            = useContext(context)

  const handleMouseMove = (e:SyntheticEvent<SVGElement, MouseEvent> , i: number) => {
    // if(e.nativeEvent.buttons === 1){
    //   const newItems = clone(items)
    //   newItems[i][0].x += e.nativeEvent.movementX
    //   newItems[i][1].x += e.nativeEvent.movementX
    //   newItems[i][2].x += e.nativeEvent.movementX
    //   newItems[i][3].x += e.nativeEvent.movementX
    //   newItems[i][0].y += e.nativeEvent.movementY
    //   newItems[i][1].y += e.nativeEvent.movementY
    //   newItems[i][2].y += e.nativeEvent.movementY
    //   newItems[i][3].y += e.nativeEvent.movementY
    //   setItems(newItems)
    // } 
  }

  {
    return items[items.length-1]?.length === 4 ?  (
      <>
      {items.map((item, i) => {

        const handler = mode === 'edit' ? (e: SyntheticEvent<SVGElement, MouseEvent>)=> handleMouseMove(e,i) : undefined

        const setItem = (f) => {
          const newItems = clone(items)
          newItems[i] = f(newItems[i])
          setItems(newItems)
        }
        
        

        return (
          <g className='item' onMouseMove={handler} onClick={() => {setSelected(i)}}>
            <Polyline points={item}/>
            <Walls points={item} setPoints = {setItems}/>
          </g>
        )
      })}
    </>
    )
    :
    <></>
  }
}

