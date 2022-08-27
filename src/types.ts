import {Dispatch}       from 'react'
import {SetStateAction} from 'react'

export type Mode = 'draw' | 'edit'

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
  setPoints: Dispatch<SetStateAction<point[]>>
}

export type line = {
  i: number,
  points: point[],
  setPoints: Dispatch<SetStateAction<point[]>>
  direction: string,
}

export type polyline = {
  points: point[],
}

export type measure = {
  position: point,
  length: number,
}

export type editor = {
  mode: string, 
  setMode: Dispatch<SetStateAction<string>>
}

export type State = {
  mode: Mode
  points: point[]
  items: point[][]
  selected: number
  setMode: Dispatch<SetStateAction<Mode>>
  setPoints: Dispatch<SetStateAction<point[]>>
  setItems: Dispatch<SetStateAction<point[][]>>
  setSelected: Dispatch<SetStateAction<number>>
}