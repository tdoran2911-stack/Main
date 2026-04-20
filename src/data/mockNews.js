// Realistic mock news for when NewsAPI key is not configured.
// Categories: VC Funding, Earnings, Layoffs, M&A, Tech
export const mockNews = [
  {
    id: 1,
    title: 'Andreessen Horowitz Leads $340M Series D in AI Infrastructure Startup CoreWeave Rival',
    source: 'TechCrunch',
    category: 'VC Funding',
    publishedAt: new Date(Date.now() - 1.2 * 3600000).toISOString(),
    url: '#',
    description: 'The round values the company at $2.1B, making it one of the largest AI infrastructure raises of the quarter.',
  },
  {
    id: 2,
    title: 'Google Q1 2026 Earnings: Cloud Revenue Up 29% YoY, Beats on EPS',
    source: 'Bloomberg',
    category: 'Earnings',
    publishedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    url: '#',
    description: 'Alphabet reported $90.2B in revenue, driven by Search and a record-breaking Cloud quarter fueled by AI workloads.',
  },
  {
    id: 3,
    title: 'Stripe Acquires Stablecoin Payments Startup Bridge for $1.1B',
    source: 'The Information',
    category: 'M&A',
    publishedAt: new Date(Date.now() - 4.5 * 3600000).toISOString(),
    url: '#',
    description: 'The acquisition marks Stripe\'s biggest bet on crypto infrastructure, aiming to expand its global payments footprint.',
  },
  {
    id: 4,
    title: 'Salesforce Announces 2,100 Layoffs, Pivots Headcount Toward AI Engineering',
    source: 'WSJ',
    category: 'Layoffs',
    publishedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    url: '#',
    description: 'Salesforce is cutting 7% of its workforce, the second round of layoffs this year, to reallocate budget toward Agentforce AI product development.',
  },
  {
    id: 5,
    title: 'Sequoia Raises $2.85B New US Venture Fund Amid AI Investment Surge',
    source: 'Reuters',
    category: 'VC Funding',
    publishedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    url: '#',
    description: 'The fund is Sequoia\'s largest in five years, with a stated focus on generative AI, defense tech, and energy infrastructure.',
  },
  {
    id: 6,
    title: 'Microsoft Q3 2026 Earnings: Azure Growth Accelerates to 35%, Copilot Reaches 100M Users',
    source: 'Bloomberg',
    category: 'Earnings',
    publishedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    url: '#',
    description: 'Microsoft stock jumped 6% after hours as Azure cloud growth beat analyst forecasts for the third consecutive quarter.',
  },
  {
    id: 7,
    title: 'Character.AI Raises $200M at $5B Valuation, Google Among Investors',
    source: 'TechCrunch',
    category: 'VC Funding',
    publishedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    url: '#',
    description: 'The consumer AI company is growing revenue 4x YoY, reaching 20M daily active users across its chat products.',
  },
  {
    id: 8,
    title: 'Intel Cuts 15,000 Jobs in Largest Restructuring in Company History',
    source: 'WSJ',
    category: 'Layoffs',
    publishedAt: new Date(Date.now() - 15 * 3600000).toISOString(),
    url: '#',
    description: 'The chip giant is shedding 17% of its global workforce as it struggles to compete with TSMC and NVIDIA in advanced manufacturing.',
  },
  {
    id: 9,
    title: 'Figma Files for IPO, Targeting $12B Valuation After Adobe Deal Collapsed',
    source: 'Bloomberg',
    category: 'Tech',
    publishedAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    url: '#',
    description: 'The design platform is targeting a Q3 2026 IPO following two consecutive years of 30%+ ARR growth after the failed Adobe acquisition.',
  },
  {
    id: 10,
    title: 'Databricks Valued at $62B in Latest Secondary Share Sale',
    source: 'TechCrunch',
    category: 'VC Funding',
    publishedAt: new Date(Date.now() - 22 * 3600000).toISOString(),
    url: '#',
    description: 'The data and AI company is seeing record secondary market demand ahead of a rumored 2026 IPO, with $3B ARR expected by year end.',
  },
  {
    id: 11,
    title: 'Meta Layoffs: 5,000 Performance-Based Cuts Across Product and Engineering',
    source: 'Reuters',
    category: 'Layoffs',
    publishedAt: new Date(Date.now() - 26 * 3600000).toISOString(),
    url: '#',
    description: 'Meta\'s "year of efficiency" continues with a new round focused on middle management and lower-performing engineers.',
  },
  {
    id: 12,
    title: 'Nvidia Reports Record $44B Quarter, Data Center Revenue Up 122%',
    source: 'Bloomberg',
    category: 'Earnings',
    publishedAt: new Date(Date.now() - 30 * 3600000).toISOString(),
    url: '#',
    description: 'GPU demand from cloud hyperscalers and sovereign AI projects drove Nvidia\'s latest blowout quarter, sending shares to all-time highs.',
  },
  {
    id: 13,
    title: 'General Catalyst Leads $150M Round in Defense AI Startup Palantir Rival',
    source: 'TechCrunch',
    category: 'VC Funding',
    publishedAt: new Date(Date.now() - 35 * 3600000).toISOString(),
    url: '#',
    description: 'The company builds autonomous intelligence software for DoD and NATO partners, and is already profitable on $80M ARR.',
  },
  {
    id: 14,
    title: 'Spotify Reaches Profitability Milestone, Surpasses 700M Monthly Active Users',
    source: 'Financial Times',
    category: 'Earnings',
    publishedAt: new Date(Date.now() - 40 * 3600000).toISOString(),
    url: '#',
    description: 'The streaming giant posted its second consecutive profitable quarter as AI-powered podcast and audiobook recommendations boost engagement.',
  },
  {
    id: 15,
    title: 'Perplexity AI Raises $500M Series D at $9B Valuation',
    source: 'The Information',
    category: 'VC Funding',
    publishedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    url: '#',
    description: 'SoftBank Vision Fund led the round, reflecting surging demand for AI-powered search as a Google alternative among knowledge workers.',
  },
]

export function getCategoryColor(category) {
  const colors = {
    'VC Funding': 'bg-green-100 text-green-800',
    'Earnings':   'bg-blue-100 text-blue-800',
    'Layoffs':    'bg-red-100 text-red-800',
    'M&A':        'bg-purple-100 text-purple-800',
    'Tech':       'bg-gray-100 text-gray-700',
  }
  return colors[category] || 'bg-gray-100 text-gray-700'
}

export function getCategoryIcon(category) {
  const icons = {
    'VC Funding': '💰',
    'Earnings':   '📊',
    'Layoffs':    '📉',
    'M&A':        '🤝',
    'Tech':       '⚡',
  }
  return icons[category] || '📰'
}

export function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}
