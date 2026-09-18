/* Content copied from the legacy inline script. Keep it in JavaScript for now. */
export const CONTACT = {
  email: "kanwalkumarofficial@gmail.com",
  linkedin: "https://www.linkedin.com/in/kanwal-kumar-ai/",
  github: "https://github.com/kumarkanwal",
  whatsapp: "https://wa.me/923133772883",
  cv: "/cv-kanwal-kumar.pdf",
  formEndpoint: "https://n8n.kanwalkumar.com/webhook/portfolio-contact",
  apiBase: "https://api.kanwalkumar.com"
};

export const VOICE_ENABLED = false;
export const VOICE_ENDPOINT = "";

export const PROFILE = {
  facts: [
    ["Working hours", "9AM – 5 PM ET"],
    ["Overlap", "Full UK / US Day"],
    ["Remote", "Yes"],
    ["Relocation", "Open"],
    ["Experience", "5 years freelance"]
  ],
  metrics: [
    ["3", "production systems still running", ""],
    ["5", "years building production automation", " yrs"],
    ["3", "countries I've worked with clients in", ""]
  ]
};

export const STACK = [
  {n:"Python",       i:"python/python-original",              k:"Languages"},
  {n:"TypeScript",   i:"typescript/typescript-original",      k:"Languages"},
  {n:"JavaScript",   i:"javascript/javascript-original",      k:"Languages"},
  {n:"SQL",          mono:"SQL",                              k:"Languages"},
  {n:"Bash",         i:"bash/bash-original",                  k:"Languages"},

  {n:"OpenAI API",   si:"openai/888888",   k:"AI & agents"},
  {n:"LangChain",    si:"langchain",                       k:"AI & agents"},
  {n:"RAG / vector search", mono:"RAG",                       k:"AI & agents"},
  {n:"Prompt evaluation",   mono:"EVAL",                      k:"AI & agents"},

  {n:"n8n",          si:"n8n",                             k:"Automation"},
  {n:"Twilio",       i:"twilio/twilio-original",              k:"Automation"},
  {n:"WhatsApp API", si:"whatsapp",                        k:"Automation"},
  {n:"Zapier",       si:"zapier",                          k:"Automation"},
  {n:"Webhooks / REST", mono:"API",                           k:"Automation"},

  {n:"Node.js",      i:"nodejs/nodejs-original",              k:"Backend & data"},
  {n:"FastAPI",      i:"fastapi/fastapi-original",            k:"Backend & data"},
  {n:"PostgreSQL",   i:"postgresql/postgresql-original",      k:"Backend & data"},
  {n:"Redis",        i:"redis/redis-original",                k:"Backend & data"},
  {n:"Supabase",     i:"supabase/supabase-original",          k:"Backend & data"},

  {n:"React",        i:"react/react-original",                k:"Frontend"},
  {n:"Next.js",      i:"nextjs/nextjs-original",              k:"Frontend"},
  {n:"Tailwind CSS", i:"tailwindcss/tailwindcss-original",    k:"Frontend"},
  {n:"HTML / CSS",   i:"html5/html5-original",                k:"Frontend"},

  {n:"Docker",       i:"docker/docker-original",              k:"Infra & tooling"},
  {n:"AWS",          i:"amazonwebservices/amazonwebservices-original-wordmark", k:"Infra & tooling"},
  {n:"Vercel",       i:"vercel/vercel-original",              k:"Infra & tooling"},
  {n:"Git",          i:"git/git-original",                    k:"Infra & tooling"},
  {n:"Linux",        i:"linux/linux-original",                k:"Infra & tooling"}
];

export const CATS = ["AI agents","N8N & Automation","Websites","Products","Plugins"];

/* live → green production pill · url → a real clickable link, "" if none
   ask  → private system, offer a walkthrough instead (use sparingly) */
