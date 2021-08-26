import {transformSync} from '@babel/core';
//const declare = require('@babel/helper-plugin-utils').declare
import { declare } from '@babel/helper-plugin-utils';

import syntaxJsxPlugin from '@babel/plugin-syntax-jsx';
import proposalObjectRestSpreadPlugin from '@babel/plugin-proposal-object-rest-spread';

class BabelPluginExtractImportsAndExports {
  state: any;
  plugin: any;

  constructor() {
    const nodes: any = []
    this.state = {nodes}

    this.plugin = declare(api => {
      api.assertVersion(7)

      return {
        visitor: {
          ExportDefaultDeclaration(path) {
            const {start} = path.node
            nodes.push({type: 'export', start, default: true})
          },
          ExportNamedDeclaration(path) {
            const {start} = path.node
            nodes.push({type: 'export', start})
          },
          ExportAllDeclaration(path) {
            const {start} = path.node
            nodes.push({type: 'export', start})
          },
          ImportDeclaration(path) {
            const {start} = path.node

            // Imports that are used in exports can end up as
            // ImportDeclarations with no start/end metadata,
            // these can be ignored
            if (start === undefined) {
              return
            }

            nodes.push({type: 'import', start})
          }
        }
      }
    })
  }
}

const partitionString = (str: string, indices: number[]) =>
  indices.map((val: number, i: number) => {
    return str.slice(val, indices[i + 1])
  })

export default (value: string, vfile: { path: string }) => {
  console.log('extractImportsAndExports')
  const instance = new BabelPluginExtractImportsAndExports()

  transformSync(value, {
    plugins: [syntaxJsxPlugin, proposalObjectRestSpreadPlugin, instance.plugin],
    filename: vfile.path,
    configFile: false,
    babelrc: false
  })

  const sortedNodes = instance.state.nodes.sort((a: any, b: any) => a.start - b.start)
  const nodeStarts = sortedNodes.map((n: any) => n.start)
  const values = partitionString(value, nodeStarts)

  const allNodes = sortedNodes.map(({start: _, ...node}, i: number) => {
    const value = values[i]
    return {...node, value}
  })

  // Group adjacent nodes of the same type so that they can be combined
  // into a single node later, this also ensures that order is preserved
  let currType = allNodes[0].type
  const groupedNodes = allNodes.reduce(
    (acc: any, curr: any) => {
      // Default export nodes shouldn't be grouped with other exports
      // because they're handled specially by MDX
      if (curr.default) {
        currType = 'default'
        return [...acc, [curr]]
      }

      if (curr.type === currType) {
        const lastNodes = acc.pop()
        return [...acc, [...lastNodes, curr]]
      }

      currType = curr.type
      return [...acc, [curr]]
    },
    [[]]
  )

  // Combine adjacent nodes into a single node
  return groupedNodes
    .filter((a: any) => a.length)
    .reduce((acc: any, curr: any) => {
      const node = curr.reduce((acc: any, curr: any) => ({
        ...acc,
        value: acc.value + curr.value
      }))

      return [...acc, node]
    }, [])
}
