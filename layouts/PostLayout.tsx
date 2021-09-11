import React, { FC } from "react";
import Link from "next/link";
import Image from 'next/image';

import { BtnBack, Container, ContentCard, PostInfo, PostTags } from 'nocturnal-ui-react';

import { PostFrontMatter } from "../types";

//import { getTwitterDiscussUrl } from "../lib/getTwitterDiscussUrl";
import { transformTags } from "../lib/transformTags";
import { MainLayout } from "../components/MainLayout";
import { PostContentImage } from '../components/PostContentImage';
import { LinkView } from "../components/LinkView";
import { SeoProps } from "../components/Seo";

interface Props {
  frontMatter: PostFrontMatter;
  next: any;
  prev: any;
  seoProps?: SeoProps;
}

const PostLayout: FC<Props> = ({ frontMatter, children, seoProps = {} }) => {
  const { date, title, tags: tagsData, image } = frontMatter;
  const tags = transformTags(tagsData || []);

  return (
    <MainLayout {...seoProps}>
      <br />
      <Container>
        <BtnBack type="link" to="/blog" linkView={(props) => <LinkView {...props} />}>
          Go Back To Blog
        </BtnBack>
        <article>
          <ContentCard
            topView={<PostContentImage imgView={<Image src={`/${image}`} width="1100px" height="500px" layout="responsive" objectFit="cover" />} />}
          >
            <header>
              <h1>{title}</h1>
              <PostInfo date={date}/>
              <PostTags tags={tags} linkView={(props) => <LinkView {...props} />} />
              <hr />
            </header>
            <div>{children}</div>
          </ContentCard>
        </article>
      </Container>
      {/*<article>
        <div>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            {date && <time dateTime={date}>
              {new Date(date).toLocaleDateString(
                siteMetadata.locale,
                postDateTemplate
              )}
            </time>}
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
      </article>*/}
    </MainLayout>
  );
};

export default PostLayout;
