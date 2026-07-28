import type { ExperienceRole } from '../lib/supabase'

function formatRange(start: string, end: string | null) {
  const fmt = (s: string) =>
    new Date(s + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toLowerCase()
  return end ? `${fmt(start)} – ${fmt(end)}` : `${fmt(start)} – present`
}

type Props = { items: ExperienceRole[] }

export default function ExperienceTimeline({ items }: Props) {
  if (!items.length) {
    return <p className="mono text-sm text-[var(--muted)]">nothing here yet.</p>
  }

  return (
    <ul className="list-none space-y-4 p-0">
      {items.map((item, i) => (
        <li
          key={item.id}
          className="rounded-xl border border-[var(--border)] bg-[var(--dark)] p-5"
          style={{ transform: `rotate(${i % 2 === 0 ? '-0.5deg' : '0.6deg'})` }}
        >
          <p className="mono mb-1 text-xs text-[var(--glow)]">{formatRange(item.start_date, item.end_date)}</p>
          <h3 className="title-serif text-2xl text-[var(--cream)]">{item.title}</h3>
          <p className="mono mb-2 text-sm text-[var(--blue)]">{item.organization}</p>
          {item.description && (
            <p className="text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
