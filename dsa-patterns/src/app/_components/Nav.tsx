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
      <h1 className="text-xl title font-bold">LeetCode Pattern Recognition</h1>
      <Score />
      <form>
        <button
          formAction={props.getNewQuestionWithSetCookie}
          className="mt-2 mb-4 px-2 py-1 rounded-lg bg-blue-800 text-white cursor-pointer"
          type="submit"
        >
          Next Question
        </button>
      </form>
    </nav>
  )
}

export default Nav
