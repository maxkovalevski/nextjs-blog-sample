import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { Breadcrumbs, Container, PageGrid, PageTitle, PostsList, PostsSection } from "nocturnal-ui-react";
import React from "react";
import { LinkView } from "../../components/LinkView";

import { MainLayout } from "../../components/MainLayout";
import { PostCardThumbnail } from "../../components/PostCardThumbnail";
import { SidePanel } from "../../components/SidePanel";
import { CONTENT_TYPE_BLOG, CONTENT_TYPE_NOTE } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getAllTags } from "../../lib/getAllTags";
import { getSidePanelData } from "../../lib/getSidePanelData";
import { kebabCase } from "../../lib/kebabCase";
import { transformPosts } from "../../lib/transformPosts";
import { PostItem, TagItem } from "../../types";

interface Props {
  posts: PostItem[];
  tag: string;
  tags: TagItem[];
  blurbContent: string;
}

const TagPage: NextPage<Props> = ({ posts, tag, tags, blurbContent }) => {
  return (
    <MainLayout>
      <Head>
        <title>#{tag} | Next.js Blog Sample</title>
        <meta
          name="description"
          content="Elit sint cupidatat minim laborum ea."
        />
      </Head>
      <br />
      <Container>
        <Breadcrumbs
          items={[{ to: "/", label: "Home" }, { to: "/tags", label: "Tags" }, { label: tag }]}
          linkView={(props) => <LinkView {...props} />}
        />
        <PageTitle>#{tag}</PageTitle>
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

export const getStaticPaths = () => {
  const tags = getAllTags();

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
  }: GetStaticPropsContext<{ tag: string }>): Promise<{
    props: Props
}> {
  const allPosts = await getAllFilesFrontMatter([
    CONTENT_TYPE_BLOG,
    CONTENT_TYPE_NOTE,
  ]);
  const filteredPosts = allPosts.filter(
    (post) =>
      post.public === true &&
      post.tags?.map((t) => kebabCase(t)).includes(params?.tag || "")
  );
  const { blurbContent, tags } = await getSidePanelData();

  return {
    props: {
      posts: transformPosts(filteredPosts),
      tag: params?.tag || '',
      blurbContent,
      tags
    }
  };
}

export default TagPage;
