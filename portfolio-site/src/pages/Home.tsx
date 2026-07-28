import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'

export default function Home() {
  return (
    <div className="mx-auto grid max-w-6xl gap-0 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-4">
      {/* left — red decor */}
      <aside className="relative hidden min-h-[420px] overflow-hidden rounded-2xl bg-[var(--red)] lg:block">
        <div className="absolute inset-0 opacity-30 photo-grain" />
        <div className="absolute -left-8 top-12 h-32 w-32 rotate-12 rounded-full border-2 border-[var(--cream)]/40" />
        <div className="absolute bottom-16 right-4 h-24 w-24 -rotate-6 rounded-full bg-[var(--cream)]/15" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[var(--cream)]/25" />
        <p className="mono absolute bottom-6 left-6 right-6 text-xs text-[var(--cream)]/70">
          decorative sidebar — swap in your art later
        </p>
      </aside>

      {/* center — tan content */}
      <section className="rounded-2xl bg-[var(--panel)] p-6 text-[var(--panel-text)] sm:p-8">
        <p className="mono mb-3 text-sm text-[var(--red)]">soft things, bright ideas, a little chaos</p>
        <h1 className="title-serif mb-4 text-4xl leading-tight sm:text-5xl">
          hi, i'm jia — collecting tiny milestones in a big, lovely life.
        </h1>
        <p className="mb-6 max-w-prose text-base leading-relaxed">
          this is my little corner of the internet: robotics nights, crochet squares, travel photos,
          volunteer days, and all the in-between moments worth remembering.
        </p>

        <div className="relative mx-auto mb-6 w-fit rotate-[-2deg]">
          <div className="photo-grain relative overflow-hidden rounded-sm border-4 border-white shadow-lg">
            <img
              src={heroImg}
              alt="jia"
              className="block h-48 w-40 object-cover sm:h-56 sm:w-44"
            />
          </div>
        </div>

        <div className="mono flex flex-wrap gap-3">
          <Link
            to="/journal"
            className="rounded-full border border-[var(--panel-text)]/25 px-4 py-2 text-sm text-[var(--panel-text)] no-underline transition hover:border-[var(--red)] hover:bg-[var(--red)] hover:text-[var(--cream)]"
          >
            read my journal →
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-[var(--panel-text)]/25 px-4 py-2 text-sm text-[var(--panel-text)] no-underline transition hover:border-[var(--blue)] hover:bg-[var(--blue)] hover:text-[var(--cream)]"
          >
            say hello →
          </Link>
        </div>

        <div
          id="interactive-zone"
          className="mt-8 flex h-28 items-center justify-center rounded-xl border border-dashed border-[var(--panel-text)]/20 bg-[var(--panel-text)]/5"
        >
          <p className="mono text-center text-xs text-[var(--panel-text)]/60">
            interactive zone — floating orb coming in phase 4
          </p>
        </div>
      </section>

      {/* right — blue sidebar */}
      <aside className="mt-4 flex flex-col gap-4 rounded-2xl bg-[var(--blue)] p-5 text-[var(--cream)] lg:mt-0">
        <div>
          <h2 className="title-serif mb-2 text-2xl">contact</h2>
          <ul className="mono list-none space-y-2 p-0 text-sm">
            <li>
              <Link to="/contact#form" className="text-[var(--cream)] underline-offset-2 hover:underline">
                contact form
              </Link>
            </li>
            <li>
              <a href="#" className="text-[var(--cream)] underline-offset-2 hover:underline">
                github
              </a>
            </li>
            <li>
              <a href="#" className="text-[var(--cream)] underline-offset-2 hover:underline">
                instagram
              </a>
            </li>
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

        <p className="mono mt-auto text-xs text-[var(--cream)]/60">
          based somewhere cozy · she/her
        </p>
      </aside>
    </div>
  )
}
