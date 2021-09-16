import { getFileByName } from './getFileByName';

import siteMetadata from '../siteMetadata';

export const getAboutBlockContent = async () => {
  const post = await getFileByName(siteMetadata.aboutBlockContentFile);

  return post;
}

