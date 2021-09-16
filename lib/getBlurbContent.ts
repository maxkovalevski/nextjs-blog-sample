import { getFileByName } from './getFileByName';

import siteMetadata from '../siteMetadata';

export const getBlurbContent = async () => {
  const data = await getFileByName(siteMetadata.blurbContentFile);

  return data;
}

