/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:strip-badges:test
 * @fileoverview Test suite for `remark-strip-badges`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var badges = require('./');

/*
 * Tests.
 */

test('remark-strip-badges', function (t) {
    remark().use(badges).process([
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
        '[definition]: https://img.shields.io/scrutinizer/g/filp/whoops.svg',
        ''
    ].join('\n'), function (err, file) {
        t.ifErr(err);

        t.equal(String(file), [
            '# Hello',
            '',
            'non-badge: ![](http://example.com/fav.ico).',
            '',
            'https&#x3A; .',
            '',
            'http&#x3A; .',
            '',
            'reference: .',
            '',
            'nested: .',
            '',
            '[definition]: https://img.shields.io/' +
                'scrutinizer/g/filp/whoops.svg',
            ''
        ].join('\n'));

        t.end();
    });
});
