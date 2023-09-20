/**
 * @typedef {import('mdast').Nodes} Nodes
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-definitions').GetDefinition} GetDefinition
 */

import {isBadge} from 'is-badge'
import {definitions} from 'mdast-util-definitions'
import {SKIP, visit} from 'unist-util-visit'

/**
 * Remove badges (such as `shields.io`).
 *
 * @returns
 *   Transform.
 */
export default function remarkStripBadges() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    const define = definitions(tree)

    // Remove badge images, and links that include a badge image.
    visit(tree, function (node, index, parent) {
      let remove = false

      if (node.type === 'link' || node.type === 'linkReference') {
        const children = node.children
        let offset = -1

        while (++offset < children.length) {
          const child = children[offset]

          if (badgeImage(child, define)) {
            remove = true
            break
          }
        }
      } else if (badgeImage(node, define)) {
        remove = true
      }

      if (remove === true && parent && typeof index === 'number') {
        parent.children.splice(index, 1)

        if (index === parent.children.length) {
          let tail = parent.children[index - 1]

          // If the remaining tail is a text.
          while (tail && tail.type === 'text') {
            index--

            // Remove trailing tabs and spaces.
            tail.value = tail.value.replace(/[ \t]+$/, '')

            // Remove the whole if it was whitespace only.
            if (!tail.value) {
              parent.children.splice(index, 1)
            }

            tail = parent.children[index - 1]
          }
        }

        return [SKIP, index]
      }
    })
  }
}

/**
 * @param {Nodes} node
 * @param {GetDefinition} define
 * @returns {boolean}
 */
function badgeImage(node, define) {
  if (node.type === 'imageReference') {
    const def = define(node.identifier)
    /* c8 ignore next -- verbose to test, means someone generated an incorrect AST. */
    return def ? isBadge(def.url) : false
  }

  return node.type === 'image' ? isBadge(node.url) : false
}
