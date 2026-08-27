"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cNav, nav, PageData } from "./site-data";

// Public scheduling link: Ryan's Google Calendar appointment schedule.
// An empty value hides the closing block on the intake page rather than
// rendering a button that promises scheduling and goes nowhere, which is what
// it did before.
const BOOKING_URL = "https://calendar.app.google/iRCdeauzJkExa4X1A";

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let animation = 0;
    let born = performance.now();
    type Point = { mx:number; my:number; x:number; y:number; phase:number; size:number; color:string; alpha:number; edge:boolean };
    let points: Point[] = [];
    let ambient: Point[] = [];
    const colors = ["#b99976", "#f0ebe0", "#806b55", "#c8a87f", "#6f8c82"];
    const logo = new Image();
    logo.src = "/kodiak-logo.png";
    const buildLogo = () => {
      const mask = document.createElement("canvas");
      mask.width = logo.naturalWidth; mask.height = logo.naturalHeight;
      const mctx = mask.getContext("2d", { willReadFrequently:true });
      if (!mctx) return;
      mctx.drawImage(logo, 0, 0);
      const pixels = mctx.getImageData(0, 0, mask.width, mask.height).data;
      const sampled: Array<{x:number;y:number;light:number;edge:boolean}> = [];
      const luminance=(x:number,y:number)=>{const q=(y*mask.width+x)*4;return pixels[q]*.299+pixels[q+1]*.587+pixels[q+2]*.114};
      for (let y=2; y<mask.height-2; y+=2) for (let x=2; x<mask.width-2; x+=2) {
        const k=(y*mask.width+x)*4;
        const light=pixels[k]*.299+pixels[k+1]*.587+pixels[k+2]*.114;
        const contrast=Math.max(Math.abs(light-luminance(x-2,y)),Math.abs(light-luminance(x+2,y)),Math.abs(light-luminance(x,y-2)),Math.abs(light-luminance(x,y+2)));
        if (light>66 && ((x*13+y*7)%7>1)) sampled.push({x,y,light,edge:contrast>34});
      }
      points = sampled.map((p,i) => ({
        mx:p.x, my:p.y,
        x:canvas.clientWidth*.5+Math.cos(i*2.399)*canvas.clientWidth*(.2+(i%9)/18),
        y:canvas.clientHeight*.5+Math.sin(i*2.399)*canvas.clientHeight*(.2+(i%11)/22),
        phase:i*.71,
        size:p.edge?1.8:(p.light>145?1.45:.9),
        color:p.edge?(i%3?"#f0ebe0":"#c8a87f"):colors[i%colors.length],
        alpha:p.edge?.82:.32+(i%6)*.06,
        edge:p.edge,
      }));
      ambient = Array.from({length:96},(_,i)=>({mx:0,my:0,x:(i*83%997)/997*canvas.clientWidth,y:(i*137%991)/991*canvas.clientHeight,phase:i*1.37,size:1+(i%2),color:colors[(i+2)%colors.length],alpha:.14,edge:false}));
      born=performance.now();
    };
    logo.onload=buildLogo;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (logo.complete && logo.naturalWidth) buildLogo();
    };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      frame += .012; ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const scale=Math.min(canvas.clientWidth*.72/220,canvas.clientHeight*.76/243);
      const ox=(canvas.clientWidth-220*scale)/2, oy=(canvas.clientHeight-243*scale)/2;
      const progress=Math.min(1,(performance.now()-born)/2100);
      const ease=1-Math.pow(1-progress,3);
      points.forEach((p, i) => {
        const tx=ox+p.mx*scale+Math.sin(frame+p.phase)*1.25;
        const ty=oy+p.my*scale+Math.cos(frame*.8+p.phase)*1.25;
        const x=p.x+(tx-p.x)*ease, y=p.y+(ty-p.y)*ease;
        const angle=frame*.35+p.phase;
        ctx.strokeStyle=p.color; ctx.globalAlpha=p.alpha*(.9+Math.sin(frame*1.7+p.phase)*.1);
        ctx.beginPath();
        for(let n=0;n<3;n++){
          const a=angle+n*Math.PI*2/3-Math.PI/2;
          const px=x+Math.cos(a)*p.size*2.2, py=y+Math.sin(a)*p.size*2.2;
          n?ctx.lineTo(px,py):ctx.moveTo(px,py);
        }
        ctx.closePath(); ctx.stroke();
        if(p.edge){ctx.fillStyle=p.color;ctx.globalAlpha=.22;ctx.beginPath();ctx.arc(x,y,.65,0,Math.PI*2);ctx.fill();}
      });
      ambient.forEach((p,i)=>{
        const x=p.x+Math.sin(frame*.45+p.phase)*12, y=p.y+Math.cos(frame*.34+p.phase)*9;
        ctx.strokeStyle=p.color; ctx.globalAlpha=.12+(i%4)*.035;
        ctx.beginPath(); ctx.moveTo(x,y-2); ctx.lineTo(x+1.8,y+1); ctx.lineTo(x-1.8,y+1); ctx.closePath(); ctx.stroke();
      });
      animation = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(animation); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="particle-canvas" aria-hidden="true" />;
}

