import { ABOUT_BLOCK_CONTENT } from './constants';
import { getFileByName } from './getFileByName';


export const getAboutBlockContent = async () => {
  const post = await getFileByName(`${ABOUT_BLOCK_CONTENT}.md`);

  return post;
}

