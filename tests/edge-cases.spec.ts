import { describe, expect, it } from 'vitest'
import { calculateScore } from '../src/scoring/calculateScore'

describe('edge cases', () => {
  it('does not award international points when the answer is false', () => {
    const result = calculateScore({ language: 'basic', experience: 'junior', demand: 'standard', education: 'courses', international: false })
    expect(result.breakdown.find((item) => item.label === 'International background')?.points).toBe(0)
  })
})
