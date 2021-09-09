import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Breadcrumbs, Container, PageGrid, PageTitle, PostsSection, TagsPile } from "nocturnal-ui-react";

import { getAllTags } from "../lib/getAllTags";
import { TagsData } from "../types";
import { MainLayout } from "../components/MainLayout";
import { SidePanel } from "../components/SidePanel";
import { getSidePanelData } from "../lib/getSidePanelData";
import { LinkView } from "../components/LinkView";


interface Props {
  tags: {
      name: string;
      link: string;
      count: number;
  }[];
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
      <br />
      <Container>
        <Breadcrumbs
          items={[{ to: "/", label: "Home" }, { label: "Tags" }]}
          linkView={(props) => <LinkView {...props} />}
        />
        <PageTitle>Tags</PageTitle>
        <PageGrid>
          <SidePanel blurbContent={blurbContent} tags={sidePanelTags} />
          <PostsSection>
            <TagsPile
              tags={tags}
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
  const tagsData = getAllTags();
  const { blurbContent, tags: sidePanelTags } = await getSidePanelData();
  const tags = Object.keys(tagsData).map((tagKey: string) => ({
      name: tagKey,
      count: tagsData[tagKey],
      link: `/tags/${tagKey}`
  }));

  return {
    props: {
      tags,
      blurbContent,
      sidePanelTags,
    }
  };
}

export default TagsPage;
