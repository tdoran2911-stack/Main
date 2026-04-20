export const IVY_LEAGUE = [
  'Harvard University',
  'Yale University',
  'Princeton University',
  'Columbia University',
  'University of Pennsylvania',
  'Brown University',
  'Dartmouth College',
  'Cornell University',
]

export const PREFERRED_SCHOOLS = [
  ...IVY_LEAGUE,
  'Stanford University',
  'MIT',
  'Caltech',
  'Carnegie Mellon University',
  'Duke University',
  'University of Illinois (UIUC)',
  'Georgia Tech',
]

export const ALL_SCHOOLS = [
  ...PREFERRED_SCHOOLS,
  'NYU',
  'Boston University',
  'Northeastern University',
  'Rutgers University',
  'CUNY',
  'University of Michigan',
  'UCLA',
  'UC Berkeley',
  'University of Texas',
  'University of Washington',
  'Other',
]

export const DEGREE_FIELDS = [
  'Computer Science',
  'Computer Engineering',
  'Electrical Engineering',
  'Mathematics',
  'Physics',
  'Statistics',
  'Data Science',
  'Software Engineering',
  'Information Systems',
  'Other STEM',
]

export const DEGREE_TYPES = ['BS', 'BA', 'MS', 'MEng', 'PhD', 'MBA']

export const isPreferredSchool = (school) => PREFERRED_SCHOOLS.includes(school)
