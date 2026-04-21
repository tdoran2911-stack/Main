import { RefreshCw } from 'lucide-react'
import CandidateCard from './CandidateCard.jsx'

function ServiceBadge({ source }) {
  const isLive = source === 'pdl'
  return (
    <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${isLive ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-slate-100 text-slate-500'}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500' : 'bg-slate-400'}`} />
      {isLive ? 'Live · People Data Labs' : 'Mock data · Connect PDL'}
    </div>
  )
}

export default function SearchResults({ candidates, savedCandidates, onToggleSave, total, loading, source }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-semibold text-slate-900">Search Results</h2>
            <ServiceBadge source={source} />
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? 'Searching…' : candidates.length === total
              ? `${total} candidates · New York, NY`
              : `${candidates.length} of ${total} candidates match your filters`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-500">
            <option>Sort: Relevance</option>
            <option>Sort: Experience ↓</option>
            <option>Sort: Experience ↑</option>
            <option>Sort: School rank</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-brand-500" />
          <p className="text-sm text-slate-500">Searching People Data Labs…</p>
        </div>
      ) : candidates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-700 font-medium">No candidates match your filters</p>
          <p className="text-slate-400 text-sm mt-1">Try broadening your search or resetting filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {candidates.map(c => (
            <CandidateCard
              key={c.id}
              candidate={c}
              isSaved={savedCandidates.has(c.id)}
              onToggleSave={onToggleSave}
              showMatchScore={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
