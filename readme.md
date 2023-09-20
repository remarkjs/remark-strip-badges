# remark-strip-badges

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to remove badges (such as [`shields.io`][shields]).

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkStripBadges)`](#unifieduseremarkstripbadges)
*   [Syntax](#syntax)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to remove badges (such as
[`shields.io`][shields]).

## When should I use this?

This package is useful when you’re taking (user generated) readmes, which
in the JavaScript community often have assorted badges, but want to display
them cleanly on a website or in a limited medium such as man pages.

A different plugin, [`remark-squeeze-paragraphs`][remark-squeeze-paragraphs],
can take care of potentially empty paragraphs left behind by this plugin.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-strip-badges
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkStripBadges from 'https://esm.sh/remark-strip-badges@6'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkStripBadges from 'https://esm.sh/remark-strip-badges@6?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
# pluto [![Build](https://github.com/solar-system/pluto/workflows/main/badge.svg)](https://github.com/solar-system/pluto/actions)
```

…and a module `example.js`:

```js
import {remark} from 'remark'
import remarkStripBadges from 'remark-strip-badges'
import {read} from 'to-vfile'

const file = await remark()
  .use(remarkStripBadges)
  .process(await read('example.md'))

console.log(String(file))
```

…then running `node example.js` yields:

```markdown
# pluto
```

## API

This package exports no identifiers.
The default export is [`remarkStripBadges`][api-remark-strip-badges].

### `unified().use(remarkStripBadges)`

Remove badges (such as [`shields.io`][shields]).

###### Parameters

There are no parameters.

###### Returns

Transform ([`Transformer`][unified-transformer]).

## Syntax

Any image (or image references) that references a known badge (see
[`is-badge`][is-badge]) will be removed.
If it occurs in a link, that link is also removed.

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line,
`remark-strip-badges@^7`, compatible with Node.js 16.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Use of `remark-strip-badges` does not involve **[rehype][]** (**[hast][]**) or
user content so there are no openings for [cross-site scripting (XSS)][wiki-xss]
attacks.

## Related

*   [`remark-squeeze-paragraphs`][remark-squeeze-paragraphs]
    — remove empty paragraphs (potentially left behind by this plugin)

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

[build-badge]: https://github.com/remarkjs/remark-strip-badges/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-strip-badges/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-strip-badges.svg

[coverage]: https://codecov.io/github/remarkjs/remark-strip-badges

[downloads-badge]: https://img.shields.io/npm/dm/remark-strip-badges.svg

[downloads]: https://www.npmjs.com/package/remark-strip-badges

[size-badge]: https://img.shields.io/bundlejs/size/remark-strip-badges

[size]: https://bundlejs.com/?q=remark-strip-badges

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/main/contributing.md

[support]: https://github.com/remarkjs/.github/blob/main/support.md

[coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[is-badge]: https://github.com/wooorm/is-badge

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[remark-squeeze-paragraphs]: https://github.com/remarkjs/remark-squeeze-paragraphs

[shields]: https://shields.io

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[api-remark-strip-badges]: #unifieduseremarkstripbadges
