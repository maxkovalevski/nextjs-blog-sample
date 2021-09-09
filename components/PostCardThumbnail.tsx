import React, { FC } from 'react';
import Image from 'next/image';

interface Props {
  imgSrc?: string;
  title: string;
}

export const PostCardThumbnail: FC<Props> = ({ imgSrc, title }) => {
  return imgSrc ? <Image src={imgSrc} alt={title} width="255px" height="175px" layout="responsive" objectFit="cover" /> : null;
}

