import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header.jsx'
import SearchFilters from './components/SearchFilters.jsx'
import SearchResults from './components/SearchResults.jsx'
import RecommendedFeed from './components/RecommendedFeed.jsx'
import OpenToWorkFeed from './components/OpenToWorkFeed.jsx'
import PipelineTab from './components/PipelineTab.jsx'
import NewsSidebar from './components/NewsSidebar.jsx'
import { searchCandidates } from './services/pdlService.js'
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

export default function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [savedCandidates, setSavedCandidates] = useState(new Set())

  // PDL-powered search with debounce
  const [searchResults, setSearchResults] = useState(mockCandidates)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchSource, setSearchSource] = useState('mock')

  useEffect(() => {
    const timer = setTimeout(async () => {
      setSearchLoading(true)
      try {
        const result = await searchCandidates(filters)
        setSearchResults(result.candidates)
        setSearchSource(result.source)
      } finally {
        setSearchLoading(false)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [filters])

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

  // Hide filters panel on pipeline tab (not needed there)
  const showFilters = activeTab !== 'pipeline'

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedCandidates.size}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Filters (hidden on pipeline tab) */}
        {showFilters && (
          <aside className="w-72 flex-shrink-0 bg-white border-r border-slate-200 overflow-y-auto scrollbar-thin">
            <SearchFilters filters={filters} setFilters={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
          </aside>
        )}

        {/* Center: Candidate feed */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {activeTab === 'search' && (
            <SearchResults
              candidates={searchResults}
              savedCandidates={savedCandidates}
              onToggleSave={toggleSave}
              total={mockCandidates.length}
              loading={searchLoading}
              source={searchSource}
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
          {activeTab === 'pipeline' && (
            <PipelineTab />
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
