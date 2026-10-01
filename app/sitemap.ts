import type { MetadataRoute } from "next";

const BASE = "https://kodiakstrategy.com";
const LAST = new Date("2026-09-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const live: Array<[string, number]> = [
    ["", 1],
    ["c/how-it-works", 0.9],
    ["c/services", 0.9],
    ["c/academy", 0.9],
    ["c/ai-grant", 0.9],
    ["c/founder", 0.7],
    ["c/faq", 0.6],
    ["c/intake", 0.8],
    ["c/privacy", 0.2],
  ];
  return live.map(([path, priority]) => ({ url: `${BASE}/${path}`, lastModified: LAST, changeFrequency: "monthly", priority }));
}
