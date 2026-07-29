import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { ExistingImageEditor, PendingImageEditor } from '../components/ImageEditor'
import { defaultImageMeta, normalizeImages } from '../lib/journal'
import { supabase, type ExperienceRole, type JournalImage, type JournalPost } from '../lib/supabase'
import { uploadJournalImage } from '../lib/upload'

const inputClass =
  'mono w-full rounded-lg border border-[var(--border)] bg-[var(--dark)] px-3 py-2 text-sm text-[var(--cream)]'

type Pending = { id: string; file: File; meta: Omit<JournalImage, 'url'> }

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'journal' | 'experience'>('journal')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabase) return <p className="mono p-8 text-center text-[var(--muted)]">add supabase keys to .env.local</p>
  if (loading) return <p className="mono p-8 text-center text-[var(--muted)]">loading…</p>
  if (!session) return <LoginForm onDone={() => supabase!.auth.getSession().then(({ data }) => setSession(data.session))} />

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="title-serif text-3xl text-[var(--cream)]">admin</h1>
        <button type="button" onClick={() => supabase!.auth.signOut()} className="mono text-sm text-[var(--muted)] hover:text-[var(--cream)]">log out</button>
      </div>
      <div className="mono mb-6 flex gap-2">
        {(['journal', 'experience'] as const).map((t) => (
          <button key={t} type="button" onClick={() => { setTab(t); setMsg(''); setErr('') }}
            className={`rounded-full px-4 py-2 text-sm ${tab === t ? 'bg-[var(--red)] text-[var(--cream)]' : 'text-[var(--muted)] border border-[var(--border)]'}`}>{t}</button>
        ))}
      </div>
      {msg && <p className="mono mb-4 text-sm text-[var(--glow)]">{msg}</p>}
      {err && <p className="mono mb-4 text-sm text-[var(--red)]">{err}</p>}
      {tab === 'journal' ? (
        <JournalManager onSuccess={(m) => setMsg(m)} onError={setErr} />
      ) : (
        <ExperienceForm onSuccess={() => setMsg('entry saved!')} onError={setErr} />
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
    const { error } = await supabase!.auth.signInWithPassword({ email, password })
    if (error) setErr(error.message); else onDone()
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-2xl bg-[var(--panel)] p-8 text-[var(--panel-text)]">
      <h1 className="title-serif text-3xl">admin login</h1>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="email" />
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="password" />
      {err && <p className="mono text-sm text-[var(--red)]">{err}</p>}
      <button type="submit" className="mono w-full rounded-full bg-[var(--red)] py-2 text-sm text-[var(--cream)]">log in</button>
    </form>
  )
}

