// api/intake.js
// Server-side intake handler. The public form posts HERE, not to GHL directly,
// so the GHL webhook URL is never exposed in page HTML. The honeypot check and
// a required-field check run here on the server, where a bot can't skip them.

const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/JxQ9amINRIrgtoArjsAs/webhook-trigger/19401942-59af-4238-9c26-74592eac4851";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // --- Parse the body robustly ---
  // Vercel does not always pre-parse req.body into an object (depends on
  // content-type and project settings). Handle every case: already-an-object,
  // a JSON string, or a raw stream we read ourselves.
  let data = {};
  try {
    if (req.body && typeof req.body === "object") {
      data = req.body;
    } else if (typeof req.body === "string" && req.body.trim() !== "") {
      data = JSON.parse(req.body);
    } else {
      // Read the raw stream as a last resort.
      const raw = await new Promise((resolve) => {
        let buf = "";
        req.on("data", (c) => (buf += c));
        req.on("end", () => resolve(buf));
        req.on("error", () => resolve(""));
      });
      if (raw && raw.trim() !== "") {
        try {
          data = JSON.parse(raw);
        } catch {
          // Fall back to form-encoded parsing (name=val&name=val).
          data = Object.fromEntries(new URLSearchParams(raw));
        }
      }
    }
  } catch (err) {
    return res.status(400).json({ error: "Could not read submission" });
  }

  // --- Honeypot check (server-side) ---
  if (data.website && String(data.website).trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  // --- Required-field sanity check ---
  if (!data.name || !data.email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // --- Forward the clean submission to GHL ---
  try {
    const ghlRes = await fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name || "",
        business: data.business || "",
        industry: data.industry || "",
        email: data.email || "",
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
