import {useRef} from 'react' 
import {AddButton} from './AddButton'
import {isInside} from '../util/functions'
import {getShift} from '../util/functions'
import {line} from '../types'
import {clone} from '../util/functions'
import {insert} from '../util/functions'

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
    const centerPoint = {x: (points[i].x + points[i2].x) / 2, y: (points[i].y + points[i2].y) / 2}
    const centerPoints = clone([centerPoint, centerPoint])
    const newPoints = insert(points, i2, centerPoints)
    console.log(newPoints)
    setPoints(newPoints)
  }

  const i2 = i + 1 === points.length ? 0 : i + 1

  const {x:x1, y:y1}  = points[i]
  const {x:x2, y:y2}  = points[i2]
  const line          = {x1, y1, x2, y2}
  const shift         = getShift(direction)
  const testPoint1    = {x:(x1+x2)/2-24 + shift.x, y:(y1+y2)/2-24 + shift.y}
  const testPoint2    = {x:(x1+x2)/2-24 - shift.x, y:(y1+y2)/2-24 - shift.y}
  const pointIsInside = isInside(points, testPoint1)
  const buttonPos = pointIsInside ? testPoint2 : testPoint1

  const handlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  return (
    <>
      <line className='hitbox-line' {...line} {...handlers} />
      <line className='line' {...line} onMouseDown = {handleMouseDown} ref={lineRef}/>
      <AddButton handleClick = {splitLine}  addRef={addRef} position = {buttonPos}/>
    </>
  )
}
