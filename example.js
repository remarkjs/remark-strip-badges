// Dependencies:
var remark = require('remark');
var stripBadges = require('./index.js');

// Process:
var doc = remark().use(stripBadges).process([
    '# remark-strip-badges ![Build Status][badge]',
    '',
    '[badge]: https://img.shields.io/travis/wooorm/remark-strip-badges.svg'
].join('\n'));

// Yields:
console.log('markdown', doc);
