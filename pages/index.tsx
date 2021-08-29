import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { Welcome, PostsList } from "../components";
import { BLOG_POSTS_MAX_DISPLAY } from "../lib/constants";

import { getAllFilesFrontMatter } from "../lib/getAllFilesFrontMatter";
import { Post } from "../types";

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Next.js Blog Sample</title>
        <meta
          name="description"
          content="Elit sint cupidatat minim laborum ea."
        />
      </Head>
      <Welcome />
      <section>
        <h2>Blog Posts</h2>
        <PostsList posts={posts.slice(0, BLOG_POSTS_MAX_DISPLAY)} />
        {posts.length > BLOG_POSTS_MAX_DISPLAY && (
          <div>
            <Link href="/blog" aria-label="all posts">
              All Posts &rarr;
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllFilesFrontMatter(["blog"]);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
