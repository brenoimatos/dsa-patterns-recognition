'use client'
import React, { useEffect, useState } from 'react'
import { Question } from '../../types/question'
import styles from '../../styles/MultipleChoice.module.css'

const MultipleChoice = ({ question }: { question: Question }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [firstAnswerRecorded, setFirstAnswerRecorded] = useState(false)
  const choices = ['Array', 'DP', 'Backtracking', 'Graph', 'DFS', 'BFS']

  useEffect(() => {
    setSelectedChoice(null)
    setIsCorrect(null)
    setFirstAnswerRecorded(false)
  }, [question])

  const handleChoiceSelection = (choice: string) => {
    setSelectedChoice(choice)

    const correct = question.topicTags.some((tag) => tag.name === choice)
    setIsCorrect(correct)

    if (!firstAnswerRecorded) {
      // Registrar a primeira resposta no localStorage
      const stats = JSON.parse(
        localStorage.getItem('stats') || '{ "corrects": 0, "wrongs": 0 }'
      )

      if (correct) {
        stats.corrects++
      } else {
        stats.wrongs++
      }

      localStorage.setItem('stats', JSON.stringify(stats))
      setFirstAnswerRecorded(true)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Multiple Choice</h2>
      <h3>{question.topicTags.map((tag) => tag.name).join(', ')}</h3>
      <div className={styles.questions}>
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceSelection(choice)}
            className={[
              styles.choice,
              selectedChoice === choice
                ? isCorrect
                  ? styles.correct
                  : styles.incorrect
                : '',
            ].join(' ')}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MultipleChoice
