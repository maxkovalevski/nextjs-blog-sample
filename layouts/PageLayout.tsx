import React, { FC } from "react";

import { PostFrontMatter } from "../types";

interface Props {
  frontMatter: PostFrontMatter;
}

const PageLayout: FC<Props> = ({ children }) => {

  return (
    <>
      <article>
        <div>{children}</div>
      </article>
    </>
  );
};

export default PageLayout;
