function convertBaseB(N, B) {
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  while (N > 0) {
    result = digits[N % B] + result;
    N = Math.floor(N / B);
  }

  return result || '0';
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString();
const [N, B] = input.split(' ').map(Number);

console.log(convertBaseB(N, B));
