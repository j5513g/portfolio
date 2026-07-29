import { useEffect, useMemo, useState } from 'react'
import FadeIn from '../components/FadeIn'
import JournalCard from '../components/JournalCard'
import TagFilter from '../components/TagFilter'
import { normalizeImages } from '../lib/journal'
import { supabase, type JournalPost } from '../lib/supabase'

function mapPost(row: Record<string, unknown>): JournalPost {
  return {
    ...(row as JournalPost),
    images: normalizeImages(row as Parameters<typeof normalizeImages>[0]),
    date_end: (row.date_end as string | null) ?? null,
  }
}

export default function Journal() {
  const [posts, setPosts] = useState<JournalPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.from('journal_posts').select('*').order('date', { ascending: false })
      .then(({ data }) => { setPosts((data ?? []).map(mapPost)); setLoading(false) })
  }, [])

  const allTags = useMemo(() => [...new Set(posts.flatMap((p) => p.tags))].sort(), [posts])
  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <FadeIn>
        <header className="mb-8">
          <h1 className="title-serif text-4xl text-[var(--cream)] sm:text-5xl">journal</h1>
          <p className="mono mt-2 text-sm text-[var(--muted)]">milestones, memories, and little wins</p>
        </header>
      </FadeIn>

      {loading ? (
        <p className="mono text-[var(--muted)]">loading…</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            {filtered.length === 0 ? (
              <p className="mono rounded-xl bg-[var(--panel)] p-6 text-[var(--panel-text)]">
                {posts.length === 0 ? 'no entries yet.' : 'no entries for that tag.'}
              </p>
            ) : (
              filtered.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.06}>
                  <JournalCard
                    post={post}
                    index={i}
                    expanded={expandedId === post.id}
                    onToggle={() => setExpandedId(expandedId === post.id ? null : post.id)}
                  />
                </FadeIn>
              ))
            )}
          </div>
          {allTags.length > 0 && (
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <TagFilter tags={allTags} active={activeTag} onSelect={setActiveTag} />
            </aside>
          )}
        </div>
      )}
    </div>
  )
}
