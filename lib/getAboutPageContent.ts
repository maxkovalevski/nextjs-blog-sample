import { getFileByName } from './getFileByName';

import siteMetadata from '../siteMetadata';

export const getAboutPageContent = async () => {
  const post = await getFileByName(siteMetadata.aboutPageContentFile);

  return post;
}