export const PROJECTS = [
  {
  slug:"rag-agent", cat:"AI agents", live:true, url:"", ask:false,
  name:"This site's AI assistant: RAG over my own documents",
  tagline:"A grounded assistant that answers recruiter questions from my case studies, and refuses rather than guesses.",
  result:"Live on this page. Four model providers behind it, free tiers first, so a rate limit on one never takes it down.",
  stack:["Python","FastAPI","LangChain","Chroma","Docker","Groq / Gemini / Cerebras"],
  meta:[
    ["Type","Personal project — production"],
    ["Role","Sole engineer"],
    ["Built in","1 week"],
    ["Live since","August 2026"],
    ["Providers","4, with automatic fallback"],
    ["Status","Running on my own VPS"]
  ],
  
  what:"A FastAPI service that retrieves over my case studies, CV and project notes, and answers questions about my work. It shows which document each answer came from, and says it does not know rather than inventing a detail. It is the assistant on the Ask my AI section of this site.",
  problem:"A portfolio asks you to read. A recruiter with forty tabs open does not read — they skim for one thing: production experience, a specific stack, or what I am weakest at. This answers that directly. The harder problem is that every public LLM demo invents things, and one invented detail about my own CV would make a recruiter discard everything else on this site.",
  built:[
    "FastAPI backend, LangChain composing the retrieval chain and per-session history, Chroma as the vector store.",
    "Local embeddings rather than an API. Embeddings cannot fall back between providers — an index built with one model is meaningless to another — so moving them off the network removed that whole class of failure.",
    "Four chat providers in a fallback chain, free tiers first, paid last and normally never reached. If one is rate-limited or down, the next answers the same request.",
    "Rate limiting in three layers: per session, per IP per day, and a global daily kill switch. Every check runs before the model call, so a blocked request costs nothing.",
    "Input length capped in the request schema and output tokens capped on the model, so no single request can be expensive.",
    "Dockerised with the index and embedding model baked into the image, so a restart is instant and a deploy never depends on a third party being reachable.",
    "Deployed on my own VPS behind a reverse proxy with automatic TLS."
  ],
  nodes:[
    {t:"Visitor asks",   s:"Frontend", d:"Session id generated in the browser. The counter is honest but bypassable — that layer is politeness, not security."},
    {t:"Check quota",    s:"Limits",   d:"Session, IP and global counters checked before anything else. A blocked request never reaches a model, so abuse costs nothing."},
    {t:"Retrieve",       s:"Chroma",   d:"Top chunks from my own documents, embedded locally. The filename travels with each chunk so the answer can cite its source."},
    {t:"Ground the prompt", s:"Prompt", d:"The model is instructed to answer only from retrieved context, and to hand over an email address when it cannot. Refusing is a defined outcome, not a failure."},
    {t:"Call a model",   s:"Fallback", d:"Groq first for latency. If it fails, Gemini, then Cerebras, then OpenRouter, on the same request. The visitor never sees a provider outage."},
    {t:"Answer + source", s:"Response", d:"The reply, the documents it came from, and how many questions are left. Showing the source is what separates this from a chatbot that makes things up."}
  ],
  hard:{t:"The interesting problem",d:"Getting the model to refuse. Asked about a skill that is not in its context, a model will reach for a plausible sentence — and a plausible sentence about my own CV is a lie a recruiter will catch. The fix was not one instruction but three together: a low temperature, a prompt that treats an unanswerable question as a normal outcome with a defined response, and a corpus that states my weaknesses explicitly so there is honest material to retrieve instead of a gap to fill. The second problem was subtler: the obvious fallback design rotates every API call across providers including embeddings, which does not error — it just quietly returns irrelevant results."},
  learn:"Stream the response. It waits for the full answer before showing anything, which on a slow provider reads as broken. I would also put the rate-limit counters in Redis from the start — in-memory is correct for one worker and silently wrong the moment there are two.",
  links:[["Try it on this page","#/#ask"],["Source","https://github.com/kumarkanwal/kanwal-kumar-ai-portfolio-rag-aiagent"]]
},
{
  slug:"contact-automation", cat:"N8N & Automation", live:true, url:"https://kanwalkumar.com/#/#contact", ask:false,
  name:"Contact pipeline — n8n workflow behind this site",
  tagline:"The form on this page. Validates, filters bots, notifies me and confirms to the sender — no inbox babysitting.",
  result:"Every enquiry acknowledged within seconds, and I have never lost one to a spam folder or a missed notification.",
  stack:["n8n","Webhooks","SMTP","JavaScript"],
  meta:[
    ["Type","Personal infrastructure — production"],
    ["Role","Sole engineer"],
    ["Built in","1 day"],
    ["Live since","August 2026"],
    ["Runs on","Self-hosted n8n"],
    ["Try it","The contact form on this site"]
  ],
  what:"The automation behind the contact form on this page. A webhook receives the submission, screens it, emails me the enquiry and sends the sender an immediate confirmation. Self-hosted n8n on my own VPS.",
  problem:"A contact form that only emails you is a form that quietly fails. The sender gets no acknowledgement and has no idea whether it went through, and you find out about the failure when someone follows up angrily on LinkedIn a week later — or never. The second problem is bots: a public form with no filtering fills your inbox with junk until you stop reading it.",
  built:[
    "Webhook trigger with CORS locked to my own domains, so the endpoint only accepts submissions from this site.",
    "A shared-secret header on every request, so a bot hitting the webhook URL directly is rejected before anything runs.",
    "A honeypot field, hidden from humans and invisible to screen readers. Bots fill it, people cannot, and anything with it filled is dropped silently rather than bounced — a rejection message tells a bot what to fix.",
    "Field validation in the workflow rather than trusting the browser, since client-side validation is convenience, not security.",
    "Two emails in parallel: the enquiry to me with the sender's details, and a confirmation back to them so nobody is left guessing.",
    "Sent over authenticated SMTP with proper DNS records rather than a default mail function, because deliverability is the whole point of the system."
  ],

  
  nodes:[
    {t:"Form submitted", s:"Browser",  d:"Validated in the browser first for fast feedback — but that check is a courtesy to the user, not a defence. Everything is re-checked server-side."},
    {t:"Webhook receives", s:"n8n",    d:"CORS restricted to my domains and a shared-secret header required. A request without both never reaches the rest of the workflow."},
    {t:"Screen it",     s:"Filter",    d:"Honeypot checked and fields validated. Bot submissions are dropped silently — returning an error just tells the bot which field to fix next time."},
    {t:"Notify me",     s:"SMTP",      d:"The enquiry lands in my inbox with the sender's details, so I can reply directly rather than through a dashboard."},
    {t:"Confirm to sender", s:"SMTP",  d:"An immediate confirmation, so the sender knows it arrived. This is the part most contact forms skip, and it is the part that decides whether someone follows up or assumes you ignored them."}
  ],
  hard:{t:"The interesting problem",d:"Deliverability, not the workflow. Automated mail from a new domain lands in spam by default — the workflow can run perfectly and the enquiry still never gets read, and you will not know, because a spam-foldered email produces no error anywhere. Getting it right meant authenticated SMTP with the DNS records configured before going live rather than after, and then actually testing delivery into Gmail and Outlook instead of assuming a green tick in n8n meant the message arrived."},
  learn:"I would log every submission to a database as well as emailing it. Right now the only record is my inbox, so a mail failure loses the enquiry entirely with nothing to recover from. A row in a table costs one node and turns a silent loss into something I can replay.",
  links:[["Try the form","https://kanwalkumar.com/#/#contact"]]
},

{
  slug: "ultrasound-report-generator",
  cat: "Products",
  live: true,
  url: "https://doctor-report-generator.kanwalkumar.com/",
  ask: false,

  name: "Ultrasound Report Generator — clinical reporting web app",

  tagline: "Doctors select an examination, enter patient details and findings, then generate, save and print a formatted ultrasound report without rebuilding it from scratch.",

  result: "Turns a repetitive manual reporting process into a reusable workflow — patient details, findings and measurements flow directly into a print-ready clinical report.",

  stack: [
    "Web App",
    "Dynamic Forms",
    "Report Generation",
    "Print / PDF",
    "Persistent Storage"
  ],

  meta: [
    ["Type", "Clinical workflow tool — production"],
    ["Role", "Sole engineer"],
    ["Status", "Live"],
    ["Use case", "Ultrasound reporting"],
    ["Output", "A4 printable report / PDF"],
    ["Live", "doctor-report-generator.kanwalkumar.com"]
  ],

  what: "A browser-based ultrasound reporting system built for doctors who repeatedly create reports from the same examination structures. The doctor selects an examination, enters the patient's details, chooses the relevant findings, fills in measurements where required and sees the finished report update alongside the form. The completed report can then be saved to history, reopened later or printed as an A4 report.",

  problem: "Ultrasound reports contain a large amount of repeated structure. Doctors often write the same organ findings, examination headings, hospital details and signature information again and again, while only a small part of each report changes for the individual patient. That makes reporting slower and also makes formatting inconsistent. I built the system so the reusable parts are configured once and the doctor only handles the information that changes for each patient.",

built: [
  "A report workspace where the doctor selects the examination and report title before entering patient information.",

  "Structured patient fields for name, referral information, date, age and sex, which are automatically placed into the formatted report.",

  "A reusable findings system where sections such as Liver, Kidneys, Pancreas, Spleen, Bladder and other examination findings can be enabled or excluded from an individual report.",

  "Pre-written finding phrases so common normal or abnormal findings can be selected instead of typed repeatedly, while still allowing the doctor to edit the text when a case needs something different.",

  "Support for report-specific values and measurements, allowing the doctor to fill placeholders such as organ dimensions and volumes directly from the reporting interface.",

  "A live report preview that updates while the doctor works, so the final printed document can be checked before it is saved or printed.",

  "A print-ready A4 layout containing the hospital letterhead, patient information, examination findings and the doctor's signature and credentials.",

  "Report history with patient/date search, allowing previous reports to be reopened and reprinted instead of recreated.",

  "A clinic settings area where the hospital name, department and logo can be configured once and reused automatically on future reports.",

  "A configurable doctor signature block with the doctor's name and multiple credential lines printed automatically at the bottom of reports.",

  "A reusable finding library where report sections and their available phrases can be created, edited, enabled or disabled.",

  "A configurable examination library where different ultrasound examination types can have their own report titles, findings and section order."
],

nodes: [
  {
    t: "Select examination",
    s: "Template",
    d: "The doctor chooses the ultrasound examination. The system loads the relevant report sections, findings and configured fields."
  },
  {
    t: "Enter patient details",
    s: "Patient",
    d: "Patient name, referral information, age, sex and examination date are entered once and automatically placed into the report."
  },
  {
    t: "Choose findings",
    s: "Findings",
    d: "The doctor selects the findings relevant to the examination and can edit the generated text whenever the case requires something different."
  },
  {
    t: "Add measurements",
    s: "Values",
    d: "Measurements and examination-specific values are entered into the structured fields and inserted into the corresponding report text."
  },
  {
    t: "Preview report",
    s: "Preview",
    d: "The formatted A4 report updates while the doctor works, allowing the final document to be checked before saving."
  },
  {
    t: "Save or print",
    s: "Output",
    d: "The completed report can be stored in report history and printed or saved as a PDF."
  }
],

hard: {
  t: "The interesting problem",
  d: "The main challenge was making the system flexible enough for different ultrasound examinations without building a separate form for every report type. Examinations, findings and report sections are configurable, so the doctor can reuse the same reporting system while each examination still has its own structure."
},

learn: "I would continue improving the template system and make examination configuration even more flexible, so new report types and specialised fields can be added without changing the application code.",

links: [
  ["Live app", "https://doctor-report-generator.kanwalkumar.com/"]
]
},


  {
  slug:"fast-track-supply", cat:"Websites", live:true, url:"https://fasttracksupply.com.au/", ask:false,
  name:"Fast Track Supply — wholesale site with AI assistant",
  tagline:"Took a wholesale business from no online presence to a catalogue site with a RAG assistant, in 7 days.",
  result:"Their first online presence — buyers can now find the range and enquire without already knowing the phone number.",
  stack:["Next.js","Node.js","OpenAI","RAG / vector search","Vercel"],
  meta:[
    ["Type","Client project — production"],
    ["Role","Sole engineer and designer"],
    ["Client","Wholesale supplier, Australia"],
    ["Built in","7 days"],
    ["Live since","August 2026"],
    ["Status","Live on fasttracksupply.com.au "]
  ],
  what:"A four-page site with a product catalogue, an admin panel the client runs themselves, a two-way enquiry form, and a RAG assistant that answers buyer questions from the company's own information.",
  problem:"They had nothing — no site at all. Buyers had no way to see the range or make an enquiry, and the business had no way to show what it stocked. Every enquiry depended on someone already knowing the phone number.",
  built:[
    "Four-page Next.js site with a Node.js backend, deployed on Vercel.",
    "Product catalogue driven by an admin panel, so the client adds and edits products without coming back to me.",
    "Enquiry form that emails the business and sends the buyer an automatic confirmation, so neither side is left guessing.",
    "A RAG assistant grounded on the company's own information, answering whatever a buyer asks about the business rather than from general knowledge.",
    "On-page SEO — page titles, meta descriptions, semantic headings, image alt text and a sitemap, with the site verified in Google Search Console.",
    "Cloudflare in front for DNS, caching and SSL, with the .com.au domain queued behind the client's registrar transfer.",
    "Mobile-first layout, since wholesale buyers browse on a phone between deliveries."
  ],
  nodes:[
    {t:"Buyer arrives",  s:"Entry",     d:"Search or direct. Before this site there was no entry point at all — the business was invisible to anyone who did not already have the number."},
    {t:"Browse range",   s:"Catalogue", d:"Products are served from the database, not hardcoded, so the range on the site is always what the client last published."},
    {t:"Ask the assistant", s:"RAG",    d:"Answers any question about the business from the company's own information — the range, the terms, how ordering works — rather than making the buyer hunt through pages."},
    {t:"Enquire",        s:"Form",      d:"The buyer submits what they are after. Validated before submit, so a bad email address does not silently lose the enquiry."},
    {t:"Both sides notified", s:"Email",d:"The enquiry goes to the business and a confirmation goes back to the buyer at the same time, so nothing sits in an inbox unacknowledged."},
    {t:"Client updates", s:"Admin",     d:"The client adds, edits and removes products themselves. No dependency on me for a price change or a new line."}
  ],
  hard:{t:"The interesting problem",d:"Scope, in a seven-day build. A catalogue, an admin panel, a two-way enquiry flow and a grounded assistant is more than a week normally holds. I built the narrowest working version of each in order — catalogue, then admin, then enquiries, then the assistant — so that if the week ran out the client still had a complete site rather than four half-finished features. It shipped on time with all four."},
  learn:"I would set up Search Console and Cloudflare on day one rather than at the end. Indexing does not start until the site is verified, and doing it last cost the client a few days of visibility they did not need to lose.",
  links:[["Live site","https://fasttracksupply.com.au/"]]
},
{
  slug:"taxi-booking-plugin", cat:"Plugins", live:true, url:"https://quicktaxiamsterdam.nl/", ask:false,
  name:"WordPress taxi booking plugin",
  tagline:"Booking, fare calculation and payment — replacing a rented SaaS the client couldn't control.",
  result:"Cut a recurring $30–40/month subscription to zero, and gave the operator fare rules and booking data the paid tool never exposed.",
  stack:["PHP","WordPress","JavaScript","MySQL","Google Maps API","Mollie"],
  meta:[
    ["Type","Client project — production"],
    ["Role","Full stack developer"],
    ["Client","Taxi operator, Netherlands"],
    ["Built in","4 weeks"],
    ["Live since","May 2025"],
    ["Payments","Mollie"]
  ],
  what:"A custom WordPress plugin that runs the whole booking end to end — the customer enters their journey, the plugin prices it from real distance, takes payment through Mollie, and both sides get a confirmation. The operator manages everything from wp-admin.",
  problem:"The client was renting a third-party booking tool for $30–40 a month and still couldn't change how it worked. Fields they didn't need, fields they did need that weren't there, no control over pricing rules, and no access to their own booking data. They were paying a subscription for something they didn't own.",
  built:[
    "Booking form built into their existing WordPress theme — no external embed or iframe.",
    "Google Maps API for address autocomplete and real route distance, so pickup and drop-off are validated as real locations rather than free text.",
    "Fare calculated per kilometre, with fixed postcode-based rates overriding it where the operator wants a set price.",
    "Fixed-rate table is importable as CSV, so the operator updates pricing in a spreadsheet instead of asking me.",
    "Payment taken through Mollie — the standard Dutch gateway, and the one their customers already expect.",
    "Server-side validation on every field: required fields, valid email, no past dates, and sanitised input before anything reaches the database.",
    "Bookings stored in the site's own database, with a wp-admin panel to view, edit, delete and export to CSV.",
    "Confirmation emails to both the operator and the customer, sent over SMTP rather than WordPress's default mail."
  ],
  nodes:[
    {t:"Enter the journey", s:"Form",      d:"Pickup, drop-off, date, time, passengers and contact details. Addresses go through Google Maps autocomplete, so the operator never receives a destination that doesn't exist."},
    {t:"Price it",          s:"Fare",      d:"Distance comes from the Maps route, priced per kilometre — unless the postcode pair matches a fixed rate, which takes precedence. The operator maintains those rates as a CSV import."},
    {t:"Validate",          s:"Checks",    d:"Every field is checked server-side before anything is written: required fields, email format, no dates in the past, and sanitised input. Client-side validation is convenience, not security."},
    {t:"Take payment",      s:"Mollie",    d:"Mollie handles the transaction. The booking is only confirmed once payment clears, so the diary never fills with unpaid holds."},
    {t:"Save booking",      s:"Database",  d:"Written to the site's own database. The client owns the record rather than renting access to it from a SaaS."},
    {t:"Notify both sides", s:"Email",     d:"Full booking details go to the operator and a confirmation to the customer, over SMTP. Neither side is left wondering whether it went through."},
    {t:"Manage",            s:"wp-admin",  d:"The operator views, edits, deletes and exports every booking to CSV from inside WordPress — no separate login, no export fee."}
  ],
  hard:{t:"The interesting problem",d:"Two things, and neither was the booking logic. WordPress's default mail is unreliable — confirmations regularly land in spam or never send at all — so I moved to SMTP with the mail port and DNS records configured properly from the start rather than discovering the problem after go-live. The second was the front end: the booking form had to sit inside the client's existing theme without looking bolted on, and the theme's own styles fought every layout decision. Scoping the plugin's CSS so it inherits the theme's typography but controls its own layout took longer than the booking flow itself."},
  learn:"I started building before the client had confirmed the design, and reworked parts of it once he saw the first version. Now I get sign-off on a mockup first — the changes he wanted were reasonable, but they cost time that a five-minute approval at the start would have saved.",
  links:[["Live site","https://quicktaxiamsterdam.nl/"]]
},

];

