import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { PROJECTS } from '@/data/projects.js'
import ProjectBrowser from './ProjectBrowser.jsx'

export default function ProjectShowcase() {
  const [selected, setSelected] = useState(0)
  const project = PROJECTS[selected]
  return (
    <div className="project-showcase">
      <div className="project-selector" role="group" aria-label="Choose a client project">
        {PROJECTS.map((item, index) => <button
          key={item.slug}
          onClick={() => setSelected(index)}
          aria-pressed={selected === index}
          aria-controls="selected-project"
        ><span>{item.name}</span><FiArrowUpRight aria-hidden="true" /></button>)}
      </div>
      <article className="featured-project" id="selected-project" aria-label={project.name}>
        <ProjectBrowser key={project.slug} project={project} />
        <div className="project-caption">
          <div aria-live="polite"><h3>{project.name}</h3><p>{project.blurb}</p></div>
          <div className="project-tags">
            <span>{project.category}</span>
            {project.status && <span>{project.status}</span>}
            <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}><FiArrowUpRight /></a>
          </div>
        </div>
      </article>
    </div>
  )
}
