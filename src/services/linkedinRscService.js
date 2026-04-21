import { mockOpenToWork, isNewSignal } from '../data/mockOpenToWork.js'

// ─── Real LinkedIn RSC API ────────────────────────────────────────────────────
// LinkedIn Recruiter System Connect (RSC) syncs your Recruiter projects with
// external ATS/tools. Requires enterprise LinkedIn Recruiter + RSC partnership.
// Docs: https://learn.microsoft.com/en-us/linkedin/talent/recruiter-system-connect
//
// Key endpoints:
//   GET /v2/recruitingProjectMembersByProject?recruitingProjectId={id}
//   GET /v2/openToWorkSignals?q=recruiterAccounts&...
//   Headers: Authorization: Bearer {VITE_LINKEDIN_RSC_TOKEN}

const mockDelay = () => new Promise(r => setTimeout(r, 700 + Math.random() * 500))

export async function fetchOpenToWorkSignals() {
  const token = import.meta.env.VITE_LINKEDIN_RSC_TOKEN

  if (token) {
    try {
      const res = await fetch(
        'https://api.linkedin.com/v2/openToWorkSignals?q=recruiterAccounts&count=50',
        { headers: { Authorization: `Bearer ${token}`, 'X-Restli-Protocol-Version': '2.0.0' } }
      )
      const data = await res.json()
      return { candidates: transformRSCProfiles(data.elements || []), source: 'linkedin', lastSynced: new Date() }
    } catch (err) {
      console.warn('LinkedIn RSC error, falling back to mock:', err)
    }
  }

  await mockDelay()
  return { candidates: mockOpenToWork, source: 'mock', lastSynced: new Date() }
}

export async function syncRecruiterProject(projectId) {
  const token = import.meta.env.VITE_LINKEDIN_RSC_TOKEN

  if (token) {
    const res = await fetch(
      `https://api.linkedin.com/v2/recruitingProjectMembersByProject?recruitingProjectId=${projectId}&count=50`,
      { headers: { Authorization: `Bearer ${token}`, 'X-Restli-Protocol-Version': '2.0.0' } }
    )
    return res.json()
  }

  await mockDelay()
  return { elements: mockOpenToWork.filter(c => Math.random() > 0.3), source: 'mock' }
}

function transformRSCProfiles(elements) {
  return elements.map((el, i) => ({
    id: el.entityUrn || i,
    name: `${el.firstName} ${el.lastName}`,
    title: el.headline || 'Software Engineer',
    currentCompany: el.positions?.[0]?.companyName || 'Unknown',
    location: el.location?.name || 'New York, NY',
    yearsOfExperience: 0,
    skills: [],
    undergrad: { school: 'Unknown', degree: 'BS', field: 'Computer Science' },
    grad: null,
    openToWorkSince: el.openToWorkSignal?.signalDate || new Date().toISOString(),
    openToWorkType: el.openToWorkSignal?.activelyLooking ? 'Actively looking' : 'Open to opportunities',
    preferredRoles: el.openToWorkSignal?.targetRoles?.map(r => r.roleName) || [],
    preferredLocations: [],
    recruiterProject: 'LinkedIn Recruiter',
    matchScore: 70,
    linkedinUrl: `https://www.linkedin.com/in/${el.vanityName || ''}`,
  }))
}
