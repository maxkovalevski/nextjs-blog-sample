import React, { FC } from 'react';
import Image, { ImageLoader, ImageProps } from 'next/image';

import siteMetadata from '../siteMetadata';

const imageLoader: ImageLoader = ({ src: srcData, width, quality }) => {
  const src = srcData[0] === '/' ? srcData.substring(1) : srcData;
  return `${siteMetadata.siteUrl}/${src}?w=${width}&q=${quality || 75}`
}

export const CustomImage: FC<ImageProps> = (props) => {
  return (
    <Image
      loader={imageLoader}
      {...props}
    />
  );
}

