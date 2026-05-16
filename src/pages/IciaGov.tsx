// TODO Batch 2 — placeholder so App.tsx builds.
import NavBar from '../components/sections/NavBar'
import ScrollProgress from '../components/ui/ScrollProgress'

export default function IciaGov() {
  return (
    <>
      <ScrollProgress />
      <NavBar />
      <main id="main-content" className="pt-24">
        <section className="bg-va-black text-white py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-orange-vivid mb-4">
              ICIA · GOV · Em construção
            </p>
            <h1
              className="font-display font-extrabold tracking-[-0.025em] text-balance"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              Página /icia-gov — entrega Batch 2.
            </h1>
          </div>
        </section>
      </main>
    </>
  )
}
