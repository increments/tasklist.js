## tasklist.convert(String, Integer, Boolean)
Takes Markdown text, checkbox index that starts from 1, and checked flag,
then returns converted Markdown text.

```js
tasklist.convert(
  '- [ ] foo\n' +
  '- [ ] bar\n' +
  '- [ ] baz',
  2,
  true
)
// results in:
// - [ ] foo
// - [x] bar
// - [ ] baz
```
