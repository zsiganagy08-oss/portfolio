import { useState } from 'react'

export default function Impressum() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'none', border: 'none',
          color: 'rgba(255,255,255,0.2)', fontSize: '11px',
          letterSpacing: '1px', cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Impressum
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1a1a1a', borderRadius: '12px',
              padding: '48px', maxWidth: '480px', width: '90%',
              color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif",
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '24px' }}>Impressum</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
              Zsigmond Nagy<br />
              Zollikofen, Bern<br />
              Switzerland<br /><br />
              E-Mail: <a href="mailto:zsiganagy08@gmail.com" style={{ color: 'rgba(255,255,255,0.6)' }}>zsiganagy08@gmail.com</a><br /><br />
              This website contains no advertising and collects no personal data beyond what is voluntarily submitted via the contact form.
            </p>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: '32px', background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px', padding: '8px 20px',
                color: 'rgba(255,255,255,0.5)', fontSize: '12px',
                cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}