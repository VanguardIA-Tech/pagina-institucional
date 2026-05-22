import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import CountUp from '../ui/CountUp'

const ORANGE = 'var(--color-va-orange-vivid)'
const GREEN = 'var(--color-va-green-vivid)'
const GOLD = 'var(--color-va-gold)'
const GRID = 'rgba(255,255,255,0.06)'
const AXIS = 'rgba(250,250,247,0.4)'

const maturidadeData = [
  { name: 'Maturidade atingida', value: 2.8 },
  { name: 'Lacuna', value: 2.2 },
]

const triagemData = [
  { metodo: 'Sem IA aplicada', horas: 48, fill: 'rgba(255,255,255,0.18)' },
  { metodo: 'Com servidores CNH-habilitados', horas: 6, fill: 'var(--color-va-orange-vivid)' },
]

export default function GraficosContexto() {
  return (
    <section
      id="graficos-gov"
      aria-labelledby="graficos-gov-headline"
      className="bg-va-black text-white py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-4">
            05 · O CONTEXTO
          </p>
          <h2
            id="graficos-gov-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            O Brasil está a uma geração de servidores de virar referência.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Card 1 — Big number 73% */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col justify-between overflow-hidden relative"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,107,26,0.10) 0%, rgba(255,107,26,0.03) 100%)',
            }}
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: ORANGE }}
                >
                  DADOS DO SETOR
                </p>
                <span className="font-mono text-[10px] text-va-gray-500">
                  Pesquisa setorial · 2025
                </span>
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance mt-3 text-white"
                style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: '1.4' }}
              >
                dos servidores públicos brasileiros declaram já usar IA generativa no trabalho — a maioria sem política institucional, sem treinamento e sem padrão.
              </h3>
              <p className="font-editorial italic text-va-gold text-sm mt-3">
                "O risco é não capacitar. Não é capacitar."
              </p>
            </div>
            <div className="text-right -mr-2">
              <div
                className="font-display font-extrabold tracking-[-0.05em] leading-none"
                style={{
                  fontSize: 'clamp(96px, 12vw, 150px)',
                  color: ORANGE,
                }}
              >
                <CountUp to={73} suffix="%" />
              </div>
            </div>
          </motion.article>

          {/* Card 2 — Donut maturidade */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col"
          >
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: GREEN }}
              >
                Maturidade digital · escala 0–5
              </p>
              <span className="font-mono text-[10px] text-va-gray-500">
                PwC ITDBr 2025
              </span>
            </div>
            <h3
              className="font-display font-extrabold tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
            >
              Maturidade digital do setor público brasileiro
            </h3>
            <div className="flex-1 flex items-center justify-center mt-2 relative">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={maturidadeData}
                    innerRadius={64}
                    outerRadius={92}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    <Cell fill={GREEN} />
                    <Cell fill="rgba(255,255,255,0.08)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span
                  className="font-display font-extrabold tracking-[-0.03em]"
                  style={{ fontSize: '52px', color: GREEN, lineHeight: 1 }}
                >
                  2.8
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500 mt-2">
                  de 5 · Privado: 3.6/5
                </span>
              </div>
            </div>
          </motion.article>

          {/* Card 3 — Bar chart 48h → 6h */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col"
          >
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: ORANGE }}
              >
                Tempo médio de triagem documental
              </p>
              <span className="font-mono text-[10px] text-va-gray-500">
                Estudo VanguardIA · 2025
              </span>
            </div>
            <h3
              className="font-display font-extrabold tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
            >
              De 48h para 6h — com servidores CNH-habilitados
            </h3>
            <div className="flex-1 mt-6 -ml-4">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={triagemData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis
                    dataKey="metodo"
                    stroke={AXIS}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke={AXIS}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    unit="h"
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,107,26,0.08)' }}
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div className="bg-va-black border border-white/15 rounded-md px-3 py-2 shadow-2xl">
                          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-va-gray-500 mb-1">
                            {String(label)}
                          </p>
                          <p
                            className="font-display font-bold text-sm"
                            style={{ color: ORANGE }}
                          >
                            {payload[0].value as number}h
                            <span className="text-va-gray-200 ml-1">
                              por lote
                            </span>
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="horas" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          {/* Card 4 — Editorial COP-30 */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col justify-between overflow-hidden relative"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,86,63,0.25) 0%, rgba(201,166,107,0.10) 100%)',
            }}
          >
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: GOLD }}
              >
                Legado COP-30 · Belém
              </p>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance mt-3 text-white"
                style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: '1.4' }}
              >
                O Pará é o palco da COP-30. Modernizar a administração pública com IA aplicada agora é parte do legado.
              </h3>
            </div>
            <div className="my-4">
              <p className="font-editorial italic text-va-gold text-sm">
                "A vitrine internacional já está marcada. O legado depende do que for entregue até lá."
              </p>
            </div>
            <div className="flex justify-between items-baseline mt-auto">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500">
                · novembro 2026
              </p>
              <div
                className="font-display font-extrabold tracking-[-0.05em] leading-none"
                style={{
                  fontSize: 'clamp(64px, 8vw, 96px)',
                  color: GREEN,
                }}
              >
                2026
              </div>
            </div>
          </motion.article>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500 text-center">
          Fontes: Pesquisa setorial · 2025 · PwC ITDBr 2025 · Estudo VanguardIA · 2025
        </p>
      </div>
    </section>
  )
}
