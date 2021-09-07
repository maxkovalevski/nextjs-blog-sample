export const transformTags = (tags: string[]) => tags.map((tag) =>  ({ name: tag, link: `/tags/${tag}` }));
