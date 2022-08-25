import {useState} from 'react'
import {Polyline} from './Polyline'
import {Walls}    from './Walls'

export const Room = ({initialPoints}: any) => {

  const [points, setPoints] = useState(initialPoints)

  return (
    <g className='room'>
      <Polyline points={points}/>
      <Walls points={points} setPoints={setPoints}/>
    </g>
  )
}



