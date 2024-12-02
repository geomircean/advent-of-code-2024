const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const divider = ' ';

const formatData = () => input.split(/\r?\n/).filter(item => item !== '').map(line => line.split(divider));

const isReportSafe = (report) => {
  let isSafe = true;
  let initial = 0;

  report.reduce((lastValue, currentValue, index) => {
    if (lastValue === null) return currentValue;

    const difference = currentValue - lastValue;
    if (index === 1) initial = difference;

    if (difference === 0 || Math.abs(difference) > 3 || Math.sign(difference) !== Math.sign(initial)) {
      isSafe = false;
    }

    return currentValue;
  }, null);

  return isSafe;
}

const countSafeReports = () => {
  const data = formatData();
  return data.filter((item) => isReportSafe(item)).length;
};

const isReportSafe2 = (report) => {
  let isSafe = isReportSafe(report);

  if (!isSafe) {
    for (let i = 0; i < report.length; i++) {
      const copy = [...report];
      copy.splice(i, 1);
      if (isReportSafe(copy)) isSafe = true;
    }
  }

  return isSafe;
}

const countSafeReports2 = () => {
  const data = formatData();

  return data.filter((item) => isReportSafe2(item)).length;
};

console.log('Part 1', countSafeReports());
console.log('Part 2', countSafeReports2());
