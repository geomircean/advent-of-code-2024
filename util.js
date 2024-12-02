const fs = require('fs');
const path = require('path');

export const getData = (filename) => {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
}
