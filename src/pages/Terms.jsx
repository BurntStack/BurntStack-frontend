import LegalPage from '@/components/ui/LegalPage.jsx'

const sections = [
  { heading: 'Acceptance of Terms', body: 'By accessing or using the BurntStack website and services, you agree to be bound by these Terms & Conditions.' },
  { heading: 'Services', body: 'We provide software design, development and consulting services. The specific scope of any engagement is defined in a separate agreement or statement of work.' },
  { heading: 'Intellectual Property', body: 'All content on this website is owned by BurntStack Technologies unless otherwise stated. Deliverables produced under a client engagement transfer per the terms of that agreement.' },
  { heading: 'Payment Terms', body: 'Fees, milestones and payment schedules are defined per project. Invoices are due within the period specified in your agreement.' },
  { heading: 'Confidentiality', body: 'We treat client information as confidential and are happy to sign a mutual NDA before discussing any project in detail.' },
  { heading: 'Limitation of Liability', body: 'To the maximum extent permitted by law, BurntStack is not liable for indirect or consequential damages arising from the use of our website or services.' },
  { heading: 'Governing Law', body: 'These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Warangal, Telangana.' },
]

export default function Terms() {
  return <LegalPage title="Terms & Conditions" path="/terms" updated="August 2026" sections={sections} />
}
