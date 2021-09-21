import { NextPage } from "next";
import { Breadcrumbs, Container, PageGrid, PageTitle, PostsList, PostsSection } from "nocturnal-ui-react";
import React from "react";
import fs from 'fs';

import { MainLayout } from "../components/MainLayout";
import { getAllFilesFrontMatter } from "../lib/getAllFilesFrontMatter";
import { transformPosts } from "../lib/transformPosts";
import { PostItem, TagItem } from "../types";

import { getSidePanelData } from "../lib/getSidePanelData";
import { SidePanel } from "../components/SidePanel";
import { LinkView } from "../components/LinkView";
import { PostCardThumbnail } from "../components/PostCardThumbnail";
import { generateRss } from "../lib/generateRss";

interface Props {
  initialDisplayPosts: PostItem[];
  tags: TagItem[];
  blurbContent: string;
}

const All: NextPage<Props> = ({ initialDisplayPosts: posts, tags, blurbContent }) => {
  return (
    <MainLayout title="All">
      <br />
      <Container>
        <Breadcrumbs
          items={[{ to: "/", label: "Home" }, { label: "All" }]}
          linkView={(props) => <LinkView {...props} />}
        />
        <PageTitle>All</PageTitle>
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
  const { blurbContent, tags } = await getSidePanelData();
  const displayPosts = transformPosts(initialDisplayPosts);

  // rss
  const rss = generateRss(posts, 'feed.xml');
  fs.writeFileSync('./public/feed.xml', rss)

  return {
    props: {
      initialDisplayPosts: displayPosts,
      tags,
      blurbContent,
    },
  };
}

export default All;
