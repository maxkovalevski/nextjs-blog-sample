import React, { FC } from "react";
import { Post } from "../types";

import { PostCard } from "./PostCard";

interface Props {
  posts: Post[];
}

export const PostsList: FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};
