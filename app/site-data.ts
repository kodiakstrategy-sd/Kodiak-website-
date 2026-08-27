export type Item = { title: string; meta?: string; body: string };
export type Section = { label: string; title: string; body?: string[]; items?: Item[]; quote?: string; image?: string };
export type PageData = { slug: string; eyebrow: string; title: string; intro: string; sections: Section[]; cta?: string };

export const nav = [
  ["academy", "Academy"],
  ["how-it-works", "How It Works"],
  ["services", "Services"],
  ["about", "About"],
  ["faq", "FAQ"],
] as const;

export const cNav = [
  ["how-it-works", "Kodiak Strategy"],
  ["academy", "AI Academy"],
  ["services", "Services"],
  ["founder", "Founder"],
  ["faq", "FAQ"],
] as const;

const engagement: Item[] = [
  { title: "The Assessment", meta: "$750", body: "The Opportunity Map for your operation. Delivered in one week, yours to keep, and credited in full toward your build." },
  { title: "Workflow Automation", meta: "$2,500 fixed", body: "One discrete thing, solved end to end: an automation, a chatbot, or a single workflow. Scoped from your assessment." },
  { title: "Focused Build", meta: "Quoted", body: "A larger construction: a knowledge base, platform, or system. Fixed scope and clean handoff, so you carry no scope risk." },
  { title: "Growth Retainer", meta: "$1,500–$2,500 / mo", body: "Everything built keeps running and improving, with ongoing support shaped to what you actually need." },
  { title: "Full Partnership", meta: "Quoted", body: "Kodiak embedded in your operation for deep, ongoing work once we know your business inside out." },
];

const builds: Item[] = [
  { title: "Business Knowledge Base", body: "Client history, past work, and team know-how organized into one searchable foundation." },
  { title: "Client Intelligence Systems", body: "AI reads your history and surfaces who to reach, what they need, and what has worked before." },
  { title: "Speed to Lead System", body: "New leads get a response in seconds, not hours. The first business to reply usually wins the work." },
  { title: "Follow-Up & Renewal Engine", body: "Renewals, check-ins, and reactivations fire on their own so earned revenue never slips." },
  { title: "Staff Knowledge System", body: "The know-how in your team’s heads, captured and searchable for faster onboarding." },
  { title: "Workflow Automation", body: "Repetitive hand-offs and re-keying between tools handled automatically." },
];

const principles: Item[] = [
  { title: "Assessment first. Always.", body: "We never recommend a solution before we understand your operation. Every plan starts with your actual workflows, team, and goals." },
  { title: "Optimize before we automate.", body: "A streamlined process makes a far better automation than a fast version of a broken one." },
  { title: "Built for how you actually work.", body: "Every build starts from your real operation, not a playbook or template." },
  { title: "Straight about what’s worth it.", body: "If a cheap tool already solves the problem, we will tell you. Your investment goes to work that builds an advantage." },
];

