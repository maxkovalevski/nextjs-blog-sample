import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Container, PageGrid, PageTitle, PostsSection, TagsPile } from "nocturnal-ui-react";

import { getAllTags } from "../lib/getAllTags";
import { TagsData } from "../types";
import { MainLayout } from "../components/MainLayout";
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

const TagsPage: NextPage<Props> = ({ tags: tagsData, blurbContent, sidePanelTags }) => {
  const tags = Object.keys(tagsData).map((tagKey: string) => ({
      name: tagKey,
      count: tagsData[tagKey],
      link: '/tags'
  }));

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
        <PageTitle>Tags</PageTitle>
        <PageGrid>
          <SidePanel blurbContent={blurbContent} tags={sidePanelTags} />
          <PostsSection>
            <TagsPile
              tags={tags}
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
