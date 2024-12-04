const { getData } = require('../util');

const input = getData('04');

const findXMas = (string) => {
  const list = [...string.matchAll(/XMAS/g)];
  return list.length;
}
const reverseString = (string) => string.split('').reverse().join('');
const calcRows = () => findXMas(input) + findXMas(reverseString(input));

const calcColumns = () => {
  const columns = input.split('\r\n');
  let newRow = [];
  let result = '';
  for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < columns[i].length; j++) {
      newRow.push(columns[j][i]);
    }
    result += newRow.join('') + ' ';
    newRow = [];
  }

  return findXMas(result) + findXMas(reverseString(result));
}
const calcDiag = (columns) => {
  let newRow = [];
  let result = '';
  const colsLen = columns.length;
  const rowsLen = columns[0].length;
  for (let i = 0; i < colsLen + rowsLen; i++) {
    let startCol = Math.max(0, i - rowsLen);
    let count = Math.min(i, colsLen - startCol, rowsLen);
    for (let j = 0; j < count; j++) {
      newRow.push(columns[Math.min(rowsLen, i) - j - 1][startCol + j]);
    }
    result += newRow.join('') + ' ';
    newRow = [];
  }
  return findXMas(result) + findXMas(reverseString(result));
}
const mirror = (data) => data.map(d => d.reverse());
const calcAllDiag = () => {
  const columns = input.split('\r\n').map(col => col.split(''));
  const result1 = calcDiag(columns);
  const result2 = calcDiag(mirror(columns));
  return result1 + result2;
}

const isMas = (val) => val === 'MAS' || val === 'SAM';
const calcMas = () => {
  const matrix = input.split('\r\n').map(col => col.split(''));
  let total = 0;
  for ( let i = 1; i < matrix.length -1; i++) {
    for (let j = 1; j < matrix[i].length -1; j++) {
      if (matrix[i][j] === 'A') {
        const dp = matrix[i-1][j-1] + matrix[i][j] + matrix[i+1][j+1];
        const ds = matrix[i-1][j+1] + matrix[i][j] + matrix[i+1][j-1];
        if (isMas(dp) && isMas(ds)) total++;
      }
    }
  }
  return total;
}

console.log('Part 1', calcRows() + calcColumns() + calcAllDiag());
console.log('Part 2', calcMas());