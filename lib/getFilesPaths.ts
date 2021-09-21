import matter from "gray-matter";
import path from "path";
import fs from 'fs';

import { CONTENT_DIR } from "./constants";
import { getAllFilesRecursively } from "./getAllFilesRecursively";
import { ContentType, PostFrontMatter } from "../types";
import { contentTypeCondition } from "./contentTypeCondition";
import { isPublished } from "./isPublished";

const root = process.cwd();

type BoolFilter = <T>(x: T | undefined) => x is T;

export const getFilesPaths = (contentTypes: ContentType[]): string[] => {
  const prefixPaths = path.join(root, CONTENT_DIR);
  const filesPaths = getAllFilesRecursively(prefixPaths, ['md', 'mdx']);

  return filesPaths.map((filePath) => {
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    const frontmatter = data as PostFrontMatter;

    if (!isPublished(frontmatter) || !contentTypeCondition(contentTypes, frontmatter.type)) {
      return;
    }

    return filePath.slice(prefixPaths.length + 1).replace(/\\/g, "/");
  }).filter(Boolean as unknown as BoolFilter);
};

