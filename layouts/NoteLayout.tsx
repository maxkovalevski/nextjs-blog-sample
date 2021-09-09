import React, { FC } from "react";
import { Container, ContentCard, PostInfo, BtnBack, PostTags } from "nocturnal-ui-react";

import { PostFrontMatter } from "../types";

import siteMetadata from "../siteMetadata";
import { getTwitterDiscussUrl } from "../lib/getTwitterDiscussUrl";
import { MainLayout } from "../components/MainLayout";
import { LinkView } from '../components/LinkView';
import { transformTags } from "../lib/transformTags";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface Props {
  frontMatter: PostFrontMatter;
}

const NoteLayout: FC<Props> = ({ frontMatter, children }) => {
  const { slug, date, tags: tagsData } = frontMatter;
  const tags = transformTags(tagsData || []);

  return (
    <MainLayout>
      <br />
      <Container>
        <BtnBack type="link" to="/notes" linkView={(props) => <LinkView {...props} />}>
          Go Back To Notes
        </BtnBack>
        <article>
          <ContentCard>
            <header>
              <PostInfo date={date}/>
              <PostTags tags={tags} linkView={(props) => <LinkView {...props} />} />
              <hr />
            </header>
            <div>{children}</div>
          </ContentCard>
        </article>
      </Container>
    </MainLayout>
  );
};

export default NoteLayout;
