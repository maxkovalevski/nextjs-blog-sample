import path from "path";
import fs from "fs";
import matter from "gray-matter";

import { CONTENT_DIR } from "./constants";
import { getAllFilesRecursively } from "./getAllFilesRecursively";
import { formatSlug } from "./formatSlug";
import { dateSortDesc } from "./dateSortDesc";
import { contentTypeCondition } from "./contentTypeCondition";
import { getPostExcerpt } from "./getPostExcerpt";
import { ContentType, PostFrontMatter } from "../types";
import { isTypeNote } from "./isTypeNote";
import { getFormattedDate } from "./getFormattedDate";

export async function getAllFilesFrontMatter(contentTypes: ContentType[]) {
  const ROOT_DIR = process.cwd();
  const prefixPaths = path.join(ROOT_DIR, CONTENT_DIR);

  const files = getAllFilesRecursively(prefixPaths, ['md', 'mdx']);

  const allFrontMatter: PostFrontMatter[] = [];

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data, content } = matter(source);
    const frontmatter = data as PostFrontMatter;
    const { public: isPublic = false, type, excerpt } = frontmatter;

    if (!isPublic || !contentTypeCondition(contentTypes, type)) {
      return;
    }

    const slugFileName = fileName.replace(".mdx", "").replace(".md", "");
    const slug = isTypeNote(type) ? slugFileName : formatSlug(slugFileName);

    const formattedDate = getFormattedDate(frontmatter.date || '');

    allFrontMatter.push({
      ...frontmatter,
      slug,
      date: formattedDate,
      excerpt: excerpt ? excerpt : getPostExcerpt(content),
      fileName,
      content,
      tags: (frontmatter?.tags || []).map((tag) => tag.toLowerCase()),
    });
  });

  return allFrontMatter.sort((a, b) =>
    dateSortDesc(a.date || "", b.date || "")
  );
}
