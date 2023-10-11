import QuestionCard from '../components/QuestionCard'
import MultipleChoice from '../components/MultipleChoice'
import styles from '../styles/Home.module.css'
import { revalidatePath } from 'next/cache'
import { getQuestionData } from '../lib/helpers'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

const QUESTION_SLUGS_COOKIES = 'doneQuestionsSlugs'

export const metadata: Metadata = {
  title: 'LeetCode Pattern Recognition',
}

export default async function Page() {
  let cookie = '[]'
  if (cookies().has(QUESTION_SLUGS_COOKIES)) {
    cookie = cookies().get(QUESTION_SLUGS_COOKIES)?.value as string
  }

  const doneQuestionsSlugs = JSON.parse(cookie)
  console.log(doneQuestionsSlugs)

  try {
    const question = await getQuestionData(doneQuestionsSlugs)
  } catch (e) {
    console.log(e)
    return <div>Something went wrong</div>
  }

  const getNewQuestion = async () => {
    'use server'
    cookies().set(
      QUESTION_SLUGS_COOKIES,
      JSON.stringify([...doneQuestionsSlugs, question.titleSlug])
    )
    revalidatePath('/')
  }
  return (
    <div className="container">
      <main>
        <form action={getNewQuestion}>
          <button type="submit">Next Question</button>
        </form>
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
