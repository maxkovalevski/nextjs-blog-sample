//const isAlphabetical = require('is-alphabetical')
import {isImportOrExport, EMPTY_NEWLINE} from '@mdx-js/util';
import extractImportsAndExports from './extract-imports-and-exports';
//const extractImportsAndExports = require('./extract-imports-and-exports')
import block from './block'
import {tag} from './tag'

function isAlphabetical(character: any) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character

  return (
    (code >= 97 && code <= 122) /* a-z */ ||
    (code >= 65 && code <= 90) /* A-Z */
  )
}

const LESS_THAN = '<'
const GREATER_THAN = '>'
const SLASH = '/'
const EXCLAMATION = '!'


tokenizeEsSyntax.locator = tokenizeEsSyntaxLocator

export default function mdx(_options: any) {
  const parser = this.Parser
  const compiler = this.Compiler

  if (parser && parser.prototype && parser.prototype.blockTokenizers) {
    attachParser(parser)
  }

  if (compiler && compiler.prototype && compiler.prototype.visitors) {
    attachCompiler(compiler)
  }
}

function attachParser(parser: any) {
  const blocks = parser.prototype.blockTokenizers
  const inlines = parser.prototype.inlineTokenizers
  const methods = parser.prototype.blockMethods

  blocks.esSyntax = tokenizeEsSyntax
  blocks.html = wrap(block)
  inlines.html = wrap(inlines.html, inlineJsx)

  tokenizeEsSyntax.notInBlock = true

  methods.splice(methods.indexOf('paragraph'), 0, 'esSyntax')

  function wrap(original, customTokenizer) {
    console.log('wrap!!11')
    const tokenizer = customTokenizer || tokenizeJsx
    tokenizer.locator = original.locator

    return tokenizer

    function tokenizeJsx() {
      const node = original.apply(this, arguments)

      if (node) {
        node.type = 'jsx'
      }

      return node
    }
  }

  function inlineJsx(eat, value) {
    if (value.charAt(0) !== LESS_THAN) {
      return
    }

    const nextChar = value.charAt(1)
    if (
      nextChar !== GREATER_THAN &&
      nextChar !== SLASH &&
      nextChar !== EXCLAMATION &&
      !isAlphabetical(nextChar)
    ) {
      return
    }

    const subvalueMatches = value.match(tag)
    if (!subvalueMatches) {
      return
    }

    const subvalue = subvalueMatches[0]
    return eat(subvalue)({type: 'jsx', value: subvalue})
  }
}

function attachCompiler(compiler) {
  const proto = compiler.prototype

  proto.visitors = Object.assign({}, proto.visitors, {
    import: stringifyEsSyntax,
    export: stringifyEsSyntax,
    jsx: stringifyEsSyntax
  })
}

function stringifyEsSyntax(node) {
  return node.value.trim()
}

function tokenizeEsSyntax(eat, value) {
  const index = value.indexOf(EMPTY_NEWLINE)
  const subvalue = index !== -1 ? value.slice(0, index) : value

  console.log('!!!!111 tokenizeEsSyntax')

  if (isImportOrExport(subvalue)) {
    const nodes = extractImportsAndExports(subvalue, this.file)
    nodes.map(node => eat(node.value)(node))
  }
}

function tokenizeEsSyntaxLocator(value, _fromIndex) {
  return isImportOrExport(value) ? -1 : 1
}

