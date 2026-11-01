// Central content source for the portfolio. Editing here updates the whole site.

export const NAME = "Sudhanraja S";

// Original colour photo (with its studio background) used on the About profile
// card. Not cut out, so the hair edges stay natural.
export const PROFILE_CARD_PHOTO = "/portrait-card.webp";

export const SHORT_NAME = "sudhan";
export const HERO_TAGLINE =
  "an ai-focused software engineer building agentic ai and full-stack products";

export const ABOUT_TEXT =
  "I'm an AI-focused software engineer at OASYS Cybernetics in Chennai. I build agentic AI and full-stack products with Python, FastAPI, React, TypeScript and LLMs — right now Oasys Meet, a real-time meeting platform with WebRTC video, an LLM tool-calling assistant and AI-generated call summaries. Let's build something incredible together!";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Point this to your hosted resume (e.g. a PDF in /public). RESUME_DOWNLOAD_NAME
// is the filename the browser saves it as.
export const RESUME_URL = "/resume.pdf";
export const RESUME_DOWNLOAD_NAME = "Sudhanraja_S_Software_Engineer_Resume.pdf";

// Public contact details. Nothing secret here — safe to ship in the frontend.
export const EMAIL = "sudhanraja003@gmail.com";
export const WHATSAPP_NUMBER = "918754330144"; // wa.me format: country code + number, digits only

// Formspree endpoint the contact form submits to. Safe to expose client-side.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljrbjda";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Sudhanraja", handle: "@Sudhanraja" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sudhanraja-s", handle: "in/sudhanraja-s" },
  { label: "Email", href: `mailto:${EMAIL}`, handle: EMAIL },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    handle: "+91 87543 30144",
  },
];

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "OASYS Cybernetics Pvt. Ltd.",
    location: "Chennai",
    period: "Mar. 2026 – Present",
    points: [
      "Built Oasys Meet, a full-stack AI meeting platform (React/TypeScript, FastAPI, PostgreSQL, Redis) with 168 REST and WebSocket endpoints, WebRTC/LiveKit video calls for up to 100 participants, chat, and calendar.",
      "Developed an LLM tool-calling agent with 45 tools that schedules meetings, searches history, and joins live calls, with SSE streaming, long-term memory, live translated captions, and AI-generated call summaries.",
      "Built RAG pipelines end to end, covering document ingestion, chunking, embeddings, vector search, and reranking, to improve the relevance of LLM-powered knowledge retrieval.",
    ],
  },
  {
    role: "Process Associate",
    company: "Capgemini",
    location: "Trichy",
    period: "Aug. 2025 – Dec. 2025",
    points: [
      "Adjudicated health insurance claims by verifying policy coverage, member eligibility, and supporting documentation to ensure accuracy and regulatory compliance.",
      "Evaluated claims against insurance guidelines to approve, deny, or modify them while upholding quality standards.",
      "Maintained accurate claim records, resolved processing discrepancies, and closed cases through timely documentation and stakeholder communication.",
    ],
  },
];

export const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    group: "AI & LLM",
    items: [
      "Agentic AI & Tool Calling",
      "RAG",
      "LangChain",
      "OpenAI, Anthropic & Gemini APIs",
      "Whisper",
      "Prompt Engineering",
      "Semantic Search",
    ],
  },
  {
    group: "Backend",
    items: [
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Server-Sent Events",
      "SQLAlchemy",
      "Alembic",
      "Pydantic",
      "JWT",
      "OAuth",
    ],
  },
  {
    group: "Frontend & Real-time",
    items: ["React", "Vite", "Tailwind CSS", "Streamlit", "Recharts", "WebRTC", "LiveKit (SFU)"],
  },
  {
    group: "Databases & Storage",
    items: ["PostgreSQL", "Redis", "ChromaDB", "MinIO/S3"],
  },
  {
    group: "DevOps & Tools",
    items: ["Docker", "nginx", "Git, GitHub & GitLab", "pytest", "Vitest", "Postman", "Swagger/OpenAPI", "VS Code"],
  },
];

// "Services"-style list in the white section. Built from SKILLS above.
export const EXPERTISE = [
  {
    name: "Agentic AI & LLM Apps",
    description:
      "LLM tool-calling agents with streaming, long-term memory and confirmation guards, on pluggable OpenAI, Anthropic and Gemini providers.",
  },
  {
    name: "RAG & Semantic Search",
    description:
      "End-to-end retrieval pipelines — ingestion, chunking, embeddings, vector search and reranking — that ground LLM answers in real data.",
  },
  {
    name: "Backend & Real-time APIs",
    description:
      "FastAPI services with REST, WebSockets and Server-Sent Events, PostgreSQL via SQLAlchemy, and Redis pub/sub for fan-out across workers.",
  },
  {
    name: "Real-time Video",
    description:
      "WebRTC calling with peer-to-peer mesh for small rooms, LiveKit SFU for larger ones, and TURN/STUN for reliable connectivity.",
  },
  {
    name: "Full-Stack Web",
    description:
      "Responsive React and TypeScript interfaces with Tailwind CSS, wired end to end to the APIs and AI services behind them.",
  },
];

