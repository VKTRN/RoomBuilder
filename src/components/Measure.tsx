export const Measure = ({position, length}) => {
  return (
    <text className = 'measure' x={position.x} y={position.y} dominant-baseline="middle" text-anchor="middle">{length}</text>
  )
}