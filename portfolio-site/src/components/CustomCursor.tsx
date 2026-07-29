import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const pointer = useRef({ x: -100, y: -100 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
    document.body.classList.add('custom-cursor')

    const move = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setActive(!!t.closest('a, button, [data-cursor="hover"]'))
    }

    let frame = 0
    const tick = () => {
      setTrail((prev) => [...prev, { ...pointer.current, id: Date.now() + Math.random() }].slice(-5))
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    frame = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {trail.map((p, i) => (
        <div
          key={p.id}
          className="cursor-trail"
          style={{
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: 0.08 + (i / 5) * 0.15,
          }}
        />
      ))}
      <div
        className={`cursor-dot ${active ? 'cursor-dot--active' : ''}`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />
    </>
  )
}
