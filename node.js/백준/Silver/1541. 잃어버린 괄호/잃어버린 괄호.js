// 1. 문자열 가공 후 숫자, 연산자 추출 및 순서대로 정의
// 2. 최솟값을 찾아야하니 최대한 `-`가 커야함 => `-` split 후 그 사이 숫자들은 모두 +, 더해줌
// 3. 첫 항을 제외한 모든 숫자를 빼주면 최솟값 달성

function getMinWithParentheses(input) {
  const numArr = input.split('-').map((numWithPlus) => {
    return numWithPlus.split('+').reduce((acc, num) => acc + Number(num), 0);
  });

  return numArr[0] + numArr.slice(1).reduce((acc, cur) => acc - cur, 0);
}

const fs = require('fs');
const input = fs.readFileSync(0).toString();

console.log(getMinWithParentheses(input));
