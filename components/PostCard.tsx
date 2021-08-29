import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "../types";

export interface Props {
  post: Post;
}

export const PostCard: FC<Props> = ({
  post: { title, image, date, excerpt, slug, tags = [], type = "note" },
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const imageSrc = `/images/blog/${slug}/${image}`;
  const LINK_TYPES_PATHS: {
    [key: string]: string;
  } = {
    note: "notes",
    blog: "blog",
  };
  const linkPath = `/${LINK_TYPES_PATHS[type]}/${slug}`;

  return (
    <div
      style={{
        maxWidth: "800px",
        width: "100%",
        backgroundColor: "#36373A",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <Link href={linkPath}>
        <a>
          <div>
            {/* 
            <Image
              src={imageSrc}
              alt={title}
              width={300}
              height={200}
              objectFit="cover"
              layout="responsive"
            />*/}
          </div>
        </a>
      </Link>
      <h2>
        <Link href={linkPath}>
          <a>{title}</a>
        </Link>
      </h2>
      <div>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/tags/${tag}`}>
                <a>#{tag}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>{excerpt}</p>
        <div>
          <time>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
};
