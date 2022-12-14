import {useRef} from 'react' 
import {AddButton} from './AddButton'
import {isInside} from '../util/functions'
import {getShift} from '../util/functions'
import {line} from '../types'
import {point} from '../types'
import {clone} from '../util/functions'
import {insert} from '../util/functions'
import {Measure} from './Measure'

export const Line = ({i,points,setPoints, direction}:line) => {

  const lineRef = useRef<SVGLineElement>(null)
  const addRef  = useRef<SVGGElement>(null)
  
  const handleMouseMove = (e:any) => {
    console.log(i, i2)
    setPoints(prev => {
      const newPoints = [...prev]

      if(direction === 'horizontal'){
        newPoints[i].y += e.movementY
        newPoints[i2].y += e.movementY
      }
      if(direction === 'vertical'){
        newPoints[i].x += e.movementX
        newPoints[i2].x += e.movementX
      }
      return newPoints
    }
    )
  }
  
  const handleMouseUp = () => {
    console.log(points)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }
  
  const handleMouseDown = () => {
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

  const splitLine = () => {
    const centerPoint = {x: Math.floor((points[i].x + points[i2].x) / 2) , y: Math.floor((points[i].y + points[i2].y) / 2)}
    const centerPoints = clone([centerPoint, centerPoint])
    const newPoints = insert(points, i2, centerPoints)
    console.log(newPoints)
    setPoints(newPoints)
  }

  const i2 = i + 1 === points.length ? 0 : i + 1

  const {x:x1, y:y1}  = points[i]
  const {x:x2, y:y2}  = points[i2]
  const line          = {x1, y1, x2, y2}
  const lineLength    = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const lineStart     = {x: x1 + (30) * (x2 - x1) / lineLength, y: y1 + (30) * (y2 - y1) / lineLength}
  const lineEnd       = {x: x1 + (lineLength -30) * (x2 - x1) / lineLength, y: y1 + (lineLength -30) * (y2 - y1) / lineLength}
  const hitboxLine    = {x1: lineStart.x, y1: lineStart.y, x2: lineEnd.x, y2: lineEnd.y}
  const shift         = getShift(direction)
  const shift2        = direction === 'horizontal' ? {x: 30, y:0} : {x: 0, y:30}
  const testPoint1    = {x:(x1*.5+x2*.5) + shift.x + shift2.x, y:(y1*.5+y2*.5) + shift.y - shift2.y} // outer
  const testPoint2    = {x:(x1*.5+x2*.5) - shift.x + shift2.x, y:(y1*.5+y2*.5) - shift.y - shift2.y} // inner
  const pointIsInside = isInside(points, testPoint1)
  const buttonPos     = pointIsInside ? testPoint2 : testPoint1
  const length        = getLength(points[i],points[i2])
  
  const tp1    = {x:(x1+x2)/2 + shift.x, y:(y1+y2)/2 + shift.y}
  const tp2    = {x:(x1+x2)/2 - shift.x, y:(y1+y2)/2 - shift.y}
  const measurePos = pointIsInside ? tp2 : tp1

  const handlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  return (
    <>
      <g {...handlers}>
        <line className='hitbox-line' {...hitboxLine}  />
        <line className='line' {...line} onMouseDown = {handleMouseDown} ref={lineRef}/>
      </g>
      <AddButton handleClick = {splitLine}  addRef={addRef} position = {buttonPos}/>\
      <Measure position = {measurePos} length = {length}/>
    </>
  )
}

const getLength = (p1:point, p2:point) => {
  const x = p2.x - p1.x
  const y = p2.y - p1.y
  return Math.sqrt(x*x + y*y)
}
