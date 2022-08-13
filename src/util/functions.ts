import {point} from '../types';

export const getPolyline = (points: point[]) => {
	const polyline = []
	for (let i = 0; i < points.length; i++) {
		polyline.push(`${points[i].x},${points[i].y}`)
	}
	return polyline.join(' ')
}

export const getDirection = (p1: any, p2: any) => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  if (dx === 0){
    return 'vertical'
  }
  if (dy === 0){
    return 'horizontal'
  }
}