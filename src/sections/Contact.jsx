import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from '../components/Arrow'

function AnimatedPanel() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    particles.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0, vy: 0,
      size: Math.random() * 2 + 1,
    }))
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', handleMouseMove)
    let frame
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach((p) => {
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const force = Math.min(60 / dist, 2)
        p.vx += (dx / dist) * force * 0.05
        p.vy += (dy / dist) * force * 0.05
        p.vx *= 0.92
        p.vy *= 0.92
        p.x += p.vx
        p.y += p.vy
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 202, 123, 0.5)'
        ctx.fill()
      })
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" style={{ minHeight: '400px' }} />
}

export default function Contact({ onOverlayChange, overlayOpen, closeOverlayRef }) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const field = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '22px 20px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }

  function openForm() {
    setOpen(true)
    setTimeout(() => setVisible(true), 10)
    document.body.style.overflow = 'hidden'
    onOverlayChange(true)
    if (closeOverlayRef) closeOverlayRef.current = closeForm
  }

  function closeForm() {
    setVisible(false)
    setTimeout(() => {
      setOpen(false)
      document.body.style.overflow = ''
      onOverlayChange(false)
    }, 400)
  }

  return (
    <>
    <section id="contact" className="flex flex-col" style={{ padding: '96px 112px', minHeight: '100vh', background: '#7F8999' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <div className="flex gap-16 items-center">
        <div className="flex flex-col gap-8 flex-1">
          <h2 style={{ fontSize: '22px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter', sans-serif", marginBottom: '32px' }}>Contact</h2>
          <p style={{ fontSize: '42px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', maxWidth: '700px', lineHeight: 1.2, fontFamily: "'Inter', sans-serif", marginBottom: '32px', whiteSpace: 'nowrap' }}>Got an Idea? Let's Ship It.</p>
          <button onClick={openForm} className="self-start text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2">
            Get in touch <ArrowRight />
          </button>
        </div>
        <div className="flex-1 relative overflow-hidden rounded-xl">
          <AnimatedPanel />
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex flex-col items-center justify-start"
          style={{
            padding: '96px 112px',
            background: '#343330',
            transform: visible ? 'translateX(0)' : 'translateX(100%)',
            transition: visible ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' : 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <button onClick={closeForm} className="fixed top-6 left-6 text-white/40 hover:text-white transition-colors z-50">
            <ArrowLeft />
          </button>
          <div className="w-full max-w-xl" style={{ paddingBottom: '120px' }}>
            <h1 style={{ fontSize: '52px', fontWeight: 700, marginBottom: '12px', fontFamily: "'Inter', sans-serif", paddingLeft: '0' }}>Get in touch</h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '48px', fontFamily: "'Inter', sans-serif", paddingLeft: '0' }}>Open to opportunities — reach out and I'll get back to you.</p>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-white/30 uppercase">Name</label>
                <input type="text" name="name" placeholder="Your name" style={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-white/30 uppercase">Email</label>
                <input type="email" name="email" placeholder="your@email.com" style={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-white/30 uppercase">Message</label>
                <textarea name="message" rows={6} placeholder="What's on your mind?" style={{ ...field, resize: 'none' }} />
              </div>
              <button type="submit" style={{ borderRadius: '8px', padding: '10px 20px' }} className="self-start border border-white/20 text-sm tracking-widest uppercase text-white/60 hover:text-white hover:border-white/40 transition-colors">Send</button>
            </form>
            <div className="flex gap-8" style={{ marginTop: '48px' }}>
              <a href="#" aria-label="LinkedIn" style={{ color: 'rgba(255,255,255,0.3)' }} className="hover:text-white transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.3)' }} className="hover:text-white transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="#" aria-label="GitHub" style={{ color: 'rgba(255,255,255,0.3)' }} className="hover:text-white transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="mailto:" aria-label="Email" style={{ color: 'rgba(255,255,255,0.3)' }} className="hover:text-white transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
    </>
  )
}