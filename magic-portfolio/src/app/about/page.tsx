import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person } from "@/resources";
import type { Experience, Institution, Skill } from "@/types";
import TableOfContents from "@/components/about/TableOfContents";
import AboutPageClient from "@/components/about/AboutPageClient";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences?.map((experience: Experience) => experience.company) || [],
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions?.map((institution: Institution) => institution.name) || [],
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill: Skill) => skill.title),
    },
  ];
  
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <AboutPageClient structure={structure} TableOfContents={TableOfContents} />
    </>
  );
}
