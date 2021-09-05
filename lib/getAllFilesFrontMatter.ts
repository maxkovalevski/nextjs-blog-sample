import path from "path";
import fs from "fs";
import matter from "gray-matter";

import { CONTENT_DIR, CONTENT_TYPE_BLOG, CONTENT_TYPE_NOTE } from "./constants";
import { getAllFilesRecursively } from "./getAllFilesRecursively";
import { formatSlug } from "./formatSlug";
import { dateSortDesc } from "./dateSortDesc";
import { contentTypeCondition } from "./contentTypeCondition";
import { getPostExcerpt } from "./getPostExcerpt";
import { ContentType } from "../types";
import { isTypeNote } from "./isTypeNote";

interface FrontMatterItem {
  date: string | null;
  public?: boolean | null;
  tags?: string[] | null;
  slug: string;
  fileName: string;
  [key: string]: unknown;
}

export async function getAllFilesFrontMatter(contentTypes: ContentType[]) {
  const ROOT_DIR = process.cwd();
  const prefixPaths = path.join(ROOT_DIR, CONTENT_DIR);

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

    if (!isPublic || !contentTypeCondition(contentTypes, type)) {
      return;
    }

    const slugFileName = fileName.replace(".mdx", "").replace(".md", "");
    const slug = isTypeNote(type) ? slugFileName : formatSlug(slugFileName);



    allFrontMatter.push({
      ...frontmatter,
      slug,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      excerpt: excerpt ? excerpt : getPostExcerpt(content),
      fileName,
      content,
    });
  });

  return allFrontMatter.sort((a, b) =>
    dateSortDesc(a.date || "", b.date || "")
  );
}
