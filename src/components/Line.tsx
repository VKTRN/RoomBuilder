import {useRef}     from 'react' 
import {useContext} from 'react'
import {getShift}   from '../util/functions'
import {isInside}   from '../util/functions'
import {clone}      from '../util/functions'
import {insert}     from '../util/functions'
import {getLength}  from '../util/functions'
import {context}    from '../context'
import {line}       from '../types'
import {point}      from '../types'
import {AddButton}  from './AddButton'
import {Measure}    from './Measure'

export const Line = ({i,points,setPoints, direction}:any) => {

  const lineRef    = useRef<SVGLineElement>(null)
  const addRef     = useRef<SVGGElement>(null)
  const {selected} = useContext(context)
  
  const handleMouseMove = (e:any) => {
    e.stopPropagation()

    setPoints(prev => {
      console.log(!prev[0]?.length)
      const newValues = clone(prev)
      
      if(!prev[0]?.length){
        if(direction === 'horizontal'){
          newValues[i].y += e.movementY
          newValues[j].y += e.movementY
        }
        if(direction === 'vertical'){
          newValues[i].x += e.movementX
          newValues[j].x += e.movementX
        }
        return newValues
      }

      console.log(selected, newValues)

      if(direction === 'horizontal'){
        newValues[selected][i].y += e.movementY
        newValues[selected][j].y += e.movementY
      }
      if(direction === 'vertical'){
        newValues[selected][i].x += e.movementX
        newValues[selected][j].x += e.movementX
      }
      return newValues
    })
  }
  
  const handleMouseUp = () => {
    console.log(points)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }
  
  const handleMouseDown = (e) => {
    e.stopPropagation()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
  
  const handleMouseEnter = () => {
    lineRef.current.classList.add('active')
    addRef.current.classList.add('active')
  }

  const handleMouseLeave = () => {
    lineRef.current.classList.remove('active')
    addRef.current.classList.remove('active')
  }

  const splitLine = (e) => {
    e.stopPropagation()
    setPoints(prev => {
      if(!prev[0]?.length){
        const centerPoint = {x: Math.floor((prev[i].x + prev[j].x) / 2) , y: Math.floor((prev[i].y + prev[j].y) / 2)}
        const centerPoints = clone([centerPoint, centerPoint])
        const newPoints = insert(prev, j, centerPoints)
        return newPoints
      }
      else{
        const centerPoint = {x: Math.floor((prev[selected][i].x + prev[selected][j].x) / 2) , y: Math.floor((prev[selected][i].y + prev[selected][j].y) / 2)}
        const centerPoints = clone([centerPoint, centerPoint])
        const newPoints = insert(prev[selected], j, centerPoints)
        const newValues = clone(prev)
        newValues[selected] = newPoints
        return newValues
      }
    })
  }

  const getMeasurePosition = (line) => {
    const {p1, p2} = line
    const shift         = getShift(direction)
    const tp1    = {x:(p1.x+p2.x)/2 + shift.x, y:(p1.y+p2.y)/2 + shift.y}
    const tp2    = {x:(p1.x+p2.x)/2 - shift.x, y:(p1.y+p2.y)/2 - shift.y}
    const pointIsInside = isInside(points, tp1)
    const measurePos = pointIsInside ? tp2 : tp1
    return measurePos
  }

  const getButtonPosition = (line) => {
    const {p1, p2} = line
    const shift         = getShift(direction)
    const shift2        = direction === 'horizontal' ? {x: 30, y:0} : {x: 0, y:30}
    const testPoint1    = {x:(p1.x*.5+p2.x*.5) + shift.x + shift2.x, y:(p1.y*.5+p2.y*.5) + shift.y - shift2.y} // outer
    const testPoint2    = {x:(p1.x*.5+p2.x*.5) - shift.x + shift2.x, y:(p1.y*.5+p2.y*.5) - shift.y - shift2.y} // inner
    const pointIsInside = isInside(points, testPoint1)
    const buttonPos     = pointIsInside ? testPoint2 : testPoint1
    return buttonPos
  }

  const getNextIndex = (points) => {
    const j = i + 1 === points.length ? 0 : i + 1
    return j
  }

  const j      = getNextIndex(points)
  const p1     = points[i]
  const p2     = points[j]
  const line   = {p1, p2}
  const length = getLength(line)

  const hitboxLine = getHitbox(line, 30)
  const buttonPos  = getButtonPosition(line)
  const measurePos = getMeasurePosition(line)
  
  const lineProps     = {x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y}

  const handlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  return (
    <>
      <g {...handlers}>
        <line className='hitbox-line' {...hitboxLine}  />
        <line className='line' {...lineProps} onMouseDown = {handleMouseDown} ref={lineRef}/>
      </g>
      <AddButton handleClick = {splitLine}  addRef={addRef} position = {buttonPos}/>\
      <Measure position = {measurePos} length = {length}/>
    </>
  )
}

const getHitbox = (line, inset) => {
  const length = getLength(line)
  const {p1, p2} = line

  const lineStart     = {x: p1.x + inset * (p2.x - p1.x) / length, y: p1.y + (inset) * (p2.y - p1.y) / length}
  const lineEnd       = {x: p1.x + (length -inset) * (p2.x - p1.x) / length, y: p1.y + (length -inset) * (p2.y - p1.y) / length}

  const hitboxLine    = {x1: lineStart.x, y1: lineStart.y, x2: lineEnd.x, y2: lineEnd.y}

  return hitboxLine
}