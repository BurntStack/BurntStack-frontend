// Sample blog content. In production this comes from the Django blog API.
export const BLOG_CATEGORIES = ['All', 'Engineering', 'AI', 'Cloud', 'Design', 'Business']

export const BLOG_POSTS = [
  {
    slug: 'scaling-django-to-millions',
    title: 'Scaling Django to Millions of Requests',
    excerpt:
      'Battle-tested patterns for caching, database indexing and async workers that keep Django fast under load.',
    category: 'Engineering',
    author: 'BurntStack Team',
    date: '2026-07-28',
    readingTime: 8,
    tags: ['Django', 'Performance', 'Scaling'],
    gradient: 'from-orange-200/60 to-sand',
    featured: true,
  },
  {
    slug: 'llm-copilots-for-business',
    title: 'Building LLM Copilots Your Team Will Actually Use',
    excerpt:
      'A practical guide to shipping AI assistants that are helpful, safe and grounded in your own data.',
    category: 'AI',
    author: 'BurntStack Team',
    date: '2026-07-15',
    readingTime: 6,
    tags: ['AI', 'LLM', 'Product'],
    gradient: 'from-amber-300/50 to-ivory',
    featured: false,
  },
  {
    slug: 'cost-optimised-aws',
    title: 'Cost-Optimised AWS Architecture in 2026',
    excerpt:
      'How we cut a client’s cloud bill by 45% without sacrificing reliability or performance.',
    category: 'Cloud',
    author: 'BurntStack Team',
    date: '2026-06-30',
    readingTime: 7,
    tags: ['AWS', 'Cloud', 'FinOps'],
    gradient: 'from-orange-100 to-sand',
    featured: false,
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Scale With Your Product',
    excerpt:
      'Why a token-driven design system is one of the best investments a growing product can make.',
    category: 'Design',
    author: 'BurntStack Team',
    date: '2026-06-12',
    readingTime: 5,
    tags: ['Design', 'UI/UX', 'Systems'],
    gradient: 'from-amber-300/40 to-sand',
    featured: false,
  },
]
