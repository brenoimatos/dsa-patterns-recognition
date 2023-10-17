import { NextResponse } from 'next/server'
import { db } from '../../../lib/mongodb'

export async function GET(request: Request) {
  try {
    // @ts-ignore
    const allQuestions = await db.Question.find().exec()

    // Convert ObjectIDs to strings if needed
    allQuestions.forEach((question: any) => {
      question._id = question._id.toString()
    })

    return NextResponse.json({ allQuestions }, { status: 200 })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao recuperar todas as questões')
  }
}
