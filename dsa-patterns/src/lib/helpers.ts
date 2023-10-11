import { db } from '../lib/mongodb'
import { Question } from '../types/question'

interface QuestionDataResult {
  question: Question | null
  errorMessage: string | null
}

export async function getQuestionData(
  doneQuestionsSlugs: string[]
): Promise<QuestionDataResult> {
  try {
    const randomQuestions = await db.Question.aggregate([
      { $match: { titleSlug: { $nin: doneQuestionsSlugs } } },
      { $sample: { size: 1 } },
    ]).exec() // exec é usado para executar a agregação e retornar uma promessa

    if (randomQuestions.length === 0) {
      return {
        question: null,
        errorMessage: 'No more questions available.',
      }
    }

    const question = randomQuestions[0]
    question._id = question._id.toString()

    return {
      question: question,
      errorMessage: null,
    }
  } catch (error: any) {
    return {
      question: null,
      errorMessage: error.message,
    }
  }
}