import type { NextPage } from "next";
import Head from "next/head";
import { Avatar, Container, InfoCard, PageGrid, PageTitle, Pagination, PostsList, PostsSection, PostTag, PostTags, SidePanel } from "nocturnal-ui-react";
import React from "react";

import { MainLayout } from "../components/MainLayout";
import { MDXLayoutRenderer } from "../components/MDXLayoutRenderer";
import { BLOG_POSTS_MAX_DISPLAY, POSTS_PER_PAGE } from "../lib/constants";
import { getAllFilesFrontMatter } from "../lib/getAllFilesFrontMatter";
import { getBlurbContent } from "../lib/getBlurbContent";
import { PaginationData, Post } from "../types";

import avatarImg from '../static/img/avatar.jpeg';
import { getAllTags } from "../lib/getAllTags";
import Link from "next/link";

interface Props {
  posts: Post[];
  blurbContent: string;
  paginationData: PaginationData;
  tags: string[];
}

const Home: NextPage<Props> = ({ posts: postsData, blurbContent, paginationData, tags }) => {
  const posts = postsData.map((post) =>  ({
      id: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags?.map((tag) => ({
          name: tag,
          link: `/tags/${tag}`,
        })) || [],
      link: `/blog/${post.slug}`,
      imgSrc: post.image,
    }));

  return (
    <MainLayout>
      <Head>
        <title>Next.js Blog Sample</title>
        <meta
          name="description"
          content="Elit sint cupidatat minim laborum ea."
        />
      </Head>
      <Container>
        <br />
        <PageTitle>Home</PageTitle>
        <PageGrid>
          <SidePanel position="left">
            <InfoCard>
              <Avatar src={avatarImg.src} />
              <MDXLayoutRenderer
                mdxSource={blurbContent}
              />
            </InfoCard>
            <InfoCard>
              <h3 className="monospace">Tags</h3>
              <PostTags direction="column" tags={tags.map((tag) =>  ({ name: tag, link: `/tags/${tag}` }))} maxCount={8} />
              <Link href="/tags"><a className="underline theme-link">...more</a></Link>
            </InfoCard>
          </SidePanel>
          <PostsSection>
            <PostsList posts={posts.slice(0, BLOG_POSTS_MAX_DISPLAY)} gridView="row" />
            {posts.length > BLOG_POSTS_MAX_DISPLAY && (
              <Pagination
                routePath="/blog"
                currentPage={paginationData.currentPage}
                pagesCount={paginationData.totalPages}
              />
            )}
          </PostsSection>
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export const getStaticProps = async (): Promise<{
  props: Props
}> => {
  const posts = await getAllFilesFrontMatter(["blog"]);
  const blurbContentData = await getBlurbContent();
  const paginationData = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
  const tagsData = getAllTags();

  return {
    props: {
      posts,
      paginationData,
      blurbContent: blurbContentData.mdxSource,
      tags: Object.keys(tagsData),
    },
  };
};

export default Home;
