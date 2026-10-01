import Layout from '../components/Layout'
import { BOOK_HREF } from '../site'

export default function NotFound() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 pb-32 pt-40 sm:px-6 md:pt-52">
        <p className="eyebrow">Page not found</p>
        <h1 data-split className="display-xl mt-6">This page has moved on.</h1>
        <p data-reveal className="mt-6 text-lg text-muted">The page you were looking for isn&apos;t here. Try one of these instead.</p>
        <div data-reveal className="mt-10 flex flex-wrap gap-4">
          <a href="/" data-reveal-child className="btn btn-secondary">Home</a>
          <a href={BOOK_HREF} data-reveal-child className="btn btn-primary" data-magnetic>Book a Call</a>
        </div>
      </section>
    </Layout>
  )
}
