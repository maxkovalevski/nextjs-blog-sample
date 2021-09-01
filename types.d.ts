export interface PostFrontMatter {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
  type?: ContentType;
  fileName?: string;
}

export interface Post extends PostFrontMatter {
  content: string;
}

export type ContentType = typeof CONTENT_TYPE_BLOG | typeof CONTENT_TYPE_NOTE;

export interface PaginationData {
  currentPage: string;
  totalPages: string;
}
