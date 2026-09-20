import { useEffect, useMemo, useState } from 'react'
import { calculateScore } from './scoring/calculateScore'
import { emptyProfile } from './scoring/defaults'
import type { CandidateProfile } from './scoring/types'

type QuestionKey = keyof CandidateProfile
type Question = {
  key: QuestionKey
  title: string
  hint: string
  options: ReadonlyArray<readonly [string, string, string]>
}

const questions: Question[] = [
  {
    key: 'language',
    title: 'Como você avalia seu inglês para o ambiente de trabalho?',
    hint: 'Comunicação é parte essencial do processo internacional.',
    options: [
      ['basic', 'Básico', 'Leio e escrevo, mas ainda não converso com segurança'],
      ['intermediate', 'Intermediário', 'Consigo participar de reuniões e explicar meu trabalho'],
      ['advanced', 'Avançado', 'Tenho fluência para colaborar e liderar em inglês'],
    ],
  },
  {
    key: 'experience',
    title: 'Quantos anos de experiência prática você tem em tecnologia?',
    hint: 'Considere experiência profissional, freelance e projetos consistentes.',
    options: [
      ['junior', 'Menos de 2 anos', 'Em início de carreira'],
      ['mid', 'De 2 a 5 anos', 'Experiência plena e resultados comprovados'],
      ['senior', 'Mais de 5 anos', 'Senioridade, autonomia e liderança'],
    ],
  },
  {
    key: 'demand',
    title: 'Sua stack envolve tecnologias de alta demanda ou liderança?',
    hint: 'Especialização clara ajuda recrutadores a entenderem seu valor.',
    options: [
      ['standard', 'Tecnologias comuns', 'Atuo com uma stack ampla e consolidada'],
      ['high-demand', 'Alta demanda ou liderança', 'Tenho especialidade rara ou lidero iniciativas'],
    ],
  },
  {
    key: 'education',
    title: 'Qual é o seu nível de formação acadêmica?',
    hint: 'Formação é apenas um dos sinais avaliados por empresas.',
    options: [
      ['courses', 'Cursos livres', 'Certificações e aprendizado autodidata'],
      ['bachelors', 'Tecnólogo ou bacharelado', 'Graduação concluída ou em andamento'],
      ['postgraduate', 'Pós-graduação ou mestrado', 'Especialização acadêmica avançada'],
    ],
  },
  {
    key: 'international',
    title: 'Você já trabalhou para empresas do exterior ou tem cidadania europeia?',
    hint: 'Vivência internacional pode reduzir barreiras de adaptação.',
    options: [
      ['false', 'Ainda não', 'Minha experiência é predominantemente local'],
      ['true', 'Sim', 'Já trabalhei com times globais ou tenho cidadania europeia'],
    ],
  },
]

function readSavedProfile(): CandidateProfile | null {
  try {
    const saved = sessionStorage.getItem('sponsorship-profile')
    return saved ? (JSON.parse(saved) as CandidateProfile) : null
  } catch {
    return null
  }
}

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Header({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`site-header ${compact ? 'site-header--compact' : ''}`}>
      <button className="brand" onClick={() => navigate('/')} aria-label="Voltar para o início">
        <span className="brand-mark">S</span>
        <span>Sponsorship<span className="brand-muted"> / readiness</span></span>
      </button>
      <span className="header-status"><i /> avaliação informativa</span>
    </header>
  )
}

