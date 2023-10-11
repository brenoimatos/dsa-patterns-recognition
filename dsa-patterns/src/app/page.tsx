import QuestionCard from '../components/QuestionCard'
import MultipleChoice from '../components/MultipleChoice'
import styles from '../styles/Home.module.css'
import { revalidatePath } from 'next/cache'
import { getQuestionData } from '../lib/helpers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LeetCode Pattern Recognition',
}

export default async function Page() {
  const question = await getQuestionData()
  const getNewQuestion = async () => {
    'use server'

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
