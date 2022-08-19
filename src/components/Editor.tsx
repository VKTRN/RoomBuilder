import {useState}   from 'react'
import {initialPoints}  from '../shapes'
import {Polyline}   from './Polyline'
import {Walls}      from './Walls'
import {rectangle}     from '../types'
import {Furniture}  from './Furniture'
import {useEffect}  from 'react'

export const Editor = () => {

  const [points, setPoints] = useState(initialPoints)
  const [furniture, setFurniture] = useState<rectangle | {}>({})

  useEffect(() => {
    console.log(furniture)
  } , [furniture])



  const handleMouseDown = (e: React.SyntheticEvent) => {
    console.log('mouse down')
    const {offsetX, offsetY} = e.nativeEvent
    setFurniture({p1: {x: offsetX, y: offsetY}, ...furniture})
  }

  const handleMouseUp = (e: React.SyntheticEvent) => {
    console.log('mouse up')
    const {offsetX, offsetY} = e.nativeEvent
    setFurniture({p2: {x: offsetX, y: offsetY}, ...furniture})
  }

  return (
    <svg className = 'editor' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {furniture.p2 && <Furniture rect={furniture}/>}
      {/* <Polyline points = {points} /> */}
      {/* <Walls points = {points} setPoints={setPoints}/> */}
    </svg>
  )
}

