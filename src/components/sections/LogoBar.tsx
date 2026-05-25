type Client = { name: string; slug: string }

const CLIENTS: Client[] = [
  { name: 'BBB', slug: 'bbb' },
  { name: 'Paraferro', slug: 'paraferro' },
  { name: 'Grupo Mega', slug: 'grupo-mega' },
  { name: 'Grupo Lotus', slug: 'grupo-lotus' },
  { name: 'CF Distribuidora', slug: 'cf-distribuidora' },
  { name: 'MedNutri', slug: 'mednutri' },
  { name: 'Silveira Athias', slug: 'silveira-athias' },
  { name: 'Alves Martins', slug: 'alves-martins' },
  { name: 'Montalvão Neves', slug: 'montalvao-neves' },
  { name: 'Nativa Uniformes', slug: 'nativa-uniformes' },
  { name: 'Facilita Serviços', slug: 'facilita' },
  { name: 'Fibra', slug: 'fibra' },
  { name: 'Mave', slug: 'mave' },
  { name: 'IT Protect', slug: 'it-protect' },
  { name: 'Silnave', slug: 'silnave' },
  { name: 'Supermercado Econômico', slug: 'supermercado-economico' },
  { name: 'Nevoni', slug: 'nevoni' },
  { name: 'Prime Equipaments', slug: 'prime-equipaments' },
  { name: 'Toca Hub', slug: 'toca-hub' },
  { name: 'Cabotia', slug: 'cabotia' },
  { name: 'Dal Ferragens', slug: 'dal-ferragens' },
  { name: 'Unineuro', slug: 'unineuro' },
]

function LogoChip({ client }: { client: Client }) {
  return (
    <div
      className="flex items-center gap-3 shrink-0 px-10 py-4 border-r border-va-gray-200/40"
      title={client.name}
    >
      <img
        src={`/logos/${client.slug}.png`}
        alt={client.name}
        loading="lazy"
        width={160}
        height={48}
        className="h-10 sm:h-12 w-auto max-w-[180px] object-contain"
      />
    </div>
  )
}

export default function LogoBar() {
  const list = [...CLIENTS, ...CLIENTS]

  return (
    <section
      aria-label="Clientes que operam com a VanguardIA"
      className="relative bg-va-cream border-y border-va-gray-200/60"
      style={{ minHeight: 140 }}
    >
      <div className="flex items-stretch h-[140px]">
        {/* Vertical label */}
        <div className="shrink-0 flex items-center justify-center px-5 sm:px-8 border-r border-va-gray-200/60 bg-va-cream">
          <span
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-va-gray-700 font-medium"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            Operam Conosco
          </span>
        </div>

        {/* Ticker */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}
        >
          <div className="flex items-center h-full animate-ticker w-max">
            {list.map((client, i) => (
              <LogoChip key={`${client.slug}-${i}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
