import React, { FC } from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

import {
  Container,
  Footer,
  Header,
  InfoCard,
  Navbar,
  PageGrid,
  PageTitle,
  Pagination,
  PostsList,
  PostsSection,
  SidePanel,
} from "nocturnal-ui-react";

export const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Header
        logoTitle="Next.js Blog Sample"
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
      <Footer>
        <section className="copyright">@ Max Kowalevski 2021</section>
        <Navbar
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
