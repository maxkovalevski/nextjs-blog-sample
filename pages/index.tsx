import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import { Container, PageGrid, PageTitle, Pagination, PostsList, PostsSection } from "nocturnal-ui-react";
import React from "react";

import { PaginationData, PostItem, TagItem } from "../types";

import { MainLayout } from "../components/MainLayout";
import { SidePanel } from "../components/SidePanel";
import { BLOG_POSTS_MAX_DISPLAY, POSTS_PER_PAGE } from "../lib/constants";
import { getAllFilesFrontMatter } from "../lib/getAllFilesFrontMatter";
import { transformPosts } from "../lib/transformPosts";
import { getSidePanelData } from "../lib/getSidePanelData";
import { PostCardThumbnail } from "../components/PostCardThumbnail";
import { LinkView } from "../components/LinkView";

interface Props {
  posts: PostItem[];
  blurbContent: string;
  paginationData: PaginationData;
  tags: TagItem[];
}


const Home: NextPage<Props> = ({ posts, blurbContent, paginationData, tags }) => {
  return (
    <MainLayout isHomePage>
      <Head>
        <title>Next.js Blog Sample</title>
        <meta
          name="description"
          content="Elit sint cupidatat minim laborum ea."
        />
      </Head>
      <br />
      <Container>
        <PageTitle>Home</PageTitle>
        <PageGrid>
          <SidePanel blurbContent={blurbContent} tags={tags} />
          <PostsSection>
            <PostsList
              posts={posts.slice(0, BLOG_POSTS_MAX_DISPLAY)}
              gridView="row"
              linkView={(props) => <LinkView {...props} />}
              imgView={(props) => <PostCardThumbnail {...props} />}
            />
            {posts.length > BLOG_POSTS_MAX_DISPLAY && (
              <Pagination
                routePath="/blog"
                currentPage={paginationData.currentPage}
                pagesCount={paginationData.totalPages}
                linkView={(props) => <LinkView {...props} />}
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
  const postsData = await getAllFilesFrontMatter(["blog"]);
  const paginationData = {
    currentPage: 1,
    totalPages: Math.ceil(postsData.length / POSTS_PER_PAGE),
  };
  const { blurbContent, tags } = await getSidePanelData();
  const posts = transformPosts(postsData);

  return {
    props: {
      posts,
      paginationData,
      blurbContent,
      tags,
    },
  };
};

export default Home;
