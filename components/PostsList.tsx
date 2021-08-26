import React, { FC } from "react";
import { Post } from "../types";

import { PostCard } from "./PostCard";

interface Props {
  posts: Post[];
}

export const PostsList: FC<Props> = ({ posts }) => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "0px 0px",
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

    </div>
  );
};
