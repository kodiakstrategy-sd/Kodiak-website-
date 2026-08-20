import { notFound } from "next/navigation";
import { PrototypePage } from "../../components";
import { cPages, pages } from "../../site-data";

export default async function VersionPage({ params }: { params: Promise<{ version: string; slug?: string[] }> }) {
  const { version, slug } = await params;
  if (version !== "a" && version !== "b" && version !== "c") notFound();
  const key = slug?.[0] ?? "home";
  const page = version === "c" ? cPages[key] : pages[key];
  if (!page) notFound();
  return <PrototypePage version={version} page={page}/>;
}
