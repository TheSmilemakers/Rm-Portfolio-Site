import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Rajan",
  lastName: "Maher",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Digital Craftsman",
  avatar: "/images/rajan-avatar.jpg", // Updated to use processed JPG
  email: "rajan@thesmilemakers.org",
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
  headline: <>Rajan Maher – Digital Craftsman</>,
  featured: {
    display: true,
    title: <>Latest: <strong className="ml-4">CFlow – Enterprise Workforce Platform</strong></>,
    href: "/work/cflow-workforce-platform",
  },
  subline: (
    <>
      I build intelligent systems at the intersection of healthcare, technology, and enterprise. 
      From running dental practices and medical ventures to designing AI-powered platforms, 
      my work transforms complexity into clarity.
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
    title: "About Me",
    description: (
      <>
        I am a dentist, entrepreneur, and digital craftsman with over 20 years of experience creating impact across healthcare and technology. 
        My career began in clinical dentistry, where I mastered implants, orthodontics, aesthetics, and restorative care while owning and managing successful practices in London.
        <br /><br />
        As a healthcare entrepreneur, I launched ventures ranging from private practices to diagnostic services and medical tourism, 
        including the establishment of accredited healthcare testing during the Covid-19 era and The Smile Makers, 
        a medical tourism platform bridging UK patients with leading international clinics. 
        These experiences sharpened my skills in compliance, governance, operations, and patient-centric service design.
        <br /><br />
        In 2025, I expanded into artificial intelligence and automation. My projects now span AI-powered healthcare assistants, 
        SaaS platforms for GP compliance and rota management, cloud-hosted LLM agent systems, and algorithmic trading models. 
        By combining clinical insight, business leadership, and technical expertise, I create systems that not only scale 
        but also improve patient care, business efficiency, and decision-making.
      </>
    ),
  },
  work: {
    display: false, // Disable work experience section as it's covered in intro
  },
  studies: {
    display: false, // Education is covered in the intro
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Healthcare & Dentistry",
        description: <>
          Implants, orthodontics, aesthetics, compliance, practice management.
        </>,
        images: [],
      },
      {
        title: "AI & Automation",
        description: <>
          LLMs, RAG systems, workflow automation, agent orchestration.
        </>,
        images: [],
      },
      {
        title: "Full-Stack Development",
        description: <>
          React, Next.js, Node.js, Python, PostgreSQL, Supabase.
        </>,
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: <>
          AWS, Vercel, Docker, Kubernetes.
        </>,
        images: [],
      },
      {
        title: "Finance & Trading",
        description: <>
          Quantitative analysis, algorithmic trading, risk management.
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

const game = {
  path: "/game",
  label: "Play",
  title: `Galactic Hustle – ${person.name}`,
  description: "Space trading game showcasing strategic gameplay and AI decision-making",
  image: "/images/og/game.jpg",
};

export { person, social, newsletter, home, about, blog, work, gallery, game };