export const PROJECTS = [
  {
    title: "Oasys Meet",
    tagline: "AI meeting & team-communication platform",
    problem:
      "Teams juggle separate tools for video calls, chat, calendars and follow-ups. Oasys Meet brings meetings, chat, contacts, a calendar, call history and notes into one browser app — with an AI assistant that does the follow-up work.",
    description:
      "A full-stack meeting platform with adaptive WebRTC video, in-call collaboration, live translated captions and recording, plus “Dennis”, an LLM tool-calling assistant that schedules meetings, searches history, summarises calls and joins live calls as a participant.",
    highlights: [
      "168 REST and WebSocket endpoints across meetings, chat, calendar, calls and AI, on FastAPI, PostgreSQL and Redis.",
      "Hybrid media: peer-to-peer WebRTC for small rooms, automatic LiveKit SFU switch for up to 100 participants.",
      "LLM agent with 45 tools, SSE streaming, long-term memory and confirmation guards; post-call summaries and action items.",
    ],
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "WebRTC", "LiveKit", "LLM Tool Calling"],
    images: [
      { src: "/oasys-meet/sign-in.png", caption: "Sign in" },
      { src: "/oasys-meet/home.png", caption: "Home" },
      { src: "/oasys-meet/meet.png", caption: "Meet" },
      { src: "/oasys-meet/lobby.png", caption: "Meeting lobby" },
      { src: "/oasys-meet/ask-dennis.png", caption: "Ask Dennis" },
      { src: "/oasys-meet/chat.png", caption: "Chat" },
      { src: "/oasys-meet/people.png", caption: "People" },
      { src: "/oasys-meet/sticky-notes.png", caption: "Sticky notes" },
    ],
    category: "Full-Stack · Agentic AI · Real-time",
    repo: "",
    demo: "",
  },
  {
    title: "FinPilot AI",
    tagline: "AI-powered personal finance platform",
    problem:
      "Most people track income, expenses, budgets, and savings goals across scattered apps and spreadsheets — with no single view and no guidance. FinPilot AI brings all of it into one place and adds an AI advisor on top.",
    description:
      "A full-stack finance platform with 30+ REST endpoints covering authentication, income, expenses, budgets, goals, dashboards and AI services — with a Gemini-powered advisor that works on each user's own aggregated financial data.",
    highlights: [
      "AI advisor features — chat, spending analysis, savings forecast, and budget and goal recommendations — built with the Gemini API and LangChain.",
      "Secured with JWT authentication, bcrypt password hashing, OTP verification for contact changes, and protected frontend and backend routes.",
      "Responsive Recharts dashboards (income vs. expense, category breakdown, goal progress) and per-category monthly budgets tracked against live spending.",
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "SQLAlchemy", "Gemini API", "LangChain", "Recharts", "JWT"],
    images: [
      { src: "/finpilot/dashboard.png", caption: "Dashboard" },
      { src: "/finpilot/analytics.png", caption: "Analytics" },
      { src: "/finpilot/ai-advisor.png", caption: "AI Advisor" },
      { src: "/finpilot/income.png", caption: "Income" },
      { src: "/finpilot/expense.png", caption: "Expenses" },
      { src: "/finpilot/budget.png", caption: "Budget" },
      { src: "/finpilot/goals.png", caption: "Goals" },
      { src: "/finpilot/profile.png", caption: "Profile" },
      { src: "/finpilot/login.png", caption: "Login" },
      { src: "/finpilot/register.png", caption: "Register" },
    ],
    category: "Full-Stack · AI",
    repo: "https://github.com/Sudhanraja/finpilot-ai",
    demo: "",
  },
  {
    title: "Employee Handbook RAG",
    tagline: "Retrieval-augmented assistant for company docs",
    problem:
      "Employees waste time hunting through long policy PDFs to answer simple questions. This assistant lets them ask in plain language and get answers grounded in the handbook — instead of guessing or pinging HR.",
    description:
      "An end-to-end RAG assistant that answers natural-language questions about an employee handbook using semantic search and Gemini-generated responses, served through a real-time Streamlit interface.",
    highlights: [
      "Modular ingestion and retrieval pipeline: PDF parsing with pypdf, text chunking, Sentence Transformers embeddings, and persistent vector storage in ChromaDB.",
      "Grounded Gemini responses in retrieved handbook passages to keep answers context-aware and limit hallucination.",
      "Real-time, document-based question answering through an interactive Streamlit interface.",
    ],
    tech: ["Python", "Streamlit", "ChromaDB", "Sentence Transformers", "Gemini API", "pypdf"],
    images: [
      { src: "/handbook/answer.png", caption: "Grounded answer" },
      { src: "/handbook/grounded.png", caption: "Declines off-topic" },
    ],
    category: "RAG · Python",
    repo: "https://github.com/Sudhanraja/Employee-Handbook-RAG",
    demo: "",
  },
];
