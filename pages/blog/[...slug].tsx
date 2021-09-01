import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";

import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";
// import { PostContent } from "../../components/PostContent";

import { getPostDataBySlug, getPostsFiles } from "../../lib/blog-utils";
import { POST_DEFAULT_LAYOUT } from "../../lib/constants";
import { formatSlug } from "../../lib/formatSlug";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getFileByName } from "../../lib/getFileByName";
import { getFiles } from "../../lib/getFiles";
import { Post } from "../../types";

const BlogPost: NextPage<{
  post: any;
  next: object;
  prev: object;
}> = ({ post, next, prev }) => {
  const { mdxSource, frontMatter } = post;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      {/* <PostContent post={post} /> */}
      <MDXLayoutRenderer
        layout={frontMatter.layout || POST_DEFAULT_LAYOUT}
        // toc={toc}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        prev={prev}
        next={next}
      />
    </>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string[] }>) {
  const allPosts = await getAllFilesFrontMatter(["blog"]);
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params?.slug.join("/")
  );

  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;

  const postData = allPosts[postIndex];

  const post = await getFileByName(postData.fileName);
  // const authorList = post.frontMatter.authors || ['default']
  // const authorPromise = authorList.map(async (author) => {
  //   const authorResults = await getFileBySlug('authors', [author])
  //   return authorResults.frontMatter
  // })
  // const authorDetails = await Promise.all(authorPromise)

  // rss
  // const rss = generateRss(allPosts)
  // fs.writeFileSync('./public/feed.xml', rss)

  return {
    props: {
      post,
      // authorDetails,
      prev,
      next,
    },
  };
}

export function getStaticPaths() {
  const posts = getFiles();

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
