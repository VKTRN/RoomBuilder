import {measure} from '../types'

export const Measure = ({position, length}: measure) => {

  const props = {
    className:'measure',
    x:position.x,
    y:position.y,
    dominantBaseline:'middle',
    textAnchor:'middle',
  }

  return (
    <>
      {
        length >= 10 && 
          <text {...props}>{length}</text>
      }
    </>
  )
}