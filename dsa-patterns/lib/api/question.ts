import clientPromise from "../mongodb";

interface TopicTagProps {
  name: string;
  id: string;
  slug: string;
}

export interface QuestionProps {
  _id: string;
  title: string;
  titleSlug: string;
  content: string;
  difficulty: string;
  acRate: number;
  topicTags: TopicTagProps[];
}


export async function getQuestions(): Promise<QuestionProps[]> {
  const client = await clientPromise;
  const collection = client.db('leetcode').collection('questions');
  return await collection
    .aggregate<QuestionProps>([
      {
        $sort: {
          difficulty: 1
        }
      },
      {
        $limit: 2
      }
    ])
    .toArray();
}

export async function getRandomQuestion(): Promise<QuestionProps> {
  const client = await clientPromise;
  const collection = client.db('leetcode').collection('questions');
  const pipeline = [
    {
      $sample: { size: 1 }
    }
  ];
  const randomQuestions = await collection.aggregate<QuestionProps>(pipeline).toArray();
  const question = randomQuestions[0];
  question._id = question._id.toString();
  return question;
}


