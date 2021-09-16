import { getFileByName } from './getFileByName';

import siteMetadata from '../siteMetadata';

export const getNotesHomePageContent = async () => {
  const post = await getFileByName(siteMetadata.notesHomePageContentFile);

  return post;
}

