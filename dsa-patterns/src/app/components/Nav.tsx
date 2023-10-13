import React from 'react'

type Props = {
  getNewQuestionWithSetCookie: () => void
}

const Nav = (props: Props) => {
  return (
    <nav>
      Nav
      <form action={props.getNewQuestionWithSetCookie}>
        <button type="submit">Next Question</button>
      </form>
    </nav>
  )
}

export default Nav
