export default function Nav({ hidden }) {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-500"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'all', padding: '24px 32px' }}
    >
      
      <ul className="flex gap-10 text-sm text-white/60" style={{ listStyle: 'none', marginLeft: 'auto' }}>
        <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
        <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
        <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
        <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
      </ul>
    </nav>
  )
}