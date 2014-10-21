## tasklist.convert(String, Integer, Boolean)
Takes Markdown text, checkbox index that starts from 1, and checked flag,
then returns converted Markdown text.

```js
tasklist.convert('- [ ]\n- [ ]\n', 2, true) //=> '- [ ]\n- [x]\n'
```
