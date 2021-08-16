import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Image from "next/image";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Post } from "../types";

import { PostHeader } from "./PostHeader";

interface Props {
  post: Post;
}

export function PostContent({ post }: Props) {
  const imagePath = `/images/blog/${post.slug}/${post.image}`;

  const renderers = {
    p(data) {
      const { node } = data;
      if (node.children[0].tagName?.toLowerCase() === "img") {
        const { properties: imgProps } = node.children[0];

        return (
          <div>
            <Image
              src={imgProps.src}
              alt={imgProps.alt}
              width={600}
              height={400}
            />
          </div>
        );
      }

      return <p>{data.children}</p>;
    },

    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <>
          1312
          <Prism
            language={match[1]}
            PreTag="div"
            {...props}
            style={vscDarkPlus}
          >
            {String(children).replace(/\n$/, "")}
          </Prism>
        </>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <article>
      <PostHeader title={post.title} image={imagePath} />
      <div>
        {post.content && (
          <ReactMarkdown components={renderers} remarkPlugins={[gfm]}>
            {post.content || ""}
          </ReactMarkdown>
        )}
      </div>
    </article>
  );
}
