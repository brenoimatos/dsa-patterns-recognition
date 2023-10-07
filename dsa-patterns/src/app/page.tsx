"use client";
import Head from "next/head";
import QuestionCard from "../components/QuestionCard";
import MultipleChoice from "../components/MultipleChoice";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { QuestionProps } from "../types/question";

const initialQuestionState: QuestionProps = {
  _id: "",
  title: "",
  titleSlug: "",
  content: "",
  difficulty: "",
  acRate: 0,
  topicTags: [],
};

export default function Page() {
  const [question, setQuestion] = useState<QuestionProps>(initialQuestionState);
  console.log("Page component rendered");
  const fetchData = async () => {
    console.log("fetchData called");
    const res = await fetch("http://localhost:3000/api/question");
    if (!res.ok) {
      console.error("Failed to fetch:", res.statusText);
      return;
    }
    const data = await res.json();
    console.log(data.question);
    setQuestion(data.question);
  };
  useEffect(() => {
    console.log("useEffect");
    fetchData().catch(console.error);
  }, []);
  console.log(question);

  async function handleClick() {
    console.log("clicked");
    await fetchData();
  }
  return (
    <div className="container">
      <Head>
        <title>LeetCode Pattern Recognition</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={handleClick}>Click </button>
        <div className={styles.title}>
          <h1>LeetCode Pattern Recognition</h1>
        </div>
        <div className={styles.grid}>
          {<QuestionCard question={question} />}
          {<MultipleChoice question={question} />}
        </div>
      </main>
    </div>
  );
}
