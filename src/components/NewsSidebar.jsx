import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, Newspaper, ExternalLink, Clock } from 'lucide-react'
import { mockNews, getCategoryColor, getCategoryIcon, timeAgo } from '../data/mockNews.js'

const NEWS_CATEGORIES = ['All', 'VC Funding', 'Earnings', 'Layoffs', 'M&A', 'Tech']

const NEWSAPI_QUERY = 'tech+startup+funding+OR+layoffs+OR+earnings+OR+acquisition'
const REFRESH_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

function formatNewsApiArticles(articles) {
  return articles
    .filter(a => a.title && a.title !== '[Removed]')
    .map((a, i) => ({
      id: i,
      title: a.title,
      source: a.source?.name || 'Unknown',
      category: inferCategory(a.title + ' ' + (a.description || '')),
      publishedAt: a.publishedAt,
      url: a.url,
      description: a.description,
    }))
}

function inferCategory(text) {
  const t = text.toLowerCase()
  if (t.includes('layoff') || t.includes('cut') || t.includes('fired') || t.includes('job loss')) return 'Layoffs'
  if (t.includes('funding') || t.includes('series') || t.includes('raises') || t.includes('venture') || t.includes('vc ')) return 'VC Funding'
  if (t.includes('earnings') || t.includes('revenue') || t.includes('profit') || t.includes('quarter') || t.includes('ipo')) return 'Earnings'
  if (t.includes('acqui') || t.includes('merger') || t.includes('buys') || t.includes('purchase')) return 'M&A'
  return 'Tech'
}

function NewsItem({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
    >
      <div className="flex items-start gap-2 mb-1.5">
        <span className="text-base leading-none mt-0.5">{getCategoryIcon(article.category)}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-brand-700 transition-colors line-clamp-3">
            {article.title}
          </p>
        </div>
      </div>
      {article.description && (
        <p className="text-xs text-slate-500 line-clamp-2 ml-6 mb-2">{article.description}</p>
      )}
      <div className="flex items-center gap-2 ml-6">
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${getCategoryColor(article.category)}`}>
          {article.category}
        </span>
        <span className="text-xs text-slate-400">{article.source}</span>
        <span className="text-xs text-slate-400 ml-auto flex items-center gap-0.5">
          <Clock className="w-2.5 h-2.5" />{timeAgo(article.publishedAt)}
        </span>
      </div>
    </a>
  )
}

export default function NewsSidebar() {
  const [articles, setArticles] = useState(mockNews)
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [usingApi, setUsingApi] = useState(false)
  const [nextRefreshIn, setNextRefreshIn] = useState(REFRESH_INTERVAL_MS / 1000)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY
      if (apiKey) {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${NEWSAPI_QUERY}&language=en&sortBy=publishedAt&pageSize=30&apiKey=${apiKey}`
        )
        if (res.ok) {
          const data = await res.json()
          if (data.articles?.length) {
            setArticles(formatNewsApiArticles(data.articles))
            setUsingApi(true)
          }
        }
      }
    } catch {
      // Fall through to mock data
    } finally {
      setLoading(false)
      setLastUpdated(new Date())
      setNextRefreshIn(REFRESH_INTERVAL_MS / 1000)
    }
  }, [])

  // Initial fetch + interval
  useEffect(() => {
    fetchNews()
    const interval = setInterval(fetchNews, REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [fetchNews])

  // Countdown timer
  useEffect(() => {
    const tick = setInterval(() => {
      setNextRefreshIn(n => (n <= 1 ? REFRESH_INTERVAL_MS / 1000 : n - 1))
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  const displayed = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-800">Tech News</span>
            {usingApi && (
              <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">Live</span>
            )}
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
            title="Refresh now"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span>Updated {timeAgo(lastUpdated.toISOString())}</span>
          <span>·</span>
          <span>Next refresh in {formatCountdown(nextRefreshIn)}</span>
        </div>
        {!usingApi && (
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Showing sample headlines.{' '}
            <span className="text-brand-600">Add VITE_NEWS_API_KEY to .env for live news.</span>
          </p>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-slate-100 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {NEWS_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-1 py-2">
        {loading && articles.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <RefreshCw className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : displayed.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">No articles in this category</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayed.map(a => <NewsItem key={a.id} article={a} />)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-slate-100 px-4 py-2.5">
        <p className="text-xs text-slate-400 text-center">
          Sources: TechCrunch · Bloomberg · WSJ · Reuters · The Information
        </p>
      </div>
    </div>
  )
}
