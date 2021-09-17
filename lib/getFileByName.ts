import { bundleMDX } from "mdx-bundler";
import path from "path";
import fs from "fs";
import { loadImage } from "canvas";

import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import remarkWikiLink from 'remark-wiki-link';
import rehypePrism from 'rehype-prism-plus';

import { remarkTocHeadings } from "./remarkTocHeadings";
import { remarkImgToJsx } from "./remarkImgToJsx";
import { remarkCodeTitles } from "./remarkCodeTitles";

import { CONTENT_DIR, NOTES_URL } from "./constants";
import { formatSlug } from "./formatSlug";
import { PostFrontMatter } from "../types";
import { getFormattedDate } from "./getFormattedDate";

import siteMetadata from "../siteMetadata";
import { createSocialCard } from "./createSocialCard";
import { getExcludedFiles } from "./getExcludedFiles";

const root = process.cwd();

export const getFileByName = async (fileName: string, dir = CONTENT_DIR, permalinkPrefix = NOTES_URL) => {
  const excludedFiles = getExcludedFiles();
  const slug = formatSlug(fileName);
  const filePath = path.join(root, dir, fileName);
  // const mdxPath = path.join(root, CONTENT_DIR, `${fileName}.mdx`);
  // const mdPath = path.join(root, CONTENT_DIR, `${fileName}.md`);
  // console.log("mdxPath", mdxPath);
  // const source = fs.existsSync(mdxPath)
  //   ? fs.readFileSync(mdxPath, "utf8")
  //   : fs.readFileSync(mdPath, "utf8");
  const logoPath = path.join(root, siteMetadata.siteLogo);
  const logo = await loadImage(logoPath);
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

  const { frontmatter: frontMatterData, code } = await bundleMDX(source, {
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
        [remarkWikiLink, {
          hrefTemplate: (permalink: string) => `/${permalinkPrefix}/${permalink}`,
          pageResolver: (name: string) => [name]
        }]
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // rehypeKatex,
       [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
         //() => {
           //return (tree) => {
             //visit(tree, "element", (node) => {
               //let [token, type] = node.properties.className || [];
               //if (token === "token") {
                 //node.properties.className = [tokenClassNames[type]];
               //}
             //});
           //};
         //},
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
        ".ts": "tsx"
      };
      options.plugins = [
        ...options.plugins || [],
        /*
        cssModulesPlugin({
          // optional. set to false to not inject generated CSS into <head>, default is true. 
          // could be a function with params content & digest (return a string of js code to inject to page), 
          // e.g.
          // ```
          // inject: (cssContent, digest) => `console.log("${cssContent}", "${digest}")`
          // ```
          build: false,
          //inject: false,

          localsConvention: 'camelCaseOnly', // optional. value could be one of 'camelCaseOnly', 'camelCase', 'dashes', 'dashesOnly', default is 'camelCaseOnly'
          
          //generateScopedName: (name, filename, css) => string, // optional. 

          //v2: true // experimental. v2 can bundle images in css, note if set `v2` to true, the `inject` option will be ignored. and v2 only works with `bundle: true`.
        })*/
      ];
      return options;
    },
  });

  // 2021-07-29 17:00
  const formattedDate = getFormattedDate(frontMatterData.date);

  let frontMatter = {
    //   readingTime: readingTime(code),
    fileName,
    ...frontMatterData as PostFrontMatter,
    slug: slug || '',
    date: formattedDate,
    tags: (frontMatterData?.tags || []).map((tag: string) => tag.toLowerCase()),
  };

  // generating social card
  let socialCard = null;

  if (!excludedFiles.includes(filePath)) {
    socialCard = createSocialCard(frontMatter, logo)
  }

  frontMatter = {
    ...frontMatter,
    socialCard,
  }

  return {
    mdxSource: code,
    toc,
    frontMatter,
  };
};
