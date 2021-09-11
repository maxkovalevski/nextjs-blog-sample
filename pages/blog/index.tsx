import { NextPage } from "next";
import Head from "next/head";
import { Breadcrumbs, Container, PageGrid, PageTitle, Pagination, PostsList, PostsSection } from "nocturnal-ui-react";
import React from "react";
import { MainLayout } from "../../components/MainLayout";

import { BLOG_POSTS_MAX_DISPLAY } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { transformPosts } from "../../lib/transformPosts";
import { PaginationData, Post, PostItem, TagItem } from "../../types";

import { getSidePanelData } from "../../lib/getSidePanelData";
import { SidePanel } from "../../components/SidePanel";
import { getPaginationData } from "../../lib/getPaginationData";
import Link from "next/link";
import { LinkView } from "../../components/LinkView";
import { PostCardThumbnail } from "../../components/PostCardThumbnail";

interface Props {
  initialDisplayPosts: PostItem[];
  pagination: PaginationData;
  tags: TagItem[];
  blurbContent: string;
}

const Blog: NextPage<Props> = ({ initialDisplayPosts: posts, pagination: paginationData, tags, blurbContent }) => {
  return (
    <MainLayout title="Blog">
      <Head>
        <title>Blog | Next.js Blog Sample</title>
        <meta
          name="description"
          content="Elit sint cupidatat minim laborum ea."
        />
      </Head>
      <br />
      <Container>
        <Breadcrumbs
          items={[{ to: "/", label: "Home" }, { label: "Blog" }]}
          linkView={(props) => <LinkView {...props} />}
        />
        <PageTitle>Blog</PageTitle>
        <PageGrid>
          <SidePanel tags={tags} blurbContent={blurbContent} />
          <PostsSection>
            <PostsList 
              posts={posts} 
              gridView="row" 
              linkView={(props) => <LinkView {...props} />}
              imgView={(props) => <PostCardThumbnail {...props} />}
            />
            <Pagination
              routePath="/blog"
              currentPage={paginationData.currentPage}
              pagesCount={paginationData.totalPages}
              linkView={(props) => <LinkView {...props} />}
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
  const displayPosts = transformPosts(initialDisplayPosts);

  return {
    props: {
      initialDisplayPosts: displayPosts,
      pagination, 
      tags,
      blurbContent,
    },
  };
}

export default Blog;
