import { visit } from "unist-util-visit";

export function remarkTocHeadings(options: any) {
  return (tree: any) =>
    visit(tree, "heading", (node) => {
      options.exportRef.push({
        value: node.children[0].value || node.children[1].value,
        url: node.children[0].url || node.children[1].url,
        depth: node.depth,
      });
    });
}
