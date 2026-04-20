import { useState } from 'react'
import { ChevronDown, ChevronUp, X, SlidersHorizontal, RotateCcw } from 'lucide-react'
import { ALL_SCHOOLS, PREFERRED_SCHOOLS, DEGREE_FIELDS, DEGREE_TYPES } from '../data/schools.js'
import { SKILLS_LIST } from '../data/mockCandidates.js'

const SKILLS = [...new Set([...SKILLS_LIST])]

const SENIORITY_OPTIONS = ['Junior', 'Mid', 'Senior', 'Staff', 'Principal']

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-slate-400"
    />
  )
}

function MultiSelectChip({ options, selected, onChange, preferredOptions = [] }) {
  const [search, setSearch] = useState('')
  const sorted = [...options].sort((a, b) => {
    const aP = preferredOptions.includes(a)
    const bP = preferredOptions.includes(b)
    if (aP && !bP) return -1
    if (!aP && bP) return 1
    return a.localeCompare(b)
  })
  const filtered = sorted.filter(o => o.toLowerCase().includes(search.toLowerCase()))

  const toggle = (val) => {
    onChange(selected.includes(val) ? selected.filter(s => s !== val) : [...selected, val])
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder:text-slate-400"
      />
      <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-thin">
        {filtered.map(opt => {
          const isPreferred = preferredOptions.includes(opt)
          const isSelected = selected.includes(opt)
          return (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(opt)}
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
              />
              <span className={`text-xs flex-1 ${isSelected ? 'text-brand-700 font-medium' : 'text-slate-700'}`}>
                {opt}
              </span>
              {isPreferred && (
                <span className="text-xs px-1 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">★</span>
              )}
            </label>
          )
        })}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {selected.map(s => (
            <span key={s} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full">
              {s.replace('University', 'Univ.').replace('Carnegie Mellon', 'CMU').replace('University of Illinois (UIUC)', 'UIUC').replace('University of Pennsylvania', 'UPenn')}
              <button onClick={() => toggle(s)}><X className="w-2.5 h-2.5" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function SkillsSelector({ selected, onChange }) {
  const toggle = (skill) => {
    onChange(selected.includes(skill) ? selected.filter(s => s !== skill) : [...selected, skill])
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {SKILLS.map(skill => (
        <button
          key={skill}
          onClick={() => toggle(skill)}
          className={`text-xs px-2 py-1 rounded-md border transition-colors ${
            selected.includes(skill)
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-slate-600 border-slate-200 hover:border-brand-400 hover:text-brand-600'
          }`}
        >
          {skill}
        </button>
      ))}
    </div>
  )
}

function RangeRow({ label, min, max, value, onChange, suffix = 'yrs' }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span className="font-medium text-slate-700">{value[0]}–{value[1]} {suffix}</span>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={value[0]}
          onChange={e => onChange([Number(e.target.value), value[1]])}
          className="flex-1 text-xs px-2 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          {Array.from({ length: max - min + 1 }, (_, i) => min + i).map(n => (
            <option key={n} value={n} disabled={n > value[1]}>{n}</option>
          ))}
        </select>
        <span className="text-xs text-slate-400">to</span>
        <select
          value={value[1]}
          onChange={e => onChange([value[0], Number(e.target.value)])}
          className="flex-1 text-xs px-2 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          {Array.from({ length: max - min + 1 }, (_, i) => min + i).map(n => (
            <option key={n} value={n} disabled={n < value[0]}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default function SearchFilters({ filters, setFilters, onReset }) {
  const set = (key) => (val) => setFilters(f => ({ ...f, [key]: val }))

  const activeCount = [
    filters.keywords,
    filters.title,
    filters.company,
    filters.skills.length > 0,
    filters.undergradSchools.length > 0,
    filters.gradSchools.length > 0,
    filters.degreeField,
    filters.openToWork,
    filters.seniority.length > 0,
    filters.minExp !== 2 || filters.maxExp !== 10,
  ].filter(Boolean).length

  return (
    <div>
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-800">Filters</span>
          {activeCount > 0 && (
            <span className="text-xs px-1.5 py-0.5 bg-brand-600 text-white rounded-full font-medium">{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset} className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors">
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <Section title="Keywords">
        <TextInput value={filters.keywords} onChange={set('keywords')} placeholder="e.g. Kubernetes, LLMs, fintech..." />
      </Section>

      <Section title="Job Title">
        <TextInput value={filters.title} onChange={set('title')} placeholder="e.g. Senior Engineer, Staff..." />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {['Software Engineer', 'Senior', 'Staff', 'Principal'].map(t => (
            <button key={t} onClick={() => set('title')(filters.title === t ? '' : t)}
              className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                filters.title === t ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-400'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Current Company">
        <TextInput value={filters.company} onChange={set('company')} placeholder="e.g. Google, Two Sigma..." />
      </Section>

      <Section title="Years of Experience">
        <RangeRow
          label="Range"
          min={1} max={15}
          value={[filters.minExp, filters.maxExp]}
          onChange={([min, max]) => setFilters(f => ({ ...f, minExp: min, maxExp: max }))}
        />
      </Section>

      <Section title="Seniority Level">
        <div className="flex flex-wrap gap-1.5">
          {SENIORITY_OPTIONS.map(s => {
            const active = filters.seniority.includes(s)
            return (
              <button key={s} onClick={() => set('seniority')(active ? filters.seniority.filter(x => x !== s) : [...filters.seniority, s])}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  active ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-400'
                }`}>
                {s}
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Skills & Technologies">
        <SkillsSelector selected={filters.skills} onChange={set('skills')} />
      </Section>

      <Section title="Undergraduate School">
        <div className="mb-2 text-xs text-amber-600 flex items-center gap-1">
          <span>★</span> = Preferred school
        </div>
        <MultiSelectChip
          options={ALL_SCHOOLS}
          selected={filters.undergradSchools}
          onChange={set('undergradSchools')}
          preferredOptions={PREFERRED_SCHOOLS}
        />
      </Section>

      <Section title="Graduate School" defaultOpen={false}>
        <MultiSelectChip
          options={ALL_SCHOOLS}
          selected={filters.gradSchools}
          onChange={set('gradSchools')}
          preferredOptions={PREFERRED_SCHOOLS}
        />
      </Section>

      <Section title="Degree Field" defaultOpen={false}>
        <select
          value={filters.degreeField}
          onChange={e => set('degreeField')(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Any field</option>
          {DEGREE_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </Section>

      <Section title="Availability" defaultOpen={false}>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => set('openToWork')(!filters.openToWork)}
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${filters.openToWork ? 'bg-brand-600' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.openToWork ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm text-slate-700">Open to work only</span>
        </label>
      </Section>
    </div>
  )
}
