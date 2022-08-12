// import {rectangle} from '../types'

export const Line = ({i,points,setPoints, direction}:any) => {

  const i2 = i + 1 === points.length ? 0 : i + 1
  
  const handleMouseMove = (e:any) => {
    console.log('handleMouseMove')
    console.log(direction)
    setPoints(prev => {
      const newPoints = [...prev]

      

      if(direction === 'horizontal'){
        newPoints[i].y += e.movementY
        newPoints[i2].y += e.movementY
      }
      if(direction === 'vertical'){
        newPoints[i].x += e.movementX
        newPoints[i2].x += e.movementX
        console.log(newPoints)
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
    console.log('handleMouseDown')
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return <line className = 'line' x1={points[i].x} x2={points[i2].x} y1={points[i].y} y2={points[i2].y} onMouseDown = {handleMouseDown}/>
}