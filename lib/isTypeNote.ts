import { CONTENT_TYPE_NOTE } from "./constants";

export const isTypeNote = (type?: string) => {
  return type === CONTENT_TYPE_NOTE || type === "" || type === undefined;
}