function AssessmentPage({ onComplete }: { onComplete: (profile: CandidateProfile) => void }) {
  const [profile, setProfile] = useState<CandidateProfile>(emptyProfile)
  const [activeQuestion, setActiveQuestion] = useState(0)

  function updateProfile(key: QuestionKey, value: string) {
    setProfile((current) => ({
      ...current,
      [key]: key === 'international' ? value === 'true' : value,
    } as CandidateProfile))
  }

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="intro-grid">
          <div>
            <p className="kicker">US TECH CAREER / 01</p>
            <h1>Seu próximo capítulo profissional começa com clareza.</h1>
            <p className="lead">Uma leitura rápida dos sinais que empresas internacionais costumam considerar ao avaliar perfis para posições com potencial de sponsorship.</p>
            <div className="intro-meta"><span><b>05</b> perguntas</span><span><b>02</b> minutos</span><span><b>100%</b> informativo</span></div>
          </div>
          <aside className="side-note"><span className="quote-mark">“</span><p>Não é uma promessa de visto. É um ponto de partida mais inteligente para sua estratégia.</p><span className="side-note-line" /></aside>
        </section>

        <section className="assessment-card" aria-labelledby="assessment-title">
          <div className="progress-row"><span>SEU PERFIL</span><span>{String(activeQuestion + 1).padStart(2, '0')} <em>/ 05</em></span></div>
          <div className="progress-track"><i style={{ width: `${((activeQuestion + 1) / questions.length) * 100}%` }} /></div>
          <div className="section-title"><div><p className="kicker">CHECK-IN</p><h2 id="assessment-title">Conte um pouco sobre você.</h2></div><p>Escolha a opção que melhor representa seu momento atual.</p></div>
          <div className="questions">
            {questions.map((question, index) => (
              <fieldset className={`question ${activeQuestion === index ? 'question--active' : ''}`} key={question.key}>
                <legend><span>{String(index + 1).padStart(2, '0')}</span><strong>{question.title}</strong></legend>
                <p className="question-hint">{question.hint}</p>
                <div className="options">
                  {question.options.map(([value, label, description]) => (
                    <label className={`option ${String(profile[question.key]) === value ? 'selected' : ''}`} key={value}>
                      <input type="radio" name={question.key} value={value} checked={String(profile[question.key]) === value} onChange={() => { updateProfile(question.key, value); setActiveQuestion(Math.min(index + 1, questions.length - 1)) }} />
                      <span className="radio" /><span className="option-copy"><strong>{label}</strong><small>{description}</small></span><span className="option-arrow">↗</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <button className="primary-button" onClick={() => onComplete(profile)}>Ver minha leitura <span>↗</span></button>
          <p className="form-disclaimer"><span>ⓘ</span> Triagem inicial. Não é aconselhamento jurídico, previsão de aprovação ou garantia de contratação.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ResultsPage({ profile }: { profile: CandidateProfile }) {
  const result = useMemo(() => calculateScore(profile), [profile])
  return (
    <>
      <Header compact />
      <main className="page-shell results-shell">
        <div className="results-heading"><div><p className="kicker">US TECH CAREER / 02</p><h1>Sua leitura de prontidão.</h1><p className="lead">Use este resultado para escolher onde concentrar sua energia — e não como uma sentença sobre seu futuro.</p></div><button className="text-button" onClick={() => navigate('/')}>← Refazer avaliação</button></div>
        <section className="result-hero-card">
          <div><p className="kicker">ÍNDICE DE READINESS</p><div className="score-line"><strong>{result.score}</strong><span>/ 100</span></div><h2>{result.status}</h2><p>{result.summary}</p></div>
          <div className="score-orbit"><div><strong>{result.score}</strong><span>score</span></div></div>
        </section>
        <div className="results-grid"><section className="result-panel"><div className="panel-heading"><div><p className="kicker">BREAKDOWN</p><h3>Como sua pontuação foi formada</h3></div><span className="panel-tag">5 sinais</span></div>{result.breakdown.map((item) => <div className="bar-row" key={item.label}><div><span>{item.label}</span><strong>{item.points} <small>/ {item.maximum}</small></strong></div><div className="bar"><i style={{ width: `${Math.min(100, (item.points / item.maximum) * 100)}%` }} /></div></div>)}</section><section className="result-panel next-panel"><p className="kicker">PRÓXIMO MOVIMENTO</p><h3>Onde colocar seu foco agora.</h3><ul>{result.nextSteps.map((step) => <li key={step}><span>✓</span>{step}</li>)}</ul></section></div>
        <aside className="result-disclaimer"><strong>Uma nota importante</strong><p>Este resultado é exclusivamente informativo. Sponsorship depende de critérios migratórios, da empresa, da vaga e de decisões de contratação. Converse com um advogado de imigração para orientação jurídica.</p></aside>
      </main>
      <Footer />
    </>
  )
}

function Footer() { return <footer><div className="footer-inner"><span>Sponsorship / readiness</span><span>Para fins informativos · 2026</span></div></footer> }

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [profile, setProfile] = useState<CandidateProfile | null>(readSavedProfile)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function complete(nextProfile: CandidateProfile) {
    sessionStorage.setItem('sponsorship-profile', JSON.stringify(nextProfile))
    setProfile(nextProfile)
    navigate('/resultado')
  }

  if (path === '/resultado' && profile) return <ResultsPage profile={profile} />
  return <AssessmentPage onComplete={complete} />
}

export default App
