import React, { FC } from "react";
import { Container, ContentCard, PostInfo, BtnBack, PostTags } from "nocturnal-ui-react";

import { PostFrontMatter } from "../types";

//import { getTwitterDiscussUrl } from "../lib/getTwitterDiscussUrl";
import { MainLayout } from "../components/MainLayout";
import { LinkView } from '../components/LinkView';
import { transformTags } from "../lib/transformTags";
import { SeoProps } from "../components/Seo";

interface Props {
  frontMatter: PostFrontMatter;
  seoProps?: SeoProps;
}

const NoteLayout: FC<Props> = ({ frontMatter, children, seoProps = {} }) => {
  const { date, tags: tagsData } = frontMatter;
  const tags = transformTags(tagsData || []);

  return (
    <MainLayout {...seoProps}>
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
