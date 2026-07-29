import { motion, useSpring } from 'framer-motion'

export default function FloatingOrb() {
  const cfg = { stiffness: 120, damping: 18 }
  const x = useSpring(0, cfg)
  const y = useSpring(0, cfg)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left - 20)
    y.set(e.clientY - r.top - 20)
  }

  return (
    <div
      onMouseMove={onMove}
      className="relative mt-8 h-32 overflow-hidden rounded-xl border border-[var(--panel-text)]/15 bg-[var(--panel-text)]/5"
    >
      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute h-16 w-16 rounded-full bg-[var(--red)]/25 blur-xl"
      />
      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute h-8 w-8 rounded-full bg-[var(--glow)]/80 shadow-[0_0_20px_var(--glow)]"
      />
      <p className="mono pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-[var(--panel-text)]/40">
        ✦ move your mouse here
      </p>
    </div>
  )
}
