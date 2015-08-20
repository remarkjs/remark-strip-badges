/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:strip-badges:test
 * @fileoverview Test suite for `mdast-strip-badges`.
 */

'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var mdast = require('mdast');
var badges = require('./');

/*
 * Fixtures.
 */

var input = [
    '# Hello',
    '',
    'non-badge: ![](http://example.com/fav.ico).',
    '',
    'https: ![build](https://img.shields.io/travis/joyent/node.svg).',
    '',
    'http: ![build](https://img.shields.io/coveralls/jekyll/jekyll.svg).',
    '',
    'reference: ![definition].',
    '',
    'nested: [![definition]](https://npm.im/localeval).',
    '',
    '[definition]: https://img.shields.io/scrutinizer/g/filp/whoops.svg'
].join('\n') + '\n';

var baseline = [
    '# Hello',
    '',
    'non-badge: ![](http://example.com/fav.ico).',
    '',
    'https: .',
    '',
    'http: .',
    '',
    'reference: .',
    '',
    'nested: .',
    '',
    '[definition]: https://img.shields.io/scrutinizer/g/filp/whoops.svg'
].join('\n') + '\n';

/*
 * Tests.
 */

describe('mdast-strip-badges', function () {
    it('should work', function (done) {
        mdast.use(badges).process(input, function (err, file, doc) {
            done(err);

            assert.equal(doc, baseline);
        });
    });
});
