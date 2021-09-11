import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
//import { useLocation } from "@reach/router";

import siteMetadata from '../siteMetadata';

export interface SeoProps {
  title?: string;
  description?: string | null;
  image?: string;
  isArticle?: boolean;
  keywords?: string[] | null;
  isHomePage?: boolean;
}

export const Seo: FC<SeoProps> = ({
  title = "",
  description = "",
  image: imgSrc,
  isArticle = false,
  keywords,
  isHomePage = false,
}) => {
  const { asPath } = useRouter();

  const image =
    imgSrc
      ? `${siteMetadata.siteUrl}${imgSrc}`
      : `${siteMetadata.siteUrl}/${siteMetadata.defaultImage}`;
  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    image: image,
    url: `${siteMetadata.siteUrl}${asPath}`,
  };
  const canonical = asPath ? `${siteMetadata.siteUrl}${asPath}` : null;
  const keywordsStr = keywords || siteMetadata.keywords;
  const titleTemplate = isArticle ? '%s' : siteMetadata.titleTemplate;
  const metaTitle = isHomePage
    ? seo.title
    : titleTemplate.replace("%s", title || seo.title);

  return (
    <Head
      //title={seo.title}
      //titleTemplate={isHomePage ? seo.title : titleTemplate}
    >
      <title>{metaTitle}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {isArticle && <meta property="og:type" content="article" />}
      <meta property="og:title" content={metaTitle} />
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="keywords" content={keywordsStr.join(", ")} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      {/*
      {metaImage && (
        <meta property="og:image:width" content={metaImage.width} />
      )}
      {metaImage && (
        <meta property="og:image:height" content={metaImage.height} />
      )}*/}

      {/* <Twitter> */}
      <meta name="twitter:card" content="summary_large_image" />
      {siteMetadata.twitterUsername && (
        <meta name="twitter:creator" content={`@${siteMetadata.twitterUsername}`} />
      )}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {/* <Twitter /> */}
      {siteMetadata.favicon && <link rel="icon" 
        type="image/png" 
        href={`${siteMetadata.siteUrl}${siteMetadata.favicon}`} />}
    </Head>
  );
};
