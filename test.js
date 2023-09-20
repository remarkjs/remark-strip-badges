import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
import remarkStripBadges from 'remark-strip-badges'

test('remark-strip-badges', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('remark-strip-badges')).sort(), [
      'default'
    ])
  })

  await t.test('should work', async function () {
    const file = String(
      await remark()
        .use(remarkStripBadges)
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
          ].join('\n\n')
        )
    )

    assert.deepEqual(
      String(file),
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
    )
  })

  await t.test('should work some more', async function () {
    const file = String(
      await remark()
        .use(remarkStripBadges)
        .process(
          [
            '# remark-strip-badges [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]',
            '[build-badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg',
            '[build-status]: https://travis-ci.org/remarkjs/remark-strip-badges',
            '[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-strip-badges.svg',
            '[coverage-status]: https://codecov.io/github/remarkjs/remark-strip-badges',
            '[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg',
            '[chat]: https://gitter.im/remarkjs/Lobby\n'
          ].join('\n\n')
        )
    )

    assert.deepEqual(
      String(file),
      [
        '# remark-strip-badges',
        '[build-badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg',
        '[build-status]: https://travis-ci.org/remarkjs/remark-strip-badges',
        '[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-strip-badges.svg',
        '[coverage-status]: https://codecov.io/github/remarkjs/remark-strip-badges',
        '[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg',
        '[chat]: https://gitter.im/remarkjs/Lobby\n'
      ].join('\n\n')
    )
  })
})
