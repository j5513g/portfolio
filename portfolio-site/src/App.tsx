import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Journal from './pages/Journal'

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain min-h-screen bg-[var(--bg)]">
        <CustomCursor />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
