import posthog from "posthog-js";

// PostHog: page views, clicks, heatmaps and session recordings.
// The project key is public by design; it ships in the browser.
posthog.init("phc_pCFnhGNPxFyxCWby8WYpLAYwr9ApdcVJEhW8LuuoPuvF", {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-08-30",
  person_profiles: "identified_only",
  session_recording: { maskAllInputs: true },
});
