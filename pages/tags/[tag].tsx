import { GetStaticPropsContext, NextPage } from "next";
import React from "react";

import { PostsList } from "../../components/PostsList";
import { CONTENT_TYPE_BLOG, CONTENT_TYPE_NOTE } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getAllTags } from "../../lib/getAllTags";
import { kebabCase } from "../../lib/kebabCase";
import { Post } from "../../types";

export const getStaticPaths = () => {
  const tags = getAllTags();

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ tag: string }>) {
  const allPosts = await getAllFilesFrontMatter([
    CONTENT_TYPE_BLOG,
    CONTENT_TYPE_NOTE,
  ]);
  const filteredPosts = allPosts.filter(
    (post) =>
      post.public === true &&
      post.tags?.map((t) => kebabCase(t)).includes(params?.tag || "")
  );

  return { props: { posts: filteredPosts, tag: params?.tag } };
}

interface Props {
  posts: Post[];
  tag: string;
}

const TagPage: NextPage<Props> = ({ posts, tag }) => {
  return (
    <div>
      <h1>#{tag}</h1>
      <PostsList posts={posts} />
    </div>
  );
};

export default TagPage;
