import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you | Kodiak Strategy",
  description: "Your request is in. Ryan will follow up within one business day.",
  // A conversion landing page has no business in search results.
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="site-shell theme-c">
      <header className="site-header">
        <Link href="/" className="brand">
          <img className="brand-logo" src="/kodiak-logo.png" alt="Kodiak Strategy" />
        </Link>
        <span className="brand-line">
          Rugged intelligence
          <br />
          for real operations
        </span>
      </header>

      <section className="hero inner-hero">
        <div className="hero-copy">
          <span className="eyebrow">Request received</span>
          <h1>Thank you for your request.</h1>
          <p>
            I will give you a call within one business day. Watch for a
            confirmation in your inbox in the next minute or two.
          </p>
          <p>
            If it is quicker to talk, call or text me directly at{" "}
            <a href="tel:+19075004010">(907) 500-4010</a>.
          </p>
          <Link className="primary-button" href="/">
            Back to the site
          </Link>
        </div>
      </section>

      <footer>
        <div className="footer-brand">Kodiak Strategy</div>
        <p>Built into the operation. Not bolted on.</p>
        <div className="footer-links">
          <a href="mailto:ryan@kodiakstrategy.com">ryan@kodiakstrategy.com</a>
          <a href="tel:+19075004010">(907) 500-4010</a>
        </div>
      </footer>
    </main>
  );
}
