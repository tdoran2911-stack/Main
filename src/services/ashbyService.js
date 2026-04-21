import { mockPipelineCandidates } from '../data/mockAshby.js'

// ─── Real Ashby API ───────────────────────────────────────────────────────────
// Ashby is an ATS — it contains candidates who have applied to your open roles.
// Use it alongside PDL/LinkedIn sourcing for a full-funnel view.
// Docs: https://developers.ashbyhq.com/reference/introduction
//
// Key endpoints (REST):
//   GET  https://api.ashbyhq.com/application.list          — all applications
//   POST https://api.ashbyhq.com/application.changeStage   — move stage
//   GET  https://api.ashbyhq.com/candidate.list            — all candidates
//   Headers: Authorization: Basic {base64(VITE_ASHBY_API_KEY:)}

const mockDelay = () => new Promise(r => setTimeout(r, 600 + Math.random() * 400))

let localPipeline = [...mockPipelineCandidates]

export async function getPipelineCandidates() {
  const apiKey = import.meta.env.VITE_ASHBY_API_KEY

  if (apiKey) {
    try {
      const credentials = btoa(`${apiKey}:`)
      const res = await fetch('https://api.ashbyhq.com/application.list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${credentials}` },
        body: JSON.stringify({ limit: 50 }),
      })
      const data = await res.json()
      return { candidates: transformAshbyApplications(data.results || []), source: 'ashby' }
    } catch (err) {
      console.warn('Ashby API error, falling back to mock:', err)
    }
  }

  await mockDelay()
  return { candidates: localPipeline, source: 'mock' }
}

export async function moveCandidateStage(candidateId, newStage) {
  const apiKey = import.meta.env.VITE_ASHBY_API_KEY

  if (apiKey) {
    const credentials = btoa(`${apiKey}:`)
    await fetch('https://api.ashbyhq.com/application.changeStage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${credentials}` },
      body: JSON.stringify({ applicationId: candidateId, interviewStageId: newStage }),
    })
  } else {
    await new Promise(r => setTimeout(r, 300))
    localPipeline = localPipeline.map(c =>
      c.id === candidateId
        ? { ...c, stage: newStage, stageEnteredAt: new Date().toISOString() }
        : c
    )
  }
  return { success: true }
}

function transformAshbyApplications(applications) {
  return applications.map(app => ({
    id: app.id,
    name: `${app.candidate.name}`,
    title: app.candidate.primaryEmailAddress ? 'Software Engineer' : 'Engineer',
    currentCompany: app.candidate.company || 'Unknown',
    appliedRole: app.job?.title || 'Software Engineer',
    stage: app.currentInterviewStage?.title || 'Applied',
    appliedDate: app.createdAt,
    stageEnteredAt: app.currentInterviewStage?.createdAt || app.createdAt,
    lastActivity: app.lastActivityAt,
    nextStep: '',
    undergrad: { school: 'Unknown', degree: 'BS', field: 'Computer Science' },
    skills: [],
    source: app.source?.label || 'Direct',
    notes: app.note || '',
    linkedinUrl: app.candidate.linkedInUrl || '#',
  }))
}
