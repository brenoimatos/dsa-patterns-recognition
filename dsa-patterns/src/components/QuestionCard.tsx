import { QuestionProps } from "../types/question";
import styles from "../styles/QuestionCard.module.css";

const QuestionCard = ({ question }: { question: QuestionProps }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{question.title}</h2>
      <p className={styles.difficulty}>({question.difficulty})</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: question.content }}
      />
    </div>
  );
};

export default QuestionCard;
