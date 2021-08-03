/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Content} Content
 */

import {definitions} from 'mdast-util-definitions'
import {visit, SKIP} from 'unist-util-visit'
import {isBadge} from 'is-badge'

/**
 * Plugin to strip badges (such as `shields.io`).
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkStripBadges() {
  return (tree) => {
    const define = definitions(tree)

    // Remove badge images, and links that include a badge image.
    visit(tree, (node, index, parent) => {
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
        return [SKIP, index]
      }
    })
  }
}

/**
 * @param {Root|Content} node
 * @param {ReturnType<definitions>} define
 * @returns {boolean|undefined}
 */
function badgeImage(node, define) {
  if (node.type === 'image') {
    return isBadge(node.url)
  }

  if (node.type === 'imageReference') {
    const def = define(node.identifier)
    return Boolean(def && isBadge(def.url))
  }
}
