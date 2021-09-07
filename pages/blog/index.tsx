import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Container, InfoCard, PageGrid, PageTitle, Pagination, PostsList, PostsSection, PostTags, SidePanel } from "nocturnal-ui-react";
import React from "react";
import { MainLayout } from "../../components/MainLayout";
import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";

import { BLOG_POSTS_MAX_DISPLAY } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getAllTags } from "../../lib/getAllTags";
import { getBlurbContent } from "../../lib/getBlurbContent";
import { transformPosts } from "../../lib/transformPosts";
import { PaginationData, Post } from "../../types";

import avatarImg from '../../static/img/avatar.jpeg';
import { transformTags } from "../../lib/transformTags";

interface Props {
  initialDisplayPosts: Post[];
  posts: Post[];
  pagination: PaginationData;
  tags: string[];
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
            <PostsList posts={displayPosts} gridView="row" />
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

export async function getStaticProps(): Promise<{
  props: Props
}> {
  const posts = await getAllFilesFrontMatter(["blog"]);
  const initialDisplayPosts = posts.slice(0, BLOG_POSTS_MAX_DISPLAY);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / BLOG_POSTS_MAX_DISPLAY),
  };
  const tagsData = getAllTags();
  const blurbContentData = await getBlurbContent();

  return { props: { initialDisplayPosts, posts, 
  pagination, 
      tags: Object.keys(tagsData),
  blurbContent: blurbContentData.mdxSource
  },
  };
}

export default Blog;
