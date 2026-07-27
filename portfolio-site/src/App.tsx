import { motion } from 'framer-motion'

const tags = ['crochet', 'travel', 'robotics', 'volunteering', 'life']

const posts = [
  {
    title: 'first robotics comp weekend',
    date: 'april 2025',
    blurb: 'a messy, wonderful weekend full of late nights, tiny victories, and a lot of heart.',
  },
  {
    title: 'my first crochet piece',
    date: 'january 2025',
    blurb: 'a soft little square that somehow became the start of a whole new creative habit.',
  },
  {
    title: 'birthday trip to the coast',
    date: 'november 2024',
    blurb: 'salt air, warm lights, and the feeling that life was finally slowing down enough to notice.',
  },
]

const roles = [
  { title: 'student lead', org: 'robotics club', years: '2023–present' },
  { title: 'volunteer coordinator', org: 'community nonprofit', years: '2022–2024' },
  { title: 'creative assistant', org: 'school arts collective', years: '2021–2022' },
]

function App() {
  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-[#f5ebdd] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="overflow-hidden rounded-[2rem] border border-[#3a2e3a] bg-[#201b24]/90 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-[#c9838d]">about / contact / journal</p>
              <h1 className="text-4xl font-semibold lowercase leading-tight sm:text-5xl">
                hi, i’m a curious creative with a soft spot for making things feel a little magical.
              </h1>
              <p className="max-w-xl text-base text-[#d9b9b2] sm:text-lg">
                i’m building a portfolio that feels like a dreamy little archive of my life: projects, milestones, volunteer work, and all the tiny moments that matter.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full border border-[#c9838d]/70 px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:bg-[#c9838d]/20"
                >
                  get in touch
                </a>
                <a
                  href="#journal"
                  className="rounded-full border border-[#8fa08a]/70 px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:bg-[#8fa08a]/20"
                >
                  see my journal
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-[1.5rem] border border-[#8f7aa8]/50 bg-[#17141a]/80 p-5 shadow-inner"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[#cba36a]">currently into</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#3a2e3a] bg-[#201b24] px-3 py-1 text-sm text-[#f5ebdd]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="rounded-[1.5rem] border border-[#3a2e3a] bg-[#201b24]/80 p-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#8f7aa8]">about me</p>
            <h2 className="mt-3 text-2xl lowercase text-[#f5ebdd]">a little about who i am</h2>
            <p className="mt-3 text-[#d9b9b2]">
              i’m someone who loves building things, showing up for others, and collecting meaningful memories along the way. whether it’s robotics, volunteering, or making something tiny with my hands, i like work that feels personal and honest.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="rounded-[1.5rem] border border-[#3a2e3a] bg-[#201b24]/80 p-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#cba36a]">contact</p>
            <h2 id="contact" className="mt-3 text-2xl lowercase text-[#f5ebdd]">let’s talk</h2>
            <p className="mt-3 text-[#d9b9b2]">email me at hello@yourname.com</p>
            <p className="mt-2 text-[#d9b9b2]">instagram • linkedin • github</p>
          </motion.article>
        </section>

        <section id="journal" className="rounded-[1.8rem] border border-[#3a2e3a] bg-[#201b24]/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#8fa08a]">journal</p>
              <h2 className="mt-1 text-2xl lowercase text-[#f5ebdd]">milestones and memories</h2>
            </div>
            <button className="rounded-full border border-[#c9838d]/60 px-3 py-2 text-sm transition hover:bg-[#c9838d]/20">
              filter by tag
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <motion.article
                key={post.title}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="rounded-[1.25rem] border border-[#3a2e3a] bg-[#17141a]/80 p-4"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-[#cba36a]">{post.date}</p>
                <h3 className="mt-2 text-xl lowercase text-[#f5ebdd]">{post.title}</h3>
                <p className="mt-2 text-sm text-[#d9b9b2]">{post.blurb}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-[#3a2e3a] bg-[#201b24]/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[#c9838d]">experience</p>
          <h2 className="mt-1 text-2xl lowercase text-[#f5ebdd]">roles and organizations</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <div key={`${role.org}-${role.title}`} className="rounded-[1.1rem] border border-[#3a2e3a] bg-[#17141a]/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-[#8f7aa8]">{role.years}</p>
                <h3 className="mt-2 text-lg lowercase text-[#f5ebdd]">{role.title}</h3>
                <p className="mt-1 text-sm text-[#d9b9b2]">{role.org}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
