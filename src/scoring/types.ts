export type LanguageLevel = 'basic' | 'intermediate' | 'advanced'
export type ExperienceLevel = 'junior' | 'mid' | 'senior'
export type DemandLevel = 'standard' | 'high-demand'
export type EducationLevel = 'courses' | 'bachelors' | 'postgraduate'

export interface CandidateProfile {
  language: LanguageLevel
  experience: ExperienceLevel
  demand: DemandLevel
  education: EducationLevel
  international: boolean
}

export interface ScoreResult {
  score: number
  probability: string
  status: string
  summary: string
  nextSteps: string[]
  breakdown: Array<{ label: string; points: number; maximum: number }>
}
