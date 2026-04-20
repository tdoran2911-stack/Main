import { Bookmark, Search, Star, Bell, ChevronDown } from 'lucide-react'

export default function Header({ activeTab, setActiveTab, savedCount }) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-6 flex-shrink-0 shadow-sm z-10">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Search className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-slate-900 text-lg tracking-tight">TalentFind</span>
      </div>

      {/* Tabs */}
      <nav className="flex gap-1">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'search'
              ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Search
        </button>
        <button
          onClick={() => setActiveTab('recommended')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'recommended'
              ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          Recommended
        </button>
      </nav>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {savedCount > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Bookmark className="w-4 h-4 text-brand-600 fill-brand-600" />
            <span className="font-medium">{savedCount} saved</span>
          </div>
        )}
        <button className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 relative">
          <Bell className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm text-slate-700">
          <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">R</div>
          <span className="font-medium">Recruiter</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  )
}
