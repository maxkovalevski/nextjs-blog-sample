import { ContentType } from "../types";
import { CONTENT_TYPE_NOTE } from "./constants";

export const contentTypeCondition = (
  contentTypes: ContentType[],
  type: string | undefined
): boolean => {
  if (contentTypes.includes(CONTENT_TYPE_NOTE)) {
    return !type || contentTypes.includes(type);
  }

  return contentTypes.includes(type);
};
