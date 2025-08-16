import type { GalleryImage, Experience, Institution, Skill, SocialItem } from '@/types';
import type { ReactNode } from 'react';

export interface Person {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  location: string;
  languages: string[];
}

export interface Newsletter {
  display: boolean;
  title: ReactNode;
  description: ReactNode;
}

export interface Home {
  path: string;
  label: string;
  title: string;
  description: string;
  image?: string;
  featured: {
    display: boolean;
    href: string;
    title: ReactNode;
  };
  headline: ReactNode;
  subline: ReactNode;
}

export interface About {
  path: string;
  label: string;
  title: string;
  description: string;
  intro: {
    display: boolean;
    title: string;
    description: ReactNode;
  };
  work: {
    display: boolean;
    title: string;
    experiences: Experience[];
  };
  studies: {
    display: boolean;
    title: string;
    institutions: Institution[];
  };
  technical: {
    display: boolean;
    title: string;
    skills: Skill[];
  };
  avatar: {
    display: boolean;
  };
  calendar: {
    display: boolean;
    link: string;
  };
  tableOfContent: {
    display: boolean;
    subItems: boolean;
  };
}

export interface Blog {
  path: string;
  label: string;
  title: string;
  description: string;
}

export interface Work {
  path: string;
  label: string;
  title: string;
  description: string;
}

export interface Gallery {
  path: string;
  label: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export declare const person: Person;
export declare const social: SocialItem[];
export declare const newsletter: Newsletter;
export declare const home: Home;
export declare const about: About;
export declare const blog: Blog;
export declare const work: Work;
export declare const gallery: Gallery;