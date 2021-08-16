import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { Welcome, PostsList } from "../components";

import { getAllPosts } from "../lib/blog-utils";
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
        <h2>Recent Posts</h2>
        <PostsList posts={posts} />
      </section>
    </>
  );
};

export const getStaticProps = () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
