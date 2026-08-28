import { useState } from 'react'
import { FiMapPin, FiBriefcase, FiCheck } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import { BentoGrid, BentoCard } from '@/components/ui/Bento.jsx'
import { JOB_OPENINGS, PERKS } from '@/data/careers.js'

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState('')

  return (
    <>
      <Seo
        title="Careers"
        path="/careers"
        description="Join BurntStack Technologies and build great software with a remote-first team."
      />
      <PageHero
        eyebrow="Careers"
        title="Build the future with us"
        description="We’re a remote-first team of engineers, designers and problem-solvers who love shipping great software."
      />

      {/* Perks */}
      <Section className="pt-0">
        <Container>
          <BentoGrid cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {PERKS.map((perk) => (
              <BentoCard key={perk} span="col-span-2 sm:col-span-1 lg:col-span-2" tone="surface" size="sm" direction="row" className="items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                  <FiCheck className="h-4 w-4" />
                </span>
                <span className="font-medium text-ink">{perk}</span>
              </BentoCard>
            ))}
          </BentoGrid>
        </Container>
      </Section>

      {/* Openings */}
      <Section id="openings" className="bg-ivory">
        <Container>
          <SectionHeading eyebrow="Open Roles" title="Current openings" />
          <BentoGrid className="mx-auto mt-12 max-w-4xl" cols="grid-cols-1">
            {JOB_OPENINGS.map((job) => (
              <BentoCard key={job.id} span="col-span-1" tone="surface" className="items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{job.title}</h3>
                  <p className="mt-1 text-sm text-slate">{job.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate">
                    <span className="flex items-center gap-1.5"><FiBriefcase className="h-3.5 w-3.5" /> {job.department}</span>
                    <span className="flex items-center gap-1.5"><FiMapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 font-semibold text-orange-600">{job.type}</span>
                  </div>
                </div>
                <Button
                  href="#apply"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedRole(job.title)}
                  className="shrink-0"
                >
                  Apply Now
                </Button>
              </BentoCard>
            ))}
          </BentoGrid>
        </Container>
      </Section>

      {/* Application form */}
      <Section id="apply">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Apply" title="Send us your application" />
          <ApplicationForm selectedRole={selectedRole} />
        </Container>
      </Section>
    </>
  )
}

function ApplicationForm({ selectedRole }) {
  const [status, setStatus] = useState('idle')

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // POST to /api/careers/applications/ in production (multipart for the résumé).
    setTimeout(() => setStatus('done'), 900)
  }

  if (status === 'done') {
    return (
      <div className="mt-10 rounded-bento border border-orange-300/60 bg-white p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl text-orange-600">
          <FiCheck />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">Application received!</h3>
        <p className="mt-2 text-slate">Thanks for applying. Our team will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-5 rounded-bento border border-line bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Role" name="role" defaultValue={selectedRole} placeholder="Which role?" required />
      </div>
      <Field label="Portfolio / LinkedIn URL" name="portfolio" type="url" />
      <div className="flex flex-col gap-2">
        <label htmlFor="cover" className="text-sm font-medium text-ink">Why BurntStack?</label>
        <textarea
          id="cover"
          name="cover"
          rows={4}
          className="rounded-xl border border-line-strong bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-orange-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="resume" className="text-sm font-medium text-ink">Résumé (PDF)</label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="rounded-xl border border-line-strong bg-canvas px-4 py-3 text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-orange-500 file:px-4 file:py-1.5 file:text-white"
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting…' : 'Submit Application'}
      </Button>
    </form>
  )
}

function Field({ label, name, type = 'text', ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-ink">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="rounded-xl border border-line-strong bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-orange-400"
        {...props}
      />
    </div>
  )
}
