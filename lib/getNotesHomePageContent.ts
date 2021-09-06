import { NOTES_HOME_PAGE_CONTENT } from './constants';
import { getFileByName } from './getFileByName';


export const getNotesHomePageContent = async () => {
  const post = await getFileByName(`${NOTES_HOME_PAGE_CONTENT}.md`);

  return post;
}

