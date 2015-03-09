(function (global) {
  var tasklist = {};

  tasklist.codeBlockPattern = /^(`{3}(?:.+)?\n)([\S\s]*?)(\n`{3})$/gm;

  tasklist.linePattern = /^(?:\s*(?:>\s*)*(?:[-+*]|(?:\d+\.)))\s*(\[ \]|\[x\])\s+(?!\(.*?\))(?=(?:\[.*?\]\s*(?:\[.*?\]|\(.*?\))\s*)*(?:[^\[]|$))/;

  // ## tasklist.convert(String, Integer, Boolean)
  // Takes Markdown text, checkbox index that starts from 1, and checked flag,
  // then returns converted Markdown text.
  //
  // ```js
  // tasklist.convert(
  //   '- [ ] foo\n' +
  //   '- [ ] bar\n' +
  //   '- [ ] baz',
  //   2,
  //   true
  // )
  // // results in:
  // // - [ ] foo
  // // - [x] bar
  // // - [ ] baz
  //
  tasklist.convert = function (markdownText, checkboxIndex, isChecked) {
    var lines = markdownText.split('\n');
    var taskIndex = 0;
    var sanitizedLines = markdownText.replace(
      tasklist.codeBlockPattern,
      function (str, pattern1, pattern2, pattern3) {
        return pattern1 + pattern2.replace(/^/gm, 'SANITIZED') + pattern3;
      }
    ).split('\n');
    var resultLines = [];
    var line;
    for (var i = 0, length = lines.length; i < length; i++) {
      line = lines[i];
      if (line === sanitizedLines[i] && line.match(tasklist.linePattern)) {
        taskIndex++;
        if (taskIndex === checkboxIndex) {
          if (isChecked) {
            resultLines.push(line.replace(/\[ \]/, '[x]'));
          } else {
            resultLines.push(line.replace(/\[x\]/, '[ ]'));
          }
        } else {
          resultLines.push(line);
        }
      } else {
        resultLines.push(line);
      }
    }
    return resultLines.join('\n');
  };

  if (typeof module == 'undefined') {
    global.tasklist = tasklist;
  } else {
    module.exports = tasklist;
  }
})(this);
