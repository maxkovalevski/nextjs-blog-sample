import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Blog: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Nulla do ea velit eiusmod." />
      </Head>
      Posts
    </div>
  );
};

export default Blog;
