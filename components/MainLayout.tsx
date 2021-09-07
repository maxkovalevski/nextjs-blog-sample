import React, { FC } from "react";

import {
  Footer,
  Header,
  Navbar,
} from "nocturnal-ui-react";
import Link from "next/link";

export const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Header
        logoTitle="Next.js Blog Sample"
        linkView={({ to, children, ...props }) => <Link href={to} {...props}><a>{children}</a></Link>}
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
          linkView={({ to, children, ...props }) => <Link href={to} {...props}><a>{children}</a></Link>}
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
