function convertBaseB(N, B) {
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = [];

  if (N === 0) {
    return '0';
  }

  while (N > 0) {
    result.push(digits[N % B]);
    N = Math.floor(N / B);
  }

  return result.reverse().join('');
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString();
const [N, B] = input.split(' ').map(Number);

console.log(convertBaseB(N, B));
