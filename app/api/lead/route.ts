// The marketing site's front door.
//
// The browser posts here, and this route forwards to the Den server-side. Two
// reasons it works this way rather than the form calling the Den directly:
// the ingest key never reaches a browser, and there is no cross-origin request
// to configure or get wrong.
//
// The important part is the fallback. If the Den is unreachable, this route
// emails Ryan the raw submission instead of failing. The entire point of this
// system is that no lead is ever lost, so the front door must not depend on
// the CRM being up.

const DEN_URL = process.env.DEN_INTAKE_URL ?? "https://den.kodiakstrategy.com/api/intake/discovery";

const LIMITS = {
  name: 120,
  business: 160,
  industry: 80,
  email: 200,
  phone: 40,
  challenge: 4000,
} as const;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 32;
    out += code < 32 || code === 127 ? " " : char;
  }
  return out.trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Lead = {
  name: string;
  business: string;
  industry: string;
  email: string;
  phone: string;
  challenge: string;
  sms_opt_in: boolean;
};

/**
 * Last resort. Called only when the Den could not take the lead. Uses Resend
 * directly and deliberately: this path exists precisely for when the normal
 * path is broken, so it must share as little as possible with it.
 */
async function emailFallback(lead: Lead, reason: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL ?? "ryan@kodiakstrategy.com";
  const from = process.env.LEAD_FROM_EMAIL ?? "Kodiak Strategy <leads@kodiakstrategy.com>";

  if (!apiKey) {
    console.error("FALLBACK IMPOSSIBLE: no RESEND_API_KEY. Lead lost:", JSON.stringify(lead));
    return false;
  }

  const rows = (
    [
      ["Name", lead.name],
      ["Business", lead.business],
      ["Industry", lead.industry],
      ["Email", lead.email],
      ["Phone", lead.phone],
      ["Texts OK", lead.sms_opt_in ? "Yes" : "No"],
    ] as const
  )
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#8a8681;font:11px system-ui;letter-spacing:.1em;text-transform:uppercase;vertical-align:top;">${k}</td><td style="padding:8px 0;color:#f5f1e9;font:15px system-ui;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `[DEN DOWN] Lead from ${lead.name}${lead.business ? ` (${lead.business})` : ""}`,
        html: `<div style="background:#080806;padding:32px;font-family:system-ui,sans-serif;">
          <div style="max-width:600px;margin:auto;background:#0d0c0a;border:1px solid rgba(240,235,224,.14);padding:32px;">
            <p style="margin:0 0 8px;color:#c5a27b;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Fallback delivery</p>
            <h1 style="margin:0 0 12px;color:#f5f1e9;font-size:24px;font-weight:400;">${escapeHtml(lead.name)}</h1>
            <p style="margin:0 0 22px;color:#c9c4bb;font-size:14px;line-height:1.6;">The Den could not record this lead, so it is coming to you directly. It is <strong>not</strong> in the CRM. Add it by hand once the Den is back.</p>
            <table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(240,235,224,.14);">${rows}</table>
            ${lead.challenge ? `<div style="margin-top:22px;padding-top:18px;border-top:1px solid rgba(240,235,224,.14);"><p style="margin:0 0 8px;color:#8a8681;font-size:11px;letter-spacing:.1em;text-transform:uppercase;">Biggest operational challenge</p><p style="margin:0;color:#f5f1e9;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.challenge)}</p></div>` : ""}
            <p style="margin:24px 0 0;color:#6f6b66;font-size:11px;">Reason: ${escapeHtml(reason)}</p>
          </div>
        </div>`,
        text: [
          "FALLBACK DELIVERY. The Den could not record this lead.",
          "It is NOT in the CRM. Add it by hand.",
          "",
          `Name:      ${lead.name}`,
          `Business:  ${lead.business}`,
          `Industry:  ${lead.industry || "-"}`,
          `Email:     ${lead.email}`,
          `Phone:     ${lead.phone}`,
          `Texts OK:  ${lead.sms_opt_in ? "Yes" : "No"}`,
          "",
          "Challenge:",
          lead.challenge || "-",
          "",
          `Reason: ${reason}`,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("FALLBACK FAILED", res.status, JSON.stringify(lead));
      return false;
    }
    return true;
  } catch (err) {
    console.error("FALLBACK THREW", err, JSON.stringify(lead));
    return false;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Could not read submission." }, { status: 400 });
  }

  // Honeypot handled here too, so bot traffic never reaches the Den at all.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const lead: Lead = {
    name: clean(body.name, LIMITS.name),
    business: clean(body.business, LIMITS.business),
    industry: clean(body.industry, LIMITS.industry),
    email: clean(body.email, LIMITS.email).toLowerCase(),
    phone: clean(body.phone, LIMITS.phone),
    challenge: clean(body.challenge, LIMITS.challenge),
    sms_opt_in: body.sms_opt_in === true || body.sms_opt_in === "yes",
  };

  const missing: string[] = [];
  if (!lead.name) missing.push("name");
  if (!lead.business) missing.push("business");
  if (!lead.email) missing.push("email");
  if (!lead.phone) missing.push("phone");
  if (missing.length) {
    return Response.json(
      { error: "Please fill in every required field.", fields: missing },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return Response.json(
      { error: "That email address does not look right.", fields: ["email"] },
      { status: 400 },
    );
  }
  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return Response.json(
      { error: "Please enter a valid phone number.", fields: ["phone"] },
      { status: 400 },
    );
  }

  const key = process.env.INTAKE_INGEST_KEY;

  if (key) {
    try {
      // Bounded: a hanging CRM must not hold the visitor's browser open. If it
      // has not answered in eight seconds, treat it as down and fall back.
      const denRes = await fetch(DEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-kodiak-key": key },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });

      if (denRes.ok) return Response.json({ ok: true });

      // 4xx from the Den means the payload was rejected, which is a bug on our
      // side, not an outage. Still fall back so the lead survives.
      console.error("Den rejected the lead:", denRes.status);
      const sent = await emailFallback(lead, `Den responded ${denRes.status}`);
      return sent
        ? Response.json({ ok: true, degraded: true })
        : Response.json({ error: "We could not send that. Please call (907) 500-4010." }, { status: 502 });
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      console.error("Den unreachable:", reason);
      const sent = await emailFallback(lead, `Den unreachable: ${reason}`);
      return sent
        ? Response.json({ ok: true, degraded: true })
        : Response.json({ error: "We could not send that. Please call (907) 500-4010." }, { status: 502 });
    }
  }

  // No key configured at all: the Den is not wired up yet. Email is the whole
  // pipeline in that case, not a fallback.
  const sent = await emailFallback(lead, "INTAKE_INGEST_KEY is not configured");
  return sent
    ? Response.json({ ok: true, degraded: true })
    : Response.json({ error: "We could not send that. Please call (907) 500-4010." }, { status: 502 });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
