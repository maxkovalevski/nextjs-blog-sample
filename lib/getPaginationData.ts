import { BLOG_POSTS_MAX_DISPLAY } from "./constants";

export const getPaginationData = (currentPage: number, postsCount: number) => ({
  currentPage,
  totalPages: Math.ceil(postsCount / BLOG_POSTS_MAX_DISPLAY),
});
