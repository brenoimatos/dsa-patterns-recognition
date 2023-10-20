import React from 'react'
import Score from './Score'
import { Question } from '../../types/question'

type Props = {
  getNewQuestionWithSetCookie: () => void
  question: Question
}

const Nav = (props: Props) => {
  return (
    <nav className="flex flex-col gap-2 items-center p-4 bg-purple-100">
      <h1 className="text-4xl title font-bold mb-3">
        LeetCode Pattern Recognition
      </h1>
      <div className="flex gap-4 items-center">
        <Score side="left" />
        <form className="flex flex-col gap-3">
          <button
            className="px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-200 text-black cursor-pointer"
            type="submit"
          >
            Reset Questions
          </button>
          <button
            formAction={props.getNewQuestionWithSetCookie}
            className="px-2 py-1 rounded-lg bg-blue-800 hover:bg-blue-900 text-white cursor-pointer"
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
