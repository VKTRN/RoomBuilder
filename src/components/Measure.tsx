import {measure} from '../types'

export const Measure = ({position, length}: measure) => {
  return (
    <>
      {length >= 10 && <text className = 'measure' x={position.x} y={position.y} dominantBaseline="middle" textAnchor="middle">{length}</text>}
    </>
  )
}