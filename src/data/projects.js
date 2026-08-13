// Featured project case studies. Cover images use gradient placeholders
// (see `gradient`) so the site ships without stock photography.
export const PROJECTS = [
  {
    slug: 'medisync-health-platform',
    name: 'MediSync Health Platform',
    category: 'Healthcare',
    gradient: 'from-orange-100 via-amber-300/40 to-sand',
    tech: ['React', 'Django', 'PostgreSQL', 'AWS'],
    problem:
      'A hospital network needed to unify patient records scattered across five legacy systems.',
    solution:
      'We built a HIPAA-aligned platform with real-time record sync, role-based access and analytics.',
    results: '40% faster patient onboarding and a single source of truth across 12 facilities.',
    liveUrl: '#',
    githubUrl: null,
  },
  {
    slug: 'fintrack-analytics',
    name: 'FinTrack Analytics',
    category: 'Finance',
    gradient: 'from-amber-300/50 via-orange-200/50 to-ivory',
    tech: ['React', 'Python', 'Redis', 'TensorFlow'],
    problem:
      'A fintech startup wanted AI-driven insights on transaction data without a data-science team.',
    solution:
      'We delivered a predictive analytics dashboard with anomaly detection and automated reports.',
    results: 'Detected fraud 3x earlier and cut manual reporting time by 80%.',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    slug: 'shopwave-commerce',
    name: 'ShopWave Commerce',
    category: 'E-Commerce',
    gradient: 'from-orange-200/60 via-orange-100 to-sand',
    tech: ['React', 'Django REST', 'PostgreSQL', 'Docker'],
    problem:
      'A retail brand was losing sales to a slow, dated storefront with a clunky checkout.',
    solution:
      'A headless commerce rebuild with one-page checkout, search and personalised recommendations.',
    results: '2.4x conversion uplift and a 55% drop in cart abandonment.',
    liveUrl: '#',
    githubUrl: null,
  },
  {
    slug: 'logiflow-fleet',
    name: 'LogiFlow Fleet',
    category: 'Logistics',
    gradient: 'from-amber-300/40 via-sand to-orange-100',
    tech: ['React', 'Django', 'Redis', 'AWS'],
    problem:
      'A logistics operator lacked real-time visibility into a 500-vehicle delivery fleet.',
    solution:
      'A live tracking platform with route optimisation, driver apps and predictive ETAs.',
    results: '18% lower fuel costs and 99.2% on-time delivery across all regions.',
    liveUrl: '#',
    githubUrl: null,
  },
]
