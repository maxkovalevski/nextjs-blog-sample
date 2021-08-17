import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { formatSlug } from "./formatSlug";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const getPostsFiles = () => {
  return fs.readdirSync(CONTENT_DIR);
};

export const getPostData = (fileName: string) => {
  const slug = formatSlug(fileName);
  const filePath = path.join(CONTENT_DIR, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const { public: isPublic = false } = data;

  if (!isPublic) {
    return null;
  }

  const postData = {
    slug,
    ...data,
    content,
  };

  return postData;
};

export const getPostDataBySlug = (slug: string) => {
  const files = getPostsFiles();
  const foundFile = files.find((file) => fileNameSlugify(file) === slug);

  if (!foundFile) {
    return;
  }

  const postData = getPostData(foundFile);

  return postData;
};

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  const allPosts = postFiles
    .filter((file) => file.includes(".md"))
    .map((postFile) => {
      return getPostData(postFile);
    })
    .filter(Boolean);

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
};
