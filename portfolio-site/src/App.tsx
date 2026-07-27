import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, Route, Routes } from 'react-router-dom'

const tags = ['crochet', 'travel', 'robotics', 'volunteering', 'life']

const posts = [
  {
    title: 'first robotics comp weekend',
    day: '12',
    month: 'apr',
    year: '2025',
    tag: 'robotics',
    blurb: 'a messy, wonderful weekend full of late nights, tiny victories, and a lot of heart.',
    imageClass: 'journal-image journal-image--sage',
    tilt: -1.2,
  },
  {
    title: 'my first crochet piece',
    day: '03',
    month: 'jan',
    year: '2025',
    tag: 'crochet',
    blurb: 'a soft little square that somehow became the start of a whole new creative habit.',
    imageClass: 'journal-image journal-image--rose',
    tilt: 1.3,
  },
  {
    title: 'birthday trip to the coast',
    day: '21',
    month: 'nov',
    year: '2024',
    tag: 'travel',
    blurb: 'salt air, warm lights, and the feeling that life was finally slowing down enough to notice.',
    imageClass: 'journal-image journal-image--cream',
    tilt: -0.8,
  },
  {
    title: 'community volunteer day',
    day: '08',
    month: 'oct',
    year: '2024',
    tag: 'volunteering',
    blurb: 'a day of folding boxes, laughing a lot, and making small things feel important.',
    imageClass: 'journal-image journal-image--sage',
    tilt: 1.1,
  },
]

const roles = [
  { title: 'student lead', org: 'robotics club', years: '2023–present', tilt: -1.1 },
  { title: 'volunteer coordinator', org: 'community nonprofit', years: '2022–2024', tilt: 1.2 },
  { title: 'creative assistant', org: 'school arts collective', years: '2021–2022', tilt: -0.7 },
]

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorActive, setCursorActive] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      setCursorPos({ x: event.clientX, y: event.clientY })
    }

    let frame = 0
    const tick = () => {
      setTrail((prev) => {
        const next = [...prev, { x: pointerRef.current.x, y: pointerRef.current.y, id: Date.now() + Math.random() }]
        return next.slice(-6)
      })
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div className="app-shell">
      <div
        className={`cursor-dot ${cursorActive ? 'cursor-dot--active' : ''}`}
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      />
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            transform: `translate(${point.x}px, ${point.y}px)`,
            opacity: 0.16 + (index / 6) * 0.2,
          }}
        />
      ))}

      <nav className="top-nav">
        <div className="brand">jia • portfolio</div>
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
            about
          </NavLink>
          <NavLink to="/journal" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
            journal
          </NavLink>
          <NavLink to="/experience" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
            experience
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
            contact
          </NavLink>
        </div>
      </nav>

      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<HomePage setCursorActive={setCursorActive} />} />
          <Route path="/journal" element={<JournalPage setCursorActive={setCursorActive} />} />
          <Route path="/experience" element={<ExperiencePage setCursorActive={setCursorActive} />} />
          <Route path="/contact" element={<ContactPage setCursorActive={setCursorActive} />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage({ setCursorActive }: { setCursorActive: (value: boolean) => void }) {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="hero-card"
      >
        <p className="eyebrow">soft things, bright ideas, a little bit of chaos</p>
        <h1>hi, i’m jia — a dreamy maker collecting tiny milestones in a big, lovely life.</h1>
        <p className="lead">
          this is my little scrapbook of everything that matters: the projects, the people, the wins, the awkward bright moments.
        </p>
        <div className="hero-actions">
          <a
            href="/contact"
            className="pill"
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
          >
            say hello
          </a>
          <a
            href="/journal"
            className="pill pill--alt"
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
          >
            browse the journal
          </a>
        </div>
      </motion.section>

      <section className="card-grid">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="info-card tilt-card"
        >
          <p className="eyebrow">about me</p>
          <h2>a little about who i am</h2>
          <p>
            i love building things that feel personal, showing up for the people around me, and turning ordinary days into small, meaningful memories.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="info-card tilt-card tilt-card--alt"
        >
          <p className="eyebrow">currently into</p>
          <div className="tag-row">
            {tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </motion.article>
      </section>
    </>
  )
}

function JournalPage({ setCursorActive }: { setCursorActive: (value: boolean) => void }) {
  const [activeTag, setActiveTag] = useState('all')
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)
  const filteredPosts = activeTag === 'all' ? posts : posts.filter((post) => post.tag === activeTag)

  return (
    <section className="page-card">
      <div className="page-heading">
        <div>
          <p className="eyebrow">journal</p>
          <h2>milestones, little wins, and lovely days</h2>
        </div>
        <div className="tag-row tag-row--wrap">
          <button className={`tag-chip ${activeTag === 'all' ? 'tag-chip--active' : ''}`} onClick={() => setActiveTag('all')}>
            all
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`tag-chip ${activeTag === tag ? 'tag-chip--active' : ''}`}
              onClick={() => setActiveTag(tag)}
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="post-grid">
        {filteredPosts.map((post) => {
          const isSelected = selectedPost === post.title
          const isHovered = hoveredPost === post.title
          return (
            <article
              key={post.title}
              className={`post-card ${isSelected ? 'post-card--selected' : ''} ${isHovered ? 'post-card--hovered' : ''}`}
              style={{ rotate: isSelected || isHovered ? '0deg' : `${post.tilt}deg` }}
              onClick={() => setSelectedPost(isSelected ? null : post.title)}
              onMouseEnter={() => {
                setHoveredPost(post.title)
                setCursorActive(true)
              }}
              onMouseLeave={() => {
                setHoveredPost(null)
                setCursorActive(false)
              }}
            >
              <div className={`journal-image-wrap ${post.imageClass}`}>
                <div className="journal-date-stamp">
                  <span>{post.day}</span>
                  <small>{post.month}</small>
                  <strong>{post.year}</strong>
                </div>
              </div>
              <div className="post-card-body">
                <p className="post-topic">{post.tag}</p>
                <h3>{post.title}</h3>
                <p>{post.blurb}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ExperiencePage({ setCursorActive }: { setCursorActive: (value: boolean) => void }) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <section className="page-card">
      <p className="eyebrow">experience</p>
      <h2>roles, organizations, and the years in between</h2>
      <div className="timeline">
        {roles.map((role) => {
          const isSelected = selectedRole === `${role.org}-${role.title}`
          return (
            <motion.article
              key={`${role.org}-${role.title}`}
              whileHover={{ x: 4 }}
              className={`timeline-card ${isSelected ? 'timeline-card--selected' : ''}`}
              style={{ rotate: isSelected ? '0deg' : `${role.tilt}deg` }}
              onClick={() => setSelectedRole(isSelected ? null : `${role.org}-${role.title}`)}
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
            >
              <p className="post-date">{role.years}</p>
              <h3>{role.title}</h3>
              <p>{role.org}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

function ContactPage({ setCursorActive }: { setCursorActive: (value: boolean) => void }) {
  return (
    <section className="page-card contact-card">
      <p className="eyebrow">contact</p>
      <h2>let’s make something soft and lovely together</h2>
      <p>email me at hello@jia.com</p>
      <div className="hero-actions">
        <a href="mailto:hello@jia.com" className="pill" onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)}>
          email me
        </a>
        <a href="https://www.instagram.com" className="pill pill--alt" onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)}>
          instagram
        </a>
      </div>
    </section>
  )
}

export default App
