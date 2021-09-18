import React, { FC } from 'react';
import { CustomImage } from './CustomImage';

interface Props {
  imgSrc?: string;
  title: string;
}

export const PostCardThumbnail: FC<Props> = ({ imgSrc, title }) => {
  return imgSrc ? <CustomImage src={imgSrc} alt={title} width="255px" height="175px" layout="responsive" objectFit="cover" /> : null;
}

