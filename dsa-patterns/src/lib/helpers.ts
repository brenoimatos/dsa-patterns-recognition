import { db } from '../lib/mongodb'
import { Question } from '../types/question'
import { TAG_HIERARCHY } from './constants'

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

const getBestTag = (tags: string[]) => {
  let bestTag = null
  let bestPosition = Infinity

  for (const tag of tags) {
    const position = TAG_HIERARCHY.indexOf(tag)
    if (position !== -1 && position < bestPosition) {
      bestTag = tag
      bestPosition = position
    }
  }

  return bestTag || tags[0] // Se nenhum tag estiver na hierarquia, retorne o primeiro da lista
}

export const getRandomChoices = (questionTags: string[]) => {
  const otherTags = TAG_HIERARCHY.filter((tag) => !questionTags.includes(tag))

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const correctChoice = getBestTag(questionTags) // Agora usa a função getBestTag para determinar a correctChoice
  const randomChoices = shuffleArray(otherTags).slice(0, 4)
  randomChoices.push(correctChoice)

  return shuffleArray(randomChoices)
}
