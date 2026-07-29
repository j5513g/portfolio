import type { CSSProperties } from 'react'

export type JournalImage = {
  url: string
  rotation: number
  zoom: number
  posX: number
  posY: number
}

export const defaultImageMeta = (): Omit<JournalImage, 'url'> => ({
  rotation: 0,
  zoom: 1,
  posX: 50,
  posY: 50,
})

export function normalizeImages(row: {
  images?: JournalImage[] | null
  image_url?: string | null
}): JournalImage[] {
  if (row.images?.length) return row.images
  if (row.image_url) return [{ url: row.image_url, ...defaultImageMeta() }]
  return []
}

export function formatJournalDate(start: string, end: string | null) {
  const fmt = (iso: string, withYear = true) => {
    const d = new Date(iso + 'T12:00:00')
    const o: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
    if (withYear) o.year = 'numeric'
    return d.toLocaleDateString('en-US', o).toLowerCase()
  }
  if (!end || end === start) return fmt(start)
  return `${fmt(start, false)} – ${fmt(end)}`
}

export function imageStyle(img: JournalImage): CSSProperties {
  return {
    objectFit: 'cover',
    objectPosition: `${img.posX}% ${img.posY}%`,
    transform: `rotate(${img.rotation}deg) scale(${img.zoom})`,
    width: '100%',
    height: '100%',
  }
}
