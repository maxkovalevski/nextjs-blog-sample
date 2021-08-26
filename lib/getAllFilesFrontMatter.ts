import path from "path";
import fs from "fs";
import matter from "gray-matter";

import { CONTENT_TYPE_BLOG, CONTENT_TYPE_NOTE } from "./constants";
import { getAllFilesRecursively } from "./getAllFilesRecursively";
import { formatSlug } from "./formatSlug";
import { dateSortDesc } from "./dateSortDesc";
import { contentTypeCondition } from "./contentTypeCondition";
import { getPostExcerpt } from "./getPostExcerpt";


interface FrontMatterItem {
  date: string | null;
  [key: string]: unknown;
}

export async function getAllFilesFrontMatter(
  contentType: typeof CONTENT_TYPE_BLOG | typeof CONTENT_TYPE_NOTE
) {
  const ROOT_DIR = process.cwd();
  const prefixPaths = path.join(ROOT_DIR, "content");

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter: FrontMatterItem[] = [];

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data: frontmatter, content } = matter(source);
    const { public: isPublic = false, type, excerpt } = frontmatter;

    if (!isPublic || !contentTypeCondition(contentType, type)) {
      return;
    }


    allFrontMatter.push({
      ...frontmatter,
      slug: formatSlug(fileName),
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      excerpt: excerpt ? excerpt : getPostExcerpt(content),
      content,
    });
  });

  return allFrontMatter.sort((a, b) =>
    dateSortDesc(a.date || "", b.date || "")
  );
}
