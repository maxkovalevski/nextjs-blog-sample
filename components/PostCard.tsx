import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "../types";

export interface Props {
  post: Post;
}

export const PostCard: FC<Props> = ({
  post: { title, image, date, excerpt, slug },
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const imageSrc = `/images/blog/${slug}/${image}`;
  const linkPath = `/blog/${slug}`;

  return (
    <div style={{ maxWidth: "300px", width: "100%" }}>
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
      <Link href={linkPath}>
        <a>{title}</a>
      </Link>
      <div>
        <p>{excerpt}</p>
        <div>
          <time>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
};
