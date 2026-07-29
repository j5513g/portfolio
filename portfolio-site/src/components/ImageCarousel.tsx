import { useCallback, useEffect, useState } from 'react'
import type { JournalImage } from '../lib/journal'
import { imageStyle } from '../lib/journal'

type Props = {
  images: JournalImage[]
  tint?: string
  className?: string
}

export default function ImageCarousel({ images, tint = '#6b8fad', className = '' }: Props) {
  const [i, setI] = useState(0)
  const n = images.length

  const prev = useCallback(() => setI((x) => (x - 1 + n) % n), [n])
  const next = useCallback(() => setI((x) => (x + 1) % n), [n])

  useEffect(() => {
    if (n <= 1) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n, prev, next])

  if (!n) {
    return (
      <div
        className={`photo-grain relative overflow-hidden rounded-sm border-4 border-white shadow-md ${className}`}
        style={{ background: tint }}
      />
    )
  }

  const img = images[i]

  return (
    <div
      className={`photo-grain relative overflow-hidden rounded-sm border-4 border-white shadow-md ${className}`}
      style={{ background: tint }}
      tabIndex={n > 1 ? 0 : undefined}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <img src={img.url} alt="" style={imageStyle(img)} />
      </div>
      {n > 1 && (
        <>
          <button type="button" onClick={prev} className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-[var(--cream)] mono text-xs">‹</button>
          <button type="button" onClick={next} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-[var(--cream)] mono text-xs">›</button>
          <span className="mono absolute bottom-1 right-1 rounded bg-black/40 px-1.5 text-[10px] text-[var(--cream)]">{i + 1}/{n}</span>
        </>
      )}
    </div>
  )
}
