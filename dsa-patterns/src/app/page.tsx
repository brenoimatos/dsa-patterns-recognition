import QuestionCard from './_components/QuestionCard'
import MultipleChoice from './_components/MultipleChoice'
import { getQuestionData, getRandomChoices } from '../lib/helpers'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Question } from '../types/question'
import { QUESTION_SLUGS_COOKIES } from '../lib/constants'
import { clearCookies, getNewQuestion } from './actions'
import Nav from './_components/Nav'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'LeetCode Pattern Recognition',
}

export default async function Page() {
  let cookie = '[]'
  if (cookies().has(QUESTION_SLUGS_COOKIES)) {
    cookie = cookies().get(QUESTION_SLUGS_COOKIES)?.value as string
  }

  const doneQuestionsSlugs = JSON.parse(cookie) as string[]
  const result = await getQuestionData(doneQuestionsSlugs)

  if (result.errorMessage) {
    return (
      <div>
        {result.errorMessage}
        <form action={clearCookies}>
          <button type="submit">Clear history</button>
        </form>
      </div>
    )
  }

  const question = result.question as Question

  const getNewQuestionWithSetCookie = getNewQuestion.bind(
    null,
    doneQuestionsSlugs,
    question
  )

  const questionTags = question.topicTags.map((q) => q.name)
  const randomChoices = getRandomChoices(questionTags)

  return (
    <div>
      <Nav
        getNewQuestionWithSetCookie={getNewQuestionWithSetCookie}
        question={question}
      />
      <main>
        <div className="flex flex-row gap-4">
          {<QuestionCard question={question} />}
          {<MultipleChoice question={question} choices={randomChoices} />}
        </div>
      </main>
    </div>
  )
}
