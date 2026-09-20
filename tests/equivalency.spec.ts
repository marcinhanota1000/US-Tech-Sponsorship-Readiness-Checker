import { describe, expect, it } from 'vitest'
import { calculateScore } from '../src/scoring/calculateScore'

describe('score boundaries', () => {
  it('keeps the score capped at 100', () => {
    const result = calculateScore({ language: 'advanced', experience: 'senior', demand: 'high-demand', education: 'postgraduate', international: true })
    expect(result.score).toBeLessThanOrEqual(100)
  })
  it('labels 75 as competitive', () => {
    const result = calculateScore({ language: 'advanced', experience: 'mid', demand: 'high-demand', education: 'bachelors', international: false })
    expect(result.score).toBe(75)
    expect(result.status).toBe('Competitivo')
  })
})