export const pages: Record<string, PageData> = {
  home: {
    slug: "home",
    eyebrow: "AI consulting for real businesses",
    title: "We find where AI fits. Then we build it right.",
    intro: "No generic tools. No hype. A clear plan grounded in how your business really runs — with two ways to begin.",
    sections: [
      { label: "Two ways to work with Kodiak", title: "Train your team. Or build your systems.", body: ["Some owners want their people equipped. Some want the work built and handled. Most end up doing both, in that order."], items: [
        { title: "Kodiak AI Academy", meta: "$3,000 · Teams up to 12", body: "Two on-site sessions. Your team learns on the tasks that eat their hours and starts real builds in the room." },
        { title: "Systems & Builds", meta: "Assessment $750 · Builds from $2,500", body: "We map every workflow worth optimizing or automating, then build the highest-impact fix at a fixed price." },
      ]},
      { label: "The idea", title: "The most valuable thing in your business is already inside it.", body: [
        "Years of client relationships, jobs done, decisions made, and patterns nobody has had time to see are scattered across spreadsheets, drives, inboxes, and people’s heads.",
        "We organize all of it into a single foundation your business can draw on and think with. Once it is connected, AI can surface the opportunities, answers, and patterns buried in your own history.",
      ], quote: "You start operating on everything your business knows — not just what you happened to remember." },
      { label: "How it works", title: "Three steps. Low risk at every one.", items: [
        { title: "Discovery Call", meta: "Free · 20 minutes", body: "A real conversation about your operation, your team, and where things feel slow or broken. No pitch." },
        { title: "The Assessment", meta: "$750 · One week", body: "You get the Opportunity Map: every workflow worth improving, plotted by impact and effort with the real dollar cost." },
        { title: "The Build", meta: "Fixed price · About three weeks", body: "We choose the highest-impact opportunity, optimize the process, build it, document it, and hand it over." },
      ]},
      { label: "What we build", title: "Foundation first. Then intelligence. Then automation.", items: builds },
      { label: "Engagement", title: "Start with one build. Grow from there.", items: engagement },
      { label: "Why Kodiak", title: "We have run real businesses. We build like it.", items: principles },
      { label: "The long game", title: "A single build is the start. Not the whole picture.", body: [
        "What does not commoditize is your operation’s foundation: processes documented, data connected, and the knowledge in your team’s heads captured and organized.",
        "Build that, and every AI tool from this point forward hits the ground already knowing your business. Start with one build, see it work, and grow into the rest.",
      ]},
    ], cta: "Start with a conversation. Twenty minutes, no pitch, no commitment beyond the call."
  },
  academy: {
    slug: "academy", eyebrow: "Kodiak AI Academy", title: "We train your staff to use AI. On your real work.",
    intro: "The middle step no one else offers: we come into your business and train your team on the work that eats their hours.",
    sections: [
      { label: "The idea", title: "Nobody knows your business like your people.", body: ["Your team already knows where the time goes: the re-keying, follow-ups, and reports nobody has hours for. We hand them the tool to get that time back.", "No software contract. No system to maintain. The value walks around your building after we leave."] },
      { label: "How it works", title: "Two sessions. Real builds by the end of the first.", items: [
        { title: "Session One", meta: "On site · 3 to 4 hours", body: "AI fundamentals, safe working practices, and the build process — applied immediately to tasks from your operation." },
        { title: "Session Two", meta: "About one week later · 3 to 4 hours", body: "Review what was built, work through hangups, and make each system dependable enough for daily use." },
        { title: "Session Three", meta: "Optional add-on · Build session", body: "A focused session for the next set of workflows or a deeper team rollout." },
      ]},
      { label: "Pricing", title: "One price for your team. Bigger teams become a program.", items: [
        { title: "The Academy Session", meta: "$3,000", body: "Two on-site sessions for teams up to twelve. A third session is $1,000, or $3,750 for all three booked up front." },
        { title: "Larger Teams", meta: "Scoped", body: "Multiple cohorts and a coordinated rollout shaped to how your departments actually work." },
        { title: "The Academy Partnership", meta: "Quoted · 6-month minimum", body: "Kickoff training followed by monthly workshops, build reviews, and one new skill every month." },
      ]},
      { label: "Why it works", title: "Training done by your people. Not to them.", items: [
        { title: "It makes your best people faster.", body: "Staff who build their own tools actually use them." },
        { title: "Real work only.", body: "No demo data and no generic exercises. Value starts the same day." },
        { title: "Hours you can count.", body: "The goal is measured: hours back per week, per person." },
        { title: "It cannot sit on a shelf.", body: "Software gets abandoned. Skills walk around your building." },
      ]},
    ], cta: "Get your crew in early. Early schedulers lock the founding rate."
  },
  "how-it-works": {
    slug: "how-it-works", eyebrow: "How it works", title: "Three steps. Low risk at every one.",
    intro: "You never commit to a build before you know exactly what it is and what it is worth. Each step is small, concrete, and earns the next.",
    sections: [
      { label: "01 · Discovery", title: "The Discovery Call", body: ["A free, twenty-minute conversation about how your business runs, where things feel slow, and what you wish ran better. No pitch and no slides.", "By the end we both know whether there is something worth pursuing. If there is not, we will tell you." ]},
      { label: "02 · Assessment", title: "The Opportunity Map", body: ["For $750, we map your workflows, talk to the people doing the work, and find every place time and money are leaking.", "You receive a 3–5 page report with each opportunity plotted by impact and effort, tagged optimize or automate, and given a real dollar figure. It includes quick wins, is yours to keep, and credits in full toward a build." ]},
      { label: "03 · Build", title: "Fixed price. About three weeks.", body: ["Focused builds start at $3,000. We take the highest-impact opportunity, optimize the process before automating it, and quote a fixed price from the Assessment.", "When it is done you get a clean handoff: documented, working, and yours to run."], quote: "Assess before you recommend. Optimize before you automate. Never build something you cannot actually use." },
    ], cta: "Start with a conversation."
  },
  services: {
    slug: "services", eyebrow: "Services", title: "Start with one build. Grow from there.", intro: "Every engagement is scoped from your Assessment. No packages off a shelf.",
    sections: [
      { label: "The engagement ladder", title: "A clear path from one answer to an operating advantage.", items: engagement },
      { label: "What we build", title: "Real fixes for real workflows.", body: ["Every build starts as one named problem you already feel. We fix the process first, then automate it."], items: [
        { title: "AI Phone Receptionist", body: "Every call answered and every message routed when the front desk is busy." },
        { title: "Speed to Lead System", body: "New leads get a response in seconds, not hours." },
        { title: "Staff Knowledge System", body: "Team know-how captured, searchable, and ready for onboarding." },
        { title: "CRM & Route Integration", body: "Field updates flow to the office automatically. No re-keying or lost notes." },
        { title: "Seasonal Outreach System", body: "The right message reaches the right customer at the right time." },
        { title: "Reputation & Review System", body: "Reviews requested automatically after every job." },
      ]},
    ], cta: "It starts with a conversation."
  },
  about: {
    slug: "about", eyebrow: "About", title: "An operator built this, for operators.", intro: "Kodiak Strategy is run by someone who spent thirteen years on the floor of real businesses, making them run.",
    sections: [
      { label: "The founder", title: "Ryan Fagerstrom", image: "/ryan-family.jpeg", body: ["I spent thirteen years building and running owner-operated businesses, including two restaurants and a food truck. Hiring, scheduling, margins, logistics — the daily work of keeping an operation running.", "I am not a technologist who decided to consult. I came up the same way most of my clients did, so I know the difference between a tool that sounds impressive and one that actually removes work."], quote: "You do not need to know everything about AI. You need someone who knows your operation." },
      { label: "Why Kodiak", title: "There was a gap. Kodiak fills it.", body: ["Business owners across South Dakota know AI matters, but they have no trusted local partner to tell them where it fits and then build it.", "National vendors sell generic tools. Big firms price themselves out of reach. Kodiak does the practical, grounded version: assess before recommending, optimize before automating, and build what gets used." ]},
      { label: "How we work", title: "Four principles. Every engagement.", items: principles },
    ], cta: "Let’s talk. Twenty minutes about your operation."
  },
  faq: {
    slug: "faq", eyebrow: "Frequently asked", title: "Straight answers, before you ever call.", intro: "The details owners ask us most often, answered plainly.",
    sections: [{ label: "FAQ", title: "What you should know", items: [
      { title: "What does the discovery call cost?", body: "Nothing. It is free and runs about twenty minutes. It is a real conversation, not a sales pitch." },
      { title: "What is the Assessment and what does it cost?", body: "The Assessment is $750. You receive the Opportunity Map within a week, and the full amount credits toward a build." },
      { title: "Why pay for an assessment instead of getting a free quote?", body: "Because a real answer takes real work. A free quote is a guess; the Assessment is a documented, dollar-backed plan you keep." },
      { title: "What does a build cost and how long does it take?", body: "Focused Builds start at $3,000, fixed price. Most take about three weeks." },
      { title: "What if I decide not to build?", body: "The Opportunity Map and its quick wins are yours to keep. There is no obligation to continue." },
      { title: "I do not understand AI. Is that a problem?", body: "Not at all. You run your business; Kodiak handles the technical side and hands you something simple that works." },
      { title: "What kinds of businesses do you work with?", body: "Owner-operated businesses across South Dakota and the Northern Plains, from professional practices to construction, home services, real estate, and hospitality." },
      { title: "What does optimize before automate mean?", body: "Automating a broken process creates a faster broken process. We fix the workflow first, then lock it in." },
      { title: "Do I have to sign a long contract?", body: "No. The Assessment and Focused Build are one-time engagements. Ongoing support is optional." },
    ]}], cta: "Still have questions? The fastest answer is a conversation."
  },
  intake: {
    slug: "intake", eyebrow: "Discovery call", title: "Start the conversation.", intro: "Tell us a little about your business. Ryan will follow up personally. Twenty minutes, no pitch, no pressure.", sections: [], cta: "Prefer to pick a time yourself?"
  },
  privacy: {
    slug: "privacy", eyebrow: "Legal", title: "Privacy Policy", intro: "Last updated: May 4, 2026", sections: [
      { label: "01", title: "Information We Collect", body: ["We collect information you provide directly — including your name, business name, email address, phone number, and details shared during the assessment process."] },
      { label: "02", title: "How We Use Your Information", body: ["Your information is used solely to prepare your AI Assessment Report, conduct your strategy session, and follow up regarding our services. We do not sell or share it with third parties."] },
      { label: "03", title: "SMS Communications", body: ["By providing your phone number and checking the SMS opt-in box, you consent to receive text messages regarding your session, report delivery, and follow-up. Message and data rates may apply. Text HELP for help and STOP to opt out.", "Text messaging originator opt-in data and consent will not be shared with third parties."] },
      { label: "04", title: "Data Retention", body: ["Session recordings and transcripts are deleted after your report is delivered. Contact information is retained in our secure CRM for business relationship purposes only."] },
      { label: "05", title: "Third Party Services", body: ["We use industry-standard services including Stripe and communication platforms. These services have their own privacy policies."] },
      { label: "06", title: "Your Rights", body: ["You may request access to, correction of, or deletion of your personal information at any time."] },
      { label: "07", title: "Contact", body: ["Ryan Fagerstrom · kodiakstrategysd@gmail.com · (605) 605-2558 · kodiakstrategy.com"] },
    ]
  },
  "blog-speed-to-lead": {
    slug: "blog-speed-to-lead", eyebrow: "Sales · Lead closure", title: "Most businesses lose clients before they ever talk to them.", intro: "The data on response time is clear, the fix is available, and almost nobody has done it.", sections: [
      { label: "The leak", title: "The assumption costing clients every week", body: ["When a potential customer reaches out through your website, a contact form, or a missed call, how long before someone responds? For most businesses it is hours or the next morning.", "Your team is busy doing the actual work. This is not a people problem. It is a systems problem."] },
      { label: "9×", title: "The numbers should make you uncomfortable", body: ["You are nine times more likely to close a lead if you respond within five minutes rather than thirty. Seventy-eight percent of customers go with the first business that responds."], quote: "The race is not won on merit. It is won on speed." },
      { label: "The system", title: "What Speed to Lead actually does", body: ["A well-built system replies within sixty seconds at any hour, qualifies the opportunity, answers common questions, and routes a ready lead to your team.", "The tools now exist to do this without adding staff. Businesses that deploy them are watching close rates climb." ]},
      { label: "The math", title: "The calculation ends the conversation", body: ["Every business we have run the calculation for finds the same direction: revenue lost to slow response significantly outpaces the cost of fixing it."] },
      { label: "The question", title: "How many leads did you miss in the last 30 days?", body: ["Some were the wrong fit. Some lacked budget. But some went elsewhere because somebody else replied first.", "That is not a marketing or sales problem. It is a systems problem, and systems problems have systems solutions. Fix the leak first, then build from there." ]},
    ], cta: "How fast is your business responding to new leads?"
  }
};

