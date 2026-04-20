import { Bookmark, ExternalLink, Mail, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react'
import { isPreferredSchool } from '../data/schools.js'

const AVATAR_COLORS = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-orange-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-amber-500', 'bg-indigo-500',
]

function getAvatarColor(name) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function MatchBadge({ score }) {
  const color = score >= 85 ? 'text-emerald-700 bg-emerald-50 ring-emerald-200'
    : score >= 65 ? 'text-blue-700 bg-blue-50 ring-blue-200'
    : 'text-slate-600 bg-slate-50 ring-slate-200'
  return (
    <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ring-1 ${color}`}>
      <span>{score}%</span>
      <span className="text-xs font-normal">match</span>
    </div>
  )
}

function SchoolBadge({ school, degree, field, year }) {
  const preferred = isPreferredSchool(school)
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
      preferred ? 'bg-amber-50 text-amber-800 ring-1 ring-amber-200' : 'bg-slate-100 text-slate-600'
    }`}>
      {preferred && <span className="text-amber-500">★</span>}
      {school} · {degree}
    </span>
  )
}

export default function CandidateCard({ candidate, isSaved, onToggleSave, showMatchScore = false }) {
  const { name, title, currentCompany, location, yearsOfExperience, skills, undergrad, grad, openToWork, bio, matchScore } = candidate

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-base ${getAvatarColor(name)}`}>
          {initials(name)}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-slate-900 text-base">{name}</h3>
                {openToWork && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium ring-1 ring-green-200">
                    Open to work
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                {title} <span className="text-slate-400">at</span> <span className="font-medium text-slate-700">{currentCompany}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {showMatchScore && <MatchBadge score={matchScore} />}
              <button
                onClick={() => onToggleSave(candidate.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved ? 'text-brand-600 bg-brand-50 hover:bg-brand-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Unsave' : 'Save candidate'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />{location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />{yearsOfExperience} yrs exp
            </span>
          </div>

          {/* Bio */}
          <p className="text-xs text-slate-500 mt-2 line-clamp-2">{bio}</p>

          {/* Education */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <SchoolBadge {...undergrad} school={undergrad.school} />
            {grad && <SchoolBadge {...grad} school={grad.school} />}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {skills.slice(0, 6).map(skill => (
              <span key={skill} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                {skill}
              </span>
            ))}
            {skills.length > 6 && (
              <span className="text-xs px-2 py-0.5 text-slate-400">+{skills.length - 6}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium">
              <Mail className="w-3.5 h-3.5" />
              Connect
            </button>
            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium">
              <ExternalLink className="w-3.5 h-3.5" />
              View Profile
            </button>
            <button className="ml-auto text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Not a fit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
