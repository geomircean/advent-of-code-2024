const fs = require('fs');
const path = require('path');
const divider = '   ';
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const getArrays = (text) => {
  const arrayA = [], arrayB = [];
  if (!text) {
    return new Error('No arguments passed to method');
  }

  text.split('\n').forEach(line => {
    const [a, b] = line.split(divider);
    if(a) {
      arrayA.push(parseInt(a));
    }
    if(b) {
      arrayB.push(parseInt(b));
    }
  });

  arrayA.sort((a, b) => a - b);
  arrayB.sort((a, b) => a - b);

  return { arrayA, arrayB }
}

const getDifference = () => {
  const { arrayA, arrayB } = getArrays(input);
  let total = 0;
  arrayA.forEach((el, index) => {
    total += Math.abs(el - arrayB[index]);
  });

  return total;
}

console.log('Part 1', getDifference());

const similarity = () => {
  const { arrayA, arrayB } = getArrays(input);
  let total = 0;
  arrayA.forEach((el, index) => {
    const itemsInB = arrayB.filter(item => item === el);
    const occurrences = itemsInB.length;
    total += occurrences * el;
  });
  return total;
}

console.log('Part 2', similarity());