export const cPages: Record<string, PageData> = {
  ...pages,
  home: {
    slug: "home",
    eyebrow: "Two paths to practical AI",
    title: "AI that works where your business works.",
    intro: "Kodiak gives your business two ways forward: we can assess, optimize, and implement the right systems—or train your team to use AI confidently in the work they already do.",
    sections: [
      { label: "Choose your lane", title: "Strategy and implementation. Or workforce transformation.", body: ["Both paths begin with your business—not a generic tool. We help you choose the right starting point, then shape the work around your operation, your people, and the outcomes that matter."], items: [
        { title: "Kodiak Strategy", meta: "Assess · Optimize · Implement", body: "We examine the full operation, identify where AI can create measurable impact, improve the workflow, and implement the right systems in practical phases." },
        { title: "Kodiak AI Academy", meta: "Starting at $3,000 · Teams up to 10", body: "On-site sessions built around your team’s needs—from solving everyday workflow friction to helping sales teams use AI to research, prepare, follow up, and drive revenue." },
      ]},
      { label: "The multiplier effect", title: "Make the people who know your business even more capable.", body: [
        "AI creates the most value when it multiplies the judgment, experience, and relationships already inside your company. The goal is not to replace your workforce. It is to remove low-value work and give good people more leverage.",
        "That can mean automating repetitive handoffs, surfacing what your business already knows, or teaching a sales team to turn better preparation and faster follow-up into more closed business.",
      ], quote: "The advantage is not AI by itself. It is what your people can do with it." },
      { label: "Kodiak Strategy", title: "From opportunity map to phased implementation.", items: [
        { title: "Discovery Call", meta: "For either path", body: "Bring your questions and your priorities. We learn how the business operates, talk through both sides of Kodiak, and decide which path creates the most value now." },
        { title: "Business Assessment", meta: "Starting at $750", body: "We walk through the entire business, identify every workflow where AI can have an impact, and rank each opportunity by impact, effort, and projected return." },
        { title: "Implementation", meta: "Built in practical phases", body: "Together, we choose what to build first and create a phased plan that fits your budget, capacity, and priorities." },
      ]},
      { label: "What we build", title: "Exactly what your operation needs. Nothing it does not.", items: [
        { title: "Custom AI Systems", body: "Purpose-built around your workflows, data, team, and goals—not a one-size-fits-all platform packed with features you will never use." },
        ...builds,
      ]},
      { label: "Ways to engage", title: "Start where the value is clearest. Expand when it earns the next step.", items: [
        { title: "Business Assessment", meta: "Starting at $750", body: "A complete opportunity map with impact-versus-effort priorities, projected ROI, and a report that is yours to implement now, build with Kodiak, or keep until the timing is right." },
        { title: "Workflow Automation", meta: "Starting at $2,500 · Scope dependent", body: "One defined workflow solved from end to end, priced according to its complexity, integrations, and operational reach." },
        { title: "Focused Build", meta: "Custom quoted", body: "A larger system or phased buildout, scoped and quoted around the exact needs of your business." },
        { title: "Growth Retainer", meta: "Custom quoted based on scope", body: "Ongoing optimization, support, and new build capacity shaped to the systems and pace your business requires." },
        { title: "Full Partnership", meta: "Embedded AI partner", body: "Kodiak works inside the business like a fractional team member—helping you build, adapt, and stay ahead as the AI landscape changes." },
      ]},
      { label: "Why Kodiak", title: "Real-world operating experience. Practical AI execution.", items: principles },
    ],
    cta: "Start with one conversation. We will find the right lane together."
  },
  academy: {
    slug: "academy", eyebrow: "Kodiak AI Academy", title: "Turn AI into a workforce multiplier.",
    intro: "On-site AI training built around your team, your workflows, and the work that matters—not generic demonstrations or one-size-fits-all coursework.",
    sections: [
      { label: "The opportunity", title: "Give your people more leverage every day.", body: ["Your staff already knows where the work slows down, where information gets lost, and which tasks consume time without creating value. We teach them how to use AI to solve those problems safely and practically.", "For a sales team, that can mean stronger research, better preparation, faster follow-up, and more consistent execution. For operations, it can mean hours returned to the team every week."] },
      { label: "Built for your team", title: "Every training package is created around your needs.", items: [
        { title: "Understand the work", body: "We identify the roles, workflows, and outcomes where AI can make the clearest difference." },
        { title: "On-site sessions", body: "Your team learns by applying AI directly to everyday work, live in the room, with guidance that fits their experience level." },
        { title: "Build useful habits", body: "We focus on repeatable methods your team can use after the session—not temporary excitement that disappears when the training ends." },
      ]},
      { label: "Investment", title: "Starting at $3,000 for teams up to 10.", body: ["The final package is shaped by team size, roles, objectives, and the depth of training required. Every engagement is scoped around what your people need to become more capable and productive."] },
      { label: "What changes", title: "Better work, faster learning, stronger execution.", items: [
        { title: "Everyday workflows", body: "Reduce repetitive work, accelerate writing and analysis, and solve the friction your team encounters every day." },
        { title: "Sales enablement", body: "Help sales teams research accounts, prepare for conversations, develop sharper messaging, and follow up with more speed and consistency." },
        { title: "Internal capability", body: "Build confidence and judgment so your business can keep adapting as the technology changes." },
      ]},
    ], cta: "Let’s design the right Academy experience for your team."
  },
  "how-it-works": {
    slug: "how-it-works", eyebrow: "Kodiak Strategy", title: "Assess the operation. Prioritize the opportunity. Build in phases.",
    intro: "This is how the Strategy side of Kodiak works. Every recommendation begins with a clear understanding of the business and ends with an implementation path that fits it.",
    sections: [
      { label: "01 · Discovery", title: "One conversation. Two possible paths.", body: ["The Discovery Call can lead to either Kodiak Strategy or the Kodiak AI Academy. Bring your questions, challenges, and priorities. We learn how the business works, answer what we can, and decide together which path is the best fit.", "There is no pitch deck and no required commitment beyond the conversation."] },
      { label: "02 · Assessment", title: "A complete map of where AI can matter.", body: ["Starting at $750, we walk through the entire business to find every workflow and operating area where AI can create an impact.", "Each opportunity is plotted by impact versus effort and supported by projected ROI. You receive the full Opportunity Map and report to implement with Kodiak now, use on your own, or keep until you are ready to do more."] },
      { label: "03 · Roadmap", title: "Turn the opportunity map into a practical build plan.", body: ["Together, we choose the opportunities that should come first and organize implementation into phases that fit your budget, capacity, and priorities.", "You know what is being built, why it matters, and what success should look like before implementation begins."] },
      { label: "04 · Build", title: "Custom implementation. Clean handoff. No unnecessary features.", body: ["Kodiak builds exactly what the business needs—from a focused workflow automation to a connected operating system. The solution is shaped around your workflows rather than forcing your team into a generic platform.", "Every phase is documented, tested, and designed to create measurable value before the next one begins."], quote: "Assess before recommending. Optimize before automating. Build what the operation will actually use." },
    ], cta: "Start with the questions. We will find the right path from there."
  },
  services: {
    slug: "services", eyebrow: "Services", title: "Custom work, scoped around measurable value.",
    intro: "No generic packages and no oversized platforms. Kodiak matches the engagement to the opportunity, the team, and the phase your business is ready for.",
    sections: [
      { label: "Kodiak Strategy", title: "From assessment to embedded partnership.", items: [
        { title: "Business Assessment", meta: "Starting at $750", body: "A company-wide opportunity map ranking AI use cases by impact, effort, and projected ROI. The complete report is yours to keep." },
        { title: "Workflow Automation", meta: "Starting at $2,500 · Scope dependent", body: "One defined workflow solved end to end, with the final investment based on complexity and integrations." },
        { title: "Focused Build", meta: "Custom quoted", body: "A custom system or phased implementation designed around the business’s specific workflows, data, and needs." },
        { title: "Growth Retainer", meta: "Custom quoted based on scope", body: "Ongoing support, optimization, and additional build capacity at the pace your operation requires." },
        { title: "Full Partnership", meta: "Embedded AI partner", body: "Kodiak becomes a fractional member of your team—helping the business build, adapt, and stay ahead in an AI landscape that keeps changing." },
      ]},
      { label: "Kodiak AI Academy", title: "Practical on-site training for teams up to 10.", body: ["Academy engagements start at $3,000. Every training package is created around your team’s needs, roles, workflows, and goals."], items: [
        { title: "Workflow Enablement", body: "Teach staff to use AI in the everyday work that consumes their time." },
        { title: "Sales Team Enablement", body: "Build better research, preparation, messaging, follow-up, and sales execution with AI." },
        { title: "Custom Team Program", body: "Combine roles, use cases, and sessions into a program designed for the outcomes your business needs." },
      ]},
      { label: "Custom builds", title: "Your business does not need hundreds of features. It needs the right ones.", body: ["Every Kodiak build begins with the operation itself. We create exactly what your team needs to solve the named problem, integrate with the way the business already works, and produce a result you can measure."], items: [
        { title: "Custom AI Systems", body: "Purpose-built tools, knowledge systems, and connected workflows designed for your operation." },
        ...builds,
      ]},
    ], cta: "Tell us where the business feels stuck. We will help you choose the right engagement."
  },
  faq: {
    slug: "faq", eyebrow: "Frequently asked", title: "Straight answers before you ever call.",
    intro: "What business owners ask most often about Kodiak Strategy and the Kodiak AI Academy.",
    sections: [{ label: "FAQ", title: "What you should know", items: [
      { title: "Which side of Kodiak is right for us?", body: "Kodiak Strategy is for businesses that want help assessing, optimizing, and implementing AI systems. Kodiak AI Academy trains your staff to use AI in everyday work. The Discovery Call helps us decide which path—or combination—is the best fit." },
      { title: "What happens during the Discovery Call?", body: "We answer your questions, learn how the business operates, and talk through the outcomes you want. There is no pitch and no required commitment beyond the conversation." },
      { title: "What does the Business Assessment cost?", body: "Assessments start at $750. Scope depends on the size and complexity of the operation." },
      { title: "What do we receive from the Assessment?", body: "You receive a full Opportunity Map showing where AI can have an impact, ranked by impact versus effort and supported by projected ROI. The entire report is yours to implement with Kodiak, use on your own, or keep until you are ready." },
      { title: "What does a workflow automation cost?", body: "Workflow automations start at $2,500. Final pricing depends on scope, complexity, integrations, and operational reach." },
      { title: "How are larger builds priced?", body: "Focused Builds, Growth Retainers, and Full Partnerships are custom quoted based on the scope and needs of the business." },
      { title: "How much does the Kodiak AI Academy cost?", body: "Academy engagements start at $3,000 for teams up to ten. Every training package is created around your team’s roles, workflows, and goals." },
      { title: "Is the Academy only for operations teams?", body: "No. We can focus on everyday workflow improvements, sales enablement, leadership use cases, or a custom combination built around your people." },
      { title: "Do you sell prebuilt software packages?", body: "No. Kodiak custom builds what your business actually needs, without forcing your team into a one-size-fits-all platform filled with unnecessary features." },
      { title: "Do we have to sign a long contract?", body: "No. An Assessment or Workflow Automation can stand on its own. Ongoing engagements are available when they make sense for the business." },
    ]}], cta: "Still have questions? Bring them to the Discovery Call."
  },
  intake: {
    slug: "intake", eyebrow: "Discovery call", title: "Start the conversation.",
    intro: "Tell us a little about your business. Ryan will follow up personally to answer your questions and help determine whether Kodiak Strategy, the AI Academy, or a combination is the right path.",
    sections: [], cta: "Prefer to pick a time yourself?"
  },
  founder: {
    slug: "founder", eyebrow: "Founder & Principal", title: "Ryan Fagerstrom",
    intro: "An operator who spent thirteen years running restaurants before building practical AI systems for owner-run businesses.",
    sections: [
      { label: "The operator behind Kodiak", title: "Thirteen years on the owner’s side of the table.", body: ["Before he ever built a piece of software, Ryan spent thirteen years owning and operating two restaurants across two states. He knows the work behind the work: hiring, scheduling, margins, logistics, customer expectations, and the constant pressure of keeping an operation moving.", "That experience shapes every Kodiak engagement. The work starts with how the business runs today, where time or opportunity is being lost, and which problems are worth solving. It never starts with technology looking for a place to land."] },
      { label: "AI qualifications", title: "Focused study. Hands-on implementation.", body: ["After stepping away from the restaurant industry, Ryan began studying how artificial intelligence could be applied to real-world business operations. What started as a personal interest developed into more than a year of focused study, experimentation, and hands-on implementation."], items: [
        { title: "AI Fluency for Small Businesses", meta: "Anthropic · July 2026", body: "Training focused on the practical and responsible use of AI in small-business environments." },
        { title: "AI Fluency for Builders", meta: "Anthropic · July 2026", body: "Applied training in building AI-powered workflows and solutions." },
        { title: "Model Context Protocol (MCP)", meta: "Anthropic · July 2026", body: "Certification covering the protocol used to connect AI systems with tools, data, and business context." },
        { title: "Claude Code: Software Engineering with Generative AI Agents", meta: "Vanderbilt University · January 2026", body: "Coursework in software engineering with generative AI agents and AI-assisted development." },
      ]},
      { label: "Why Kodiak", title: "Figure out where AI belongs and where it does not.", body: ["Today, through Kodiak Strategy, Ryan works with business owners to identify practical ways to use AI to save time, improve operations, and grow more efficiently.", "His approach begins with understanding the company as it operates today, finding the areas creating the most friction or consuming the most time, and then applying AI, automation, and better processes only where they can create measurable value."], quote: "You do not need AI everywhere. You need it in the right places." },
      { label: "Background", title: "From Alaska to South Dakota.", body: ["Ryan was born and raised in Juneau, Alaska. He attended Black Hills State University in Spearfish, South Dakota, where he studied marketing and played wide receiver.", "He and his wife, Mallorie Fagerstrom, originally Mallorie Haley of Winner, South Dakota, now live in Brandon, South Dakota, with their four children."] },
    ], cta: "Start with a real conversation about your business."
  },
};

export const pageKeys = Object.keys(pages);
