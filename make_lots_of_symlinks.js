/// <reference types="node" />
const fs = require('fs');
const path = require('path');

/**
 * @param {number} n
 */
function* range(n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

const base = 'symlink_loop_2';

fs.mkdirSync(base, { recursive: true });

const CHAR_A = 'a'.charCodeAt(0);

const numToAlpha = (n, m = n % 26) => (Number.isNaN(n) || n < 0) ? '' : numToAlpha(((n - m) / 26) - 1) + String.fromCharCode(CHAR_A + m)

const count = Number(process.argv[2]) || 16;

for (const i of range(count)) {
  const directory = `${base}/${numToAlpha(i)}`;
  fs.mkdirSync(directory, { recursive: true });
  for (const j of range(i)) {
    const target = numToAlpha(j)
    fs.symlinkSync(path.relative(directory, `${base}/${target}`), `${directory}/${target}`);
  }
}
