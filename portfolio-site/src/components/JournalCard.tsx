import type { JournalPost } from '../lib/supabase'
import { tagColors } from '../data/sample'

const imageTints = ['#8fa08a', '#c9838d', '#6b8fad', '#cba36a', '#9e3b30']

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toLowerCase()
}

type Props = { post: JournalPost; index: number; expanded?: boolean; onToggle?: () => void }

export default function JournalCard({ post, index, expanded, onToggle }: Props) {
  const tint = imageTints[index % imageTints.length]
  const tilt = index % 2 === 0 ? '-1deg' : '1.2deg'

  return (
    <article
      className="rounded-xl bg-[var(--panel)] p-4 text-[var(--panel-text)] transition hover:shadow-lg sm:p-5"
      style={{ transform: `rotate(${tilt})` }}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div
          className="photo-grain relative h-36 w-full shrink-0 overflow-hidden rounded-sm border-4 border-white shadow-md sm:h-32 sm:w-28"
          style={{ background: tint }}
        >
          {post.image_url && (
            <img src={post.image_url} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mono mb-1 text-xs text-[var(--muted)]">{formatDate(post.date)}</p>
          <h2 className="title-serif mb-2 text-2xl leading-tight">{post.title}</h2>
          <p className={`text-sm leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>{post.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="mono rounded-full px-2 py-0.5 text-xs text-[var(--cream)]"
                style={{ background: tagColors[tag] ?? 'var(--blue)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          {onToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="mono mt-3 text-xs text-[var(--blue)] hover:underline"
            >
              {expanded ? 'show less ↑' : 'read more →'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
