import fs from "fs";
import path from "path";

const flattenArray = (input: (string | string[])[]) =>
  input.reduce(
    (acc: string[], item) => [...acc, ...(Array.isArray(item) ? item : [item])],
    []
  );

const walkDir = (fullPath: string): string | string[] => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath);
};

const pathJoinPrefix = (prefix: string) => (extraPath: string) =>
  path.join(prefix, extraPath);

export const getAllFilesRecursively = (folder: string): string[] => {
  const dir = fs.readdirSync(folder);

  const paths = dir
    .map((val) => {
      const fullPath = pathJoinPrefix(folder)(val);

      return walkDir(fullPath);
    })
    .filter(Boolean);

  return flattenArray(paths);
};
