import {useState}   from 'react'
import {initialPoints}  from '../shapes'
import {Polyline}   from './Polyline'
import {Walls}      from './Walls'

export const Editor = () => {

  const [points, setPoints] = useState(initialPoints)

  return (
    <svg className = 'editor'>
      <Polyline points = {points} />
      <Walls points = {points} setPoints={setPoints}/>
    </svg>
  )
}

