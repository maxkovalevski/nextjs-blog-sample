import React, { FC } from "react";
import Link from "next/link";

import { PostFrontMatter } from "../types";

import siteMetadata from "../siteMetadata";
import { getTwitterDiscussUrl } from "../lib/getTwitterDiscussUrl";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface Props {
  frontMatter: PostFrontMatter;
  next: any;
  prev: any;
}

const PostLayout: FC<Props> = ({ frontMatter, next, prev, children }) => {
  const { slug, date, title, tags } = frontMatter;

  return (
    <>
      <article>
        <div>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(
                siteMetadata.locale,
                postDateTemplate
              )}
            </time>
          </dd>
        </div>
        <div>
          {tags && (
            <div>
              <h2>Tags</h2>
              <div>
                {tags.map((tag) => (
                  <Link href={`/tags/${tag}`} key={tag}>
                    <a>{tag.split(" ").join("-")}</a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <h1>{title}</h1>
        </div>
        <div>{children}</div>
        <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
          <Link href={getTwitterDiscussUrl(slug)}>{"Discuss on Twitter"}</Link>
        </div>
        <div>
          {(next || prev) && (
            <div>
              {prev && (
                <div>
                  <h2>Previous Article</h2>
                  <div>
                    <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                  </div>
                </div>
              )}
              {next && (
                <div>
                  <h2>Next Article</h2>
                  <div>
                    <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default PostLayout;
