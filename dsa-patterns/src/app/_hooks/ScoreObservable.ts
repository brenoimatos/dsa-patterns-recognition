'use client'
import { Observable } from '../../lib/observable'

export type Score = {
  corrects: number
  wrongs: number
}

// Inicialize o Observable com um valor padrão
const initialScore: Score = { corrects: 0, wrongs: 0 }

export const scoreObservable = new Observable<Score>(initialScore)
