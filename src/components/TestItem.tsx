export const TestItem = () => {

  const handleOrange = (e) => {
    e.stopPropagation()
    console.log('orange')
  }

  const handleBlue = (e) => {
    e.stopPropagation()
    console.log('blue')
  }




  return (
    <g onClick = {() => console.log('group')}>
      <rect onClick = {handleOrange} x={100} y={100} width={100} height={100} fill='coral' stroke='black' strokeWidth='1'/>
      <rect onClick = {handleBlue} x={300} y={300} width={100} height={100} fill='blue' stroke='black' strokeWidth='1'/>
    </g>
  )
}