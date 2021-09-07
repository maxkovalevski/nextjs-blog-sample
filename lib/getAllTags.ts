import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { kebabCase } from "./kebabCase";
import { getFiles } from "./getFiles";

const root = process.cwd();

export function getAllTags() {
  const files = getFiles();

  let tagCount: {
    [key: string]: number;
  } = {};

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, "content", file), "utf8");
    const { data } = matter(source);
    const tags = data.tags as string[];

    if (tags && data.public === true) {
      tags.forEach((tag) => {
        const formattedTag = kebabCase(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
}
