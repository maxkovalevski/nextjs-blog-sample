import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { Breadcrumbs, Container, PageGrid, PageTitle, Pagination, PostsList, PostsSection } from "nocturnal-ui-react";
import React from "react";

import { MainLayout } from "../../../components/MainLayout";
import { BLOG_POSTS_MAX_DISPLAY, POSTS_PER_PAGE } from "../../../lib/constants";
import { getAllFilesFrontMatter } from "../../../lib/getAllFilesFrontMatter";
import { transformPosts } from "../../../lib/transformPosts";
import { PaginationData, PostItem, TagItem } from "../../../types";

import { getSidePanelData } from "../../../lib/getSidePanelData";
import { SidePanel } from "../../../components/SidePanel";
import Link from "next/link";
import { LinkView } from "../../../components/LinkView";
import { PostCardThumbnail } from "../../../components/PostCardThumbnail";

interface Props {
  initialDisplayPosts: PostItem[];
  pagination: PaginationData;
  blurbContent: string;
  tags: TagItem[];
}

const PostPage: NextPage<Props> = ({ initialDisplayPosts: posts, pagination: paginationData, tags, blurbContent }) => {
  return (
    <MainLayout>
      <Head>
        <title>Next.js Blog Sample</title>
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
          <SidePanel blurbContent={blurbContent} tags={tags} />
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

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter(["blog"]);
  const totalPages = Math.ceil(totalPosts.length / BLOG_POSTS_MAX_DISPLAY);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ page: string }>
  ): Promise<{
    props: Props
}> {
  const { params: { page } = { page: "0" } } = context;
  const posts = await getAllFilesFrontMatter(["blog"]);
  const pageNumber = parseInt(page);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
  const { blurbContent, tags } = await getSidePanelData();
  const displayPosts = transformPosts(initialDisplayPosts);


  return {
    props: {
      initialDisplayPosts: displayPosts,
      pagination,
      blurbContent,
      tags,
    },
  };
}

export default PostPage;
