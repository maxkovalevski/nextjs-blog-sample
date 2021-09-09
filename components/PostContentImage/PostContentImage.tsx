import React, { FC } from 'react';

import * as styles from "./post-content-image.module.css";

interface Props {
  altText?: string;
  imgSrc?: string;
  imgView?: React.ReactNode;
}

export const PostContentImage: FC<Props> = ({
  imgSrc,
  imgView,
  altText,
}) => {
  return (imgSrc || imgView ? 
    <div className={styles.image}>
      {imgSrc && <img src={imgSrc} alt={altText} />}
      {imgView && imgView}
    </div>
  : null);
}

