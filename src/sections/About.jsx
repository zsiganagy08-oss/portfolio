import { ArrowRight } from '../components/Arrow'

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col justify-center"
      style={{ padding: '96px 220px', paddingTop: '140px', background: '#F8F8F8', color: '#000000', minHeight: '60vh' }}
    >
      <h2 style={{ fontSize: '22px', fontWeight: 500, color: 'rgba(0,0,0,0.4)', marginBottom: '48px', fontFamily: "'Inter', sans-serif" }}>About</h2>
      <p className="text-lg font-medium leading-relaxed max-w-3xl" style={{ color: '#111' }}>
        Designer. Builder. Photographer. Based in Bern — I work across interfaces, spaces, and visual systems.
      </p>
      <p className="text-lg font-medium leading-relaxed max-w-3xl" style={{ marginTop: '4px', color: '#111' }}>
        Owner of "Deadlines."
      </p>
      <a href="#contact" className="text-sm flex items-center gap-2" style={{ marginTop: '64px', color: 'rgba(0,0,0,0.4)' }}>
        Contact
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </a>
    </section>
  )
}