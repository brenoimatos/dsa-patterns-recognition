import { Question } from '../../types/question'

const QuestionCard = ({ question }: { question: Question }) => {
  return (
    <div className="w-5/6 text-left border border-gray-300 p-4">
      <h2 className="text-center text-3xl">{question.title}</h2>
      <p className="text-center text-lg mt-1 mb-4 text-slate-700">
        ({question.difficulty})
      </p>
      <div
        className="content text-base max-w-full mx-4"
        dangerouslySetInnerHTML={{ __html: question.content }}
      />
    </div>
  )
}

export default QuestionCard
