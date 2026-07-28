import { useMemo, useState } from 'react'
import JournalCard from '../components/JournalCard'
import TagFilter from '../components/TagFilter'
import { allTags, samplePosts } from '../data/sample'

export default function Journal() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(
    () => (activeTag ? samplePosts.filter((p) => p.tags.includes(activeTag)) : samplePosts),
    [activeTag],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="title-serif text-4xl text-[var(--cream)] sm:text-5xl">journal</h1>
        <p className="mono mt-2 text-sm text-[var(--muted)]">milestones, memories, and little wins</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          {filtered.length === 0 ? (
            <p className="mono rounded-xl bg-[var(--panel)] p-6 text-[var(--panel-text)]">
              no entries for that tag yet.
            </p>
          ) : (
            filtered.map((post, i) => (
              <JournalCard
                key={post.id}
                post={post}
                index={i}
                expanded={expandedId === post.id}
                onToggle={() => setExpandedId(expandedId === post.id ? null : post.id)}
              />
            ))
          )}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <TagFilter tags={allTags} active={activeTag} onSelect={setActiveTag} />
        </aside>
      </div>
    </div>
  )
}
