import slugify from "@sindresorhus/slugify";

export const formatSlug = (fileName: string) =>
  slugify(fileName.replace(/\.md$/, ""));
