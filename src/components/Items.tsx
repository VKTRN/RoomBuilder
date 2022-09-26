import {useState}         from 'react'
import {useContext}       from 'react'
import {SyntheticEvent}   from 'react'
import {clone}            from '../util/functions'
import {context}          from '../context'
import {Polyline}         from './Polyline'
import {Walls}            from './Walls'
import {usePreviousValue} from '../hooks'
import {cloneDeep}        from 'lodash'

export const Items = () => {

  const {items, setItems}   = useContext(context)
  const {setSelected}       = useContext(context)
  const {selected}          = useContext(context)
  const {mode}              = useContext(context)

  const handleMouseMove = (e:SyntheticEvent<SVGElement, MouseEvent>, i:number) => {
    console.log('handleMouseMove')
    setItems(prev => {
      const newItems = cloneDeep(prev)
    
      newItems[i] = newItems[i].map((point:any) => {
        point.x += e.movementX
        point.y += e.movementY
        return point
      })
      return newItems
    })
  }

  const handleMouseDown = (e:SyntheticEvent<SVGElement, MouseEvent>, i: number) => {
    console.log('handleMouseDown')
    setSelected(i)
    window.onmousemove = (e) => {handleMouseMove(e,i)}
    window.onmouseup   = handleMouseUp

    // window.addEventListener('mousemove', handleMouseMove)
    // window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = (e:SyntheticEvent<SVGElement, MouseEvent>) => {
    console.log('handleMouseUp')
    window.onmousemove = null
    window.onmouseup   = null
    setSelected(-1)
  }


  {
    return items[items.length-1]?.length >= 4 ?  (
      <>
      {items.map((item, i) => {

        // const handler = mode === 'edit' ? (e: SyntheticEvent<SVGElement, MouseEvent>)=> handleMouseMove(e,i) : undefined
        const state = selected === i ? 'selected' : ''
        return (
          <g className={`item ${state}`}  onMouseDown={(e) => handleMouseDown(e,i)}>
            <g  >
              <Polyline points={item}/>
            </g>
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

