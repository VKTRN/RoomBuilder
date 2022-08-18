export const AddButton = ({handleClick, addRef, position}) => {

  const a = 2

  return (
    <g className='add-button' ref = {addRef} onClick = {handleClick}>
      <circle cx={position.x} cy={position.y - a} r="10"  stroke-width="3" fill="darkviolet" />
      <line x1={position.x-6} y1={position.y - a} x2={position.x+6} y2={position.y - a} stroke-width="3" stroke="white" />
      <line x1={position.x} y1={position.y-6 - a} x2={position.x} y2={position.y+6 - a} stroke-width="3" stroke="white" />
    </g>
  )
}

