'use client'

import Link from 'next/link'

const questions = [
  { id: 1, title: 'Number of Closed Islands', difficulty: 'Medium', percent: 66.3 },
  { id: 2, title: 'Remove Duplicate Letters', difficulty: 'Medium', percent: 49.7 },
  { id: 3, title: 'Missing Ranges', difficulty: 'Easy', percent: 33.8 },
  { id: 4, title: 'Max Points on a Line', difficulty: 'Hard', percent: 26.8 },
  { id: 5, title: 'Reorganize String', difficulty: 'Medium', percent: 54.6 },
  { id: 6, title: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', percent: 53.7 },
  { id: 7, title: 'Koko Eating Bananas', difficulty: 'Easy', percent: 79.8 },
  { id: 8, title: 'Accounts Merge', difficulty: 'Medium', percent: 57.2 },
  { id: 9, title: 'Dungeon Game', difficulty: 'Hard', percent: 38.2 },
  { id: 10, title: 'Evaluate Division', difficulty: 'Medium', percent: 61.7 },
]

const difficultyColor = {
  Easy: 'bg-green-200 text-green-800',
  Medium: 'bg-yellow-200 text-yellow-800',
  Hard: 'bg-red-200 text-red-800',
}

export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Interview Questions</h1>
        <div className="rounded-xl overflow-hidden border border-muted/30 shadow-sm">
          <div className="grid grid-cols-12 bg-muted px-4 py-2 font-semibold text-sm text-muted-foreground">
            <div className="col-span-1">#</div>
            <div className="col-span-7">Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2 text-right">Success</div>
          </div>
          {questions.map((q, i) => (
            <Link key={q.id} href={`/questions/${q.id}`}>
              <div className="grid grid-cols-12 px-4 py-3 hover:bg-muted/60 transition cursor-pointer border-t border-muted/20">
                <div className="col-span-1">{i + 1}</div>
                <div className="col-span-7 font-medium text-primary">{q.title}</div>
                <div className="col-span-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[q.difficulty as keyof typeof difficultyColor]}`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">
                  {q.percent}%
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
