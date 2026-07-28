export default function Contact() {
  return (
    <section className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl bg-[var(--panel)] p-8 text-[var(--panel-text)]">
        <h1 className="title-serif mb-4 text-4xl">say hello</h1>
        <p className="mb-6 leading-relaxed">
          want to collaborate, chat about robotics, or just say hi? i'd love to hear from you.
        </p>
        <ul className="mono mb-10 list-none space-y-3 p-0 text-sm">
          <li>
            <span className="text-[var(--red)]">github → </span>
            <a href="#" className="text-[var(--panel-text)] hover:underline">
              @your-handle
            </a>
          </li>
          <li>
            <span className="text-[var(--blue)]">instagram → </span>
            <a href="#" className="text-[var(--panel-text)] hover:underline">
              @your-handle
            </a>
          </li>
        </ul>

        <div id="form" className="rounded-xl border border-dashed border-[var(--panel-text)]/25 bg-[var(--panel-text)]/5 p-6">
          <h2 className="title-serif mb-2 text-2xl">contact form</h2>
          <p className="mono text-sm text-[var(--panel-text)]/70">
            coming soon — we'll build an in-site form here later.
          </p>
        </div>
      </div>
    </section>
  )
}
