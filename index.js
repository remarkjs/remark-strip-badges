'use strict'

var definitions = require('mdast-util-definitions')
var visit = require('unist-util-visit')
var badge = require('is-badge')

module.exports = stripBadges

function stripBadges() {
  return transformer
}

function transformer(tree) {
  var define = definitions(tree)

  visit(tree, check)

  // Remove badge images, and links that include a badge image.
  function check(node, index, parent) {
    var remove = false
    var children
    var length
    var offset
    var child

    if (node.type === 'link' || node.type === 'linkReference') {
      children = node.children
      length = children.length
      offset = -1

      while (++offset < length) {
        child = children[offset]

        if (badgeImage(child, define)) {
          remove = true
          break
        }
      }
    } else if (badgeImage(node, define)) {
      remove = true
    }

    if (remove === true) {
      parent.children.splice(index, 1)
      return [visit.SKIP, index]
    }
  }
}

function badgeImage(node, define) {
  var def

  if (node.type === 'image') {
    def = node
  } else if (node.type === 'imageReference') {
    def = define(node.identifier)
  }

  return def && badge(def.url)
}
