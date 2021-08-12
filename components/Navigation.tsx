import React, { FC } from "react";
import Link from "next/link";

export const Navigation: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
};
