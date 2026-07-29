import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import FloatingOrb from '../components/FloatingOrb'
import heroImg from '../assets/hero.png'

export default function Home() {
  return (
    <div className="mx-auto grid max-w-6xl gap-0 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-4">
      <FadeIn className="hidden lg:block">
        <aside className="relative min-h-[420px] overflow-hidden rounded-2xl bg-[var(--red)]">
          <div className="absolute inset-0 opacity-30 photo-grain" />
          <div className="animate-float absolute -left-8 top-12 h-32 w-32 rounded-full border-2 border-[var(--cream)]/40" />
          <div className="absolute bottom-16 right-4 h-24 w-24 -rotate-6 rounded-full bg-[var(--cream)]/15" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[var(--cream)]/25" />
        </aside>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="rounded-2xl bg-[var(--panel)] p-6 text-[var(--panel-text)] sm:p-8">
          <p className="mono mb-3 text-sm text-[var(--red)]">soft things, bright ideas, a little chaos</p>
          <h1 className="title-serif mb-4 text-4xl leading-tight sm:text-5xl">
            hi, i'm jia — collecting tiny milestones in a big, lovely life.
          </h1>
          <p className="mb-6 max-w-prose text-base leading-relaxed">
            this is my little corner of the internet: robotics nights, crochet squares, travel photos,
            volunteer days, and all the in-between moments worth remembering.
          </p>

          <div className="sticker relative mx-auto mb-6 w-fit rotate-[-2deg]">
            <div className="photo-grain relative overflow-hidden rounded-sm border-4 border-white shadow-lg">
              <img src={heroImg} alt="jia" className="block h-48 w-40 object-cover sm:h-56 sm:w-44" />
            </div>
          </div>

          <div className="mono flex flex-wrap gap-3">
            <Link to="/journal" className="btn-glow rounded-full border border-[var(--panel-text)]/25 px-4 py-2 text-sm text-[var(--panel-text)] no-underline hover:border-[var(--red)] hover:bg-[var(--red)] hover:text-[var(--cream)]">
              read my journal →
            </Link>
            <Link to="/contact" className="btn-glow rounded-full border border-[var(--panel-text)]/25 px-4 py-2 text-sm text-[var(--panel-text)] no-underline hover:border-[var(--blue)] hover:bg-[var(--blue)] hover:text-[var(--cream)]">
              say hello →
            </Link>
          </div>

          <FloatingOrb />
        </section>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-4 lg:mt-0">
        <aside className="flex flex-col gap-4 rounded-2xl bg-[var(--blue)] p-5 text-[var(--cream)]">
          <div>
            <h2 className="title-serif mb-2 text-2xl">contact</h2>
            <ul className="mono list-none space-y-2 p-0 text-sm">
              <li><Link to="/contact#form" className="text-[var(--cream)] underline-offset-2 hover:underline">contact form</Link></li>
              <li><a href="#" className="text-[var(--cream)] underline-offset-2 hover:underline">github</a></li>
              <li><a href="#" className="text-[var(--cream)] underline-offset-2 hover:underline">instagram</a></li>
            </ul>
          </div>
          <div className="rounded-xl bg-black/15 p-4">
            <h3 className="mono mb-2 text-xs text-[var(--cream)]/80">currently</h3>
            <ul className="mono list-none space-y-1 p-0 text-sm">
              <li>📖 reading: swap me in</li>
              <li>🧶 making: a crochet square</li>
              <li>🤖 building: robotics season</li>
            </ul>
          </div>
          <p className="mono mt-auto text-xs text-[var(--cream)]/60">based somewhere cozy · she/her</p>
        </aside>
      </FadeIn>
    </div>
  )
}
