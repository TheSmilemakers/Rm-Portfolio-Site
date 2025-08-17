import { home } from "./content";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://rajanmaher.com";

// Routes configuration
const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
  "/game": true,
};

const display = {
  location: true,
  time: true,
  themeSwitcher: true  // Keep the toggle visible for light/dark switching
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes = {};

// Import and set fonts based on your preference
import { Space_Grotesk } from "next/font/google";
import { Roboto_Slab } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

// Space Grotesk for heading
const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

// Space Grotesk for body
const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Roboto Slab for labels
const label = Roboto_Slab({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

// JetBrains Mono for code
const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// Your preferred style configuration - DARK MODE AS DEFAULT
const style = {
  theme: "dark",            // DARK mode as default
  brand: "yellow",          // Yellow brand color
  accent: "orange",         // Orange accent
  neutral: "sand",          // Sand neutral palette
  border: "playful",        // Playful border style
  solid: "contrast",        // Contrast for buttons
  solidStyle: "flat",       // Flat visual depth
  surface: "translucent",   // Translucent surface opacity
  transition: "all",        // All motion enabled
  scaling: "100"            // Default scaling
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  }
};

// Updated schema data for Rajan Maher
const schema = {
  logo: "/logo-dark.svg",
  type: "Person",
  name: "Rajan Maher",
  description: home.description,
  email: "hello@rajanmaher.com",
};

// Updated social links for Rajan Maher
const sameAs = {
  github: "https://github.com/rajanmaher",
  linkedin: "https://www.linkedin.com/in/rajanmaher/",
};

export { display, mailchimp, routes, protectedRoutes, baseURL, fonts, style, schema, sameAs, effects, dataStyle };