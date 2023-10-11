'use client'
import React, { useState } from 'react'
import { Question } from '../types/question'
import styles from '../styles/MultipleChoice.module.css'

const MultipleChoice = ({ question }: { question: Question }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const choices = ['Array', 'DP', 'Backtracking', 'Graph', 'DFS', 'BFS']

  const handleChoiceSelection = (choice: string) => {
    setSelectedChoice(choice)

    if (question.topicTags.some((tag) => tag.name === choice)) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
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
