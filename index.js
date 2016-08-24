/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:strip-badges
 * @fileoverview Remove badges (such as shields.io) from markdown.
 */

'use strict';

/* Dependencies. */
var definitions = require('mdast-util-definitions');
var visit = require('unist-util-visit');
var badge = require('is-badge');

/* Expose. */
module.exports = attacher;

/* Attacher. */
function attacher() {
  return transformer;
}

/* Remove badges. */
function transformer(ast) {
  var check = checkFactory(definitions(ast));

  visit(ast, 'imageReference', check);
  visit(ast, 'image', check);

  visit(ast, removeFactory(check.remove));
}

/* Factory to create a visitor which queues badge links
 * and images up for removal. */
function checkFactory(references) {
  var remove = [];

  check.remove = remove;

  return check;

  /* Bound visitor which queues badge images for removal.
   *
   * If the parent of `node` is a link or link-reference,
   * that parent is queued. */
  function check(node, index, parent) {
    var url = node.url;

    if ('identifier' in node) {
      url = references(node.identifier);
      url = url && url.url;
    }

    if (badge(url)) {
      if (parent.type === 'link' || parent.type === 'linkReference') {
        remove.push(parent);
      } else {
        remove.push(node);
      }
    }
  }
}

/* Removes each node in `nodes`. */
function removeFactory(nodes) {
  return function (node, index, parent) {
    if (parent && nodes.indexOf(node) !== -1) {
      parent.children.splice(index, 1);
    }
  };
}
