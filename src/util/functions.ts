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
  
  return dx === 0 ? 'vertical' : 'horizontal'
}

export const isInside = (polygon: any, point: any) => {
  let isInside = false
  for (let i = 0; i < polygon.length; i++) {
    let j = i + 1
    if (j === polygon.length) {
      j = 0
    }
    if (
      (polygon[i].y > point.y) !== (polygon[j].y > point.y) &&
      point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x
    ) {
      isInside = !isInside
    }
  }
  return isInside
}