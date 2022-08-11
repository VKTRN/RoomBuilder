import {rectangle}  from '../shapes'
import {Rectangle}  from './Rectangle'

export const Editor = () => {

  return (
    <svg className = 'editor'>
      <Rectangle {...rectangle}/>
    </svg>
  )
}
