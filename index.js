'use strict'

var definitions = require('mdast-util-definitions')
var visit = require('unist-util-visit')
var badge = require('is-badge')

module.exports = stripBadges

function stripBadges() {
  return transformer
}

function transformer(tree) {
  var references = definitions(tree)
  var remove = []

  visit(tree, ['imageReference', 'image'], check)
  visit(tree, remover)

  /* Visitor that queues badge images for removal.
   * If the parent of `node` is a link or link-reference,
   * that parent is queued. */
  function check(node, index, parent) {
    var url = node.url

    if ('identifier' in node) {
      url = references(node.identifier)
      url = url && url.url
    }

    if (badge(url)) {
      if (parent.type === 'link' || parent.type === 'linkReference') {
        remove.push(parent)
      } else {
        remove.push(node)
      }
    }
  }

  function remover(node, index, parent) {
    if (parent && remove.indexOf(node) !== -1) {
      parent.children.splice(index, 1)
      return index
    }
  }
}
