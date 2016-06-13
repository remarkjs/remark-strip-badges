# remark-strip-badges [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

<!--lint disable list-item-spacing-->

[**remark**][remark] plug-in to strip badges (such as
[`shields.io`][shields]).

## Installation

[npm][]:

```bash
npm install remark-strip-badges
```

**remark-strip-badges** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var remark = require('remark');
var stripBadges = require('remark-strip-badges');
```

Process:

```javascript
var file = remark().use(stripBadges).process([
    '# remark-strip-badges ![Build Status][badge]',
    '',
    '[badge]: https://img.shields.io/travis/wooorm/remark-strip-badges.svg'
].join('\n'));
```

Yields:

```markdown
# remark-strip-badges 

[badge]: https://img.shields.io/travis/wooorm/remark-strip-badges.svg
```

## API

### `remark.use(stripBadges)`

Strips badges, like [`shields.io`][shields].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/remark-strip-badges.svg

[build-status]: https://travis-ci.org/wooorm/remark-strip-badges

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-strip-badges.svg

[coverage-status]: https://codecov.io/github/wooorm/remark-strip-badges

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[releases]: https://github.com/wooorm/remark-strip-badges/releases

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark

[shields]: http://shields.io
