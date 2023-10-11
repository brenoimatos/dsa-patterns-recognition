import { db } from '../lib/mongodb'
import { Question } from '../types/question'

export async function getQuestionData(
  doneQuestionsSlugs: string[]
): Promise<Question> {
  const randomQuestions = await db.Question.aggregate([
    { $match: { titleSlug: { $nin: doneQuestionsSlugs } } },
    { $sample: { size: 1 } },
  ]).exec() // exec é usado para executar a agregação e retornar uma promessa

  if (randomQuestions.length === 0) {
    throw new Error('No more questions available.')
  }

  const question = randomQuestions[0]
  question._id = question._id.toString()
  return question
}
