import { describe, expect, it } from 'vitest'
import { calculateScore } from '../src/scoring/calculateScore'

const base = { language: 'basic' as const, experience: 'junior' as const, demand: 'standard' as const, education: 'courses' as const, international: false }

describe('candidate score engine', () => {
  it('scores the minimum profile at 10 points', () => {
    expect(calculateScore(base).score).toBe(10)
  })
  it('scores the strongest profile at 100 points', () => {
    expect(calculateScore({ language: 'advanced', experience: 'senior', demand: 'high-demand', education: 'postgraduate', international: true }).score).toBe(100)
  })
  it('returns the competitive status for a middle-range profile', () => {
    expect(calculateScore({ ...base, language: 'intermediate', experience: 'mid', education: 'bachelors' }).status).toBe('Competitivo')
  })
})
