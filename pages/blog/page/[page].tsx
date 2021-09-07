import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Container, InfoCard, PageGrid, PageTitle, Pagination, PostsList, PostsSection, PostTags, SidePanel } from "nocturnal-ui-react";
import React from "react";

import { MainLayout } from "../../../components/MainLayout";
import { MDXLayoutRenderer } from "../../../components/MDXLayoutRenderer";
import { BLOG_POSTS_MAX_DISPLAY, POSTS_PER_PAGE } from "../../../lib/constants";
import { getAllFilesFrontMatter } from "../../../lib/getAllFilesFrontMatter";
import { getAllTags } from "../../../lib/getAllTags";
import { getBlurbContent } from "../../../lib/getBlurbContent";
import { transformPosts } from "../../../lib/transformPosts";
import { transformTags } from "../../../lib/transformTags";
import { PaginationData, Post } from "../../../types";

import avatarImg from '../../../static/img/avatar.jpeg';

interface Props {
  posts: Post[];
  initialDisplayPosts: Post[];
  pagination: PaginationData;
  blurbContent: string;
  tags: string[];
}

const PostPage: NextPage<Props> = ({ initialDisplayPosts, pagination: paginationData, tags, blurbContent }) => {
  const posts = transformPosts(initialDisplayPosts);

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
        <PageTitle>Blog</PageTitle>
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
              <PostTags direction="column" tags={transformTags(tags)} maxCount={8} />
              <Link href="/tags"><a className="underline theme-link">...more</a></Link>
            </InfoCard>
          </SidePanel>
          <PostsSection>
            <PostsList posts={posts} gridView="row" />
            <Pagination
              routePath="/blog"
              currentPage={paginationData.currentPage}
              pagesCount={paginationData.totalPages}
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
  const blurbContentData = await getBlurbContent();
  const tagsData = getAllTags();

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      blurbContent: blurbContentData.mdxSource,
      tags: Object.keys(tagsData),
    },
  };
}

export default PostPage;
