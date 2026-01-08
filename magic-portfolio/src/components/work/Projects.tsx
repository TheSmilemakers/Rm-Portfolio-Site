import { getPosts } from "@/utils/utils";
import { Grid, RevealFx } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  enhanced?: boolean;
}

export function Projects({ range, enhanced = false }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Grid 
      fillWidth 
      columns="3"
      mobileColumns="1"
      tabletColumns="2"
      gap="l"
      marginBottom="40"
    >
      {displayedProjects.map((post, index) => (
        <RevealFx
          key={post.slug}
          translateY={enhanced ? "16" : "24"}
          delay={enhanced ? index * 0.05 : index * 0.1}
        >
          <ProjectCard
            priority={index < 2}
            featured={index === 0}
            href={`work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
          />
        </RevealFx>
      ))}
    </Grid>
  );
}
