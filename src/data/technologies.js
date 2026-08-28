import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTensorflow,
  SiLangchain,
  SiGit,
  SiGithubactions,
  SiNginx,
  SiGunicorn,
} from 'react-icons/si'
import { FaMicrosoft, FaAws } from 'react-icons/fa6'
import { RiOpenaiFill } from 'react-icons/ri'

export const TECH_CATEGORIES = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Django', icon: SiDjango, color: '#44B78B' },
      { name: 'Django REST', icon: SiDjango, color: '#A30000' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Redis', icon: SiRedis, color: '#FF4438' },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Azure', icon: FaMicrosoft, color: '#0078D4' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    ],
  },
  {
    category: 'AI',
    items: [
      { name: 'OpenAI', icon: RiOpenaiFill, color: '#10A37F' },
      { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
      { name: 'LangChain', icon: SiLangchain, color: '#1C3C3C' },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'Nginx', icon: SiNginx, color: '#009639' },
      { name: 'Gunicorn', icon: SiGunicorn, color: '#499848' },
    ],
  },
]
