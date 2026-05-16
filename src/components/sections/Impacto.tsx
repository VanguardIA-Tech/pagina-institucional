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
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import CountUp from '../ui/CountUp'

const TEAL = 'var(--color-va-teal)'
const BURNT = 'var(--color-va-orange-deep)'
const GRID = 'rgba(255,255,255,0.06)'
const AXIS = 'rgba(250,250,247,0.4)'

const perdaData = [
  { area: 'Atendimento', valor: 38 },
  { area: 'Backoffice', valor: 27 },
  { area: 'Comercial', valor: 22 },
  { area: 'Jurídico', valor: 18 },
  { area: 'Operações', valor: 31 },
]

const receitaData = [
  { name: 'Perda anual', value: 12 },
  { name: 'Receita retida', value: 88 },
]

const maturidadeData = [
  { ano: '2020', norte: 1.4, brasil: 2.1 },
  { ano: '2021', norte: 1.6, brasil: 2.3 },
  { ano: '2022', norte: 1.9, brasil: 2.5 },
  { ano: '2023', norte: 2.2, brasil: 2.7 },
  { ano: '2024', norte: 2.6, brasil: 2.9 },
  { ano: '2025', norte: 2.9, brasil: 3.1 },
]

function TooltipBox({
  label,
  value,
  unit,
  color,
}: {
  label?: string
  value?: string | number
  unit?: string
  color?: string
}) {
  return (
    <div className="bg-va-black border border-white/15 rounded-md px-3 py-2 shadow-2xl">
      {label && (
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-va-gray-500 mb-1">
          {label}
        </p>
      )}
      <p className="font-display font-bold text-sm" style={{ color }}>
        {value}
        {unit && <span className="text-va-gray-200 ml-1">{unit}</span>}
      </p>
    </div>
  )
}

export default function Impacto() {
  return (
    <section
      id="impacto"
      aria-labelledby="impacto-headline"
      className="bg-va-black text-white py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-4">
            05 · Impacto mensurável
          </p>
          <h2
            id="impacto-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            O custo de não fazer IA{' '}
            <span className="text-va-orange-vivid">com método</span>.
          </h2>
          <p
            className="mt-6 text-va-gray-200 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Quatro recortes que sustentam a tese ICIA — todos com fonte
            pública e ano da medição.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Card 1: Bar chart */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col"
          >
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: BURNT }}
              >
                Perda operacional · % do tempo útil
              </p>
              <span className="font-mono text-[10px] text-va-gray-500">
                IDC 2024
              </span>
            </div>
            <h3
              className="font-display font-extrabold tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
            >
              Onde a empresa brasileira queima hora sem IA aplicada
            </h3>
            <div className="flex-1 mt-6 -ml-4">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={perdaData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis
                    dataKey="area"
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
                    unit="%"
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(184,74,0,0.1)' }}
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <TooltipBox
                          label={String(label)}
                          value={payload[0].value as number}
                          unit="% do tempo útil"
                          color={BURNT}
                        />
                      ) : null
                    }
                  />
                  <Bar dataKey="valor" fill={BURNT} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          {/* Card 2: Donut */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col"
          >
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: BURNT }}
              >
                Receita anual perdida
              </p>
              <span className="font-mono text-[10px] text-va-gray-500">
                MIT Sloan 2024
              </span>
            </div>
            <h3
              className="font-display font-extrabold tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
            >
              12% da receita evapora em decisões mal informadas
            </h3>
            <div className="flex-1 flex items-center justify-center mt-2 relative">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={receitaData}
                    innerRadius={64}
                    outerRadius={92}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    <Cell fill={BURNT} />
                    <Cell fill="rgba(255,255,255,0.08)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span
                  className="font-display font-extrabold tracking-[-0.03em]"
                  style={{ fontSize: '52px', color: BURNT, lineHeight: 1 }}
                >
                  <CountUp to={12} suffix="%" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500 mt-2">
                  da receita
                </span>
              </div>
            </div>
          </motion.article>

          {/* Card 3: Line chart */}
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
                style={{ color: TEAL }}
              >
                Maturidade digital · escala 0–5
              </p>
              <span className="font-mono text-[10px] text-va-gray-500">
                SEBRAE TIC 2025
              </span>
            </div>
            <h3
              className="font-display font-extrabold tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
            >
              Norte do Brasil amadurece — e ainda corre atrás
            </h3>
            <div className="flex-1 mt-6 -ml-4">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={maturidadeData}
                  margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis
                    dataKey="ano"
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
                    domain={[0, 5]}
                  />
                  <Tooltip
                    cursor={{ stroke: TEAL, strokeWidth: 1 }}
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div className="bg-va-black border border-white/15 rounded-md px-3 py-2 shadow-2xl">
                          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-va-gray-500 mb-1">
                            {label}
                          </p>
                          {payload.map((p) => (
                            <p
                              key={p.dataKey as string}
                              className="font-display text-sm font-bold"
                              style={{ color: p.color as string }}
                            >
                              {p.dataKey === 'norte' ? 'Norte' : 'Brasil'}:{' '}
                              {p.value}
                            </p>
                          ))}
                        </div>
                      ) : null
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="brasil"
                    stroke="rgba(250,250,247,0.5)"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="4 4"
                  />
                  <Line
                    type="monotone"
                    dataKey="norte"
                    stroke={TEAL}
                    strokeWidth={3}
                    dot={{ fill: TEAL, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          {/* Card 4: Big number */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col justify-between overflow-hidden relative"
            style={{
              background:
                'linear-gradient(135deg, rgba(184,74,0,0.1) 0%, rgba(184,74,0,0.04) 100%)',
            }}
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: BURNT }}
                >
                  Projetos sem ROI
                </p>
                <span className="font-mono text-[10px] text-va-gray-500">
                  Fivetran 2025
                </span>
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
              >
                Das iniciativas de IA não atingem KPI de negócio
              </h3>
            </div>
            <div className="text-right -mr-2">
              <div
                className="font-editorial italic font-bold tracking-[-0.03em] leading-[0.85]"
                style={{
                  fontSize: 'var(--text-display-xl)',
                  color: BURNT,
                }}
              >
                <CountUp to={42} suffix="%" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-va-gray-500 mt-3">
                · sem método, sem retorno
              </p>
            </div>
          </motion.article>
        </div>

        {/* Sources */}
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500 text-center">
          Fontes: IDC 2024 · MIT Sloan 2024 · SEBRAE TIC 2025 · Fivetran 2025
        </p>
      </div>
    </section>
  )
}
