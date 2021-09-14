import fs from "fs";
import path from "path";
import matter from "gray-matter";

//import { kebabCase } from "./kebabCase";
import { getFilesPaths } from "./getFilesPaths";
import { CONTENT_TYPE_BLOG, CONTENT_TYPE_NOTE } from "./constants";

const root = process.cwd();

export function getAllTags() {
  const files = getFilesPaths([CONTENT_TYPE_BLOG, CONTENT_TYPE_NOTE]);

  let tagCount: {
    [key: string]: number;
  } = {};

  files.forEach((file) => {
    let filePath = file.includes('/') ? file.split('/')[1] : file;
    const source = fs.readFileSync(path.join(root, "content", filePath), "utf8");
    const { data } = matter(source);
    const tags = Array.from(new Set((data.tags as string[] || []).map((tag) => tag.toLowerCase())).values());

    if (tags && data.public === true) {
      tags.forEach((tag) => {
        //const formattedTag = kebabCase(tag);
        const formattedTag = tag;
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
