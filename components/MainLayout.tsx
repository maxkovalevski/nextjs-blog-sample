import React, { FC } from "react";

import {
  Footer,
  Header,
  Navbar,
} from "nocturnal-ui-react";
import { useRouter } from 'next/router'

import { ProgressBar } from "./ProgressBar";
import { LinkView } from "./LinkView";

export const MainLayout: FC = ({ children }) => {
  const router = useRouter()

  return (
    <>
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
          navItems={[
            {
              path: "/",
              name: "Home",
            },
            {
              path: "/blog",
              name: "Blog",
            },
            {
              path: "/notes",
              name: "Notes",
            },
            {
              path: "/about",
              name: "About",
            },
          ]}
        />
        <>{children}</>
      </div>
      <Footer>
        <section className="copyright">@ Max Kowalevski 2021</section>
        <Navbar
          currentPath={router.pathname}
          linkView={(props) => <LinkView {...props} />}
          items={[
            {
              path: "/",
              name: "Home",
            },
            {
              path: "/blog",
              name: "Blog",
            },
            {
              path: "/notes",
              name: "Notes",
            },
            {
              path: "/about",
              name: "About",
            },
          ]}
        />
      </Footer>
    </>
  );
};
