import type { JournalImage } from '../lib/journal'
import { defaultImageMeta, imageStyle } from '../lib/journal'

type Props = {
  src: string
  meta: Omit<JournalImage, 'url'>
  onChange: (meta: Omit<JournalImage, 'url'>) => void
}

export default function ImageEditor({ src, meta, onChange }: Props) {
  const set = (patch: Partial<Omit<JournalImage, 'url'>>) => onChange({ ...meta, ...patch })

  return (
    <div className="rounded-lg border border-[var(--border)] p-3">
      <div className="relative mx-auto mb-3 h-40 w-full max-w-xs overflow-hidden rounded-sm bg-[var(--dark)]">
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <img src={src} alt="" style={imageStyle({ url: src, ...meta })} />
        </div>
      </div>
      <label className="mono mb-2 block text-xs">rotation ({meta.rotation}°)
        <input type="range" min={-45} max={45} value={meta.rotation} onChange={(e) => set({ rotation: +e.target.value })} className="w-full" />
      </label>
      <label className="mono mb-2 block text-xs">zoom ({meta.zoom.toFixed(1)}x)
        <input type="range" min={1} max={2.5} step={0.1} value={meta.zoom} onChange={(e) => set({ zoom: +e.target.value })} className="w-full" />
      </label>
      <label className="mono mb-2 block text-xs">horizontal crop
        <input type="range" min={0} max={100} value={meta.posX} onChange={(e) => set({ posX: +e.target.value })} className="w-full" />
      </label>
      <label className="mono block text-xs">vertical crop
        <input type="range" min={0} max={100} value={meta.posY} onChange={(e) => set({ posY: +e.target.value })} className="w-full" />
      </label>
      <button type="button" onClick={() => onChange(defaultImageMeta())} className="mono mt-2 text-xs text-[var(--blue)] hover:underline">reset</button>
    </div>
  )
}

type PendingProps = {
  file: File
  meta: Omit<JournalImage, 'url'>
  onChange: (meta: Omit<JournalImage, 'url'>) => void
  onRemove: () => void
}

export function PendingImageEditor({ file, meta, onChange, onRemove }: PendingProps) {
  const src = URL.createObjectURL(file)
  return (
    <div>
      <ImageEditor src={src} meta={meta} onChange={onChange} />
      <button type="button" onClick={onRemove} className="mono mt-1 text-xs text-[var(--red)] hover:underline">remove</button>
    </div>
  )
}

type ExistingProps = {
  img: JournalImage
  onChange: (img: JournalImage) => void
  onRemove: () => void
}

export function ExistingImageEditor({ img, onChange, onRemove }: ExistingProps) {
  return (
    <div>
      <ImageEditor
        src={img.url}
        meta={{ rotation: img.rotation, zoom: img.zoom, posX: img.posX, posY: img.posY }}
        onChange={(m) => onChange({ ...img, ...m })}
      />
      <button type="button" onClick={onRemove} className="mono mt-1 text-xs text-[var(--red)] hover:underline">remove</button>
    </div>
  )
}
