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
  { metodo: 'Sem IA', horas: 48, fill: 'rgba(255,255,255,0.18)' },
  { metodo: 'Com CNH', horas: 6, fill: 'var(--color-va-orange-vivid)' },
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
            05 · Contexto setorial
          </p>
          <h2
            id="graficos-gov-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            O quadro brasileiro,{' '}
            <span className="text-va-orange-vivid">em quatro recortes</span>.
          </h2>
          <p
            className="mt-6 text-va-gray-200 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Os números que sustentam por que o setor público precisa de CNH da
            IA antes de qualquer nova licença.
          </p>
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
                  Uso de IA sem método
                </p>
                <span className="font-mono text-[10px] text-va-gray-500">
                  Pesquisa setorial 2025
                </span>
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance mt-2"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
              >
                Dos servidores já usam IA generativa
                <span className="text-va-gray-500"> — sem política, sem trilha de auditoria.</span>
              </h3>
            </div>
            <div className="text-right -mr-2">
              <div
                className="font-display font-extrabold tracking-[-0.05em] leading-none"
                style={{
                  fontSize: 'clamp(96px, 14vw, 180px)',
                  color: ORANGE,
                }}
              >
                <CountUp to={73} suffix="%" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-va-gray-500 mt-3">
                · risco institucional não monitorado
              </p>
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
              Setor público brasileiro estaciona em 2.8/5
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
                  de 5 · referência setorial
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
                Triagem documental · horas de servidor
              </p>
              <span className="font-mono text-[10px] text-va-gray-500">
                VanguardIA · projetos 2024–2025
              </span>
            </div>
            <h3
              className="font-display font-extrabold tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
            >
              De 48h para 6h — com servidor habilitado
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
                Janela COP-30 · Belém
              </p>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance mt-3"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
              >
                2026: o Pará é o palco.
              </h3>
            </div>
            <p
              className="font-editorial italic text-va-gold leading-[1.2] mt-6"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}
            >
              O legado depende do que for entregue —
              não do que for anunciado.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500 mt-6">
              · novembro 2026
            </p>
          </motion.article>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500 text-center">
          Fontes: Pesquisa setorial 2025 · PwC ITDBr 2025 · VanguardIA 2024–2025
        </p>
      </div>
    </section>
  )
}
