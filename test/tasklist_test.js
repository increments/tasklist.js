var tasklist = require('../src/tasklist');
var assert = require('assert');

describe('tasklist', function () {
  describe('.convert', function () {
    context('with index', function () {
      it('adds check to indexed checkbox', function () {
        assert.equal(
          tasklist.convert(
            '- [ ] a\n' +
            '- [ ] b',
            2,
            true
          ),
          '- [ ] a\n' +
          '- [x] b'
        );
      });
    });

    context('with true', function () {
      it('adds check', function () {
        assert.equal(
          tasklist.convert(
            '- [ ] a\n' +
            '- [ ] b',
            1,
            true
          ),
          '- [x] a\n' +
          '- [ ] b'
        );
      });
    });

    context('with false', function () {
      it('removes check', function () {
        assert.equal(
          tasklist.convert(
            '- [x] a\n' +
            '- [ ] b',
            1,
            false
          ),
          '- [ ] a\n' +
          '- [ ] b'
        );
      });
    });

    context('with list of links', function () {
      it('does not confuse the links with checkboxes', function () {
        assert.equal(
          tasklist.convert(
            '- [x](/inline/link)\n' +
            '- [x] (/inline/link)\n' +
            '- [x][reference-link]\n' +
            '- [x] [reference-link]\n' +
            '- [x][]\n' +
            '- [x] []\n' +
            '- [x] Checkbox\n' +
            '\n' +
            '[reference-link]: http://qiita.com/\n' +
            '[x]: http://qiita.com/\n',
            1,
            false
          ),
          '- [x](/inline/link)\n' +
          '- [x] (/inline/link)\n' +
          '- [x][reference-link]\n' +
          '- [x] [reference-link]\n' +
          '- [x][]\n' +
          '- [x] []\n' +
          '- [ ] Checkbox\n' +
          '\n' +
          '[reference-link]: http://qiita.com/\n' +
          '[x]: http://qiita.com/\n'
        );
      });
    });

    context('with code block', function () {
      it('ignores tasklist in code block', function () {
        assert.equal(
          tasklist.convert(
            '- [ ] a\n' +
            '- [ ] a\n' +
            '\n' +
            '```x:y.z\n' +
            '- [ ] b\n' +
            '- [ ] b\n' +
            '```\n' +
            '\n' +
            '- [ ] c\n' +
            '- [ ] c\n' +
            '\n' +
            '```\n' +
            '- [ ] d\n' +
            '- [ ] d\n' +
            '```\n' +
            '\n' +
            '- [ ] e\n' +
            '- [ ] e\n',
            3,
            true
          ),
          '- [ ] a\n' +
          '- [ ] a\n' +
          '\n' +
          '```x:y.z\n' +
          '- [ ] b\n' +
          '- [ ] b\n' +
          '```\n' +
          '\n' +
          '- [x] c\n' +
          '- [ ] c\n' +
          '\n' +
          '```\n' +
          '- [ ] d\n' +
          '- [ ] d\n' +
          '```\n' +
          '\n' +
          '- [ ] e\n' +
          '- [ ] e\n'
        );
      });
    });

    context('with code block and same lines', function () {
      it('ignores tasklist in code block', function () {
        assert.equal(
          tasklist.convert(
            '```\n' +
            '- [ ] a\n' +
            '- [ ] b\n' +
            '- [ ] c\n' +
            '```\n' +
            '\n' +
            '- [ ] a\n' +
            '- [ ] b\n' +
            '- [ ] c\n',
            2,
            true
          ),
          '```\n' +
          '- [ ] a\n' +
          '- [ ] b\n' +
          '- [ ] c\n' +
          '```\n' +
          '\n' +
          '- [ ] a\n' +
          '- [x] b\n' +
          '- [ ] c\n'
        );
      });
    });
  });
});
