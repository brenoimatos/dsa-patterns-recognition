'use client'
import { useState, useEffect } from 'react'
import { scoreObservable, Score } from './ScoreObservable'

export const useScore = () => {
  const [score, setScore] = useState<Score>({ corrects: 0, wrongs: 0 })

  useEffect(() => {
    // Inicializa o Observable com o valor do localStorage
    const storedScore = localStorage.getItem('stats')
    const initialScore = storedScore
      ? JSON.parse(storedScore)
      : { corrects: 0, wrongs: 0 }
    scoreObservable.set(initialScore)

    // Atualiza o estado local com o valor do Observable
    setScore(scoreObservable.get())

    const unsubscribe = scoreObservable.subscribe(setScore)
    return () => unsubscribe()
  }, [])

  const updateScore = (isCorrect: boolean) => {
    const currentScore = scoreObservable.get()
    const updatedScore = { ...currentScore }

    if (isCorrect) {
      updatedScore.corrects++
    } else {
      updatedScore.wrongs++
    }

    localStorage.setItem('stats', JSON.stringify(updatedScore))
    scoreObservable.set(updatedScore)
  }

  return {
    score,
    updateScore,
  }
}
