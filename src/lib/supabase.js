import { createClient } from '@supabase/supabase-js'

// These come from .env.local in development and from Vercel's environment
// variables in production. Vite only exposes vars prefixed with VITE_ to the
// browser, which is what we want here — the anon key is *designed* to be
// public. What actually protects the data is the row-level security policies
// on the table (anyone may read and insert a comment; nobody may edit or
// delete one), not the secrecy of this key.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null when the env vars aren't set, so the comment box can show a friendly
// "not set up yet" state instead of crashing the whole trip page.
export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const commentsEnabled = Boolean(supabase)
