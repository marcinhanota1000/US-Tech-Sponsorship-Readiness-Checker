import type { CandidateProfile, ScoreResult } from './types'

const points = {
  language: { basic: 0, intermediate: 10, advanced: 30 },
  experience: { junior: 0, mid: 20, senior: 40 },
  demand: { standard: 5, 'high-demand': 20 },
  education: { courses: 5, bachelors: 15, postgraduate: 30 },
  international: { false: 0, true: 20 },
} as const

export function calculateScore(profile: CandidateProfile): ScoreResult {
  const breakdown = [
    { label: 'English & communication', points: points.language[profile.language], maximum: 30 },
    { label: 'Experience', points: points.experience[profile.experience], maximum: 40 },
    { label: 'High-demand specialization', points: points.demand[profile.demand], maximum: 20 },
    { label: 'Education', points: points.education[profile.education], maximum: 30 },
    { label: 'International background', points: points.international[String(profile.international) as 'true' | 'false'], maximum: 20 },
  ]
  const score = Math.min(100, breakdown.reduce((total, item) => total + item.points, 0))

  if (score <= 45) {
    return {
      score,
      probability: 'Menos de 20%',
      status: 'Perfil inicial',
      summary: 'Você tem uma base para começar, mas ainda há pontos importantes para fortalecer antes de buscar sponsorship internacional.',
      nextSteps: ['Invista no inglês falado e na comunicação profissional.', 'Construa mais experiência prática e resultados mensuráveis.', 'Escolha uma especialidade de tecnologia com demanda internacional.'],
      breakdown,
    }
  }
  if (score <= 75) {
    return {
      score,
      probability: '50% a 70%',
      status: 'Competitivo',
      summary: 'Seu perfil já apresenta sinais de competitividade para o mercado internacional. Agora, posicionamento e estratégia fazem diferença.',
      nextSteps: ['Otimize seu LinkedIn e currículo para vagas internacionais.', 'Pesquise oportunidades na Europa, Canadá e Estados Unidos.', 'Evidencie projetos, impacto e experiência em ambientes globais.'],
      breakdown,
    }
  }
  return {
    score,
    probability: 'Mais de 90%',
    status: 'Pronto para o mercado',
    summary: 'Seu perfil reúne vários sinais valorizados por empresas internacionais. O próximo passo é buscar as oportunidades certas.',
    nextSteps: ['Aplique para posições que mencionem sponsorship explicitamente.', 'Conecte-se com recrutadores especializados em tecnologia.', 'Prepare uma narrativa clara sobre seu impacto e diferenciais.'],
    breakdown,
  }
}
