const CLIENTS = [
  'Vale',
  'Hydro',
  'Equatorial',
  'Banpará',
  'Albras',
  'Imerys',
  'Sebrae PA',
  'ACP',
  'Conjove',
  'Sindarpa',
  'OAB-PA',
  'Sindilojas-GO',
  'TJPA',
  'TJGO',
  'MPPA',
  'Prefeitura de Belém',
  'Governo do Pará',
  'Governo de Goiás',
  'UFPA',
  'UEPA',
  'IFPA',
  'Senac',
  'Senai',
  'Fiepa',
  'CDL Belém',
  'Atem',
  'In Natura',
]

function LogoChip({ name }: { name: string }) {
  return (
    <div className="group flex items-center gap-3 shrink-0 px-8 py-3 border-r border-va-gray-200/40">
      <div className="w-8 h-8 rounded-md bg-va-gray-200 group-hover:bg-va-blue-electric/15 flex items-center justify-center transition-colors">
        <span className="font-display text-xs font-extrabold text-va-gray-700 group-hover:text-va-blue-electric transition-colors">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <span className="font-mono text-[13px] tracking-tight text-va-gray-700 group-hover:text-va-black transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export default function LogoBar() {
  const list = [...CLIENTS, ...CLIENTS]

  return (
    <section
      aria-label="Clientes e parceiros"
      className="relative bg-va-cream border-y border-va-gray-200/60"
      style={{ minHeight: 120 }}
    >
      <div className="flex items-stretch h-[120px]">
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
            {list.map((name, i) => (
              <LogoChip key={`${name}-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
