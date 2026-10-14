import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrototypePage } from "../../components";
import { cPages, pageMeta, pages } from "../../site-data";

// Only these pages exist. Every other address returns a real 404 instead of
// an empty "not found" page served with a 200, which Google treats as a soft 404.
const LIVE_C = ["home", "how-it-works", "services", "academy", "ai-grant", "founder", "faq", "intake", "privacy"];
export const dynamicParams = false;
export function generateStaticParams() {
  const live = LIVE_C.map(key => ({ version: "c", slug: key === "home" ? [] : [key] }));
  const drafts = ["a", "b"].flatMap(version => Object.keys(pages).map(key => ({ version, slug: key === "home" ? [] : [key] })));
  return [...live, ...drafts];
}

type Params = Promise<{ version: string; slug?: string[] }>;

// Each live /c/ page gets its own title, description and canonical so the
// consulting, training, grant and founder pages can rank for different intents.
// The /c home is a duplicate of / and canonicalizes there. The a/b design
// prototypes are kept reachable but hidden from search.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { version, slug } = await params;
  const key = slug?.[0] ?? "home";
  if (version !== "c") return { robots: { index: false, follow: false } };
  const meta = pageMeta[key];
  if (!meta) return {};
  const canonical = key === "home" ? "/" : `/c/${key}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: { title: meta.title, description: meta.description, url: canonical },
    twitter: { title: meta.title, description: meta.description },
  };
}

export default async function VersionPage({ params }: { params: Params }) {
  const { version, slug } = await params;
  if (version !== "a" && version !== "b" && version !== "c") notFound();
  const key = slug?.[0] ?? "home";
  if (version === "c" && !LIVE_C.includes(key)) notFound();
  const page = version === "c" ? cPages[key] : pages[key];
  if (!page) notFound();
  return <PrototypePage version={version} page={page}/>;
}
