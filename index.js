import {definitions} from 'mdast-util-definitions'
import {visit, SKIP} from 'unist-util-visit'
import {isBadge} from 'is-badge'

export default function remarkStripBadges() {
  return transformer
}

function transformer(tree) {
  const define = definitions(tree)

  visit(tree, check)

  // Remove badge images, and links that include a badge image.
  function check(node, index, parent) {
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

    if (remove === true) {
      parent.children.splice(index, 1)
      return [SKIP, index]
    }
  }
}

function badgeImage(node, define) {
  if (node.type === 'image') {
    return isBadge(node.url)
  }

  if (node.type === 'imageReference') {
    const def = define(node.identifier)
    return isBadge(def.url)
  }
}