function JournalManager({ onSuccess, onError }: { onSuccess: (m: string) => void; onError: (s: string) => void }) {
  const [posts, setPosts] = useState<JournalPost[]>([])
  const [editId, setEditId] = useState<string | null>(null)

  useEffect(() => {
    supabase!.from('journal_posts').select('*').order('date', { ascending: false })
      .then(({ data }) => setPosts((data ?? []).map((r) => ({
        ...(r as JournalPost),
        images: normalizeImages(r),
        date_end: r.date_end ?? null,
      }))))
  }, [])

  return (
    <div className="space-y-6">
      {posts.length > 0 && (
        <div className="rounded-2xl bg-[var(--panel)] p-4 text-[var(--panel-text)]">
          <h2 className="title-serif mb-3 text-xl">your posts</h2>
          <ul className="mono list-none space-y-2 p-0 text-sm">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2">
                <span className="truncate">{p.title}</span>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => setEditId(p.id)} className="text-[var(--blue)] hover:underline">edit</button>
                  <button type="button" onClick={async () => {
                    if (!confirm('delete this post?')) return
                    await supabase!.from('journal_posts').delete().eq('id', p.id)
                    setPosts((x) => x.filter((q) => q.id !== p.id))
                    if (editId === p.id) setEditId(null)
                    onSuccess('deleted')
                  }} className="text-[var(--red)] hover:underline">delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <JournalForm
        key={editId ?? 'new'}
        editPost={posts.find((p) => p.id === editId) ?? null}
        onCancel={() => setEditId(null)}
        onSaved={(m) => { setEditId(null); onSuccess(m); supabase!.from('journal_posts').select('*').order('date', { ascending: false }).then(({ data }) => setPosts((data ?? []).map((r) => ({ ...(r as JournalPost), images: normalizeImages(r), date_end: r.date_end ?? null })))) }}
        onError={onError}
      />
    </div>
  )
}

function JournalForm({ editPost, onCancel, onSaved, onError }: {
  editPost: JournalPost | null
  onCancel: () => void
  onSaved: (m: string) => void
  onError: (s: string) => void
}) {
  const [title, setTitle] = useState(editPost?.title ?? '')
  const [body, setBody] = useState(editPost?.body ?? '')
  const [date, setDate] = useState(editPost?.date ?? new Date().toISOString().slice(0, 10))
  const [dateEnd, setDateEnd] = useState(editPost?.date_end ?? '')
  const [useRange, setUseRange] = useState(!!editPost?.date_end)
  const [tags, setTags] = useState(editPost?.tags.join(', ') ?? '')
  const [existing, setExisting] = useState<JournalImage[]>(editPost ? normalizeImages(editPost) : [])
  const [pending, setPending] = useState<Pending[]>([])
  const [saving, setSaving] = useState(false)

  function addFiles(files: FileList | null) {
    if (!files) return
    setPending((p) => [...p, ...Array.from(files).map((file) => ({ id: crypto.randomUUID(), file, meta: defaultImageMeta() }))])
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    onError('')
    try {
      const uploaded: JournalImage[] = await Promise.all(
        pending.map(async ({ file, meta }) => ({ url: await uploadJournalImage(file), ...meta })),
      )
      const images = [...existing, ...uploaded]
      const payload = {
        title, body, date,
        date_end: useRange && dateEnd ? dateEnd : null,
        tags: tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
        images,
        image_url: images[0]?.url ?? null,
      }
      const { error } = editPost
        ? await supabase!.from('journal_posts').update(payload).eq('id', editPost.id)
        : await supabase!.from('journal_posts').insert(payload)
      if (error) throw error
      onSaved(editPost ? 'post updated!' : 'post published!')
    } catch (e) {
      onError(e instanceof Error ? e.message : 'save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl bg-[var(--panel)] p-6 text-[var(--panel-text)]">
      <h2 className="title-serif text-xl">{editPost ? 'edit post' : 'new post'}</h2>
      <input required placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
      <textarea required placeholder="body" rows={4} value={body} onChange={(e) => setBody(e.target.value)} className={inputClass} />
      <label className="mono flex items-center gap-2 text-sm">
        <input type="checkbox" checked={useRange} onChange={(e) => setUseRange(e.target.checked)} />
        date range
      </label>
      <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
      {useRange && <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} className={inputClass} />}
      <input placeholder="tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} />

      <div>
        <p className="mono mb-2 text-sm">photos (multiple ok)</p>
        <input type="file" accept="image/*" multiple onChange={(e) => addFiles(e.target.files)} className="mono text-sm" />
      </div>

      {existing.map((img, idx) => (
        <ExistingImageEditor key={img.url} img={img}
          onChange={(u) => setExisting((arr) => arr.map((x, i) => (i === idx ? u : x)))}
          onRemove={() => setExisting((arr) => arr.filter((_, i) => i !== idx))} />
      ))}
      {pending.map((p) => (
        <PendingImageEditor key={p.id} file={p.file} meta={p.meta}
          onChange={(meta) => setPending((arr) => arr.map((x) => (x.id === p.id ? { ...x, meta } : x)))}
          onRemove={() => setPending((arr) => arr.filter((x) => x.id !== p.id))} />
      ))}

      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={saving} className="mono rounded-full bg-[var(--blue)] px-6 py-2 text-sm text-[var(--cream)] disabled:opacity-50">
          {saving ? 'saving…' : editPost ? 'save changes' : 'publish post'}
        </button>
        {editPost && (
          <button type="button" onClick={onCancel} className="mono rounded-full border border-[var(--border)] px-6 py-2 text-sm">cancel edit</button>
        )}
      </div>
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
        title, organization, start_date, end_date: end_date || null,
        description: description || null, type, sort_order,
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
      <input type="date" value={end_date} onChange={(e) => setEnd(e.target.value)} className={inputClass} />
      <textarea placeholder="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
      <select value={type} onChange={(e) => setType(e.target.value as ExperienceRole['type'])} className={inputClass}>
        <option value="role">role</option>
        <option value="leadership">leadership</option>
        <option value="certification">certification</option>
      </select>
      <input type="number" value={sort_order} onChange={(e) => setSort(Number(e.target.value))} className={inputClass} />
      <button type="submit" disabled={saving} className="mono rounded-full bg-[var(--blue)] px-6 py-2 text-sm text-[var(--cream)] disabled:opacity-50">{saving ? 'saving…' : 'save entry'}</button>
    </form>
  )
}