export const REFERENCES = [
  {q:"I've seen Kanwal build AI automation solutions from the ground up, taking ideas from concept to production with a strong focus on quality and reliability.",
   n:"Nasir Hussain", r:"Agentic AI Engineer @ Modulers Pvt Ltd.", src:"", img:"/images/refs/nasir-hussain.jpg", linkedin:""},
  {q:"I've known Kanwal for over 5 years. His passion for automation is genuine he's always looking for ways to build systems that eliminate repetitive work, whether for clients or for his own daily workflows.",
   n:"Abrar Hussain", r:"Founder & CEO, CodeSOft", src:"", img:"/images/refs/abrar-hussain.png", linkedin:""},
  {q:"Kanwal was one of the strongest students in the class. He consistently took initiative, built projects beyond the assigned work, and showed genuine Interest for learning and creating new solutions.",
   n:"Muhammad Saad Naseem", r:"Agentic AI Backend Engineer", src:"", img:"/images/refs/saad.jpg", linkedin:""},
   {q:"Kanwal developed my taxi booking system in a very professional and excellent way. The system is fast, smooth and user-friendly, and every requirement was completed on time.",
   n:"Shahzad khan", r:"CEO,Quick Taxi Amsterdam", src:"Client", img:"", linkedin:""},
];

export const EXPERIENCE = [
  {
    when: "Nov 2025 – May 2026",
    role: "AI Automation Developer — CodePro Software and Web Services",
    b: [
      "Built AI agents and workflow automations using LLMs, n8n, and Make.",
      "Developed a multilingual WhatsApp AI agent supporting 95+ languages.",
      "Owned system architecture, API integrations, deployment, and maintenance."
    ]
  },
  {
    when: "2021 – Present",
    role: "Freelance AI Automation Engineer",
    b: [
      "Built AI automation systems, web apps, and custom integrations.",
      "Delivered projects independently from planning to deployment.",
      "Collaborated with specialists when projects required additional expertise."
    ]
  }
];

export const CERTS = [
  ["BS. Computer Science","Mite University, 2028"],
  ["Agentic AI And Automation ","Saylani Institute of Technology, 2026"],
  ["Full Stack Development","Time Institute, 2023"],
  ["Agentic AI Fundamentals: Architectures, Frameworks, and Applications","LinkedIn, 2026"],
  ["A Systematic Global Comparative Review of Cyberattacks","Publications, 2026"]

];

export const RAG_SEEDS = [
  "What has he built with RAG?",
  "Does he have production experience?",
  "Which projects used Python?",
  "What is he worst at?"
];

/* ================================================================ */
