import {useState}     from 'react'
import {useContext}   from 'react'
import {point}        from '../types'
import {getRectangle} from '../util/functions'
import {clone} from '../util/functions'
import {polyline}     from '../types'
import {context}      from '../App'
import {Polyline}     from './Polyline'

export const Items = ({points, setPoints}:polyline) => {

  const [selected, setSelected] = useState(false)
  const {mode} = useContext(context)
  
  const handleClick = () => {
    // setSelected(!selected)
  }

  const handleMouseMove = (e, i) => {
    if(e.buttons === 1){
      const newPoints = clone(points)
      newPoints[i][0].x += e.nativeEvent.movementX
      newPoints[i][1].x += e.nativeEvent.movementX
      newPoints[i][0].y += e.nativeEvent.movementY
      newPoints[i][1].y += e.nativeEvent.movementY
      setPoints(newPoints)
    } 
  }

  const className = selected ? 'item selected' : 'item'

  const handlers = {
    onClick: handleClick
  }
  
  return (
    <>
      {points.map((item, i) => {
        return (
          <g className={className} {...handlers} onMouseMove = {mode === 'edit' ? (e)=> handleMouseMove(e,i) : undefined}>
            <Polyline points={getRectangle(item[0], item[1])}/>
          </g>
        )
      })}
    </>
  )
}

