import { NextResponse } from "next/server";
import {db} from "../../../lib/mongodb";


  export async function GET(request: Request) {
    try {
        // Usando o questionModel para acessar o banco de dados
        // const randomQuestions = await db.Question.find()
        const randomQuestions = await db.Question.aggregate([
            { $sample: { size: 1 } }
        ]).exec();  // exec é usado para executar a agregação e retornar uma promessa
        const question = randomQuestions[0];
        question._id = question._id.toString();
        return NextResponse.json({ question }, { status: 200 });
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao recuperar a questão');  // ou você pode querer tratar o erro de forma diferente
    }
}
