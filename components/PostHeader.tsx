import React, { FC } from "react";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
}

export const PostHeader: FC<Props> = ({ title, image }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
};
