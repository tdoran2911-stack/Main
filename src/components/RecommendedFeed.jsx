import { Star, Info } from 'lucide-react'
import CandidateCard from './CandidateCard.jsx'
import { PREFERRED_SCHOOLS, IVY_LEAGUE } from '../data/schools.js'

const SCHOOL_GROUPS = [
  { label: 'Ivy League', schools: IVY_LEAGUE },
  { label: 'MIT / Caltech / Stanford', schools: ['MIT', 'Caltech', 'Stanford University'] },
  { label: 'Top Technical', schools: ['Carnegie Mellon University', 'Georgia Tech', 'University of Illinois (UIUC)'] },
  { label: 'Top Comprehensive', schools: ['Duke University'] },
]

export default function RecommendedFeed({ candidates, savedCandidates, onToggleSave }) {
  // Group into tiers by score
  const elite = candidates.filter(c => c.matchScore >= 80)
  const strong = candidates.filter(c => c.matchScore >= 60 && c.matchScore < 80)
  const good = candidates.filter(c => c.matchScore < 60)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <h2 className="text-lg font-semibold text-slate-900">Recommended Candidates</h2>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          {candidates.length} engineers from preferred schools · Ranked by match score
        </p>

        {/* School legend */}
        <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-amber-800 mb-1">Preferred schools filter active</p>
              <div className="flex flex-wrap gap-1">
                {PREFERRED_SCHOOLS.map(s => (
                  <span key={s} className="text-xs px-1.5 py-0.5 bg-white text-amber-700 rounded border border-amber-200">
                    {s.replace('University of Illinois (UIUC)', 'UIUC')
                        .replace('Carnegie Mellon University', 'CMU')
                        .replace('University of Pennsylvania', 'UPenn')
                        .replace(' University', '')
                        .replace(' College', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elite tier */}
      {elite.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-emerald-700 px-2 py-0.5 bg-emerald-50 rounded-full ring-1 ring-emerald-200">
              ⚡ Top Match · {elite.length} candidates
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="space-y-3">
            {elite.map(c => (
              <CandidateCard
                key={c.id}
                candidate={c}
                isSaved={savedCandidates.has(c.id)}
                onToggleSave={onToggleSave}
                showMatchScore={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Strong tier */}
      {strong.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-blue-700 px-2 py-0.5 bg-blue-50 rounded-full ring-1 ring-blue-200">
              Strong Match · {strong.length} candidates
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="space-y-3">
            {strong.map(c => (
              <CandidateCard
                key={c.id}
                candidate={c}
                isSaved={savedCandidates.has(c.id)}
                onToggleSave={onToggleSave}
                showMatchScore={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Good tier */}
      {good.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-600 px-2 py-0.5 bg-slate-100 rounded-full">
              Consider · {good.length} candidates
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="space-y-3">
            {good.map(c => (
              <CandidateCard
                key={c.id}
                candidate={c}
                isSaved={savedCandidates.has(c.id)}
                onToggleSave={onToggleSave}
                showMatchScore={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
