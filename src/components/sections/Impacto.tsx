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

const GREEN = 'var(--color-va-teal)'
const ORANGE = 'var(--color-va-orange-vivid)'
const GRID = 'rgba(255,255,255,0.06)'
const AXIS = 'rgba(250,250,247,0.4)'

const perdaData = [
  { name: 'Sem integração', valor: 20, fill: 'var(--color-va-orange-vivid)' },
  { name: 'Com ICIA', valor: 4, fill: 'var(--color-va-teal)' },
]

const receitaData = [
  { name: 'Perda', value: 12 },
  { name: 'Receita retida', value: 88 },
]

const maturidadeData = [
  { ano: '2020', maturidade: 1.4 },
  { ano: '2021', maturidade: 1.8 },
  { ano: '2022', maturidade: 2.2 },
  { ano: '2023', maturidade: 2.7 },
  { ano: '2024', maturidade: 3.2 },
  { ano: '2025', maturidade: 3.8 },
  { ano: '2026', maturidade: 4.8, label: 'Grupo VanguardIA' },
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-orange-vivid mb-4 animate-pulse">
            05  ·  IMPACTO
          </p>
          <h2
            id="impacto-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Os números que a Nova Era exige.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Card 1: Bar chart */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: ORANGE }}
                >
                  Perda operacional por baixa integração
                </p>
                <span className="font-mono text-[10px] text-va-gray-500">
                  IDC 2024
                </span>
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
              >
                Incompatibilidade entre sistemas legados e fluxos manuais
              </h3>
            </div>
            <div className="flex-1 mt-6 -ml-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={perdaData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis
                    dataKey="name"
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
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <TooltipBox
                          label={String(label)}
                          value={payload[0].value as number}
                          unit="%"
                          color={payload[0].payload.fill}
                        />
                      ) : null
                    }
                  />
                  <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                    {perdaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
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
            className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: GREEN }}
                >
                  Receita perdida por dados ruins
                </p>
                <span className="font-mono text-[10px] text-va-gray-500">
                  MIT Sloan
                </span>
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
              >
                Inconsistência de relatórios e silos operacionais
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center mt-2 relative">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={receitaData}
                    innerRadius={54}
                    outerRadius={75}
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
                  style={{ fontSize: '48px', color: GREEN, lineHeight: 1 }}
                >
                  <CountUp to={12} suffix="%" />
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
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 min-h-[360px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: GREEN }}
                >
                  Maturidade digital · Norte do Brasil
                </p>
                <span className="font-mono text-[10px] text-va-gray-500">
                  Sebrae TIC 2025
                </span>
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
              >
                Aceleração da adoção de tecnologia na região amazônica
              </h3>
            </div>
            <div className="flex-1 mt-6 -ml-4">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart
                  data={maturidadeData}
                  margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
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
                    cursor={{ stroke: GREEN, strokeWidth: 1 }}
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div className="bg-va-black border border-white/15 rounded-md px-3 py-2 shadow-2xl">
                          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-va-gray-500 mb-1">
                            {label}
                          </p>
                          <p className="font-display text-sm font-bold text-va-teal">
                            Maturidade: {payload[0].value}
                            {payload[0].payload.label && ` (${payload[0].payload.label})`}
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="maturidade"
                    stroke={GREEN}
                    strokeWidth={3}
                    dot={{ fill: GREEN, r: 4, strokeWidth: 0 }}
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
                  style={{ color: ORANGE }}
                >
                  Fracasso de projetos de dados
                </p>
                <span className="font-mono text-[10px] text-va-gray-500">
                  Fivetran 2025
                </span>
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-balance text-va-gray-200"
                style={{ fontSize: 'clamp(18px, 1.8vw, 22px)' }}
              >
                das empresas tiveram fracasso na maioria dos projetos de dados em 2025
              </h3>
            </div>
            <div className="text-right -mr-2">
              <div
                className="font-display font-black tracking-[-0.03em] leading-[0.85]"
                style={{
                  fontSize: 'var(--text-display-xl)',
                  color: ORANGE,
                }}
              >
                <CountUp to={42} suffix="%" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="font-editorial italic text-va-gold text-base leading-snug">
                "Não é falta de IA. É falta de arquitetura."
              </p>
            </div>
          </motion.article>
        </div>

        {/* Sources */}
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-va-gray-500 text-center">
          Fontes: IDC 2024 · MIT Sloan · Sebrae TIC 2025 · Fivetran 2025
        </p>
      </div>
    </section>
  )
}
