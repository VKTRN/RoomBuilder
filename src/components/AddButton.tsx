export const AddButton = ({x1,x2,y1,y2, addRef, position}) => {
  return (
    <g ref = {addRef} onClick = {() => {console.log('click')}} className = 'group' transform = {`translate(${position.x}, ${position.y})`}>
      <path  className = 'add' fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
      <path  className = 'add' fill="#fff" d="M21,14h6v20h-6V14z"/>
      <path  className = 'add' fill="#fff" d="M14,21h20v6H14V21z"/>
    </g>
  )
}