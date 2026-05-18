import { useState, useEffect, useRef } from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  const [overlayOpen, setOverlayOpen] = useState(false)
  const closeOverlayRef = useRef(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    function onScroll() {
      const main = document.querySelector('main')
      if (main) setShowScrollTop(main.scrollTop > window.innerHeight * 0.8)
    }
    setTimeout(() => {
      const main = document.querySelector('main')
      if (main) main.addEventListener('scroll', onScroll)
    }, 500)
    return () => {
      const main = document.querySelector('main')
      if (main) main.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && overlayOpen && closeOverlayRef.current) {
        closeOverlayRef.current()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [overlayOpen])

  return (
    <main className="text-white">
      <Hero />
      <About />
      <Work onOverlayChange={setOverlayOpen} closeOverlayRef={closeOverlayRef} />
      <Contact onOverlayChange={setOverlayOpen} overlayOpen={overlayOpen} closeOverlayRef={closeOverlayRef} />
      <Footer />
      {showScrollTop && (
        <button
          onClick={() => document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: '32px', right: '32px',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
            zIndex: 100, transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 11V3M3 7l4-4 4 4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </main>
  )
}

export default App