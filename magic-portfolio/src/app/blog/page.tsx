import { Column, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import BlogPageClient from "@/components/blog/BlogPageClient";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BlogPageClient>
        <Column fillWidth flex={1} gap="l">
          <Posts range={[1,1]} thumbnail direction="column" enhanced />
          <Posts range={[2,3]} thumbnail enhanced />
          <Posts range={[4]} columns="2" enhanced />
        </Column>
        {newsletter.display && <Mailchimp newsletter={newsletter} />}
      </BlogPageClient>
    </>
  );
}
