import type { CSSProperties } from 'react'
import {
  proofReferenceLabel,
  type CaseOutcome,
  type CaseStudy,
  type ClientProof,
  type FeatureImage,
  type Metric,
  type PortalPreview,
} from '../../content/publicProof'
import { whatsappLink } from '../../lib/whatsapp'
import PortalMosaic from './PortalMosaic'
import ResponsivePicture from './ResponsivePicture'
import VoiceDemo from './VoiceDemo'

export function PortfolioHero({
  metrics,
  portals,
}: {
  metrics: Metric[]
  portals: PortalPreview[]
}) {
  return (
    <section id="inicio" className="portfolio-hero" aria-labelledby="portfolio-title">
      <div className="portfolio-section-frame portfolio-hero-frame">
        <h1 id="portfolio-title">
          <span>Pessoas. Processos.</span>
          <span>
            Tecnologia. <em>Em produção.</em>
          </span>
        </h1>

        <div className="portfolio-hero-artifact">
          <PortalMosaic portals={portals} />
          <div className="portfolio-hero-note">
            <p>
              Arquitetura viva para transformar cultura, operação e dados em
              eficiência real.
            </p>
            <a href="#resultados">
              Ver resultados <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        <dl className="portfolio-proof-rail" aria-label="Track record da VanguardIA">
          {metrics.map((metric) => (
            <div key={metric.id}>
              <dt>{metric.label}</dt>
              <dd>{metric.display}</dd>
              <p>{metric.context}</p>
            </div>
          ))}
        </dl>
        <p className="portfolio-proof-reference">
          Referência pública: {proofReferenceLabel}
        </p>
      </div>
    </section>
  )
}

export function ProductSystem({
  certifiedPeople,
  trainingImage,
  technologyPortal,
}: {
  certifiedPeople: Metric
  trainingImage: FeatureImage
  technologyPortal: PortalPreview
}) {
  return (
    <section id="produto" className="portfolio-product" aria-labelledby="product-title">
      <div className="portfolio-section-frame">
        <header className="product-opening">
          <h2 id="product-title">
            Não são módulos soltos. É uma arquitetura que chega inteira à operação.
          </h2>
        </header>

        <article className="product-people">
          <div className="product-word" aria-hidden="true">
            Pessoas
          </div>
          <div className="product-people-copy">
            <p>
              Antes da automação, a CNH da IA cria linguagem comum, critério e
              responsabilidade para quem vai operar a tecnologia.
            </p>
            <strong>{certifiedPeople.display} profissionais certificados</strong>
          </div>
          <ResponsivePicture
            base={trainingImage.base}
            fallbackSrc={trainingImage.fallback}
            alt="Turma da CNH da IA em formação presencial"
            width={trainingImage.width}
            height={trainingImage.height}
            className="product-people-image"
          />
        </article>

        <article className="product-process">
          <div className="product-word" aria-hidden="true">
            Processos
          </div>
          <div className="process-copy">
            <p>
              A operação sai do campo da opinião, ganha diagnóstico e recebe uma
              ordem clara para evoluir.
            </p>
          </div>
          <ol className="process-flow" aria-label="Fluxo de inteligência de processos">
            <li>
              <strong>DEEP</strong>
              <span>Diagnostica a execução real</span>
            </li>
            <li>
              <strong>PEI</strong>
              <span>Prioriza o que merece tecnologia</span>
            </li>
            <li>
              <strong>ICIA Process</strong>
              <span>Transforma conhecimento em ativo vivo</span>
            </li>
          </ol>
        </article>

        <article className="product-technology">
          <div className="technology-copy">
            <div className="product-word" aria-hidden="true">
              Tecnologia
            </div>
            <h3>O ICIA 360 opera. O ICIA OS orquestra.</h3>
            <p>
              Portais, dados, agentes e governança passam a conversar numa camada
              fabricada para as regras reais de cada empresa.
            </p>
          </div>
          <div className="technology-portal">
            <ResponsivePicture
              base={technologyPortal.base}
              alt="Portal ICIA 360 da Nativa Uniformes"
              width={technologyPortal.width}
              height={technologyPortal.height}
            />
          </div>
          <VoiceDemo />
        </article>
      </div>
    </section>
  )
}

function OutcomeRow({ outcome }: { outcome: CaseOutcome }) {
  const max = Math.max(outcome.before, outcome.after)
  const beforeSize = Math.max(6, (outcome.before / max) * 100)
  const afterSize = Math.max(6, (outcome.after / max) * 100)
  const style = {
    '--before-size': `${beforeSize}%`,
    '--after-size': `${afterSize}%`,
  } as CSSProperties

  return (
    <article className="outcome-row" style={style}>
      <header>
        <h3>{outcome.organization}</h3>
        <p>{outcome.label}</p>
      </header>
      <div className="outcome-values" aria-label={`${outcome.beforeDisplay} para ${outcome.afterDisplay}`}>
        <span>{outcome.beforeDisplay}</span>
        <strong>{outcome.afterDisplay}</strong>
      </div>
      <div className="outcome-bars" aria-hidden="true">
        <span className="outcome-bar-before" />
        <span
          className={`outcome-bar-after ${outcome.direction === 'growth' ? 'is-growth' : ''}`}
        />
      </div>
    </article>
  )
}

