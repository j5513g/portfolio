import { tagColor } from '../data/tags'

type Props = {
  tags: string[]
  active: string | null
  onSelect: (tag: string | null) => void
}

export default function TagFilter({ tags, active, onSelect }: Props) {
  return (
    <div className="rounded-2xl bg-[var(--blue)] p-5 text-[var(--cream)]">
      <h2 className="title-serif mb-3 text-2xl">keywords</h2>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`mono mb-3 block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
          active === null ? 'bg-[var(--cream)] text-[var(--panel-text)]' : 'hover:bg-black/15'
        }`}
      >
        all entries
      </button>
      <ul className="mono list-none space-y-1 p-0">
        {tags.map((tag) => (
          <li key={tag}>
            <button
              type="button"
              onClick={() => onSelect(tag === active ? null : tag)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                active === tag ? 'bg-[var(--cream)] text-[var(--panel-text)]' : 'hover:bg-black/15'
              }`}
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{ background: tagColor(tag) }}
              />
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
