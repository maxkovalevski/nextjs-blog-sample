import { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';

import { Pagination } from '../../../components/Pagination';
import { PostsList } from '../../../components/PostsList';
import { BLOG_POSTS_MAX_DISPLAY, POSTS_PER_PAGE } from '../../../lib/constants';
import { getAllFilesFrontMatter } from '../../../lib/getAllFilesFrontMatter';
import { PaginationData, Post } from '../../../types';

interface Props { posts: Post[]; initialDisplayPosts: Post[]; pagination: PaginationData; };

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog');
  const totalPages = Math.ceil(totalPosts.length / BLOG_POSTS_MAX_DISPLAY);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext<{ page: string; }>) {
  const {
    params: { page } = { page: '0' },
  } = context
  const posts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

const PostPage: NextPage<Props> = ({
  initialDisplayPosts,
  pagination
}) => {
  return (
      <div>
        <PostsList posts={initialDisplayPosts} />
        {pagination && parseInt(pagination.totalPages) > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
  );
}

export default PostPage;

