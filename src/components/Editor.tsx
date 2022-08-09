import {Stage}      from 'react-konva'
import {Layer}      from 'react-konva'
import {Rect}       from 'react-konva'
import {useRef}     from 'react' 
import {stage}      from '../config'
import {rect}       from '../config'

export const Editor = () => {

  const stageRef = useRef(null);

  return (
    <div className = 'editor'>
      <Stage {...stage} ref={stageRef}>
        <Layer>
          <Rect {...rect} draggable/>
        </Layer>
      </Stage>
    </div>
  )
}
