import React from "react";
import { NextPage } from "next";

import { getAllTags } from "../lib/getAllTags";
import Link from "next/link";
import { TagsData } from "../types";

export async function getStaticProps() {
  const tags = getAllTags();

  return { props: { tags } };
}

interface Props {
  tags: TagsData;
}

const TagsPage: NextPage<Props> = ({ tags }) => {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <div>
      {Object.keys(tags).length === 0 && "No tags found."}
      {sortedTags.map((t) => {
        return (
          <div key={t}>
            {/* <Tag text={t} /> */}
            <Link href={`/tags/${t.trim()}`}>
              <a>
                #{t} ({tags[t]})
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TagsPage;
