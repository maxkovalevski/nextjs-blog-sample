import React, { FC } from "react";
import { Post } from "../types";

import { PostCard } from "./PostCard";

interface Props {
  posts: Post[];
}

export const PostsList: FC<Props> = ({ posts }) => {
  return (
    <div>
      <div>
        {posts.map((post) => (
          <React.Fragment key={post.slug}>
            <PostCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
