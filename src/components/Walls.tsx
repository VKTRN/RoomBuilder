import {getDirection} from '../util/functions'
import {Line}         from './Line'
import {walls}        from '../types'

export const Walls = ({points, setPoints}: any) => {
  return (
    <>
      {
        points.map((point, i) => {
          const isLastPoint = i === points.length - 1
          
          const direction = isLastPoint
            ? getDirection(point, points[0]) 
            : getDirection(point, points[i+1])
          
            return <Line  i={i} points={points} setPoints={setPoints} direction={direction} />
        }
        )
      }
    </>
  )
}


