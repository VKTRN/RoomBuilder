export type point = {
  x: number,
  y: number,
}

export type rectangle = {
  p1: point,
  p2: point,
}

export type walls = {
  points: point[],
  setPoints: React.Dispatch<React.SetStateAction<point[]>>
}

export type line = {
  i: number,
  points: point[],
  setPoints: React.Dispatch<React.SetStateAction<point[]>>
  direction: string,
}

export type polyline = {
  points: point[],
}

export type measure = {
  position: point,
  length: number,
}