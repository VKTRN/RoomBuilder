import {getPolyline} from '../util/functions'
import {polyline} from '../types'

export const Polyline = ({points}:polyline) => {
  return (
    <polygon className = 'polyline' points={getPolyline(points)}/>
  )
}