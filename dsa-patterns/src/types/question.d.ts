export interface TopicTagProps {
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
