import { mockCandidates } from '../data/mockCandidates.js'
import { PREFERRED_SCHOOLS } from '../data/schools.js'

// ─── Real PDL API (uncomment when VITE_PDL_API_KEY is set) ───────────────────
// POST https://api.peopledatalabs.com/v5/person/search
// Headers: { 'X-Api-Key': YOUR_KEY, 'Content-Type': 'application/json' }
// Docs: https://docs.peopledatalabs.com/docs/person-search-api

function buildPDLQuery(filters) {
  const must = [
    { term: { 'location_metro': 'new york' } },
  ]
  if (filters.keywords) {
    must.push({ match: { 'summary': filters.keywords } })
  }
  if (filters.title) {
    must.push({ match: { 'job_title': filters.title } })
  }
  if (filters.company) {
    must.push({ match: { 'job_company_name': filters.company } })
  }
  if (filters.minExp > 0 || filters.maxExp < 15) {
    must.push({ range: { 'inferred_years_experience': { gte: filters.minExp, lte: filters.maxExp } } })
  }
  if (filters.skills.length > 0) {
    must.push({ terms: { 'skills': filters.skills.map(s => s.toLowerCase()) } })
  }
  if (filters.undergradSchools.length > 0) {
    must.push({ terms: { 'education.school.name': filters.undergradSchools } })
  }
  if (filters.openToWork) {
    must.push({ term: { 'job_last_updated': 'open_to_work' } })
  }
  return { bool: { must } }
}

function applyFiltersToMock(candidates, filters) {
  return candidates.filter(c => {
    if (filters.keywords) {
      const kw = filters.keywords.toLowerCase()
      const hay = [c.name, c.title, c.currentCompany, ...c.skills, c.bio].join(' ').toLowerCase()
      if (!hay.includes(kw)) return false
    }
    if (filters.title && !c.title.toLowerCase().includes(filters.title.toLowerCase())) return false
    if (filters.company && !c.currentCompany.toLowerCase().includes(filters.company.toLowerCase())) return false
    if (c.yearsOfExperience < filters.minExp || c.yearsOfExperience > filters.maxExp) return false
    if (filters.skills.length > 0 && !filters.skills.every(s => c.skills.includes(s))) return false
    if (filters.undergradSchools.length > 0 && !filters.undergradSchools.includes(c.undergrad.school)) return false
    if (filters.gradSchools.length > 0 && (!c.grad || !filters.gradSchools.includes(c.grad.school))) return false
    if (filters.degreeField) {
      if (c.undergrad.field !== filters.degreeField && (!c.grad || c.grad.field !== filters.degreeField)) return false
    }
    if (filters.openToWork && !c.openToWork) return false
    return true
  })
}

const mockDelay = () => new Promise(r => setTimeout(r, 500 + Math.random() * 600))

export async function searchCandidates(filters) {
  const apiKey = import.meta.env.VITE_PDL_API_KEY
  const query = buildPDLQuery(filters)

  if (apiKey) {
    try {
      const res = await fetch('https://api.peopledatalabs.com/v5/person/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': apiKey },
        body: JSON.stringify({ query, size: 25, dataset: 'all' }),
      })
      const data = await res.json()
      return { candidates: transformPDLProfiles(data.data || []), total: data.total, source: 'pdl', query }
    } catch (err) {
      console.warn('PDL API error, falling back to mock:', err)
    }
  }

  await mockDelay()
  const candidates = applyFiltersToMock(mockCandidates, filters)
  return { candidates, total: candidates.length, source: 'mock', query }
}

function transformPDLProfiles(profiles) {
  return profiles.map((p, i) => ({
    id: p.id || i,
    name: p.full_name,
    title: p.job_title || 'Software Engineer',
    currentCompany: p.job_company_name || 'Unknown',
    location: p.location_name || 'New York, NY',
    yearsOfExperience: p.inferred_years_experience || 0,
    skills: (p.skills || []).slice(0, 8),
    undergrad: p.education?.[0] ? {
      school: p.education[0].school?.name || 'Unknown',
      degree: p.education[0].degrees?.[0] || 'BS',
      field: p.education[0].majors?.[0] || 'Computer Science',
      year: p.education[0].end_date?.year,
    } : { school: 'Unknown', degree: 'BS', field: 'Computer Science' },
    grad: p.education?.[1] ? {
      school: p.education[1].school?.name || 'Unknown',
      degree: p.education[1].degrees?.[0] || 'MS',
      field: p.education[1].majors?.[0] || 'Computer Science',
      year: p.education[1].end_date?.year,
    } : null,
    openToWork: false,
    bio: p.summary || '',
    matchScore: PREFERRED_SCHOOLS.includes(p.education?.[0]?.school?.name) ? 80 : 60,
    linkedinUrl: p.linkedin_url ? `https://${p.linkedin_url}` : '#',
  }))
}
