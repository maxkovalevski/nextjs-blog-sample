import { ABOUT_PAGE_CONTENT } from './constants';
import { getFileByName } from './getFileByName';


export const getAboutPageContent = async () => {
  const post = await getFileByName(`${ABOUT_PAGE_CONTENT}.md`);

  return post;
}

