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
  
  if (dx === 0 && dy === 0) {
    return 'none'
  }
  if (dx === 0) {
    return 'vertical'
  }
  return 'horizontal'
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

export const getShift = (direction: string) => {
  if (direction === 'horizontal') {return {x:0, y:-30}}
  return {x:30, y:0}
}

export const clone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}

export const insert = (arr:any[], index:number, newElements:any[]) => {
  return [
    ...arr.slice(0, index),
    ...newElements,
    ...arr.slice(index)
  ]
}