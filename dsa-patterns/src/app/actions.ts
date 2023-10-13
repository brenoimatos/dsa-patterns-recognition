'use server'

import { cookies } from 'next/headers'
import { QUESTION_SLUGS_COOKIES } from '../lib/constants'
import { Question } from '../types/question'
import { revalidatePath } from 'next/cache'

export const clearCookies = () => {
  cookies().set(QUESTION_SLUGS_COOKIES, '[]')
}

export const getNewQuestion = async (
  doneQuestionsSlugs: string[],
  question: Question
) => {
  cookies().set(
    QUESTION_SLUGS_COOKIES,
    JSON.stringify([...doneQuestionsSlugs, question.titleSlug])
  )
  revalidatePath('/')
}
