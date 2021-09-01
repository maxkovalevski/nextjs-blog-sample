import { bundleMDX } from "mdx-bundler";
import path from "path";
import fs from "fs";

import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";

import { remarkTocHeadings } from "./remarkTocHeadings";
import { remarkImgToJsx } from "./remarkImgToJsx";
import { remarkCodeTitles } from "./remarkCodeTitles";

import { CONTENT_DIR } from "./constants";
import { formatSlug } from "./formatSlug";

const root = process.cwd();

export const getFileByName = async (fileName: string) => {
  const slug = formatSlug(fileName);
  const filePath = path.join(root, CONTENT_DIR, fileName);
  // const mdxPath = path.join(root, CONTENT_DIR, `${fileName}.mdx`);
  // const mdPath = path.join(root, CONTENT_DIR, `${fileName}.md`);
  // console.log("mdxPath", mdxPath);
  // const source = fs.existsSync(mdxPath)
  //   ? fs.readFileSync(mdxPath, "utf8")
  //   : fs.readFileSync(mdPath, "utf8");
  const source = fs.readFileSync(filePath, "utf8");

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  let toc: any[] = [];

  const { frontmatter, code } = await bundleMDX(source, {
    // mdx imports can be automatically source from the components directory
    cwd: path.join(process.cwd(), "components"),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkSlug,
        remarkAutolinkHeadings,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // rehypeKatex,
        // [rehypePrismPlus, { ignoreMissing: true }],
        // () => {
        //   return (tree) => {
        //     visit(tree, "element", (node) => {
        //       let [token, type] = node.properties.className || [];
        //       if (token === "token") {
        //         node.properties.className = [tokenClassNames[type]];
        //       }
        //     });
        //   };
        // },
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
        ".ts": "tsx",
      };
      return options;
    },
  });

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      //   readingTime: readingTime(code),
      slug: slug || null,
      fileName,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  };
};
