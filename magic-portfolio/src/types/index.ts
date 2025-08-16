// Type definitions for the portfolio

export interface GalleryImage {
  src: string;
  alt: string;
  orientation: 'horizontal' | 'vertical';
}

export interface ImageItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Experience {
  company: string;
  timeframe: string;
  role: string;
  achievements: React.ReactNode[];
  images: ImageItem[];
}

export interface Institution {
  name: string;
  description?: React.ReactNode;
}

export interface Skill {
  title: string;
  description: React.ReactNode;
  images: ImageItem[];
}

export interface SocialItem {
  name: string;
  link?: string;
  display: boolean;
  icon?: string;
}

export interface Gallery {
  path: string;
  label: string;
  title: string;
  description: string;
  images: GalleryImage[];
}