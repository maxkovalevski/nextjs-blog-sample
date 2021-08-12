import React, { FC } from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export const MainLayout: FC = ({ children }) => {
  return (
    <>
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>{children}</main>
    </>
  );
};
