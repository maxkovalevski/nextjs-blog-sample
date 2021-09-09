import { Breadcrumbs, Container, ContentCard } from "nocturnal-ui-react";
import React, { FC } from "react";
import { LinkView } from "../components/LinkView";
import { MainLayout } from "../components/MainLayout";

import { PostFrontMatter } from "../types";

interface Props {
  frontMatter: PostFrontMatter;
  breadcrumbsItems: {
      to?: string;
      label: string;
  }[];
}

const PageLayout: FC<Props> = ({ children, breadcrumbsItems }) => {

  return (
    <MainLayout>
      <br />
      <Container>
        {breadcrumbsItems && <Breadcrumbs
          items={breadcrumbsItems}
          linkView={(props) => <LinkView {...props} />}
        />}
        <article>
          <ContentCard>
            <div>{children}</div>
          </ContentCard>
        </article>
      </Container>
    </MainLayout>
  );
};

export default PageLayout;
