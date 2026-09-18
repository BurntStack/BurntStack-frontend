import { useState } from 'react'
import { FiArrowUpRight, FiGlobe, FiPlay, FiRefreshCw, FiX } from 'react-icons/fi'
import './project-browser.css'

/** Only enable embedUrl after the project's host permits our origin. */
export default function ProjectBrowser({ project }) {
  const [interactive, setInteractive] = useState(false)
  const [revision, setRevision] = useState(0)
  const { name, liveUrl, embedUrl, previewImage, previewImageMobile } = project
  const address = new URL(liveUrl).hostname.replace(/^www\./, '')

  return (
    <div className="project-browser">
      <div className="project-browser-bar">
        <span className="browser-dots" aria-hidden="true"><i /><i /><i /></span>
        <a className="browser-address" href={liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${name} in a new tab`}>
          <FiGlobe aria-hidden="true" /><span>{address}</span><FiArrowUpRight aria-hidden="true" />
        </a>
        {interactive && <div className="browser-controls">
          <button onClick={() => setRevision((value) => value + 1)} aria-label={`Reload ${name} preview`}><FiRefreshCw /></button>
          <button onClick={() => setInteractive(false)} aria-label={`Close ${name} live preview`}><FiX /></button>
        </div>}
      </div>

      <div className="project-browser-viewport" data-lenis-prevent={interactive ? '' : undefined}>
        {interactive ? (
          <iframe
            key={revision}
            src={embedUrl}
            title={`${name} interactive website`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="fullscreen"
          />
        ) : (
          <>
            {previewImage ? <picture>
              {previewImageMobile && <source media="(max-width: 760px)" srcSet={previewImageMobile} />}
              <img src={previewImage} alt={`${name} website preview`} width="1360" height="900" loading="lazy" />
            </picture> : <div className="browser-placeholder" aria-hidden="true"><FiGlobe /></div>}
            <div className="browser-preview-action">
              {embedUrl ? <button className="studio-button" onClick={() => setInteractive(true)}><FiPlay /> Explore right here</button> : <a className="studio-button" href={liveUrl} target="_blank" rel="noreferrer">Explore the live site <FiArrowUpRight /></a>}
            </div>
          </>
        )}
      </div>

      <div className="project-browser-caption">
        <span>{interactive ? 'Scroll, click, have a look around.' : embedUrl ? 'A real website. Go on, try it.' : 'Website snapshot · Explore the full site in a new tab.'}</span>
        <a href={liveUrl} target="_blank" rel="noreferrer">Open full site <FiArrowUpRight aria-hidden="true" /></a>
      </div>
    </div>
  )
}
