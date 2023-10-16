import React from 'react'
import Score from './Score'
import { Question } from '../../types/question'

type Props = {
  getNewQuestionWithSetCookie: () => void
  question: Question
}

const Nav = (props: Props) => {
  return (
    <nav className="flex flex-col gap-2 items-center border border-gray-300 p-4">
      <h1 className="text-4xl title font-bold mb-3">
        LeetCode Pattern Recognition
      </h1>
      <div className="flex gap-4 items-center">
        <Score side="left" />
        <form>
          <button
            formAction={props.getNewQuestionWithSetCookie}
            className="px-2 py-1 rounded-lg bg-blue-800 text-white cursor-pointer"
            type="submit"
          >
            Next Question
          </button>
        </form>
        <Score side="right" />
      </div>
    </nav>
  )
}

export default Nav
