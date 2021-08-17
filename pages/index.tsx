import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { Welcome, PostsList } from "../components";

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
        <PostsList posts={posts} />
      </section>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("blog");

  return {
    props: {
      posts,
    },
  };
};

export default Home;
