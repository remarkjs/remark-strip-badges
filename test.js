'use strict'

var test = require('tape')
var remark = require('remark')
var badges = require('.')

test('remark-strip-badges', function (t) {
  t.plan(2)

  remark()
    .use(badges)
    .process(
      [
        '# Hello',
        'non-badge: ![](http://example.com/fav.ico).',
        'https: ![build](https://img.shields.io/travis/joyent/node.svg).',
        'http: ![build](https://img.shields.io/coveralls/jekyll/jekyll.svg).',
        'reference: ![definition].',
        'nested: [![definition]](https://npm.im/localeval).',
        'random: [other](https://link.com).',
        '[definition]: https://img.shields.io/scrutinizer/g/filp/whoops.svg\n'
      ].join('\n\n'),
      function (error, file) {
        t.deepEqual(
          [error, String(file)],
          [
            null,
            [
              '# Hello',
              'non-badge: ![](http://example.com/fav.ico).',
              'https: .',
              'http: .',
              'reference: .',
              'nested: .',
              'random: [other](https://link.com).',
              '[definition]: https://img.shields.io/scrutinizer/g/filp/whoops.svg\n'
            ].join('\n\n')
          ],
          'should work'
        )
      }
    )

  remark()
    .use(badges)
    .process(
      [
        '# remark-strip-badges [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]',
        '[build-badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg',
        '[build-status]: https://travis-ci.org/remarkjs/remark-strip-badges',
        '[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-strip-badges.svg',
        '[coverage-status]: https://codecov.io/github/remarkjs/remark-strip-badges',
        '[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg',
        '[chat]: https://gitter.im/remarkjs/Lobby\n'
      ].join('\n\n'),
      function (error, file) {
        t.deepEqual(
          [error, String(file)],
          [
            null,
            [
              '# remark-strip-badges   ',
              '[build-badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg',
              '[build-status]: https://travis-ci.org/remarkjs/remark-strip-badges',
              '[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-strip-badges.svg',
              '[coverage-status]: https://codecov.io/github/remarkjs/remark-strip-badges',
              '[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg',
              '[chat]: https://gitter.im/remarkjs/Lobby\n'
            ].join('\n\n')
          ],
          'should work'
        )
      }
    )
})
