import React from 'react'
import Score from './Score'
import styles from '../../styles/Nav.module.css'
import { Question } from '../../types/question'

type Props = {
  getNewQuestionWithSetCookie: () => void
  question: Question
}

const Nav = (props: Props) => {
  return (
    <nav className={styles.container}>
      <h1 className={styles.title}>LeetCode Pattern Recognition</h1>
      <Score question={props.question} />
      <form action={props.getNewQuestionWithSetCookie}>
        <button className={styles.nextQuestionButton} type="submit">
          Next Question
        </button>
      </form>
    </nav>
  )
}

export default Nav
