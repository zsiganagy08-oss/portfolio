import { useState, useEffect } from 'react'
import { ArrowLeft } from '../components/Arrow'
import artapp01 from '../assets/artapp/intro.png'
import artapp02 from '../assets/artapp/problem.png'
import artapp03 from '../assets/artapp/process.png'
import artapp031 from '../assets/artapp/process2.png'
import artapp04 from '../assets/artapp/direction.png'
import artapp05 from '../assets/artapp/outcome.png'

import cad01 from '../assets/cad/exterior1.png'
import cad02 from '../assets/cad/exterior2.png'
import cad03 from '../assets/cad/living.png'
import cad04 from '../assets/cad/kitchen.png'
import cad05 from '../assets/cad/bedroom.png'
import cad06 from '../assets/cad/entrance.png'
import cad07 from '../assets/cad/bathroom.png'
import cad08 from '../assets/cad/eg.png'
import cad09 from '../assets/cad/og.png'
import cad10 from '../assets/cad/eg-furnished.png'
import cad11 from '../assets/cad/og-furnished.png'
import cad12 from '../assets/cad/mood1.png'

import nature1 from '../assets/nature/nature1.jpg'
import nature2 from '../assets/nature/nature2.jpg'
import nature3 from '../assets/nature/nature3.jpg'
import nature4 from '../assets/nature/nature4.jpg'
import nature5 from '../assets/nature/nature5.jpg'

import pconLogo from '../assets/tools/pcon.png'
import d5Logo from '../assets/tools/d5.png'
import canonLogo from '../assets/tools/canon.png'



const projects = [
  { id: 1, title: 'The Art Style App', label: 'Design', shortDescription: 'A design case study exploring how art style recommendations could work as a mobile product.', longDescription: "This project started with a clear problem: people who are drawn to art often don't know how to define or develop their personal taste. The app guides users through a visual discovery process — surfacing styles, movements, and artists that match their preferences. Designed end-to-end in Figma, from research and flow mapping to final UI.", photos: [artapp01, artapp02, artapp03, artapp031, artapp04, artapp05], tools: ['figma'], layout: 'column' },
  { id: 2, title: 'My Dream Home', label: 'CAD & Architecture', shortDescription: 'A fully designed residential home — from floor plan to furnished interior, built in pCon Planner.', longDescription: 'Designed entirely from scratch — EG and OG floor plans, structural layout, and a fully furnished interior across every room. The project covers architecture and interior design together, from the entrance to the terrace. All renders produced in pCon Planner.', photos: [cad02, cad01, cad03, cad04, cad05, cad06, cad07, cad12, cad11, cad08, cad10, cad09], tools: ['pcon', 'd5'], layout: 'grid' },
  { id: 3, title: 'Nature Photography', label: 'Photography', shortDescription: 'A personal photography project capturing nature in and around Bern.', longDescription: 'Shot on a full-frame DSLR across various locations. These images are part of an ongoing personal project.', photos: [nature2, nature1, nature3, nature4, nature5], tools: ['canon'], layout: 'grid' },
  { id: 4, title: '"Deadlines"', label: 'Coming Soon', shortDescription: 'Under Development.', longDescription: 'Coming soon.', photos: [null, null, null, null, null, null], tools: [null], layout: 'grid' },
]

function Gallery({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % photos.length)
    }
    window.addEventListener('keydown', handleKey, true)
    return () => window.removeEventListener('keydown', handleKey, true)
  }, [photos.length])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: '#0a0812' }}>
      <button onClick={onClose} className="absolute top-6 left-6 text-white/40 hover:text-white transition-colors z-50"><ArrowLeft /></button>
      <button onClick={() => setCurrent((c) => (c - 1 + photos.length) % photos.length)} className="absolute left-6 text-white/40 hover:text-white transition-colors text-3xl">&#8249;</button>
      <div className="flex flex-col items-center gap-6" style={{ width: '600px' }}>
        {photos[current] ? (
          <img src={photos[current]} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '12px', objectFit: 'contain' }} />
        ) : (
          <div className="w-full rounded-xl bg-white/5 border border-white/10" style={{ height: '400px' }} />
        )}
      </div>
      <button onClick={() => setCurrent((c) => (c + 1) % photos.length)} className="absolute right-6 text-white/40 hover:text-white transition-colors text-3xl">&#8250;</button>
    </div>
  )
}

