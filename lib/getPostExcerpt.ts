import { EXCERPT_LENGTH } from "./constants";

export const getPostExcerpt = (
  text: string,
  excerptLength = EXCERPT_LENGTH
) => {
  return `${text.substr(0, excerptLength)}...`;
};
