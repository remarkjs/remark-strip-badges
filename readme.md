# remark-strip-badges [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[**remark**][remark] plug-in to strip badges (such as
[`shields.io`][shields]).

## Installation

[npm][]:

```bash
npm install remark-strip-badges
```

## Usage

Say we have the following file, `example.md`:

```markdown
# remark-strip-badges ![Build Status][badge]

[badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg
```

And our script, `example.js`, looks as follows:

```javascript
var fs = require('fs');
var remark = require('remark');
var strip = require('remark-strip-badges');

remark()
  .use(strip)
  .process(fs.readFileSync('example.md'), function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Now, running `node example` yields:

```markdown
# remark-strip-badges

[badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg
```

## API

### `remark.use(stripBadges)`

Strips badges, like [`shields.io`][shields].

## Related

*   [`remark-squeeze-paragraphs`](https://github.com/eush77/remark-squeeze-paragraphs)
    — Remove empty paragraphs (potentially left behind by this plugin)

## Contribute

See [`contribute.md` in `remarkjs/remarkj`][contribute] for ways to get started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-strip-badges.svg

[build-status]: https://travis-ci.org/remarkjs/remark-strip-badges

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-strip-badges.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-strip-badges

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[shields]: http://shields.io

[contribute]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md
