import React from "react";
import { NextPage } from "next";

import { getAllTags } from "../lib/getAllTags";
import { TagsData } from "../types";
import { MainLayout } from "../components/MainLayout";
import Head from "next/head";
import { Container, PageGrid, PageTitle, PostsSection, TagsPile } from "nocturnal-ui-react";

import { SidePanel } from "../components/SidePanel";
import { getSidePanelData } from "../lib/getSidePanelData";


interface Props {
  tags: TagsData;
  blurbContent: string;
  sidePanelTags: {
      name: string;
      link?: string | undefined;
  }[];
}

const TagsPage: NextPage<Props> = ({ tags, blurbContent, sidePanelTags }) => {
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
          <SidePanel blurbContent={blurbContent} tags={sidePanelTags} />
          <PostsSection>
            <TagsPile tags={Object.keys(tags).map((tagKey) => ({
                name: tagKey,
                count: tags[tagKey],
                linkPrefix: '/tags'
            }))} />
          </PostsSection>
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export async function getStaticProps(): Promise<{
  props: Props
}> {
  const tags = getAllTags();
  const { blurbContent, tags: sidePanelTags } = await getSidePanelData();

  return {
    props: {
      tags,
      blurbContent,
      sidePanelTags,
    }
  };
}

export default TagsPage;
