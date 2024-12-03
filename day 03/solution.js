const { getData } = require('../util');

const mulRegex = /mul[(]([\d]{1,3},[\d]{1,3})[)]/g;
const doString = 'do()';
const dontString = "don't()";

const mul = (string) => {
  const [a,b] = string.split(',');
  return parseInt(a) * parseInt(b);
}

const getOperations = (data) => {
  return [...data.matchAll(mulRegex)];
};

const getResult1 = () => {
  const input = getData('03');
  const result = getOperations(input, mulRegex);
  let sum = 0;
  for (const match of result) {
    sum += mul(match[1]);
  }
  return sum;
}

const getResult2 = () => {
  const input = getData('03');
  const result = getOperations(input, mulRegex);
  let sum = 0;

  for (const match of result) {
    const { index } = match;
    const lastIndexDo = input.lastIndexOf(doString, index);
    const lastIndexDont = input.lastIndexOf(dontString, index);
    if (lastIndexDont > lastIndexDo) continue;
    sum += mul(match[1]);
  }
  return sum;
}

console.log('Part 1', getResult1());
console.log('Part 2', getResult2());
