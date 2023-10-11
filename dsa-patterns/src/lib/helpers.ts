import { db } from '../lib/mongodb'
import { Question } from '../types/question'

export async function getQuestionData(): Promise<Question> {
  const randomQuestions = await db.Question.aggregate([
    { $sample: { size: 1 } },
  ]).exec() // exec é usado para executar a agregação e retornar uma promessa
  const question = randomQuestions[0]
  question._id = question._id.toString()
  return question
}
