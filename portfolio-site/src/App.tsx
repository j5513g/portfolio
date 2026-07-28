import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Journal from './pages/Journal'

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain min-h-screen bg-[var(--bg)]">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
