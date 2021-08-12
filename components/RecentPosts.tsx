import React, { FC } from "react";
import { Post } from "../types";
import { PostsList } from "./PostsList";

interface Props {
  posts: Post[];
}

export const RecentPosts: FC<Props> = ({ posts }) => {
  return (
    <section>
      <h2>Recent Posts</h2>
      <PostsList posts={posts} />
    </section>
  );
};
