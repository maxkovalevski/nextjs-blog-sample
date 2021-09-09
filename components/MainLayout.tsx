import React, { FC } from "react";

import {
  Footer,
  Header,
  Navbar,
} from "nocturnal-ui-react";
import Link from "next/link";
import { useRouter } from 'next/router'

import { ProgressBar } from "./ProgressBar";

export const MainLayout: FC = ({ children }) => {
  const router = useRouter()

  return (
    <>
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
        linkView={({ to, children, ...props }) => <Link href={to}><a {...props}>{children}</a></Link>}
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
          currentPath={router.pathname}
          linkView={({ to, children, ...props }) => <Link href={to}><a {...props}>{children}</a></Link>}
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
