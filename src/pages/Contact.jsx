import Cal from '@calcom/embed-react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Seo from '@/components/seo/Seo.jsx'
import { buildBreadcrumbSchema } from '@/lib/schema.js'
import PageHero from '@/components/ui/PageHero.jsx'
import Band from '@/components/editorial/Band.jsx'
import Label from '@/components/editorial/Label.jsx'
import Display from '@/components/editorial/Display.jsx'
import { COMPANY, SOCIALS } from '@/data/site.js'
import { CONTACT_CHANNELS } from '@/data/offer.js'
import { CAL_LINK } from '@/lib/cal.js'

const CHANNELS = [
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Fastest way to reach us',
    href: CONTACT_CHANNELS.whatsapp,
    external: true,
  },
  { icon: FiPhone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
  { icon: FiMail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: FiMapPin, label: 'Office', value: COMPANY.address },
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Talk to BurntStack about your website or online store. Book a free 30-minute consultation, message us on WhatsApp, or call us directly."
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Talk to us about"
        accent="your project."
        description="Book a free call, or skip straight to a written quote if you already know what you need."
      />

      {/* Channels as a ruled row - the fastest routes first, in order of
          how quickly someone actually gets a reply. */}
      <Band tone="canvas" spacing="tight">
        <dl className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map(({ icon: Icon, label, value, href, external }) => {
            const body = (
              <>
                <dt className="t-label flex items-center gap-2 text-mute">
                  <Icon className="h-4 w-4 text-orange-500" />
                  {label}
                </dt>
                <dd className="mt-3 text-[0.95rem] leading-relaxed text-ink">{value}</dd>
              </>
            )
            const shared =
              'block border-b border-line py-7 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0'
            return href ? (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className={`${shared} group transition-colors hover:bg-sand/60`}
              >
                {body}
              </a>
            ) : (
              <div key={label} className={shared}>
                {body}
              </div>
            )
          })}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-slate transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:text-orange-600"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Band>

      <Band tone="ivory">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Label>Book a call</Label>
            <Display className="mt-6 max-w-[12ch]" accent="no back-and-forth.">
              Free 30 minutes,
            </Display>
            <p className="mt-6 text-slate">
              Pick a time that suits you. We’ll come prepared with questions about the business, not
              a sales script.
            </p>
          </div>
          <div className="min-h-[560px] overflow-hidden rounded-sm border border-line bg-canvas">
            <Cal calLink={CAL_LINK} style={{ width: '100%', height: '100%' }} config={{ layout: 'month_view' }} />
          </div>
        </div>
      </Band>

      <Band tone="canvas" spacing="tight">
        <div className="overflow-hidden rounded-sm border border-line">
          <iframe
            title="BurntStack office location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            className="h-72 w-full grayscale-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Band>
    </>
  )
}
