import { visit } from "unist-util-visit";
import { SKIP } from 'unist-util-visit-parents';
import {parse} from '@babel/parser';
import generate from '@babel/generator';

export const remarkFilterImports = (options: any) => () => {
  return function transformer(tree: any) {
    visit(tree, 'import', (node, index, parent) => {

      // A single import node can contain multiple actual import statements.
      // So we have to parse the value again to deal with each one.
      const ast = parse(node.value, {sourceType: 'module'});

      ast.program.body = ast.program.body.filter(node => {
        if (node.type !== 'ImportDeclaration') {
          return false;
        }

        const matches = options.strippedFilePattern.exec(node.source.value);
        return !Boolean(matches);
      });

      if (ast.program.body.length > 0) {
        // There are some valid import statements in this node, convert it to code, and replace the value with this code.
        node.value = generate(ast).code;
      } else {
        // All imports in this node have been removed, so remove the entire node from it's parent
        parent?.children.splice(Number(index), 1);
        return [SKIP, index];
      }
    });
  };
};

