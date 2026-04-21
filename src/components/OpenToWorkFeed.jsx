import { useState } from 'react'
import { Bell, ExternalLink, Mail, Bookmark, MapPin, Briefcase, GraduationCap, Link, ChevronDown, AlertCircle } from 'lucide-react'
import { mockOpenToWork, RECRUITER_PROJECTS, isNewSignal, signalAge } from '../data/mockOpenToWork.js'
import { isPreferredSchool } from '../data/schools.js'

const AVATAR_COLORS = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-orange-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-amber-500', 'bg-indigo-500',
]

function getAvatarColor(name) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function LinkedInBanner({ connected }) {
  return (
    <div className={`mx-6 mt-5 mb-1 rounded-xl border p-4 ${connected ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
      <div className="flex items-start gap-3">
        {/* LinkedIn logo */}
        <div className="w-8 h-8 bg-[#0A66C2] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white font-bold text-sm">in</span>
        </div>
        <div className="flex-1">
          {connected ? (
            <>
              <p className="text-sm font-semibold text-blue-900">LinkedIn Recruiter connected</p>
              <p className="text-xs text-blue-700 mt-0.5">
                Receiving open-to-work signals via Recruiter System Connect. Notifications arrive within 24 hours of a candidate updating their profile.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                LinkedIn Recruiter not connected
              </p>
              <p className="text-xs text-amber-800 mt-0.5 mb-2">
                Connect your LinkedIn Recruiter account to receive live open-to-work signals from candidates in your projects.
              </p>
              <div className="text-xs text-amber-700 space-y-1">
                <p className="font-medium">To connect:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-amber-700">
                  <li>In LinkedIn Recruiter, go to <span className="font-medium">Admin → Recruiter System Connect</span></li>
                  <li>Add this app as an ATS partner</li>
                  <li>Paste your RSC API credentials into <span className="font-mono bg-amber-100 px-1 rounded">.env</span></li>
                </ol>
              </div>
              <button className="mt-3 flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#0A66C2] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Link className="w-3 h-3" />
                Connect LinkedIn Recruiter
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function OpenToWorkCard({ candidate, isSaved, onToggleSave }) {
  const { name, title, currentCompany, location, yearsOfExperience, skills, undergrad, grad,
          openToWorkSince, openToWorkType, preferredRoles, preferredLocations, recruiterProject, matchScore } = candidate
  const isNew = isNewSignal(openToWorkSince)
  const preferred = isPreferredSchool(undergrad.school) || (grad && isPreferredSchool(grad.school))

  return (
    <div className={`bg-white rounded-xl border p-5 hover:shadow-md transition-all ${isNew ? 'border-green-300 ring-1 ring-green-200' : 'border-slate-200 hover:border-slate-300'}`}>
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base ${getAvatarColor(name)}`}>
            {initials(name)}
          </div>
          {isNew && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" title="New signal" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-slate-900 text-base">{name}</h3>
                {isNew && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium ring-1 ring-green-200 animate-pulse">
                    New signal
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  openToWorkType === 'Actively looking'
                    ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-sky-100 text-sky-700 ring-1 ring-sky-200'
                }`}>
                  {openToWorkType}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                {title} <span className="text-slate-400">at</span> <span className="font-medium text-slate-700">{currentCompany}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`text-sm font-semibold px-2.5 py-1 rounded-full ring-1 ${
                matchScore >= 85 ? 'text-emerald-700 bg-emerald-50 ring-emerald-200'
                : matchScore >= 65 ? 'text-blue-700 bg-blue-50 ring-blue-200'
                : 'text-slate-600 bg-slate-50 ring-slate-200'
              }`}>
                {matchScore}% <span className="text-xs font-normal">match</span>
              </div>
              <button
                onClick={() => onToggleSave(candidate.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved ? 'text-brand-600 bg-brand-50 hover:bg-brand-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{location}</span>
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{yearsOfExperience} yrs exp</span>
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <Bell className="w-3 h-3" /> Signaled {signalAge(openToWorkSince)}
            </span>
          </div>

          {/* Recruiter project */}
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full font-medium">
              <span className="font-bold">in</span> {recruiterProject}
            </span>
          </div>

          {/* Preferred roles */}
          <div className="mt-2.5">
            <p className="text-xs text-slate-500 mb-1">Looking for:</p>
            <div className="flex flex-wrap gap-1.5">
              {preferredRoles.map(r => (
                <span key={r} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">{r}</span>
              ))}
              {preferredLocations.map(l => (
                <span key={l} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">{l}</span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            {[undergrad, grad].filter(Boolean).map((edu, i) => {
              const pref = isPreferredSchool(edu.school)
              return (
                <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${pref ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-200' : 'bg-slate-100 text-slate-600'}`}>
                  {pref && <span className="text-amber-500 mr-0.5">★</span>}
                  {edu.school} · {edu.degree}
                </span>
              )
            })}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {skills.slice(0, 5).map(s => (
              <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">{s}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium">
              <Mail className="w-3.5 h-3.5" /> Message
            </button>
            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium">
              <ExternalLink className="w-3.5 h-3.5" /> View in Recruiter
            </button>
            <button className="ml-auto text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OpenToWorkFeed({ savedCandidates, onToggleSave }) {
  const [projectFilter, setProjectFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const linkedInConnected = false // flip to true once RSC is wired up

  const newCount = mockOpenToWork.filter(c => isNewSignal(c.openToWorkSince)).length

  const filtered = mockOpenToWork.filter(c => {
    if (projectFilter !== 'All' && c.recruiterProject !== projectFilter) return false
    if (typeFilter !== 'All' && c.openToWorkType !== typeFilter) return false
    return true
  })

  return (
    <div className="pb-8">
      {/* LinkedIn connection banner */}
      <LinkedInBanner connected={linkedInConnected} />

      {/* Header */}
      <div className="px-6 mt-5 mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-slate-900">Recently Open to Work</h2>
          {newCount > 0 && (
            <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full font-semibold">{newCount} new</span>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-1">
          {filtered.length} candidates from your Recruiter projects · sorted by most recent signal
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          <select
            value={projectFilter}
            onChange={e => setProjectFilter(e.target.value)}
            className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="All">All projects</option>
            {RECRUITER_PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="All">All signal types</option>
            <option value="Actively looking">Actively looking</option>
            <option value="Open to opportunities">Open to opportunities</option>
          </select>
        </div>
      </div>

      {/* New signals section */}
      {filtered.some(c => isNewSignal(c.openToWorkSince)) && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-green-700 px-2 py-0.5 bg-green-50 rounded-full ring-1 ring-green-200">
              Last 3 days
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="space-y-3">
            {filtered.filter(c => isNewSignal(c.openToWorkSince)).map(c => (
              <OpenToWorkCard key={c.id} candidate={c} isSaved={savedCandidates.has(c.id)} onToggleSave={onToggleSave} />
            ))}
          </div>
        </div>
      )}

      {/* Older signals */}
      {filtered.some(c => !isNewSignal(c.openToWorkSince)) && (
        <div className="px-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-600 px-2 py-0.5 bg-slate-100 rounded-full">
              Earlier
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="space-y-3">
            {filtered.filter(c => !isNewSignal(c.openToWorkSince)).map(c => (
              <OpenToWorkCard key={c.id} candidate={c} isSaved={savedCandidates.has(c.id)} onToggleSave={onToggleSave} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-700 font-medium">No open-to-work signals yet</p>
          <p className="text-slate-400 text-sm mt-1">Signals will appear here when candidates in your projects update their status</p>
        </div>
      )}
    </div>
  )
}
