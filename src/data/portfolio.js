// Central content source for the portfolio. Editing here updates the whole site.

export const NAME = "Sudhanraja S";

// Drop your photo at portfolio/public/ and point this at the filename.
export const PROFILE_PHOTO = "/profile.png";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// Point this to your hosted resume (e.g. a PDF in /public). RESUME_DOWNLOAD_NAME
// is the filename the browser saves it as.
export const RESUME_URL = "/resume.pdf";
export const RESUME_DOWNLOAD_NAME = "Sudhanraja_S_Software_Engineer_Resume.pdf";

// Public contact details. Nothing secret here — safe to ship in the frontend.
export const EMAIL = "sudhanraja003@gmail.com";
export const WHATSAPP_NUMBER = "918754330144"; // wa.me format: country code + number, digits only

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

// Professional service offerings for freelance clients. Client-focused
// descriptions, no fixed prices.
export const SERVICES = [
  {
    title: "Full-Stack Web Application Development",
    description:
      "End-to-end web apps built with React and FastAPI — from database design to a polished, responsive interface, shipped and ready for real users.",
  },
  {
    title: "Backend API Development & Integration",
    description:
      "Secure, well-structured REST APIs with authentication, clean data models, and third-party integrations that your product or team can build on with confidence.",
  },
  {
    title: "AI Chatbot & RAG Application Development",
    description:
      "LLM-powered chatbots and retrieval-augmented systems that answer questions grounded in your own documents and data — accurate, cited, and production-ready.",
  },
  {
    title: "Website Maintenance & Bug Fixing",
    description:
      "Ongoing support for existing sites and apps: fixing bugs, improving performance, and keeping everything running smoothly so you can focus on your business.",
  },
];

// Scripted terminal session for the hero signature element. Every line is
// truthful — it mirrors the real stack and projects below. `kind` drives the
// styling/typing: "cmd" is typed at a prompt, "out" is printed as output,
// "comment" is a shell comment.
export const TERMINAL_SESSION = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "sudhanraja — software engineer @ oasys cybernetics" },
  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: "java · spring boot · python · fastapi · react · llms + rag" },
  { kind: "cmd", text: "curl -s api.finpilot.ai/health" },
  { kind: "out", text: '{ "status": "ok", "db": "postgres", "ai": "gemini" }' },
  { kind: "comment", text: "# open to software / backend / AI engineer roles" },
];

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "OASYS Cybernetics Pvt. Ltd.",
    location: "Chennai",
    period: "Mar. 2026 – Present",
    points: [
      "Developed end-to-end features for a production e-commerce platform, building responsive frontend interfaces and scalable REST APIs integrated with relational databases.",
      "Engineered and refined AI prompts for a customer-facing platform, improving response accuracy and consistency across automated content-generation workflows.",
      "Applied Claude AI throughout the development lifecycle to accelerate feature delivery, strengthen code quality, and streamline debugging and testing.",
    ],
  },
  {
    role: "Process Associate",
    company: "Capgemini",
    location: "Trichy",
    period: "Aug. 2025 – Dec. 2025",
    points: [
      "Reviewed and validated health insurance claims against policy coverage and eligibility criteria, ensuring accuracy and regulatory compliance.",
      "Resolved processing discrepancies and maintained precise documentation, strengthening data integrity across claim records.",
    ],
  },
];

export const SKILLS = [
  {
    group: "Languages",
    items: ["Java", "Python", "SQL", "JavaScript", "HTML/CSS"],
  },
  {
    group: "Backend & APIs",
    items: ["Spring Boot", "FastAPI", "REST APIs", "Microservices", "MVC", "OOP"],
  },
  {
    group: "AI / ML",
    items: [
      "LLMs",
      "RAG",
      "LangChain",
      "Gemini API",
      "Prompt Engineering",
      "Sentence Transformers",
      "Semantic Search",
    ],
  },
  {
    group: "Frontend",
    items: ["React", "Streamlit"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "ChromaDB", "Database Design"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA", "Eclipse"],
  },
];

export const PROJECTS = [
  {
    title: "FinPilot AI",
    tagline: "AI-powered personal finance platform",
    problem:
      "Most people track income, expenses, budgets, and savings goals across scattered apps and spreadsheets — with no single view and no guidance. FinPilot AI brings all of it into one place and adds an AI advisor on top.",
    description:
      "A full-stack finance app where users manage every money module with full CRUD, visualize trends through interactive analytics, and ask a Gemini-powered advisor questions about their own data — behind secure auth with OTP verification.",
    highlights: [
      "Built secure authentication, transaction management, and analytics dashboards on RESTful APIs developed with FastAPI and PostgreSQL.",
      "Integrated the Google Gemini API with LangChain to analyze spending patterns and generate context-aware budgeting and savings insights in real time.",
      "Designed a modular, scalable full-stack architecture with clear separation between frontend, backend, and AI service layers.",
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "Gemini API", "LangChain", "JWT"],
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
    repo: "https://github.com/Sudhanraja/finpilot-ai",
    demo: "",
  },
  {
    title: "Employee Handbook RAG",
    tagline: "Retrieval-augmented chatbot for company docs",
    problem:
      "Employees waste time hunting through long policy PDFs to answer simple questions. This chatbot lets them ask in plain language and get grounded answers with citations — instead of guessing or pinging HR.",
    description:
      "A retrieval-augmented generation chatbot that ingests handbook PDFs, retrieves the most relevant passages, and generates answers grounded in the source text — with citations — through a simple chat interface.",
    highlights: [
      "Built a document ingestion pipeline that extracts, chunks, and embeds PDF content into ChromaDB for efficient similarity retrieval.",
      "Reduced LLM hallucinations by grounding Gemini API responses in retrieved context, using Sentence Transformer embeddings for semantic accuracy.",
      "Delivered an interactive Streamlit interface for real-time, document-based question answering.",
    ],
    tech: ["Python", "Streamlit", "ChromaDB", "Sentence Transformers", "Gemini API"],
    images: [
      { src: "/handbook/answer.png", caption: "Grounded answer" },
      { src: "/handbook/grounded.png", caption: "Declines off-topic" },
    ],
    repo: "https://github.com/Sudhanraja/Employee-Handbook-RAG",
    demo: "",
  },
];
