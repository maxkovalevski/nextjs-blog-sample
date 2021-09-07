import { getAllTags } from "./getAllTags";
import { getBlurbContent } from "./getBlurbContent";
import { transformTags } from "./transformTags";

export const getSidePanelData = async () => {
  const { mdxSource: blurbContent } = await getBlurbContent();
  const tags = transformTags(Object.keys(getAllTags()));

  return {blurbContent, tags};
}
