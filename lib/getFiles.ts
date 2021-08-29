import path from "path";

import { CONTENT_DIR } from "./constants";
import { getAllFilesRecursively } from "./getAllFilesRecursively";

const root = process.cwd();

export const getFiles = () => {
  const prefixPaths = path.join(root, CONTENT_DIR);
  const files = getAllFilesRecursively(prefixPaths);

  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
};
