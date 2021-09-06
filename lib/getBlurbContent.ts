import { BLURB_CONTENT } from './constants';
import { getFileByName } from './getFileByName';


export const getBlurbContent = async () => {
  const data = await getFileByName(`${BLURB_CONTENT}.md`);

  return data;
}

