/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module mdast-message-sort
 * @fileoverview mdast plug-in to sort messages by line/column.
 */

'use strict';

/*
 * Dependencies.
 */

var visit = require('mdast-util-visit');

/**
 * Check if `url` points to a badge.
 *
 * @private
 * @param {string} url - Image source.
 * @return {boolean} - Whether or not `url` points to a
 *   badge.
 */
function isBadge(url) {
    return /^https?:\/\/img.shields.io/.test(url);
}

/**
 * Gather all definitions in `ast`.
 *
 * @private
 * @param {Node} ast - Root node.
 * @return {Object} - Map of identifiers to links.
 */
function definitions(ast) {
    var cache = {};

    visit(ast, 'definition', function (node) {
        cache[node.identifier.toUpperCase()] = node.link;
    });

    return cache;
}

/**
 * Factory to create a visitor which queues badge links
 * and images up for removal.
 *
 * @private
 * @param {Object} references - Map of identifiers to
 *   links.
 * @return {Function} - See below.
 */
function checkFactory(references) {
    var remove = [];

    /**
     * Bound visitor which queues badge images for removal.
     *
     * If the parent of `node` is a link or link-reference,
     * that parent is queued.
     *
     * @private
     * @property {Array.<Node>} remove - Resulting nodes.
     * @param {Node} node - Visited node.
     * @param {number?} index - Index of `node` in `parent`.
     * @param {Node?} parent - Parent of `node`.
     */
    function check(node, index, parent) {
        var url = node.src;

        if ('identifier' in node) {
            url = references[node.identifier.toUpperCase()];
        }

        if (isBadge(url)) {
            if (parent.type === 'link' || parent.type === 'linkReference') {
                remove.push(parent);
            } else {
                remove.push(node);
            }
        }
    }

    check.remove = remove;

    return check;
}

/**
 * Factory to create a visitor which removes each node in
 * `nodes` once found.
 *
 * @private
 * @param {Array.<Node>} nodes - Nodes to remove.
 * @return {Function} - See below.
 */
function removeFactory(nodes) {
    /**
     * Bound visitor which removes each node in `nodes`.
     *
     * @private
     * @param {Node} node - Visited node.
     * @param {number?} index - Index of `node` in `parent`.
     * @param {Node?} parent - Parent of `node`.
     */
    return function (node, index, parent) {
        if (parent && nodes.indexOf(node) !== -1) {
            parent.children.splice(index, 1);
        }
    };
}

/**
 * Remove badges.
 *
 * @private
 * @param {Node} ast - Root node.
 */
function transformer(ast) {
    var check = checkFactory(definitions(ast));

    visit(ast, 'imageReference', check);
    visit(ast, 'image', check);

    visit(ast, removeFactory(check.remove));
}

/**
 * Return `transformer`.
 *
 * @example
 *   mdast.use(attacher).process(doc);
 *
 * @return {Function} - See `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
