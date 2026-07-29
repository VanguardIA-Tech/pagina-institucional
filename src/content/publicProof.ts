export type Metric = {
  id: string
  value: number
  display: string
  label: string
  context: string
}

export type CaseOutcome = {
  id: string
  organization: string
  label: string
  before: number
  after: number
  beforeDisplay: string
  afterDisplay: string
  direction: 'reduction' | 'growth'
}

export type CaseStudy = {
  id: string
  organization: string
  sector: string
  metric: string
  metricLabel: string
  summary: string
  logoSlug: string
  mediaBase: string
}

export type ClientProof = {
  name: string
  slug: string
  sector: string
}

export type PortalPreview = {
  id: string
  name: string
  base: string
  width: number
  height: number
  depth: number
  priority: boolean
  formats: Array<'avif' | 'webp' | 'png'>
}

export type FeatureImage = {
  id: string
  base: string
  fallback: string
  width: number
  height: number
  formats: Array<'avif' | 'webp' | 'jpg'>
}

export type MediaManifest = {
  portalPreviews: PortalPreview[]
  featureImages: FeatureImage[]
}

export type Testimonial = {
  id: string
  organization: string
  videoUrl: string
  captionSrc: string
  posterBase: string
  featured: boolean
}

export type PublicProof = {
  asOf: string
  metrics: Metric[]
  outcomes: CaseOutcome[]
  cases: CaseStudy[]
  mediaManifest: MediaManifest
  clients: ClientProof[]
  testimonials: Testimonial[]
}

function isPublicProof(value: unknown): value is PublicProof {
  if (!value || typeof value !== 'object') return false
  const proof = value as Partial<PublicProof>

  return (
    typeof proof.asOf === 'string' &&
    Array.isArray(proof.metrics) &&
    Array.isArray(proof.outcomes) &&
    Array.isArray(proof.cases) &&
    Boolean(proof.mediaManifest) &&
    Array.isArray(proof.mediaManifest?.portalPreviews) &&
    Array.isArray(proof.mediaManifest?.featureImages) &&
    Array.isArray(proof.clients) &&
    Array.isArray(proof.testimonials)
  )
}

if (!isPublicProof(__PUBLIC_PROOF__)) {
  throw new Error('A base pública da VanguardIA está inválida.')
}

export const publicProof: PublicProof = __PUBLIC_PROOF__

export const proofReferenceLabel = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${publicProof.asOf}T12:00:00Z`))
