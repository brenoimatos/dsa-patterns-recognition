'use server'

import { cookies } from 'next/headers'
import { QUESTION_SLUGS_COOKIES } from '../lib/constants'

export const clearCookies = () => {
  cookies().set(QUESTION_SLUGS_COOKIES, '[]')
}
