import React, { FC } from "react";

import {
  Footer,
  Header,
  Navbar,
} from "nocturnal-ui-react";
import { useRouter } from 'next/router'

import { ProgressBar } from "./ProgressBar";
import { LinkView } from "./LinkView";
import { Seo, SeoProps } from "./Seo";

import siteMetadata from '../siteMetadata';

interface Props extends SeoProps {}

export const MainLayout: FC<Props> = ({ children, ...props }) => {
  const router = useRouter()

  return (
    <>
      <Seo {...props} />
      <div>
        <ProgressBar
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Header
          currentPath={router.pathname}
          logoTitle="Next.js Blog Sample"
          linkView={(props) => <LinkView {...props} />}
          navItems={siteMetadata.headerMenu}
        />
        <>{children}</>
      </div>
      <Footer>
        <section className="copyright">{siteMetadata.copyrightText}</section>
        <Navbar
          currentPath={router.pathname}
          linkView={(props) => <LinkView {...props} />}
          items={siteMetadata.footerMenu}
        />
      </Footer>
    </>
  );
};
