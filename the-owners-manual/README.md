# The Owner's Manual

A standalone funnel to sell a $3.99 intro AI course to small business owners.
Fully independent project — no shared code or branding with anything else.

## Files
- `index.html` — the funnel landing page (self-contained: all CSS/JS inline).
- `vercel.json` — clean-URL config for its own Vercel project.

## Go-live checklist
1. **Domain** — register your `.com`/`.co` and point it at this Vercel project.
2. **Stripe Payment Link** — create a $3.99 link (steps below), then paste the URL
   into `data-checkout="..."` on the `<body>` tag of `index.html`. Every button
   reads from that one attribute.
3. **Pixels** — paste your TikTok + Meta pixel base code into the two stubs in
   `<head>` (search "PIXEL"). Uncomment the `ttq.track` / `fbq('track', ...)`
   lines in the footer `<script>` to fire an InitiateCheckout event on click.
4. **Social links** — update the `@theownersmanual` Instagram/TikTok URLs in the
   footer.
5. **Legal** — add `/terms`, `/privacy`, `/refund` pages (linked in footer).

## Stripe Payment Link (no-code, ~10 min)
1. Stripe Dashboard → **Product catalog** → add product "The Owner's Manual",
   one-time price **$3.99**.
2. **Payment Links** → create link for that product.
3. Under **After payment**, choose **Show confirmation page** (or redirect to a
   `/thank-you` page) and enable Stripe's confirmation email / receipt.
4. Turn on **"Collect customer email"** so delivery can be automated.
5. Copy the link URL → paste into `data-checkout` in `index.html`.

## Delivery email (automatic)
Options, simplest first:
- **Stripe + email tool:** connect the "Payment succeeded" event to your email
  platform (Zapier/Make → your ESP) to send the access email + course link.
- **Course link:** host the course (PDF or hosted lessons) and send that link in
  the delivery email. See the `/course` build for the deliverable.

_Placeholders to replace before launch are marked in `index.html` — search for
`STRIPE_PAYMENT_LINK`, `PIXEL`, and `theownersmanual`._
