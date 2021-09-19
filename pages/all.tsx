import { NextPage } from "next";
import { Breadcrumbs, Container, PageGrid, PageTitle, Pagination, PostsList, PostsSection } from "nocturnal-ui-react";
import React from "react";
import fs from 'fs';


import { MainLayout } from "../components/MainLayout";
import { getAllFilesFrontMatter } from "../lib/getAllFilesFrontMatter";
import { transformPosts } from "../lib/transformPosts";
import { PaginationData, PostItem, TagItem } from "../types";

import { getSidePanelData } from "../lib/getSidePanelData";
import { SidePanel } from "../components/SidePanel";
import { getPaginationData } from "../lib/getPaginationData";
import { LinkView } from "../components/LinkView";
import { PostCardThumbnail } from "../components/PostCardThumbnail";
import { generateRss } from "../lib/generateRss";

interface Props {
  initialDisplayPosts: PostItem[];
  pagination: PaginationData;
  tags: TagItem[];
  blurbContent: string;
}

const All: NextPage<Props> = ({ initialDisplayPosts: posts, pagination: paginationData, tags, blurbContent }) => {
  return (
    <MainLayout title="Blog">
      <br />
      <Container>
        <Breadcrumbs
          items={[{ to: "/", label: "Home" }, { label: "All" }]}
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
          </PostsSection>
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export async function getStaticProps(): Promise<{
  props: Props
}> {
  const posts = await getAllFilesFrontMatter(["blog", "note"]);
  const initialDisplayPosts = posts.slice(0, posts.length);
  const pagination = getPaginationData(1, posts.length);
  const { blurbContent, tags } = await getSidePanelData();
  const displayPosts = transformPosts(initialDisplayPosts);

  // rss
  const rss = generateRss(posts, 'feed.xml');
  fs.writeFileSync('./public/feed.xml', rss)

  return {
    props: {
      initialDisplayPosts: displayPosts,
      pagination, 
      tags,
      blurbContent,
    },
  };
}

export default All;