function VersionSwitch({ version, slug }: { version: string; slug: string }) {
  return <div className="version-switch" aria-label="Design version">
    <Link className={version === "a" ? "active" : ""} href={`/a/${slug === "home" ? "" : slug}`}>A · Constellation</Link>
    <Link className={version === "b" ? "active" : ""} href={`/b/${slug === "home" ? "" : slug}`}>B · Ember</Link>
    <Link className={version === "c" ? "active" : ""} href={`/c/${slug === "home" ? "" : slug}`}>C · Rugged Intelligence</Link>
  </div>;
}

function Header({ version, slug }: { version: string; slug: string }) {
  const base = `/${version}`;
  const activeNav = version === "c" ? cNav : nav;
  return <>
    {version === "b" && <div className="ticker">KODIAK FIELD NOTE • AI THAT FITS THE OPERATION • SOUTH DAKOTA</div>}
    <header className="site-header">
      <Link href={base} className="brand"><img className="brand-logo" src="/kodiak-logo.png" alt="Kodiak Strategy"/></Link>
      {version === "c" && <span className="brand-line">Rugged intelligence<br/>for real operations</span>}
      <nav>{activeNav.map(([href, label]) => <Link key={href} href={`${base}/${href}`}>{label}</Link>)}</nav>
      <details className="mobile-menu">
        <summary>Menu</summary>
        <div className="mobile-nav">{activeNav.map(([href, label]) => <Link key={href} href={`${base}/${href}`}>{label}</Link>)}</div>
      </details>
      <Link className="header-cta" href={slug === "intake" ? "#intake-form" : `${base}/intake`}><span className="cta-full">Book a discovery call</span><span className="cta-short">Discovery</span></Link>
    </header>
    {version !== "c" && <VersionSwitch version={version} slug={slug}/>}
  </>;
}

function RuggedVisual({ showHook = false }: { showHook?: boolean }) {
  return <div className="rugged-visual" aria-hidden="true">
    <div className="terrain-scan"/>
    <div className="terrain-target">
      <div className="terrain-ring ring-one"/><div className="terrain-ring ring-two"/>
      <img className="ridgeline-mark" src="/ridgeline.png" alt=""/>
    </div>
    <div className="field-coordinates"><span>43.5460° N</span><span>96.7313° W</span></div>
    {showHook && <div className="terrain-hook"><strong>Map the opportunity.</strong><strong>Build the advantage.</strong></div>}
  </div>;
}

function FounderVisual() {
  return <div className="founder-hero-visual">
    <img src="/founder-family.jpg" alt="Ryan Fagerstrom with his family"/>
    <div><span>Founder / Operator</span><strong>Real businesses.<br/>Practical systems.</strong></div>
  </div>;
}

function Footer({ version }: { version: string }) {
  return <footer><div className="footer-brand">Kodiak Strategy</div><p>Built into the operation. Not bolted on.</p><div className="footer-links"><Link href={`/${version}/privacy`}>Privacy</Link><a href="mailto:ryan@kodiakstrategy.com">ryan@kodiakstrategy.com</a><a href="tel:+19075004010">(907) 500-4010</a></div></footer>;
}

const INDUSTRIES = [
  "Optometry / Eye Care",
  "Dental Practice",
  "Medical / Healthcare",
  "Law Firm",
  "Accounting / Bookkeeping",
  "Insurance Agency",
  "Roofing / Construction",
  "HVAC / Home Services",
  "Real Estate",
  "Restaurant / Hospitality",
  "Other",
];

function IntakeForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const [badFields, setBadFields] = useState<string[]>([]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("sending");
    setMessage("");
    setBadFields([]);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sms_opt_in: data.sms_opt_in === "yes" }),
      });
      const body = await res.json().catch(() => ({}));

      if (res.ok && body.ok) {
        // Full navigation rather than a client push: the thank-you page is a
        // conversion landing point, and a real page load is what ad platforms
        // and analytics can see.
        window.location.href = "/thank-you";
        return;
      }

      setStatus("error");
      setBadFields(Array.isArray(body.fields) ? body.fields : []);
      setMessage(body.error ?? "Something went wrong. Please call (907) 500-4010.");
    } catch {
      setStatus("error");
      setMessage("That did not send. Please check your connection, or call (907) 500-4010.");
    }
  }

  const bad = (field: string) => (badFields.includes(field) ? " field-error" : "");

  return <form className="intake-form" onSubmit={onSubmit} noValidate>
    {/* Honeypot. Hidden from people, irresistible to bots. Not display:none,
        which some bots detect and skip. */}
    <div className="hp" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off"/>
    </div>

    <label className={bad("name")}><span>Your Name</span>
      <input name="name" type="text" autoComplete="name" placeholder="First Last" required/></label>
    <label className={bad("business")}><span>Business Name</span>
      <input name="business" type="text" autoComplete="organization" placeholder="Acme Roofing Co." required/></label>

    <label className="wide"><span>Industry</span>
      <select name="industry" defaultValue="" required>
        <option value="" disabled>Select your industry</option>
        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
      </select></label>

    <label className={bad("email")}><span>Email Address</span>
      <input name="email" type="email" autoComplete="email" placeholder="you@yourbusiness.com" required/></label>
    <label className={bad("phone")}><span>Phone Number</span>
      <input name="phone" type="tel" autoComplete="tel" placeholder="(000) 000-0000" required/></label>

    <label className="wide"><span>Biggest operational challenge right now</span>
      <textarea name="challenge" rows={5} placeholder="What takes the most time, or causes the most friction, in your business?"/></label>

    <label className="check wide">
      <input type="checkbox" name="sms_opt_in" value="yes"/>
      <span>I&rsquo;d like to receive text updates about my discovery call and next steps. Message and data rates may apply. Reply STOP to opt out.</span>
    </label>

    {status === "error" && <p className="form-error wide" role="alert">{message}</p>}

    <button type="submit" disabled={status === "sending"}>
      {status === "sending" ? "Sending…" : "Send to Ryan"}
    </button>

    <p className="form-note">By submitting, you authorize Kodiak Strategy to send booking updates. Your information is never shared with third parties.</p>
  </form>;
}

export function PrototypePage({ version, page }: { version: "a" | "b" | "c"; page: PageData }) {
  const isA = version === "a";
  const isC = version === "c";
  useEffect(() => {
    if (!isC) return;
    const nodes = document.querySelectorAll(".theme-c .content-section, .theme-c .closing");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold:.12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [isC, page.slug]);
  return <main className={`site-shell theme-${version}`}>
    <Header version={version} slug={page.slug}/>
    <section className={`hero ${page.slug !== "home" ? "inner-hero" : ""}`}>
      <div className="hero-copy"><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.intro}</p><Link className="primary-button" href={page.slug === "intake" ? "#intake-form" : `/${version}/intake`}>{page.slug === "intake" ? "Go to the form" : "Book a discovery call"}</Link></div>
      {isA ? <div className="constellation"><ParticleField/><span className="sr-only">Animated triangular particles forming the Kodiak bear logo</span></div> : isC ? (page.slug === "founder" ? <FounderVisual/> : <RuggedVisual showHook={page.slug === "home"}/>) : <div className="ember-visual"><img src="/hero-header.jpg" alt="Kodiak carved bear artwork"/><span>Assess first · Build what matters</span></div>}
    </section>
    {isC && page.slug === "home" && <div className="field-marquee"><div>ASSESS THE TERRAIN <b>◆</b> CONNECT THE KNOWLEDGE <b>◆</b> BUILD WHAT WORKS <b>◆</b> TRAIN THE CREW <b>◆</b> ASSESS THE TERRAIN <b>◆</b> CONNECT THE KNOWLEDGE <b>◆</b></div></div>}
    {isC && page.slug === "home" && <section className="value-bridge"><p>We find where AI can save time, strengthen operations, and drive growth—then build it into the way your business works.</p></section>}
    {page.slug === "intake" && <section id="intake-form" className="content-section form-section"><div className="section-heading"><span>Tell us about your business</span><h2>A real conversation starts here.</h2></div><IntakeForm/></section>}
    {page.sections.map((section, idx) => <section className={`content-section ${idx % 2 ? "reverse" : ""}`} key={section.title}>
      <div className="section-heading"><span>{section.label}</span><h2>{section.title}</h2>{section.image && <img className="founder-photo" src={section.image} alt="Ryan Fagerstrom and family"/>}</div>
      <div className="section-body">
        {section.body?.map((p, i) => <p key={i}>{p}</p>)}
        {section.items && <div className="item-list">{section.items.map((item, i) => <article key={item.title}><span className="item-number">{String(i + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3>{item.meta && <strong>{item.meta}</strong>}<p>{item.body}</p></div></article>)}</div>}
        {section.quote && <blockquote>{section.quote}</blockquote>}
      </div>
    </section>)}
    {page.cta && !(page.slug === "intake" && !BOOKING_URL) && <section className="closing"><span>Next step</span><h2>{page.slug === "intake" ? "Prefer to pick a time yourself?" : page.cta}</h2>{page.slug === "intake"
      ? <a className="primary-button" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Pick a time</a>
      : <Link className="primary-button" href={`/${version}/intake`}>Book a discovery call</Link>}</section>}
    <Footer version={version}/>
  </main>;
}
