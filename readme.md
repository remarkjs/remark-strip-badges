# remark-strip-badges

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to strip badges (such as [`shields.io`][shields]).

## Install

[npm][]:

```sh
npm install remark-strip-badges
```

## Use

Say we have the following file, `example.md`:

```markdown
# remark-strip-badges ![Build Status][badge]

[badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg
```

And our script, `example.js`, looks as follows:

```js
var fs = require('fs')
var remark = require('remark')
var strip = require('remark-strip-badges')

remark()
  .use(strip)
  .process(fs.readFileSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
# remark-strip-badges

[badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg
```

## API

### `remark.use(stripBadges)`

Plugin to strip badges (such as [`shields.io`][shields]).

## Security

Use of `remark-strip-badges` does not involve [**rehype**][rehype]
([**hast**][hast]) or user content so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Related

*   [`remark-squeeze-paragraphs`](https://github.com/eush77/remark-squeeze-paragraphs)
    — Remove empty paragraphs (potentially left behind by this plugin)

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges/main.svg

[build]: https://travis-ci.org/remarkjs/remark-strip-badges

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-strip-badges.svg

[coverage]: https://codecov.io/github/remarkjs/remark-strip-badges

[downloads-badge]: https://img.shields.io/npm/dm/remark-strip-badges.svg

[downloads]: https://www.npmjs.com/package/remark-strip-badges

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-strip-badges.svg

[size]: https://bundlephobia.com/result?p=remark-strip-badges

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[shields]: https://shields.io

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
