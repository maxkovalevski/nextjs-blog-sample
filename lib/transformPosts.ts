import { PostFrontMatter } from "../types";
import { isTypeNote } from "./isTypeNote";

export const transformPosts = (posts: PostFrontMatter[]) => posts.map((post) =>  ({
  id: post.slug,
  title: post.title,
  date: post.date,
  excerpt: post.excerpt,
  tags: post.tags?.map((tag) => ({
      name: tag,
      link: `/tags/${tag}`,
    })) || [],
  link: `/${isTypeNote(post.type) ? 'notes' : 'blog'}/${post.slug}`,
  ...(!!post.image ? { imgSrc: `/${post.image}` } : {})
}));

