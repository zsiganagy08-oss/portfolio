import { useEffect, useRef } from 'react'

const COLORS = ['#5C8F5C', '#4A7AB5', '#B08080', '#6BBCC4', '#4A6680']

export default function Hero() {
  const canvasRef = useRef(null)
  const colorIdxRef = useRef(0)
  const scrollRef = useRef(0)
  const animRef = useRef(null)
  const intervalRef = useRef(null)
  const currentColorRef = useRef(COLORS[0])
  const targetColorRef = useRef(COLORS[0])
  const lerpRef = useRef(1)

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1,3),16)
      const g = parseInt(hex.slice(3,5),16)
      const b = parseInt(hex.slice(5,7),16)
      return [r,g,b]
    }

    function lerpColor(a, b, t) {
      const [ar,ag,ab] = hexToRgb(a)
      const [br,bg,bb] = hexToRgb(b)
      const r = Math.round(ar + (br-ar)*t)
      const g = Math.round(ag + (bg-ag)*t)
      const bl = Math.round(ab + (bb-ab)*t)
      return `rgb(${r},${g},${bl})`
    }

function draw() {
      const W = canvas.width, H = canvas.height
      const scroll = scrollRef.current
      const scale = 1 + scroll * 0.006

      lerpRef.current = Math.min(1, lerpRef.current + 0.02)
      const bgColor = lerpColor(currentColorRef.current, targetColorRef.current, lerpRef.current)

      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'

      // Step 1 — solid black background
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, W, H)

      // Step 2 — draw color rectangle in letter shapes only
      const fontSize = Math.min(W / 5, 160) * scale
      ctx.font = `700 ${fontSize}px 'Inter', system-ui`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Save state, clip to letter shapes, fill color
      ctx.save()
      ctx.beginPath()
      // Use text as clip path by drawing to offscreen
      ctx.fillStyle = bgColor
      // Draw color ONLY where letters are — use destination-out trick
      // First draw color full screen on a separate layer via globalCompositeOperation
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = bgColor
      ctx.fillText('Zsigmond Nagy', W/2, H/2)
      ctx.restore()

      // Step 3 — white stroke outline only
      

      animRef.current = requestAnimationFrame(draw)
    }

    function onScroll() {
      const main = document.querySelector('main')
      scrollRef.current = main ? main.scrollTop : window.scrollY
    }

    resize()
    draw()

    intervalRef.current = setInterval(() => {
      currentColorRef.current = targetColorRef.current
      colorIdxRef.current = (colorIdxRef.current + 1) % COLORS.length
      targetColorRef.current = COLORS[colorIdxRef.current]
      lerpRef.current = 0
    }, 2500)

    const main = document.querySelector('main')
    if (main) main.addEventListener('scroll', onScroll)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animRef.current)
      clearInterval(intervalRef.current)
      if (main) main.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#141414' }}>

      {/* Bebas Neue font */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />

      {/* Canvas mask */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Nav */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 32px', zIndex: 10,
      }}>
        <span style={{
          fontSize: '18px', fontWeight: 800,
          color: 'rgba(255,255,255,0.8)',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-1px',
        }}>ZN</span>
        {[['Home', 'hero'], ['About', 'about'], ['Work', 'work'], ['Contact', 'contact']].map(([label, id]) => (
          <a key={id} onClick={() => scrollTo(id)} style={{
            fontSize: '11px', color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none', letterSpacing: '1px', cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}>{label}</a>
        ))}
      </nav>

      {/* Role tag */}
      <div style={{
        position: 'absolute', top: '64%',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      }}>
        <p style={{
          fontSize: '11px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          fontFamily: "'Inter', sans-serif", margin: 0, whiteSpace: 'nowrap',
        }}>Designer · Builder · Photographer</p>
      </div>
      <div
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute', bottom: '40px', left: '50%',
          transform: 'translateX(-50%)', cursor: 'pointer',
        }}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

    </section>
  )
}