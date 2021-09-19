import { isTypeNote } from "./isTypeNote";

export const getResourceUrlPrefix = (post: { type?: string }) => {
  return isTypeNote(post.type) ? 'notes' : 'blog';
}

