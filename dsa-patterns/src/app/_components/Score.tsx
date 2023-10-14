'use client'
import { useScore } from '../_hooks/useScore'

const Score = () => {
  const { score } = useScore()

  return (
    <div>
      Score: Corrects: {score.corrects}, Wrongs: {score.wrongs}
    </div>
  )
}

export default Score
