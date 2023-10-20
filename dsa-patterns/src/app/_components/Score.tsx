'use client'
import { useScore } from '../_hooks/useScore'

type ScoreProps = {
  side: 'left' | 'right'
}

const Score = ({ side }: ScoreProps) => {
  const { score } = useScore()

  return (
    <div
      className={`border bg-slate-50 p-2 rounded-lg flex items-center ${
        side === 'left' ? 'mr-4' : 'ml-4'
      }`}
    >
      <div className="text-2xl">{side === 'left' ? '❌' : '✅'}</div>
      <div
        className={`text-4xl ${
          side === 'left' ? 'text-red-500' : 'text-green-500'
        } pl-2`}
      >
        {side === 'left' ? score.wrongs : score.corrects}
      </div>
    </div>
  )
}

export default Score
