# tasklist.js
Converts tasklist in Markdown.

## Install
```sh
# As an npm package
npm install increments/tasklist.js

# As a bower package
bower install increments/tasklist.js

# As a source code for browser
<script src="http://increments.github.io/tasklist.js/dist/tasklist.min.js"></script>
```

## API
See [/docs/tasklist.md](https://github.com/increments/tasklist.js/blob/master/doc/tasklist.md).

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

## Development
`npm` is pre-required for development.

```sh
# Install dependent modules for development
make prepare

# Run tests
make test

# Run lint checker
make lint

# Update docs
make doc

# Update distribution
make build

# Run all above tasks
make
```
