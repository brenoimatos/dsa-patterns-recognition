export interface TopicTag {
  name: string
  id: string
  slug: string
}

export interface Question {
  _id: string
  title: string
  titleSlug: string
  content: string
  difficulty: string
  acRate: number
  topicTags: TopicTag[]
}
