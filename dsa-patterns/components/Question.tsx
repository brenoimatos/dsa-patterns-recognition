import { QuestionProps } from "../lib/api/question"

const QuestionCard = ({ question }: { question: QuestionProps }) => {
  return (
    <div className="question-container">
      <h2>{question.title}</h2>
      <p><strong>Difficulty: </strong>{question.difficulty}</p>
      <div dangerouslySetInnerHTML={{ __html: question.content }} />
      <ul>
        <strong>Topic Tags:</strong>
        {question.topicTags.map((tag, index) => (
          <li key={index}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