export function Outcomes({ outcomes }: { outcomes: CaseOutcome[] }) {
  return (
    <section id="resultados" className="portfolio-outcomes" aria-labelledby="outcomes-title">
      <div className="portfolio-section-frame">
        <header className="outcomes-opening">
          <h2 id="outcomes-title">Tempo devolvido à operação.</h2>
          <p>
            Casos públicos, medidos antes e depois da arquitetura aplicada. São
            exemplos, não promessas universais.
          </p>
        </header>
        <div className="outcome-list">
          {outcomes.map((outcome) => (
            <OutcomeRow key={outcome.id} outcome={outcome} />
          ))}
        </div>
        <p className="outcome-source">
          Fonte: cases públicos VanguardIA, revisão de {proofReferenceLabel}.
        </p>
      </div>
    </section>
  )
}

function CaseMedia({ item, doItImage }: { item: CaseStudy; doItImage: FeatureImage }) {
  if (item.id === 'do-it-hub') {
    return (
      <ResponsivePicture
        base={doItImage.base}
        fallbackSrc={doItImage.fallback}
        alt="Espaço do Do It Hub em Belém"
        width={doItImage.width}
        height={doItImage.height}
        className="case-media"
      />
    )
  }

  return (
    <ResponsivePicture
      base={item.mediaBase}
      alt={`Portal ICIA 360 de ${item.organization}`}
      width={600}
      height={375}
      className="case-media"
    />
  )
}

export function CaseStudies({
  cases,
  doItImage,
}: {
  cases: CaseStudy[]
  doItImage: FeatureImage
}) {
  return (
    <section id="cases" className="portfolio-cases" aria-labelledby="cases-title">
      <div className="portfolio-section-frame">
        <header className="cases-opening">
          <h2 id="cases-title">Três operações. Três decisões de continuar.</h2>
        </header>
        <div className="case-list">
          {cases.map((item, index) => (
            <article className="case-story" key={item.id} data-order={index + 1}>
              <div className="case-identity">
                <img
                  src={`/logos/${item.logoSlug}.${item.id === 'do-it-hub' ? 'jpg' : 'png'}`}
                  alt=""
                  width={180}
                  height={80}
                  loading="lazy"
                  decoding="async"
                />
                <p>{item.sector}</p>
              </div>
              <div className="case-copy">
                <h3>{item.organization}</h3>
                <p>{item.summary}</p>
              </div>
              <div className="case-metric">
                <strong>{item.metric}</strong>
                <span>{item.metricLabel}</span>
              </div>
              <CaseMedia item={item} doItImage={doItImage} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ClientPortfolio({
  clients,
  activeAccounts,
}: {
  clients: ClientProof[]
  activeAccounts: Metric
}) {
  const sectors = Array.from(new Set(clients.map((client) => client.sector)))

  return (
    <section id="clientes" className="portfolio-clients" aria-labelledby="clients-title">
      <div className="portfolio-section-frame">
        <header className="clients-opening">
          <div>
            <strong>{activeAccounts.display}</strong>
            <span>{activeAccounts.label}</span>
          </div>
          <h2 id="clients-title">A mesma arquitetura, em operações muito diferentes.</h2>
        </header>

        <div className="client-sectors">
          {sectors.map((sector) => {
            const sectorClients = clients.filter((client) => client.sector === sector)
            const sectorId = `sector-${sector
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')}`
            return (
              <section key={sector} className="client-sector" aria-labelledby={sectorId}>
                <h3 id={sectorId}>{sector}</h3>
                <ul>
                  {sectorClients.map((client) => (
                    <li key={client.slug}>
                      <img
                        src={`/logos/${client.slug}.png`}
                        alt={client.name}
                        width={180}
                        height={80}
                        loading="lazy"
                        decoding="async"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function DoItHubClose({
  outcome,
  image,
}: {
  outcome: CaseOutcome
  image: FeatureImage
}) {
  const contactUrl = whatsappLink('Quero falar com a VanguardIA')

  return (
    <section id="do-it-hub" className="portfolio-close" aria-labelledby="close-title">
      <div className="portfolio-close-image" aria-hidden="true">
        <ResponsivePicture
          base={image.base}
          fallbackSrc={image.fallback}
          alt=""
          width={image.width}
          height={image.height}
        />
      </div>
      <div className="portfolio-section-frame portfolio-close-content">
        <p className="portfolio-close-place">Belém, Amazônia</p>
        <h2 id="close-title">A inteligência entra na empresa. A comunidade mantém o movimento.</h2>
        <p>
          O Do It Hub é a primeira Escola de Inteligência Aplicada da Amazônia e o
          espaço físico onde formação, prática e novos negócios se encontram.
        </p>
        <div className="portfolio-close-proof">
          <strong>{outcome.afterDisplay}</strong>
          <span>{outcome.label.toLocaleLowerCase('pt-BR')} após o reposicionamento</span>
        </div>
        <a href={contactUrl} target="_blank" rel="noopener noreferrer">
          Falar com a VanguardIA <span aria-hidden="true">↗</span>
        </a>
      </div>

      <footer className="portfolio-footer">
        <div className="portfolio-section-frame">
          <img src="/logos/vanguardia-horizontal.png" alt="VanguardIA" width={180} height={42} />
          <p>Pessoas. Processos. Tecnologia.</p>
          <nav aria-label="Redes sociais">
            <a href="https://www.linkedin.com/company/grupo-vanguardia" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/grupovanguard.ia" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </nav>
          <small>© {new Date().getFullYear()} Grupo VanguardIA</small>
        </div>
      </footer>
    </section>
  )
}
