export interface PostFrontMatter {
  title: string;
  image?: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
  tags?: string[];
  type?: ContentType;
  fileName?: string;
  layout?: string;
}

export interface Post extends PostFrontMatter {
  content: string;
}

export type ContentType = typeof CONTENT_TYPE_BLOG | typeof CONTENT_TYPE_NOTE;

export interface PaginationDataQuery {
  currentPage: string;
  totalPages: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
}

export interface TableOfContentsItem {
  depth: number;
  url: string;
  value: string;
}

export type TableOfContentsData = TableOfContentsItem[];

export type TagsData = { [key: string]: number };

