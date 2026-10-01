import Layout from '../components/Layout'
import { CONTACT_EMAIL } from '../site'

export default function Privacy() {
  return (
    <Layout current="/privacy/">
      <section className="mx-auto max-w-3xl px-4 pb-28 pt-36 sm:px-6 md:pt-44">
        <p className="placeholder-note">Placeholder pending legal review. This page will be updated before it is final.</p>
        <h1 data-split className="display-xl mt-8">Privacy</h1>
        <div data-reveal className="prose-plain mt-10">
          <p data-reveal-child className="text-faint">Last updated: 2026</p>

          <h2 data-reveal-child>What we collect</h2>
          <p data-reveal-child>
            When you fill in the Book a Call form, we collect the details you choose to give us: your name,
            company, industry, email address, phone number, where your firm is on carbon today, and anything
            else you write in the message field.
          </p>

          <h2 data-reveal-child>How we use it</h2>
          <p data-reveal-child>
            We use this information only to respond to you and to schedule a call. We do not use it for
            anything else, and we do not add you to a mailing list without asking.
          </p>

          <h2 data-reveal-child>How it is handled</h2>
          <p data-reveal-child>
            Form submissions are processed by the services that host this site and deliver form messages to our
            inbox. They only handle the data so we can receive your request.
          </p>

          <h2 data-reveal-child>We don&apos;t sell personal information</h2>
          <p data-reveal-child>We do not sell, rent or trade your personal information to anyone.</p>

          <h2 data-reveal-child>Questions</h2>
          <p data-reveal-child>
            For any privacy question, or to ask us to update or delete your information, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </section>
    </Layout>
  )
}
