(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mdastStripBadges = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"mdast-util-visit":2}],2:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module mdast-util-visit
 * @fileoverview Utility to recursively walk over mdast nodes.
 */

'use strict';

/**
 * Walk forwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   forwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function forwards(values, callback) {
    var index = -1;
    var length = values.length;

    while (++index < length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Walk backwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   backwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function backwards(values, callback) {
    var index = values.length;
    var length = -1;

    while (--index > length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Visit.
 *
 * @param {Node} tree - Root node
 * @param {string} [type] - Node type.
 * @param {function(node): boolean?} callback - Invoked
 *   with each found node.  Can return `false` to stop.
 * @param {boolean} [reverse] - By default, `visit` will
 *   walk forwards, when `reverse` is `true`, `visit`
 *   walks backwards.
 */
function visit(tree, type, callback, reverse) {
    var iterate;
    var one;
    var all;

    if (typeof type === 'function') {
        reverse = callback;
        callback = type;
        type = null;
    }

    iterate = reverse ? backwards : forwards;

    /**
     * Visit `children` in `parent`.
     */
    all = function (children, parent) {
        return iterate(children, function (child, index) {
            return child && one(child, index, parent);
        });
    };

    /**
     * Visit a single node.
     */
    one = function (node, index, parent) {
        var result;

        index = index || (parent ? 0 : null);

        if (!type || node.type === type) {
            result = callback(node, index, parent || null);
        }

        if (node.children && result !== false) {
            return all(node.children, node);
        }

        return result;
    };

    one(tree);
}

/*
 * Expose.
 */

module.exports = visit;

},{}]},{},[1])(1)
});