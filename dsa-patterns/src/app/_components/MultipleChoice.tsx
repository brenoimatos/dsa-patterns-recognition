'use client'
import React, { useEffect, useState } from 'react'
import { Question } from '../../types/question'
import { useScore } from '../_hooks/useScore'

const MultipleChoice = ({
  question,
  choices,
}: {
  question: Question
  choices: string[]
}) => {
  const { updateScore } = useScore()
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [firstAnswerRecorded, setFirstAnswerRecorded] = useState(false)

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
      updateScore(correct)
      setFirstAnswerRecorded(true)
    }
  }

  return (
    <div className="container w-1/3 shadow-lg p-4">
      <h2 className="text-3xl font-bold text-center">Multiple Choice</h2>
      <div className="flex flex-col items-center text-left gap-3 mt-4">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceSelection(choice)}
            className={`text-lg p-3 rounded-xl w-3/4 text-left ${
              selectedChoice === choice
                ? isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-slate-200 text-gray-700 hover:bg-slate-300'
            }`}
          >
            {isCorrect && selectedChoice === choice
              ? question.topicTags.map((tag) => tag.name).join(', ')
              : choice}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MultipleChoice
