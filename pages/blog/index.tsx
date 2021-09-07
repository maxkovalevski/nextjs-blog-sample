import { NextPage } from "next";
import Head from "next/head";
import { Container, PageGrid, PageTitle, Pagination, PostsList, PostsSection } from "nocturnal-ui-react";
import React from "react";
import { MainLayout } from "../../components/MainLayout";

import { BLOG_POSTS_MAX_DISPLAY } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { transformPosts } from "../../lib/transformPosts";
import { PaginationData, Post, TagItem } from "../../types";

import { getSidePanelData } from "../../lib/getSidePanelData";
import { SidePanel } from "../../components/SidePanel";
import { getPaginationData } from "../../lib/getPaginationData";
import Link from "next/link";

interface Props {
  initialDisplayPosts: Post[];
  posts: Post[];
  pagination: PaginationData;
  tags: TagItem[];
  blurbContent: string;
}

const Blog: NextPage<Props> = ({ initialDisplayPosts, pagination: paginationData, tags, blurbContent }) => {
  const displayPosts = transformPosts(initialDisplayPosts);

  return (
    <MainLayout>
      <Head>
        <title>Blog | Next.js Blog Sample</title>
        <meta
          name="description"
          content="Elit sint cupidatat minim laborum ea."
        />
      </Head>
      <Container>
        <br />
        <PageTitle>Blog</PageTitle>
        <PageGrid>
          <SidePanel tags={tags} blurbContent={blurbContent} />
          <PostsSection>
            <PostsList posts={displayPosts} gridView="row" linkView={({ to, children, ...props }) => <Link href={to} {...props}><a>{children}</a></Link>} />
            <Pagination
              routePath="/blog"
              currentPage={paginationData.currentPage}
              pagesCount={paginationData.totalPages}
              linkView={({ to, children, ...props }) => <Link href={to} {...props}><a>{children}</a></Link>}
            />
          </PostsSection>
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export async function getStaticProps(): Promise<{
  props: Props
}> {
  const posts = await getAllFilesFrontMatter(["blog"]);
  const initialDisplayPosts = posts.slice(0, BLOG_POSTS_MAX_DISPLAY);
  const pagination = getPaginationData(1, posts.length);
  const { blurbContent, tags } = await getSidePanelData();

  return {
    props: {
      initialDisplayPosts,
      posts, 
      pagination, 
      tags,
      blurbContent,
    },
  };
}

export default Blog;
