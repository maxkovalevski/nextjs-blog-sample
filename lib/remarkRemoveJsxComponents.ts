import { visit } from "unist-util-visit";

export const remarkRemoveJsxComponents = () => {
  return function transformer(tree: any) {
    visit(tree, (node) => {
      if (node.type === 'mdxJsxFlowElement') {
        node.type = 'div';
        node.children = [];
      }
    });
  };
};

