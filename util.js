const fs = require('fs');
const path = require('path');

const getData = (day, file = 'input.txt') => {
  return fs.readFileSync(path.join(__dirname, `day ${day}/${file}`), 'utf8');
}

module.exports = {
  getData,
};
