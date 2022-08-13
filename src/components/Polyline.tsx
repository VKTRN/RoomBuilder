import {getPolyline} from '../util/functions'

export const Polyline = ({points}:any) => {
  return (
    <polygon className = 'polyline' points={getPolyline(points)}/>
  )
}