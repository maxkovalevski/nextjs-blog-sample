import { GetStaticPropsContext, NextPage } from "next";
import React from "react";
import fs from 'fs';
import path from 'path';

import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";

import { CONTENT_TYPE_BLOG, POST_LAYOUT } from "../../lib/constants";
import { formatSlug } from "../../lib/formatSlug";
import { generateRss } from "../../lib/generateRss";
import { getAboutBlockContent } from "../../lib/getAboutBlockContent";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getFileByName } from "../../lib/getFileByName";
import { getFilesPaths } from "../../lib/getFilesPaths";
import { PostFrontMatter, TableOfContentsData } from "../../types";

const root = process.cwd()

interface Props {
  post: {
    frontMatter: PostFrontMatter;
    mdxSource: string;
    toc: TableOfContentsData;
  };
  next: PostFrontMatter;
  prev: PostFrontMatter;
  aboutBlockContent: string,
}

const BlogPost: NextPage<Props> = ({ post, next, prev }) => {
  const { mdxSource, frontMatter } = post;

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || POST_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        prev={prev}
        next={next}
        seoProps={{
          isArticle: true,
          title: frontMatter.title || "Blog Post",
          description: frontMatter.excerpt,
          keywords: frontMatter.keywords,
          image: frontMatter?.socialCard ? frontMatter?.socialCard : `/${frontMatter.image}`,
        }}
      />
    </>
  );
};

export async function getStaticProps({
  params,
  }: GetStaticPropsContext<{ slug: string[] }>): Promise<{
    props: Props
}> {
  const allPosts = await getAllFilesFrontMatter(["blog"]);
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params?.slug.join("/")
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;

  const postData = allPosts[postIndex];

  const post = await getFileByName(postData.fileName || '');

  const aboutBlockContentData = await getAboutBlockContent();

  // rss
  const rss = generateRss(allPosts, 'blog/feed.xml');
  const rssPath = path.join(root, 'public', 'blog');
  fs.mkdirSync(rssPath, { recursive: true });
  fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss);

  return {
    props: {
      post,
      prev,
      next,
      aboutBlockContent: aboutBlockContentData.mdxSource
    },
  };
}

export function getStaticPaths() {
  const posts = getFilesPaths([CONTENT_TYPE_BLOG]);

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p.replace(".mdx", "").replace(".md", "")).split("/"),
      },
    })),
    fallback: false,
  };
}

export default BlogPost;
