import { useState, useMemo } from 'react'
import Header from './components/Header.jsx'
import SearchFilters from './components/SearchFilters.jsx'
import SearchResults from './components/SearchResults.jsx'
import RecommendedFeed from './components/RecommendedFeed.jsx'
import OpenToWorkFeed from './components/OpenToWorkFeed.jsx'
import NewsSidebar from './components/NewsSidebar.jsx'
import { mockCandidates } from './data/mockCandidates.js'
import { PREFERRED_SCHOOLS } from './data/schools.js'

const DEFAULT_FILTERS = {
  keywords: '',
  title: '',
  company: '',
  minExp: 2,
  maxExp: 10,
  skills: [],
  undergradSchools: [],
  gradSchools: [],
  degreeField: '',
  openToWork: false,
  seniority: [],
}

function applyFilters(candidates, filters) {
  return candidates.filter(c => {
    if (filters.keywords) {
      const kw = filters.keywords.toLowerCase()
      const haystack = [c.name, c.title, c.currentCompany, ...c.skills, c.bio].join(' ').toLowerCase()
      if (!haystack.includes(kw)) return false
    }
    if (filters.title) {
      if (!c.title.toLowerCase().includes(filters.title.toLowerCase())) return false
    }
    if (filters.company) {
      if (!c.currentCompany.toLowerCase().includes(filters.company.toLowerCase())) return false
    }
    if (c.yearsOfExperience < filters.minExp || c.yearsOfExperience > filters.maxExp) return false
    if (filters.skills.length > 0) {
      const hasAll = filters.skills.every(s => c.skills.includes(s))
      if (!hasAll) return false
    }
    if (filters.undergradSchools.length > 0) {
      if (!filters.undergradSchools.includes(c.undergrad.school)) return false
    }
    if (filters.gradSchools.length > 0) {
      if (!c.grad || !filters.gradSchools.includes(c.grad.school)) return false
    }
    if (filters.degreeField) {
      const ugMatch = c.undergrad.field === filters.degreeField
      const gradMatch = c.grad && c.grad.field === filters.degreeField
      if (!ugMatch && !gradMatch) return false
    }
    if (filters.openToWork && !c.openToWork) return false
    if (filters.seniority.length > 0) {
      const seniorityMap = {
        Junior: ['Software Engineer'],
        Mid: ['Software Engineer', 'Senior Software Engineer'],
        Senior: ['Senior Software Engineer'],
        Staff: ['Staff Software Engineer'],
        Principal: ['Principal Software Engineer'],
      }
      const matched = filters.seniority.some(s =>
        seniorityMap[s]?.some(t => c.title.includes(t.replace('Software Engineer', '').trim()) || c.title === t)
      )
      if (!matched) return false
    }
    return true
  })
}

export default function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [savedCandidates, setSavedCandidates] = useState(new Set())

  const searchResults = useMemo(() => applyFilters(mockCandidates, filters), [filters])

  const recommended = useMemo(() =>
    mockCandidates
      .filter(c => PREFERRED_SCHOOLS.includes(c.undergrad.school) || (c.grad && PREFERRED_SCHOOLS.includes(c.grad.school)))
      .sort((a, b) => b.matchScore - a.matchScore),
  [])

  const toggleSave = (id) => {
    setSavedCandidates(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedCandidates.size}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Filters */}
        <aside className="w-72 flex-shrink-0 bg-white border-r border-slate-200 overflow-y-auto scrollbar-thin">
          <SearchFilters filters={filters} setFilters={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
        </aside>

        {/* Center: Candidate feed */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {activeTab === 'search' && (
            <SearchResults
              candidates={searchResults}
              savedCandidates={savedCandidates}
              onToggleSave={toggleSave}
              total={mockCandidates.length}
            />
          )}
          {activeTab === 'recommended' && (
            <RecommendedFeed
              candidates={recommended}
              savedCandidates={savedCandidates}
              onToggleSave={toggleSave}
            />
          )}
          {activeTab === 'opentowork' && (
            <OpenToWorkFeed
              savedCandidates={savedCandidates}
              onToggleSave={toggleSave}
            />
          )}
        </main>

        {/* Right: News sidebar */}
        <aside className="w-80 flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto scrollbar-thin">
          <NewsSidebar />
        </aside>
      </div>
    </div>
  )
}
