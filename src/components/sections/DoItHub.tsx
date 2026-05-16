type Program = {
  id: string
  name: string
  caption: string
  color: string
}

const PROGRAMS: Program[] = [
  {
    id: 'ai-night',
    name: 'AI Night',
    caption: 'Tecnologia aberta · encontros mensais',
    color: 'var(--color-va-blue-electric)',
  },
  {
    id: 'ai-on-hands',
    name: 'AI On Hands',
    caption: 'Mão na massa · workshops práticos',
    color: 'var(--color-va-orange-vivid)',
  },
  {
    id: 'conselho',
    name: 'Conselho ICIA',
    caption: 'Exclusividade estratégica · C-level',
    color: 'var(--color-va-gold)',
  },
]

export default function DoItHub() {
  return (
    <section
      id="do-it-hub"
      aria-label="Do It Hub"
      className="bg-va-black text-white py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-3">
          09 · Do It Hub
        </p>
        <h2
          className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance max-w-3xl"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          Três frentes para quem prefere fazer a teoria virar prática.
        </h2>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROGRAMS.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-7 flex flex-col gap-2"
              style={{ boxShadow: `inset 0 1px 0 0 ${p.color}33` }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: p.color }}
              >
                {p.id.replace('-', ' ')}
              </span>
              <p
                className="font-display font-extrabold tracking-[-0.02em] leading-tight"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)', color: p.color }}
              >
                {p.name}
              </p>
              <p className="text-sm text-va-gray-200 leading-relaxed">
                {p.caption}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500">
          Conteúdo completo · Batch 2
        </p>
      </div>
    </section>
  )
}
