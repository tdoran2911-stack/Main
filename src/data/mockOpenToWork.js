// Mock candidates pulled from LinkedIn Recruiter projects who have recently signaled open to work.
// In production these come from the LinkedIn Recruiter System Connect (RSC) API:
// https://learn.microsoft.com/en-us/linkedin/talent/recruiter-system-connect

export const RECRUITER_PROJECTS = [
  'NYC Backend Engineers Q2',
  'ML / AI Pipeline Hires',
  'Senior Fullstack — Series B',
  'Trading Systems NYC',
]

export const mockOpenToWork = [
  {
    id: 101,
    name: 'Jordan Williams',
    title: 'Software Engineer',
    currentCompany: 'Stripe',
    location: 'New York, NY',
    yearsOfExperience: 4,
    skills: ['Ruby', 'Python', 'PostgreSQL', 'Go', 'AWS'],
    undergrad: { school: 'Princeton University', degree: 'BS', field: 'Computer Science', year: 2020 },
    grad: { school: 'Carnegie Mellon University', degree: 'MS', field: 'Software Engineering', year: 2022 },
    openToWorkSince: new Date(Date.now() - 1 * 24 * 3600000).toISOString(), // 1 day ago
    openToWorkType: 'Actively looking',
    preferredRoles: ['Senior Software Engineer', 'Staff Engineer'],
    preferredLocations: ['New York, NY', 'Remote'],
    recruiterProject: 'NYC Backend Engineers Q2',
    linkedinUrl: '#',
    matchScore: 91,
  },
  {
    id: 102,
    name: 'Aisha Okafor',
    title: 'Software Engineer',
    currentCompany: 'OpenAI',
    location: 'New York, NY',
    yearsOfExperience: 5,
    skills: ['Python', 'Machine Learning', 'LLMs', 'TypeScript', 'Distributed Systems'],
    undergrad: { school: 'Caltech', degree: 'BS', field: 'Computer Science', year: 2019 },
    grad: { school: 'Stanford University', degree: 'MS', field: 'Computer Science', year: 2021 },
    openToWorkSince: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), // 2 days ago
    openToWorkType: 'Open to opportunities',
    preferredRoles: ['Senior ML Engineer', 'AI Research Engineer'],
    preferredLocations: ['New York, NY', 'San Francisco, CA', 'Remote'],
    recruiterProject: 'ML / AI Pipeline Hires',
    linkedinUrl: '#',
    matchScore: 95,
  },
  {
    id: 103,
    name: 'Marcus Johnson',
    title: 'Software Engineer',
    currentCompany: 'Bloomberg',
    location: 'New York, NY',
    yearsOfExperience: 3,
    skills: ['C++', 'Python', 'Go', 'Data Engineering', 'Redis'],
    undergrad: { school: 'Columbia University', degree: 'BS', field: 'Computer Science', year: 2021 },
    grad: null,
    openToWorkSince: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), // 2 days ago
    openToWorkType: 'Actively looking',
    preferredRoles: ['Software Engineer', 'Senior Software Engineer'],
    preferredLocations: ['New York, NY'],
    recruiterProject: 'Trading Systems NYC',
    linkedinUrl: '#',
    matchScore: 78,
  },
  {
    id: 104,
    name: 'Rachel Lee',
    title: 'Software Engineer',
    currentCompany: 'Databricks',
    location: 'New York, NY',
    yearsOfExperience: 4,
    skills: ['Scala', 'Python', 'Data Engineering', 'Kubernetes', 'AWS'],
    undergrad: { school: 'Carnegie Mellon University', degree: 'BS', field: 'Computer Science', year: 2020 },
    grad: null,
    openToWorkSince: new Date(Date.now() - 4 * 24 * 3600000).toISOString(), // 4 days ago
    openToWorkType: 'Open to opportunities',
    preferredRoles: ['Senior Data Engineer', 'Senior Software Engineer'],
    preferredLocations: ['New York, NY', 'Remote'],
    recruiterProject: 'ML / AI Pipeline Hires',
    linkedinUrl: '#',
    matchScore: 85,
  },
  {
    id: 105,
    name: 'Chris Martinez',
    title: 'Senior Software Engineer',
    currentCompany: 'Spotify',
    location: 'New York, NY',
    yearsOfExperience: 7,
    skills: ['Java', 'Kotlin', 'Microservices', 'Kubernetes', 'GCP'],
    undergrad: { school: 'Georgia Tech', degree: 'BS', field: 'Computer Science', year: 2017 },
    grad: null,
    openToWorkSince: new Date(Date.now() - 5 * 24 * 3600000).toISOString(), // 5 days ago
    openToWorkType: 'Open to opportunities',
    preferredRoles: ['Staff Engineer', 'Principal Engineer'],
    preferredLocations: ['New York, NY'],
    recruiterProject: 'NYC Backend Engineers Q2',
    linkedinUrl: '#',
    matchScore: 82,
  },
  {
    id: 106,
    name: 'Andre Smith',
    title: 'Software Engineer',
    currentCompany: 'JPMorgan Chase',
    location: 'New York, NY',
    yearsOfExperience: 5,
    skills: ['Java', 'Python', 'AWS', 'PostgreSQL', 'Kubernetes'],
    undergrad: { school: 'University of Pennsylvania', degree: 'BS', field: 'Computer Science', year: 2019 },
    grad: null,
    openToWorkSince: new Date(Date.now() - 6 * 24 * 3600000).toISOString(), // 6 days ago
    openToWorkType: 'Actively looking',
    preferredRoles: ['Senior Software Engineer', 'Tech Lead'],
    preferredLocations: ['New York, NY'],
    recruiterProject: 'Trading Systems NYC',
    linkedinUrl: '#',
    matchScore: 80,
  },
  {
    id: 107,
    name: 'Natasha Ivanova',
    title: 'Senior Software Engineer',
    currentCompany: 'Cloudflare',
    location: 'New York, NY',
    yearsOfExperience: 8,
    skills: ['Go', 'Rust', 'C++', 'Distributed Systems', 'Kubernetes'],
    undergrad: { school: 'Georgia Tech', degree: 'BS', field: 'Computer Engineering', year: 2016 },
    grad: null,
    openToWorkSince: new Date(Date.now() - 9 * 24 * 3600000).toISOString(), // 9 days ago
    openToWorkType: 'Open to opportunities',
    preferredRoles: ['Staff Engineer', 'Principal Engineer'],
    preferredLocations: ['New York, NY', 'Remote'],
    recruiterProject: 'Senior Fullstack — Series B',
    linkedinUrl: '#',
    matchScore: 77,
  },
  {
    id: 108,
    name: 'Zoe Anderson',
    title: 'Software Engineer',
    currentCompany: 'Twilio',
    location: 'New York, NY',
    yearsOfExperience: 5,
    skills: ['Python', 'Node.js', 'AWS', 'Microservices', 'PostgreSQL'],
    undergrad: { school: 'Brown University', degree: 'BS', field: 'Computer Science', year: 2019 },
    grad: null,
    openToWorkSince: new Date(Date.now() - 11 * 24 * 3600000).toISOString(), // 11 days ago
    openToWorkType: 'Open to opportunities',
    preferredRoles: ['Senior Software Engineer', 'Backend Engineer'],
    preferredLocations: ['New York, NY', 'Remote'],
    recruiterProject: 'NYC Backend Engineers Q2',
    linkedinUrl: '#',
    matchScore: 74,
  },
]

export const NEW_SIGNAL_THRESHOLD_DAYS = 3

export function isNewSignal(openToWorkSince) {
  const diffDays = (Date.now() - new Date(openToWorkSince).getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= NEW_SIGNAL_THRESHOLD_DAYS
}

export function signalAge(openToWorkSince) {
  const diffDays = Math.floor((Date.now() - new Date(openToWorkSince).getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  return `${diffDays} days ago`
}
