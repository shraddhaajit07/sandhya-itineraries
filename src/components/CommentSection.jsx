import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function CommentSection({ tripId }) {
  const [comments, setComments] = useLocalStorage(`comments-${tripId}`, [])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    setComments((prev) => [
      ...prev,
      { name: name.trim() || 'anonymous', text: text.trim(), date: new Date().toISOString() },
    ])
    setText('')
  }

  return (
    <div className="rounded-2xl bg-lavender/60 p-6 sm:p-7">
      <p className="mb-1 font-bold text-lg text-ink">drop a comment!</p>
      <p className="mb-4 text-xs text-ink/50">
        comments save to your own browser — they're just visible to you right now, but it's a start ✦
      </p>

      {comments.length > 0 && (
        <ul className="mb-5 space-y-3">
          {comments.map((c, i) => (
            <li key={i} className="rounded-xl bg-paper/70 px-4 py-3 text-sm">
              <p className="font-semibold text-ink">{c.name}</p>
              <p className="text-ink/80">{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          maxLength={40}
          className="w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 text-sm outline-none focus:border-lavender-deep"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="thoughts, questions, xo's..."
          rows={2}
          maxLength={500}
          className="w-full resize-none rounded-lg border border-ink/10 bg-paper px-3 py-2 text-sm outline-none focus:border-lavender-deep"
        />
        <button
          type="submit"
          className="rounded-full bg-ink px-4 py-1.5 text-sm text-paper transition-transform hover:scale-105 active:scale-95"
        >
          post
        </button>
      </form>
    </div>
  )
}
