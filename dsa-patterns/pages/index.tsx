import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import QuestionCard from '../components/Question'
import { QuestionProps, getRandomQuestion } from '../lib/api/question'

type ConnectionStatus = {
  isConnected: boolean,
  randomQuestion?: QuestionProps
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise
    const randomQuestion = await getRandomQuestion()
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    return {
      props: {
        isConnected: true,
        randomQuestion
      }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
  randomQuestion,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <Head>
        <title>LeetCode Pattern Recognition</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">
          Welcome to LeetCode Pattern Recognition!
        </h1>
        {isConnected ? (
          <h2 className="subtitle"></h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
        {randomQuestion ? <QuestionCard question={randomQuestion} /> : "Loading..."}
        </main>
    </div>
  )
}
