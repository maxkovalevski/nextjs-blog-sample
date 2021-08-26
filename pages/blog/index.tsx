import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Pagination } from "../../components/Pagination";
import { PostsList } from "../../components/PostsList";

import { BLOG_POSTS_MAX_DISPLAY } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { PaginationData, Post } from "../../types";

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, BLOG_POSTS_MAX_DISPLAY);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / BLOG_POSTS_MAX_DISPLAY),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

interface Props {
  initialDisplayPosts: Post[];
  posts: Post[];
  pagination: PaginationData;
}

const Blog: NextPage<Props> = ({initialDisplayPosts, pagination}) => {
  const displayPosts =
    initialDisplayPosts

  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Nulla do ea velit eiusmod." />
      </Head>
      <div>
        <PostsList posts={displayPosts} />
        {pagination && parseInt(pagination.totalPages) > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </div>
  );
};

export default Blog;
