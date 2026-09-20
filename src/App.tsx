import { useState } from 'react'
import { calculateScore } from './scoring/calculateScore'
import { emptyProfile } from './scoring/defaults'
import type { CandidateProfile } from './scoring/types'
import './App.css'

const questions = [
  { key: 'language', title: 'Como você avalia seu inglês para o ambiente de trabalho?', options: [['basic', 'Não falo ou apenas leio/escrevo', '0 pontos'], ['intermediate', 'Intermediário: entendo, mas travo na fala', '10 pontos'], ['advanced', 'Avançado/fluente: converso e defendo ideias técnicas', '30 pontos']] },
  { key: 'experience', title: 'Quantos anos de experiência prática você tem em tecnologia?', options: [['junior', 'Menos de 2 anos (júnior)', '0 pontos'], ['mid', 'De 2 a 5 anos (pleno)', '20 pontos'], ['senior', 'Mais de 5 anos (sênior/especialista)', '40 pontos']] },
  { key: 'demand', title: 'Sua stack envolve tecnologias de alta demanda ou liderança?', options: [['standard', 'Não, trabalho com tecnologias comuns no mercado', '5 pontos'], ['high-demand', 'Sim: IA, DevOps, Cloud, Dados, Rust, Go ou liderança', '20 pontos']] },
  { key: 'education', title: 'Qual é o seu nível de formação acadêmica?', options: [['courses', 'Sem diploma universitário / cursos livres', '5 pontos'], ['bachelors', 'Tecnólogo ou bacharelado completo', '15 pontos'], ['postgraduate', 'Pós-graduação, mestrado ou doutorado', '30 pontos']] },
  { key: 'international', title: 'Você já trabalhou para empresas do exterior ou tem cidadania europeia?', options: [['false', 'Não', '0 pontos'], ['true', 'Sim, tenho experiência internacional ou dupla cidadania', '20 pontos']] },
] as const

function App() {
  const [profile, setProfile] = useState<CandidateProfile>(emptyProfile)
  const [submitted, setSubmitted] = useState(false)
  const result = calculateScore(profile)

  function updateProfile(key: keyof CandidateProfile, value: string) {
    setProfile((current) => ({ ...current, [key]: key === 'international' ? value === 'true' : value } as CandidateProfile))
  }

  function reset() {
    setProfile(emptyProfile)
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <header className="hero">
        <div className="container hero-content">
          <span className="eyebrow">CAREER READINESS TOOL</span>
          <h1>Você está pronto para buscar sponsorship?</h1>
          <p>Responda cinco perguntas e descubra como seu perfil profissional e pessoal pode ser percebido por empresas internacionais.</p>
          <div className="trust-note"><span>✦</span> Avaliação informativa em menos de 2 minutos</div>
        </div>
      </header>

      <div className="container layout">
        {!submitted ? (
          <section className="card form-card" aria-labelledby="form-title">
            <div className="section-heading"><span className="step">01 — 05</span><h2 id="form-title">Conte um pouco sobre você</h2><p>Não existe resposta certa. Seja honesto para receber um resultado mais útil.</p></div>
            <div className="questions">
              {questions.map((question, index) => (
                <fieldset key={question.key} className="question">
                  <legend><span>{String(index + 1).padStart(2, '0')}</span>{question.title}</legend>
                  <div className="options">
                    {question.options.map(([value, label, pointsLabel]) => (
                      <label className={`option ${String(profile[question.key]) === value ? 'selected' : ''}`} key={value}>
                        <input type="radio" name={question.key} value={value} checked={String(profile[question.key]) === value} onChange={(event) => updateProfile(question.key, event.target.value)} />
                        <span className="radio" /><span className="option-copy"><strong>{label}</strong><small>{pointsLabel}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <button className="primary-button" onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Ver meu resultado <span>→</span></button>
            <p className="form-disclaimer">Esta é uma triagem inicial, não uma previsão jurídica nem uma garantia de contratação ou aprovação de visto.</p>
          </section>
        ) : (
          <section className="results" aria-labelledby="result-title">
            <button className="back-button" onClick={reset}>← Refazer avaliação</button>
            <div className="card result-card">
              <div className="result-top"><div><span className="eyebrow">SEU RESULTADO</span><h2 id="result-title">{result.status}</h2><p>{result.summary}</p></div><div className="score-circle"><strong>{result.score}</strong><span>/ 100</span></div></div>
              <div className="probability"><span>Probabilidade estimada de atrair sponsorship</span><strong>{result.probability}</strong></div>
              <div className="breakdown"><h3>Como sua pontuação foi formada</h3>{result.breakdown.map((item) => <div className="bar-row" key={item.label}><div><span>{item.label}</span><strong>{item.points} / {item.maximum}</strong></div><div className="bar"><i style={{ width: `${(item.points / item.maximum) * 100}%` }} /></div></div>)}</div>
            </div>
            <div className="card next-steps"><h3>Próximos passos recomendados</h3><ul>{result.nextSteps.map((step) => <li key={step}><span>✓</span>{step}</li>)}</ul></div>
            <div className="disclaimer"><strong>Importante</strong><p>Este resultado é apenas informativo. Não oferece aconselhamento jurídico, não garante sponsorship e não representa a decisão de uma empresa ou autoridade migratória.</p></div>
          </section>
        )}
      </div>
      <footer><div className="container">Sponsorship Readiness Checker <span>•</span> Para fins informativos</div></footer>
    </main>
  )
}

export default App
