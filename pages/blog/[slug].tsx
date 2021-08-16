import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";

import { PostContent } from "../../components/PostContent";

import {
  fileNameSlugify,
  getPostDataBySlug,
  getPostsFiles,
} from "../../lib/blog-utils";
import { Post } from "../../types";

const BlogPost: NextPage<{
  post: Post;
}> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const { slug = "" } = params || {};
  const post = getPostDataBySlug(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileNameSlugify(fileName));

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default BlogPost;
