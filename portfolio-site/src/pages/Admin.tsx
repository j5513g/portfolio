import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { ExperienceRole } from '../lib/supabase'
import { uploadJournalImage } from '../lib/upload'

const inputClass =
  'mono w-full rounded-lg border border-[var(--border)] bg-[var(--dark)] px-3 py-2 text-sm text-[var(--cream)]'

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'journal' | 'experience'>('journal')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabase) {
    return (
      <p className="mono p-8 text-center text-[var(--muted)]">
        add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local
      </p>
    )
  }

  if (loading) return <p className="mono p-8 text-center text-[var(--muted)]">loading…</p>

  if (!session) return <LoginForm onDone={() => supabase!.auth.getSession().then(({ data }) => setSession(data.session))} />

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="title-serif text-3xl text-[var(--cream)]">admin</h1>
        <button type="button" onClick={() => supabase!.auth.signOut()} className="mono text-sm text-[var(--muted)] hover:text-[var(--cream)]">
          log out
        </button>
      </div>

      <div className="mono mb-6 flex gap-2">
        {(['journal', 'experience'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setMsg(''); setErr('') }}
            className={`rounded-full px-4 py-2 text-sm ${tab === t ? 'bg-[var(--red)] text-[var(--cream)]' : 'text-[var(--muted)] border border-[var(--border)]'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {msg && <p className="mono mb-4 text-sm text-[var(--glow)]">{msg}</p>}
      {err && <p className="mono mb-4 text-sm text-[var(--red)]">{err}</p>}

      {tab === 'journal' ? (
        <JournalForm onSuccess={() => setMsg('post saved! check /journal')} onError={setErr} />
      ) : (
        <ExperienceForm onSuccess={() => setMsg('entry saved! check /experience')} onError={setErr} />
      )}
    </div>
  )
}

function LoginForm({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    const { error } = await supabase!.auth.signInWithPassword({ email, password })
    if (error) setErr(error.message)
    else onDone()
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-2xl bg-[var(--panel)] p-8 text-[var(--panel-text)]">
      <h1 className="title-serif text-3xl">admin login</h1>
      <input type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      <input type="password" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
      {err && <p className="mono text-sm text-[var(--red)]">{err}</p>}
      <button type="submit" className="mono w-full rounded-full bg-[var(--red)] py-2 text-sm text-[var(--cream)]">log in</button>
    </form>
  )
}

function JournalForm({ onSuccess, onError }: { onSuccess: () => void; onError: (s: string) => void }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [tags, setTags] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    onError('')
    try {
      let image_url: string | null = null
      if (file) image_url = await uploadJournalImage(file)
      const tagList = tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
      const { error } = await supabase!.from('journal_posts').insert({ title, body, date, tags: tagList, image_url })
      if (error) throw error
      setTitle(''); setBody(''); setTags(''); setFile(null)
      onSuccess()
    } catch (e) {
      onError(e instanceof Error ? e.message : 'save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl bg-[var(--panel)] p-6 text-[var(--panel-text)]">
      <input required placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
      <textarea required placeholder="body" rows={4} value={body} onChange={(e) => setBody(e.target.value)} className={inputClass} />
      <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
      <input placeholder="tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} />
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mono text-sm" />
      <button type="submit" disabled={saving} className="mono rounded-full bg-[var(--blue)] px-6 py-2 text-sm text-[var(--cream)] disabled:opacity-50">
        {saving ? 'saving…' : 'publish post'}
      </button>
    </form>
  )
}

function ExperienceForm({ onSuccess, onError }: { onSuccess: () => void; onError: (s: string) => void }) {
  const [title, setTitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [start_date, setStart] = useState('')
  const [end_date, setEnd] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<ExperienceRole['type']>('role')
  const [sort_order, setSort] = useState(0)
  const [saving, setSaving] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    onError('')
    try {
      const { error } = await supabase!.from('experience_roles').insert({
        title, organization, start_date,
        end_date: end_date || null,
        description: description || null,
        type, sort_order,
      })
      if (error) throw error
      setTitle(''); setOrganization(''); setStart(''); setEnd(''); setDescription(''); setSort(0)
      onSuccess()
    } catch (e) {
      onError(e instanceof Error ? e.message : 'save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl bg-[var(--panel)] p-6 text-[var(--panel-text)]">
      <input required placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
      <input required placeholder="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} className={inputClass} />
      <input required type="date" value={start_date} onChange={(e) => setStart(e.target.value)} className={inputClass} />
      <input type="date" placeholder="end date (optional)" value={end_date} onChange={(e) => setEnd(e.target.value)} className={inputClass} />
      <textarea placeholder="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
      <select value={type} onChange={(e) => setType(e.target.value as ExperienceRole['type'])} className={inputClass}>
        <option value="role">role</option>
        <option value="leadership">leadership</option>
        <option value="certification">certification</option>
      </select>
      <input type="number" placeholder="sort order" value={sort_order} onChange={(e) => setSort(Number(e.target.value))} className={inputClass} />
      <button type="submit" disabled={saving} className="mono rounded-full bg-[var(--blue)] px-6 py-2 text-sm text-[var(--cream)] disabled:opacity-50">
        {saving ? 'saving…' : 'save entry'}
      </button>
    </form>
  )
}
