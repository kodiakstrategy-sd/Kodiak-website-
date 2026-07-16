// api/intake.js
// Server-side intake handler. The public form posts HERE, not to GHL directly,
// so the GHL webhook URL is never exposed in page HTML. Bots that scrape the
// page can no longer POST junk straight to the webhook. The honeypot check
// runs here on the server, where a bot can't skip it.

const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/JxQ9amINRIrgtoArjsAs/webhook-trigger/19401942-59af-4238-9c26-74592eac4851";

export default async function handler(req, res) {
  // Only accept POST.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Vercel parses JSON bodies automatically; fall back to {} if empty.
  const data = req.body || {};

  // --- Honeypot check (server-side) ---
  // The hidden "website" field is invisible to humans. If it has any value,
  // a bot filled it. Silently pretend success so the bot doesn't adapt,
  // but never forward to GHL.
  if (data.website && String(data.website).trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  // --- Basic sanity check: required fields must exist ---
  // Kills malformed direct-POST junk that skips the form entirely.
  if (!data.name || !data.email || !data.business) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // --- Forward the clean submission to GHL ---
  try {
    const ghlRes = await fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        business: data.business,
        industry: data.industry || "",
        email: data.email,
        phone: data.phone || "",
        challenge: data.challenge || "",
        sms_opt_in: data.sms_opt_in || "no",
      }),
    });

    if (ghlRes.ok) {
      return res.status(200).json({ ok: true });
    }
    return res.status(502).json({ error: "Upstream error" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
