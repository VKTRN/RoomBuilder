import {point} from '../types';

export const getPolyline = (points: point[]) => {
	const polyline = []
	for (let i = 0; i < points.length; i++) {
		polyline.push(`${points[i].x},${points[i].y}`)
	}
	return polyline.join(' ')
}