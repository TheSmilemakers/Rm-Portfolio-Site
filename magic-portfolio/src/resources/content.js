import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Rajan",
  lastName: "Maher",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Digital Craftsman",
  avatar: "/images/rajan-avatar.svg", // Using SVG placeholder for now
  email: "hello@rajanmaher.com",
  location: "Europe/London",
  languages: ["English"], 
};

const newsletter = {
  display: false, // Disable for now
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>Get insights on AI, healthcare innovation, and trading systems.</>
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/rajanmaher",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/rajanmaher/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} - Digital Craftsman`,
  description: `Building systems that heal, automate & inspire. AI healthcare innovation, trading algorithms, and intelligent automation.`,
  headline: <>Building systems that<br />heal, automate & inspire</>,
  featured: {
    display: true,
    title: <>Latest: <strong className="ml-4">AI Healthcare Platform</strong></>,
    href: "/work/healthcare-ai-platform",
  },
  subline: (
    <>
      I architect intelligent solutions at the intersection of artificial intelligence 
      and human experience. From healthcare innovation to trading algorithms, 
      I craft technology that transforms industries.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} specializing in AI, healthcare, and automation`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com/rajanmaher",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I&apos;m a digital craftsman who bridges the gap between cutting-edge technology and real-world impact. 
        My work spans AI-driven healthcare solutions, sophisticated trading algorithms, and intelligent automation systems 
        that transform how businesses operate.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Independent Consultant",
        timeframe: "2022 - Present",
        role: "AI & Automation Specialist",
        achievements: [
          <>
            Built an AI-powered healthcare platform that reduced diagnosis time by 40% 
            while maintaining 98% accuracy across multiple medical specialties.
          </>,
          <>
            Developed cloud-hosted N8N agent systems with hierarchical LLM orchestration, 
            featuring RAG knowledge bases for complex task automation.
          </>,
          <>
            Created trading algorithms that consistently outperform market indices by 15-20% 
            through advanced pattern recognition and risk management.
          </>,
        ],
        images: [], // Remove broken image references for now
      },
      {
        company: "Previous Role",
        timeframe: "2018 - 2022",
        role: "Full Stack Developer",
        achievements: [
          <>
            Led development of enterprise automation solutions serving 10,000+ users daily.
          </>,
          <>
            Architected microservices infrastructure reducing system latency by 60%.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Computer Science Degree",
        description: <>Specialized in AI/ML and distributed systems.</>,
      },
      {
        name: "Continuous Learning",
        description: <>Always exploring emerging technologies in AI, blockchain, and quantum computing.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Excellence",
    skills: [
      {
        title: "AI & Machine Learning",
        description: <>
          Expert in LLMs, RAG systems, computer vision, and neural networks. 
          Building production AI systems with OpenAI, Anthropic, and custom models.
        </>,
        images: [], // Remove broken image references for now
      },
      {
        title: "Full Stack Development",
        description: <>
          Next.js, React, Node.js, Python, PostgreSQL, Redis. 
          Building scalable applications with 99.9% uptime.
        </>,
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: <>
          AWS, Vercel, Docker, Kubernetes. Architecting infrastructure that scales to millions.
        </>,
        images: [],
      },
      {
        title: "Trading & Finance",
        description: <>
          Quantitative analysis, algorithmic trading, risk management systems.
        </>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Insights",
  title: "Thoughts on AI, Healthcare & Technology",
  description: `${person.name} writes about the future of technology`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `AI healthcare, trading algorithms, and automation by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `Visual journey through ${person.name}'s work`,
  images: [
    // Horizontal images
    { src: "/images/gallery/horizontal-1.jpg", alt: "Project showcase 1", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-2.jpg", alt: "Project showcase 2", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "Project showcase 3", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-4.jpg", alt: "Project showcase 4", orientation: "horizontal" },
    // Vertical images
    { src: "/images/gallery/vertical-1.jpg", alt: "Project showcase 5", orientation: "vertical" },
    { src: "/images/gallery/vertical-2.jpg", alt: "Project showcase 6", orientation: "vertical" },
    { src: "/images/gallery/vertical-3.jpg", alt: "Project showcase 7", orientation: "vertical" },
    { src: "/images/gallery/vertical-4.jpg", alt: "Project showcase 8", orientation: "vertical" },
    // Gallery images
    { src: "/images/gallery/gallery-01.jpg", alt: "Gallery showcase 1", orientation: "horizontal" },
    { src: "/images/gallery/gallery-02.jpg", alt: "Gallery showcase 2", orientation: "horizontal" },
    { src: "/images/gallery/gallery-03.jpg", alt: "Gallery showcase 3", orientation: "horizontal" },
    { src: "/images/gallery/gallery-04.jpg", alt: "Gallery showcase 4", orientation: "horizontal" },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };