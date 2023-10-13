import QuestionCard from '../components/QuestionCard'
import MultipleChoice from '../components/MultipleChoice'
import styles from '../styles/Home.module.css'
import { getQuestionData } from '../lib/helpers'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Question } from '../types/question'
import { QUESTION_SLUGS_COOKIES } from '../lib/constants'
import { clearCookies, getNewQuestion } from './actions'
import Nav from './components/Nav'

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

  return (
    <div className="container">
      <Nav getNewQuestionWithSetCookie={getNewQuestionWithSetCookie} />
      <main>
        <div className={styles.title}>
          <h1>LeetCode Pattern Recognition</h1>
        </div>
        <div className={styles.grid}>
          {<QuestionCard question={question} />}
          {<MultipleChoice question={question} />}
        </div>
      </main>
    </div>
  )
}
