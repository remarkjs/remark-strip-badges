# remark-strip-badges [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**remark**][remark] plug-in to strip badges (for example,
[`shields.io`][shields]).

## Installation

[npm][npm-install]:

```bash
npm install remark-strip-badges
```

**remark-strip-badges** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var remark = require('remark');
var stripBadges = require('remark-strip-badges');
```

Process:

```javascript
var doc = remark().use(stripBadges).process([
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

[travis-badge]: https://img.shields.io/travis/wooorm/remark-strip-badges.svg

[travis]: https://travis-ci.org/wooorm/remark-strip-badges

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-strip-badges.svg

[codecov]: https://codecov.io/github/wooorm/remark-strip-badges

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/remark-strip-badges/releases

[license]: LICENSE

[author]: http://wooorm.com

[remark]: https://github.com/wooorm/remark

[shields]: http://shields.io
