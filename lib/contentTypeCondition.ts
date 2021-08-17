import { ContentType } from "../types";
import { CONTENT_TYPE_BLOG, CONTENT_TYPE_NOTE } from "./constants";

export const contentTypeCondition = (
  contentType: ContentType,
  type: string | undefined
): boolean => {
  switch (contentType) {
    case CONTENT_TYPE_BLOG:
      return type === CONTENT_TYPE_BLOG;
    case CONTENT_TYPE_NOTE:
      return !type || type === CONTENT_TYPE_NOTE;
  }

  return false;
};
