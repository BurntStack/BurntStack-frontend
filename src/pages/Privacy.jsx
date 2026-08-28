import LegalPage from '@/components/ui/LegalPage.jsx'

const sections = [
  { heading: 'Introduction', body: 'BurntStack Technologies Private Limited (“we”, “us”) respects your privacy. This policy explains what data we collect, why, and how we protect it.' },
  { heading: 'Information We Collect', body: 'We collect information you provide directly, such as your name, email and message when you contact us or subscribe to our newsletter, and basic analytics about how you use our site.' },
  { heading: 'How We Use Your Information', body: 'We use your information to respond to enquiries, deliver our services, improve our website and, with your consent, send you relevant updates. We never sell your data.' },
  { heading: 'Cookies & Analytics', body: 'We use privacy-friendly analytics to understand aggregate usage. You can control cookies through your browser settings at any time.' },
  { heading: 'Data Security', body: 'We apply industry-standard safeguards, including encryption in transit, access controls and regular reviews, to protect your information.' },
  { heading: 'Your Rights', body: 'You may request access to, correction of, or deletion of your personal data at any time by emailing hello@burntstack.com.' },
  { heading: 'Contact', body: 'Questions about this policy? Email us at hello@burntstack.com and we’ll be happy to help.' },
]

export default function Privacy() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy" updated="August 2026" sections={sections} />
}
