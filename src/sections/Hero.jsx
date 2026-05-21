import { useEffect, useRef } from 'react'
import cad01 from '../assets/cad/exterior1.png'
import cad02 from '../assets/cad/exterior2.png'
import cad03 from '../assets/cad/living.png'
import cad04 from '../assets/cad/kitchen.png'
import nature1 from '../assets/nature/nature1.jpg'
import nature2 from '../assets/nature/nature2.jpg'
import nature3 from '../assets/nature/nature3.jpg'

const SLIDES = [null, nature2, cad02, nature1, cad04, nature3, cad01, cad03]

export default function Hero() {
  const canvasRef = useRef(null)
  const scrollRef = useRef(0)
  const animRef = useRef(null)
  const slideIdxRef = useRef(0)
  const currentImgRef = useRef(null)
  const nextImgRef = useRef(null)
  const fadeRef = useRef(1)
  const fadingRef = useRef(false)
  const intervalRef = useRef(null)

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

    function loadImage(src) {
      return new Promise(res => {
        const img = new Image()
        img.onload = () => res(img)
        img.src = src
      })
    }

    function drawImageCover(img) {
      if (!img || img === 'white') return
      const W = canvas.width, H = canvas.height
      const iR = img.width / img.height
      const cR = W / H
      let sw, sh, sx, sy
      if (iR > cR) {
        sh = img.height; sw = sh * cR
        sx = (img.width - sw) / 2; sy = 0
      } else {
        sw = img.width; sh = sw / cR
        sx = 0; sy = (img.height - sh) / 2
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H)
    }

    function draw() {
      const W = canvas.width, H = canvas.height
      const scroll = scrollRef.current
      const scale = 1 + scroll * 0.006

      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'

      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, W, H)

      const fontSize = Math.min(W / 5, 160) * scale
      ctx.font = `700 ${fontSize}px 'Inter', system-ui`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      if (currentImgRef.current === 'white') {
        ctx.save()
        ctx.fillStyle = '#ffffff'
        ctx.fillText('Zsigmond Nagy', W/2, H/2)
        ctx.restore()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.fillStyle = '#141414'
        ctx.fillRect(0, 0, W, H)
        ctx.globalCompositeOperation = 'source-over'
      } else if (currentImgRef.current) {
        ctx.save()
        ctx.globalAlpha = fadingRef.current ? fadeRef.current : 1
        drawImageCover(currentImgRef.current)
        ctx.globalCompositeOperation = 'destination-in'
        ctx.globalAlpha = 1
        ctx.fillStyle = 'white'
        ctx.fillText('Zsigmond Nagy', W/2, H/2)
        ctx.restore()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.fillStyle = '#141414'
        ctx.fillRect(0, 0, W, H)
        ctx.globalCompositeOperation = 'source-over'

        if (fadingRef.current && nextImgRef.current && nextImgRef.current !== 'white') {
          ctx.save()
          ctx.globalAlpha = 1 - fadeRef.current
          drawImageCover(nextImgRef.current)
          ctx.globalCompositeOperation = 'destination-in'
          ctx.globalAlpha = 1
          ctx.fillStyle = 'white'
          ctx.fillText('Zsigmond Nagy', W/2, H/2)
          ctx.restore()
          ctx.globalCompositeOperation = 'destination-over'
          ctx.fillStyle = '#141414'
          ctx.fillRect(0, 0, W, H)
          ctx.globalCompositeOperation = 'source-over'
        }
      }

      if (fadingRef.current) {
        fadeRef.current -= 0.008
        if (fadeRef.current <= 0) {
          currentImgRef.current = nextImgRef.current
          fadingRef.current = false
          fadeRef.current = 1
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    async function nextSlide() {
      slideIdxRef.current = (slideIdxRef.current + 1) % SLIDES.length
      const nextSrc = SLIDES[(slideIdxRef.current + 1) % SLIDES.length]
      nextImgRef.current = nextSrc === null ? 'white' : await loadImage(nextSrc)
      fadingRef.current = true
      fadeRef.current = 1
    }

    async function init() {
      currentImgRef.current = SLIDES[0] === null ? 'white' : await loadImage(SLIDES[0])
      nextImgRef.current = await loadImage(SLIDES[1])
    }

    function onScroll() {
      const main = document.querySelector('main')
      scrollRef.current = main ? main.scrollTop : window.scrollY
    }

    resize()
    init().then(() => {
      draw()
      setTimeout(() => {
        nextSlide()
        intervalRef.current = setInterval(nextSlide, 4000)
      }, 1000)
    })

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
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 32px', zIndex: 10,
      }}>
        <span style={{
          fontSize: '28px', fontWeight: 800,
          color: 'rgba(255,255,255,1)',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-3px',
        }}>ZN</span>
        <div style={{ display: 'flex', gap: '28px' }}>
          {[['Home', 'hero'], ['About', 'about'], ['Work', 'work'], ['Contact', 'contact']].map(([label, id]) => (
            <a key={id} onClick={() => scrollTo(id)} style={{
              fontSize: '15px', color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none', letterSpacing: '1px', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}>{label}</a>
          ))}
        </div>
      </nav>

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

      <div onClick={() => scrollTo('about')} style={{
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