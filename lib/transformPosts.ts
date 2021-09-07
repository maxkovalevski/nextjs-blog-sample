import { PostFrontMatter } from "../types";

export const transformPosts = (posts: PostFrontMatter[]) => posts.map((post) =>  ({
  id: post.slug,
  title: post.title,
  date: post.date,
  excerpt: post.excerpt,
  tags: post.tags?.map((tag) => ({
      name: tag,
      link: `/tags/${tag}`,
    })) || [],
  link: `/blog/${post.slug}`,
  imgSrc: post.image,
}))
