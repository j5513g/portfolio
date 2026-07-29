import type { JournalPost } from '../lib/supabase'
import { formatJournalDate, normalizeImages } from '../lib/journal'
import { tagColor } from '../data/tags'
import ImageCarousel from './ImageCarousel'

const imageTints = ['#8fa08a', '#c9838d', '#6b8fad', '#cba36a', '#9e3b30']

type Props = { post: JournalPost; index: number; expanded?: boolean; onToggle?: () => void }

export default function JournalCard({ post, index, expanded, onToggle }: Props) {
  const tint = imageTints[index % imageTints.length]
  const tilt = index % 2 === 0 ? '-1deg' : '1.2deg'
  const images = normalizeImages(post)

  return (
    <article
      className="card-hover rounded-xl bg-[var(--panel)] p-4 text-[var(--panel-text)] sm:p-5"
      style={{ transform: `rotate(${tilt})` }}
      data-cursor="hover"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <ImageCarousel
          images={images}
          tint={tint}
          className="h-36 w-full shrink-0 sm:h-32 sm:w-28"
        />
        <div className="min-w-0 flex-1">
          <p className="mono mb-1 text-xs text-[var(--muted)]">{formatJournalDate(post.date, post.date_end)}</p>
          {images.length > 1 && (
            <p className="mono mb-1 text-[10px] text-[var(--muted)]">← → arrow keys to browse photos</p>
          )}
          <h2 className="title-serif mb-2 text-2xl leading-tight">{post.title}</h2>
          <p className={`text-sm leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>{post.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="mono rounded-full px-2 py-0.5 text-xs text-[var(--cream)] transition-transform hover:scale-110" style={{ background: tagColor(tag) }}>
                {tag}
              </span>
            ))}
          </div>
          {onToggle && (
            <button type="button" onClick={onToggle} className="mono mt-3 text-xs text-[var(--blue)] hover:underline">
              {expanded ? 'show less ↑' : 'read more →'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
