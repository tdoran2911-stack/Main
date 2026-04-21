import { useState, useEffect } from 'react'
import { RefreshCw, GraduationCap, ExternalLink, ChevronDown, MessageSquare, Calendar, CheckCircle2 } from 'lucide-react'
import { getPipelineCandidates, moveCandidateStage } from '../services/ashbyService.js'
import { PIPELINE_STAGES, STAGE_COLORS, daysInStage } from '../data/mockAshby.js'
import { isPreferredSchool } from '../data/schools.js'

const AVATAR_COLORS = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-orange-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-amber-500', 'bg-indigo-500',
]
const getAvatarColor = name => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
const initials = name => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

function ServiceBadge({ source, loading }) {
  const isLive = source === 'ashby'
  return (
    <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${isLive ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-slate-100 text-slate-500'}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500' : 'bg-slate-400'}`} />
      {loading ? 'Syncing…' : isLive ? 'Live · Ashby' : 'Mock data · Connect Ashby'}
    </div>
  )
}

function PipelineCard({ candidate, onMoveStage, moving }) {
  const { name, title, currentCompany, appliedRole, stage, stageEnteredAt, lastActivity, nextStep, undergrad, skills, source, notes } = candidate
  const preferred = isPreferredSchool(undergrad.school)
  const [showNotes, setShowNotes] = useState(false)

  return (
    <div className={`bg-white rounded-xl border p-4 hover:shadow-md transition-all ${stage === 'Hired' ? 'border-green-300' : stage === 'Rejected' ? 'border-red-200 opacity-75' : 'border-slate-200 hover:border-slate-300'}`}>
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(name)}`}>
          {initials(name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">{name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {title} <span className="text-slate-400">at</span> <span className="font-medium text-slate-600">{currentCompany}</span>
              </p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ring-1 font-medium flex-shrink-0 ${STAGE_COLORS[stage]}`}>
              {stage}
            </span>
          </div>

          {/* Role applied for */}
          <p className="text-xs text-brand-600 font-medium mt-1.5">↳ {appliedRole}</p>

          {/* Education */}
          <div className="flex items-center gap-1.5 mt-2">
            <GraduationCap className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${preferred ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-200' : 'bg-slate-100 text-slate-600'}`}>
              {preferred && <span className="text-amber-500 mr-0.5">★</span>}
              {undergrad.school} · {undergrad.degree}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.slice(0, 4).map(s => (
              <span key={s} className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">{s}</span>
            ))}
          </div>

          {/* Activity + Next step */}
          <div className="mt-3 space-y-1">
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              {lastActivity}
            </p>
            {nextStep && (
              <p className="text-xs text-brand-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                {nextStep}
              </p>
            )}
          </div>

          {/* Notes */}
          {notes && (
            <button onClick={() => setShowNotes(v => !v)} className="mt-2 text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {showNotes ? 'Hide note' : 'Show note'}
            </button>
          )}
          {showNotes && notes && (
            <p className="mt-1.5 text-xs text-slate-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 italic">
              "{notes}"
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">{daysInStage(stageEnteredAt)} in stage</span>
            <span className="text-xs text-slate-300">·</span>
            <span className="text-xs text-slate-400">via {source}</span>

            <div className="ml-auto flex items-center gap-1.5">
              {stage !== 'Hired' && stage !== 'Rejected' && (
                <div className="relative">
                  <select
                    disabled={moving}
                    onChange={e => e.target.value && onMoveStage(candidate.id, e.target.value)}
                    className="text-xs pl-2 pr-6 py-1 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Move stage</option>
                    {PIPELINE_STAGES.filter(s => s !== stage).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}
              <button className="flex items-center gap-1 text-xs px-2 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                <Calendar className="w-3 h-3" /> Schedule
              </button>
              <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ACTIVE_STAGES = PIPELINE_STAGES.filter(s => s !== 'Rejected')

export default function PipelineTab() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('mock')
  const [lastSynced, setLastSynced] = useState(null)
  const [movingId, setMovingId] = useState(null)
  const [stageFilter, setStageFilter] = useState('All')
  const [toast, setToast] = useState(null)

  const fetchCandidates = async () => {
    setLoading(true)
    const result = await getPipelineCandidates()
    setCandidates(result.candidates)
    setSource(result.source)
    setLastSynced(new Date())
    setLoading(false)
  }

  useEffect(() => { fetchCandidates() }, [])

  const handleMoveStage = async (candidateId, newStage) => {
    setMovingId(candidateId)
    await moveCandidateStage(candidateId, newStage)
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, stage: newStage, stageEnteredAt: new Date().toISOString() } : c))
    setMovingId(null)
    setToast(`Moved to ${newStage}`)
    setTimeout(() => setToast(null), 2500)
  }

  const displayed = stageFilter === 'All' ? candidates : candidates.filter(c => c.stage === stageFilter)

  const stageCounts = PIPELINE_STAGES.reduce((acc, s) => {
    acc[s] = candidates.filter(c => c.stage === s).length
    return acc
  }, {})

  const activeCount = candidates.filter(c => c.stage !== 'Rejected' && c.stage !== 'Hired').length

  return (
    <div className="p-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Hiring Pipeline</h2>
            <ServiceBadge source={source} loading={loading} />
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            {activeCount} active candidates · {stageCounts['Hired'] || 0} hired · powered by Ashby ATS
          </p>
        </div>
        <button onClick={fetchCandidates} disabled={loading} className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Sync Ashby
        </button>
      </div>

      {/* Connection banner if mock */}
      {source === 'mock' && (
        <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
          <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div>
            <span className="font-medium text-slate-800">Ashby not connected.</span> Showing sample pipeline data.
            Add <span className="font-mono bg-white border border-slate-200 px-1 rounded">VITE_ASHBY_API_KEY</span> to your <span className="font-mono bg-white border border-slate-200 px-1 rounded">.env</span> to sync real applicants.
          </div>
        </div>
      )}

      {/* Stage filter pills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <button onClick={() => setStageFilter('All')} className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${stageFilter === 'All' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
          All ({candidates.length})
        </button>
        {PIPELINE_STAGES.map(s => stageCounts[s] > 0 && (
          <button key={s} onClick={() => setStageFilter(s)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${stageFilter === s ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
            {s} ({stageCounts[s]})
          </button>
        ))}
      </div>

      {/* Stages */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-5 h-5 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="space-y-6">
          {ACTIVE_STAGES.map(stage => {
            const stageCandidates = displayed.filter(c => c.stage === stage)
            if (stageCandidates.length === 0) return null
            return (
              <div key={stage}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${STAGE_COLORS[stage]}`}>
                    {stage}
                  </span>
                  <span className="text-xs text-slate-400">{stageCandidates.length} candidate{stageCandidates.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="space-y-2.5">
                  {stageCandidates.map(c => (
                    <PipelineCard key={c.id} candidate={c} onMoveStage={handleMoveStage} moving={movingId === c.id} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Rejected — collapsed by default */}
          {displayed.filter(c => c.stage === 'Rejected').length > 0 && (
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer list-none mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${STAGE_COLORS['Rejected']}`}>
                  Rejected
                </span>
                <span className="text-xs text-slate-400">{displayed.filter(c => c.stage === 'Rejected').length} candidate{displayed.filter(c => c.stage === 'Rejected').length !== 1 ? 's' : ''}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="space-y-2.5">
                {displayed.filter(c => c.stage === 'Rejected').map(c => (
                  <PipelineCard key={c.id} candidate={c} onMoveStage={handleMoveStage} moving={movingId === c.id} />
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-lg">
          ✓ {toast}
        </div>
      )}
    </div>
  )
}
