import type { NextConfig } from "next";

// Old addresses from the previous site, and the duplicate /c home, send
// visitors and Google to the live page instead of a dead end.
const nextConfig: NextConfig = {
  async redirects() {
    const to = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      to("/c", "/"),
      to("/index.html", "/"),
      to("/about", "/c/founder"),
      to("/founder", "/c/founder"),
      to("/services", "/c/services"),
      to("/faq", "/c/faq"),
      to("/intake", "/c/intake"),
      to("/start", "/c/intake"),
      to("/how-it-works", "/c/how-it-works"),
      to("/academy", "/c/academy"),
      to("/ai-grant", "/"),
      to("/c/ai-grant", "/"),
      to("/privacy", "/c/privacy"),
      to("/blog-speed-to-lead", "/"),
      to("/c/about", "/c/founder"),
      to("/c/start", "/c/intake"),
      to("/c/blog-speed-to-lead", "/"),
    ];
  },
};

export default nextConfig;
