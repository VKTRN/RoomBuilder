import {useRef} from 'react' 
import {AddButton} from './AddButton'

export const Line = ({i,points,setPoints, direction}:any) => {

  const lineRef = useRef<SVGLineElement>(null)
  const addRef  = useRef<SVGGElement>(null)
  
  const handleMouseMove = (e:any) => {
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

  const i2 = i + 1 === points.length ? 0 : i + 1

  const {x:x1, y:y1} = points[i]
  const {x:x2, y:y2} = points[i2]
  const line         = {x1, y1, x2, y2}

  const handlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  return (
    <>
      <line className='hitbox-line' {...line} {...handlers} />
      <line className='line' {...line} onMouseDown = {handleMouseDown} ref={lineRef}/>
      <AddButton {...line} addRef={addRef}/>
    </>
  )
}