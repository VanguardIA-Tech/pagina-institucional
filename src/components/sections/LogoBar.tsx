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
      className="flex items-center justify-center shrink-0 px-10 lg:px-12"
      title={client.name}
    >
      <img
        src={`/logos/${client.slug}.png`}
        alt={client.name}
        loading="lazy"
        width={160}
        height={48}
        className="h-10 lg:h-11 w-auto max-w-[180px] object-contain opacity-80 hover:opacity-100 transition-opacity"
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
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-7 lg:pt-9">
        <div className="flex items-baseline justify-between gap-6 mb-5 lg:mb-6">
          <p className="font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.22em] text-va-gray-700 font-medium">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-va-gray-500 align-middle mr-3" />
            Operam com a VanguardIA
          </p>
          <p className="font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.22em] text-va-gray-500">
            +600 empresas
          </p>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="relative overflow-hidden pb-7 lg:pb-9"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div className="flex items-center animate-ticker w-max">
          {list.map((client, i) => (
            <LogoChip key={`${client.slug}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  )
}
