import Cal from '@calcom/embed-react'
import { FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi'
import Seo from '@/components/seo/Seo.jsx'
import PageHero from '@/components/ui/PageHero.jsx'
import Section from '@/components/ui/Section.jsx'
import Container from '@/components/ui/Container.jsx'
import { BentoGrid, BentoCard, BentoIcon, BentoHeading } from '@/components/ui/Bento.jsx'
import { COMPANY, SOCIALS } from '@/data/site.js'
import { CAL_LINK } from '@/lib/cal.js'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Get in touch with BurntStack Technologies. Book a free consultation today."
      />
      <PageHero
        eyebrow="Contact"
        title="Let’s build something together"
        description="Pick a time that works for you and we’ll get on a call within a few days."
      />

      <Section className="pt-0">
        <Container>
          <BentoGrid cols="grid-cols-2 lg:grid-cols-6">
            {/* Info + map */}
            <BentoCard span="col-span-2 lg:col-span-2" tone="ivory" hover={false} className="gap-4">
              {[
                { icon: FiMail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: FiPhone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: FiMapPin, label: 'Office', value: COMPANY.address },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 rounded-bento-sm border border-line bg-white p-5 transition-colors hover:border-orange-300/70"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-xl text-orange-600">
                    <Icon />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink">{label}</div>
                    <div className="text-sm text-slate">{value}</div>
                  </div>
                </a>
              ))}

              <div className="flex gap-3 px-1">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-white text-slate transition-all hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-600"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <div className="overflow-hidden rounded-bento-sm border border-line">
                <iframe
                  title="BurntStack office location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="h-56 w-full grayscale-[0.3]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </BentoCard>

            {/* Booking */}
            <BentoCard span="col-span-2 lg:col-span-4" tone="surface" hover={false} size="none" className="p-6 sm:p-8">
              <div className="flex h-full flex-col gap-6">
                <div className="flex items-center gap-4">
                  <BentoIcon icon={FiCalendar} />
                  <BentoHeading
                    eyebrow="Book a call"
                    title="Free 30-minute consultation"
                    description="Pick a time that works for you — no back-and-forth emails."
                    className="gap-1"
                  />
                </div>
                <div className="min-h-[560px] flex-1 overflow-hidden rounded-bento-sm border border-line">
                  <Cal
                    calLink={CAL_LINK}
                    style={{ width: '100%', height: '100%' }}
                    config={{ layout: 'month_view' }}
                  />
                </div>
              </div>
            </BentoCard>
          </BentoGrid>
        </Container>
      </Section>
    </>
  )
}
