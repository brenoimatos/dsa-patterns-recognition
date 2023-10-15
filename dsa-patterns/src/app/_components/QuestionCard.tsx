import { Question } from '../../types/question'

const QuestionCard = ({ question }: { question: Question }) => {
  return (
    <div className="w-5/6 text-left border border-gray-300 p-4">
      <h2 className="text-center text-2xl">{question.title}</h2>
      <p className="text-center text-1.5rem mt-3">{question.difficulty}</p>
      <div
        className="content text-1.5rem max-w-full mx-4"
        dangerouslySetInnerHTML={{ __html: question.content }}
      />
    </div>
  )
}

export default QuestionCard
