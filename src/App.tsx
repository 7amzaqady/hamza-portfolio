import About from './sections/About'
import Features from './sections/Features'
import Hero from './sections/Hero'

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black" style={{ color: '#E1E0CC' }}>
      <Hero />
      <About />
      <Features />
    </main>
  )
}
