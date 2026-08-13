import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiBriefcase, FiCheck } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Button from '@/components/ui/Button.jsx'
import { JOB_OPENINGS, PERKS } from '@/data/careers.js'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion.js'

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState('')

  return (
    <>
      <Seo
        title="Careers"
        path="/careers"
        description="Join BurntStack Technologies — build great software with a remote-first team."
      />
      <PageHero
        eyebrow="Careers"
        title="Build the future with us"
        description="We’re a remote-first team of engineers, designers and problem-solvers who love shipping great software."
      />

      {/* Perks */}
      <Section className="pt-0">
        <Container>
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PERKS.map((perk) => (
              <motion.div
                key={perk}
                variants={fadeInUp}
                className="flex items-center gap-3 rounded-2xl border border-border-base bg-surface px-6 py-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                  <FiCheck className="h-4 w-4" />
                </span>
                <span className="font-medium text-foreground">{perk}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Openings */}
      <Section id="openings" className="bg-background-secondary">
        <Container>
          <SectionHeading eyebrow="Open Roles" title="Current openings" />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-12 max-w-4xl space-y-4"
          >
            {JOB_OPENINGS.map((job) => (
              <motion.div
                key={job.id}
                variants={fadeInUp}
                className="group flex flex-col gap-4 rounded-3xl border border-border-base bg-surface p-6 transition-colors hover:border-ember-400/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{job.title}</h3>
                  <p className="mt-1 text-sm text-muted">{job.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5"><FiBriefcase className="h-3.5 w-3.5" /> {job.department}</span>
                    <span className="flex items-center gap-1.5"><FiMapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="rounded-full bg-ember-500/10 px-2.5 py-0.5 font-semibold text-ember-500">{job.type}</span>
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
              </motion.div>
            ))}
          </motion.div>
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
      <div className="mt-10 rounded-3xl border border-ember-500/30 bg-surface p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ember-500/10 text-2xl text-ember-500">
          <FiCheck />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-foreground">Application received!</h3>
        <p className="mt-2 text-muted">Thanks for applying — our team will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid gap-5 rounded-3xl border border-border-base bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Role" name="role" defaultValue={selectedRole} placeholder="Which role?" required />
      </div>
      <Field label="Portfolio / LinkedIn URL" name="portfolio" type="url" />
      <div className="flex flex-col gap-2">
        <label htmlFor="cover" className="text-sm font-medium text-foreground">Why BurntStack?</label>
        <textarea
          id="cover"
          name="cover"
          rows={4}
          className="rounded-2xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ember-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="resume" className="text-sm font-medium text-foreground">Résumé (PDF)</label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="rounded-2xl border border-border-strong bg-background px-4 py-3 text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ember-500 file:px-4 file:py-1.5 file:text-white"
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
      <label htmlFor={name} className="text-sm font-medium text-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="rounded-2xl border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ember-400"
        {...props}
      />
    </div>
  )
}