export default function Work({ onOverlayChange, closeOverlayRef }) {
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(null)
  const [enlargedImage, setEnlargedImage] = useState(null)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && enlargedImage) {
        e.stopPropagation()
        setEnlargedImage(null)
      }
    }
    window.addEventListener('keydown', handleKey, true)
    return () => window.removeEventListener('keydown', handleKey, true)
  }, [enlargedImage])

  function openProject(project) {
    setSelected(project)
    setTimeout(() => setVisible(true), 10)
    document.body.style.overflow = 'hidden'
    if (onOverlayChange) onOverlayChange(true)
    if (closeOverlayRef) closeOverlayRef.current = closeProject
  }

  function closeProject() {
    setVisible(false)
    setTimeout(() => {
      setSelected(null)
      document.body.style.overflow = ''
      if (onOverlayChange) onOverlayChange(false)
      if (closeOverlayRef) closeOverlayRef.current = null
    }, 500)
  }

  return (
    <section id="work" className="min-h-screen flex flex-col justify-center" style={{ padding: '96px 160px' }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          transform: visible ? 'translateX(-120%)' : 'translateX(0)',
          opacity: visible ? 0 : 1,
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
        }}>
          <h2 style={{ fontSize: '36px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: '48px', fontFamily: "'Inter', sans-serif" }}>Work</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>

            {/* Featured — Art Style App */}
            <div onClick={() => openProject(projects[0])} className="cursor-pointer group" style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
              <div style={{ flex: '0 0 60%', borderRadius: '12px', overflow: 'hidden', height: '420px' }} className="group-hover:opacity-90 transition-opacity">
                {projects[0].photos[0] ? (
                  <img src={projects[0].photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', fontFamily: "'Inter', sans-serif" }}>{projects[0].label}</p>
                <p style={{ fontSize: '24px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>{projects[0].title}</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{projects[0].shortDescription}</p>
              </div>
            </div>

            {/* Row 2 — CAD — text left, image right */}
            <div onClick={() => openProject(projects[1])} className="cursor-pointer group" style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', fontFamily: "'Inter', sans-serif" }}>{projects[1].label}</p>
                <p style={{ fontSize: '20px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>{projects[1].title}</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{projects[1].shortDescription}</p>
              </div>
              <div style={{ flex: '0 0 55%', borderRadius: '12px', overflow: 'hidden', height: '320px' }} className="group-hover:opacity-90 transition-opacity">
                {projects[1].photos[0] ? (
                  <img src={projects[1].photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                )}
              </div>
            </div>

            {/* Row 3 — Nature Photography placeholder — image left, text right */}
            <div onClick={() => openProject(projects[2])} className="cursor-pointer group" style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
              <div style={{ flex: '0 0 55%', borderRadius: '12px', overflow: 'hidden', height: '320px' }} className="group-hover:opacity-90 transition-opacity">
                {projects[2].photos[0] ? (
                  <img src={projects[2].photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', fontFamily: "'Inter', sans-serif" }}>{projects[2].label}</p>
                <p style={{ fontSize: '20px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>{projects[2].title}</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{projects[2].shortDescription}</p>
              </div>
            </div>

            {/* Row 4 — Deadlines — text left, image right */}
            <div onClick={() => openProject(projects[3])} className="cursor-pointer group" style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', fontFamily: "'Inter', sans-serif" }}>{projects[3].label}</p>
                <p style={{ fontSize: '20px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>{projects[3].title}</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{projects[3].shortDescription}</p>
              </div>
              <div style={{ flex: '0 0 55%', borderRadius: '12px', overflow: 'hidden', height: '320px' }} className="group-hover:opacity-90 transition-opacity">
                {projects[3].photos[0] ? (
                  <img src={projects[3].photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                )}
              </div>
            </div>

          </div>
        </div>

        {selected && (
          <div
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{
              transform: visible ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
              padding: '96px 112px',
              background: '#141414',
            }}
          >
            <button onClick={closeProject} className="fixed top-6 left-6 text-white/40 hover:text-white transition-colors z-50">
              <ArrowLeft />
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{selected.title}</h1>
            <p className="text-base text-white/50 max-w-xl" style={{ marginTop: '24px', marginBottom: '64px' }}>{selected.shortDescription}</p>

            {selected.layout === 'column' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px', margin: '0 auto 64px' }}>
                {selected.photos.map((photo, i) => (
                  <div key={i} onClick={() => setEnlargedImage(selected.photos[i])} className="relative cursor-pointer rounded-xl overflow-hidden group">
                    {photo ? (
                      <img src={photo} alt="" style={{ width: '100%', display: 'block', borderRadius: '12px' }} />
                    ) : (
                      <div style={{ width: '100%', height: '300px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '64px' }}>
                {selected.photos.map((photo, i) => (
                  <div key={i} onClick={() => setGalleryIndex(i)} className="relative cursor-pointer rounded-xl overflow-hidden group" style={{ height: '300px' }}>
                    {photo ? (
                      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                    ) : (
                      <div className="w-full h-full bg-white/5 border border-white/10" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                      <span className="text-sm text-white/80">See more</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-base text-white/50 max-w-2xl" style={{ marginBottom: '64px' }}>{selected.longDescription}</p>
            <h3 className="text-xs font-medium tracking-widest text-white/30 uppercase" style={{ marginBottom: '32px' }}>Tools / equipment used</h3>
            <div className="flex flex-wrap gap-4">
              {selected.tools.map((tool, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ width: '120px', height: '80px' }}>
                  {tool === 'figma' && (
                    <svg width="32" height="48" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
                      <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
                      <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
                      <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#FF637E"/>
                      <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
                    </svg>
                  )}
                  {tool === 'pcon' && (
                    <img src={pconLogo} alt="pCon Planner" style={{ maxWidth: '80px', maxHeight: '40px', objectFit: 'contain' }} />
                  )}
                  {tool === 'd5' && (
                    <img src={d5Logo} alt="D5 Render" style={{ maxWidth: '80px', maxHeight: '40px', objectFit: 'contain' }} />
                  )}
                  {tool === 'canon' && (
                    <img src={canonLogo} alt="Canon EOS 5D Mark II" style={{ maxWidth: '110px', maxHeight: '70px', objectFit: 'contain' }} />
                  )}
                </div>
                {tool === 'canon' && (
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif" }}>Canon EOS 5D Mark II</p>
                )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {galleryIndex !== null && selected && (
        <Gallery photos={selected.photos} startIndex={galleryIndex} onClose={() => setGalleryIndex(null)} />
      )}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center cursor-zoom-out"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setEnlargedImage(null)}
        >
          <img src={enlargedImage} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px', objectFit: 'contain' }} />
        </div>
      )}
    </section>
  )
}