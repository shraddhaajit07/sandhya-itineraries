import { useEffect, useState } from 'react'
import { supabase, commentsEnabled } from '../lib/supabase'

function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CommentSection({ tripId }) {
  const [comments, setComments] = useState([])
  const [status, setStatus] = useState(commentsEnabled ? 'loading' : 'disabled')
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [website, setWebsite] = useState('') // honeypot — real people never fill this
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!commentsEnabled) return

    let cancelled = false

    async function load() {
      const { data, error } = await supabase
        .from('comments')
        .select('id, name, body, created_at')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: true })

      if (cancelled) return
      if (error) {
        setStatus('error')
        return
      }
      setComments(data ?? [])
      setStatus('ready')
    }

    load()
    return () => {
      cancelled = true
    }
  }, [tripId])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim() || posting) return

    // A bot that fills every field it finds gets silently dropped — no error
    // message, so it can't learn what tripped it.
    if (website) {
      setText('')
      return
    }

    setPosting(true)
    setError('')

    const comment = {
      trip_id: tripId,
      name: name.trim() || 'anonymous',
      body: text.trim(),
    }

    const { data, error } = await supabase.from('comments').insert(comment).select().single()

    setPosting(false)

    if (error) {
      setError("couldn't post that — try again in a sec")
      return
    }

    setComments((prev) => [...prev, data])
    setText('')
  }

  return (
    <div className="rounded-2xl bg-lavender/60 p-6 sm:p-7">
      <p className="mb-1 font-bold text-lg text-ink">drop a comment!</p>
      <p className="mb-4 text-xs text-ink/50">
        {status === 'disabled'
          ? 'comments are being set up — check back soon ✦'
          : 'say hi, ask a question, tell us where to go next ✦'}
      </p>

      {status === 'loading' && <p className="mb-5 text-sm text-ink/40">loading comments...</p>}

      {status === 'error' && (
        <p className="mb-5 text-sm text-ink/50">couldn't load comments right now — try refreshing</p>
      )}

      {status === 'ready' && comments.length === 0 && (
        <p className="mb-5 text-sm text-ink/40">no comments yet — be the first!</p>
      )}

      {comments.length > 0 && (
        <ul className="mb-5 space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded-xl bg-paper/70 px-4 py-3 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-ink">{c.name}</p>
                <span className="shrink-0 text-xs text-ink/40">{timeAgo(c.created_at)}</span>
              </div>
              <p className="mt-0.5 whitespace-pre-wrap text-ink/80">{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      {status !== 'disabled' && (
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

          {/* honeypot: hidden from people, irresistible to bots */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={posting}
              className="rounded-full bg-ink px-4 py-1.5 text-sm text-paper transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {posting ? 'posting...' : 'post'}
            </button>
            {error && <span className="text-xs text-heart">{error}</span>}
          </div>
        </form>
      )}
    </div>
  )
}
