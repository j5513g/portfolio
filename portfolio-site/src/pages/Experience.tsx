import { useEffect, useState } from 'react'
import ExperienceTimeline from '../components/ExperienceTimeline'
import { supabase, type ExperienceRole } from '../lib/supabase'

const tabs: { key: ExperienceRole['type']; label: string }[] = [
  { key: 'role', label: 'roles' },
  { key: 'leadership', label: 'leadership' },
  { key: 'certification', label: 'certifications' },
]

export default function Experience() {
  const [tab, setTab] = useState<ExperienceRole['type']>('role')
  const [items, setItems] = useState<ExperienceRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.from('experience_roles').select('*').order('sort_order')
      .then(({ data }) => { setItems(data ?? []); setLoading(false) })
  }, [])

  const filtered = items.filter((e) => e.type === tab)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="title-serif text-4xl text-[var(--cream)] sm:text-5xl">experience</h1>
        <p className="mono mt-2 text-sm text-[var(--muted)]">roles, leadership & certifications</p>
      </header>

      <div className="mono mb-6 flex flex-wrap gap-2">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              tab === key
                ? 'bg-[var(--red)] text-[var(--cream)]'
                : 'border border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--cream)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mono text-[var(--muted)]">loading…</p>
      ) : (
        <ExperienceTimeline items={filtered} />
      )}
    </div>
  )
}
