function solution(x) {
  // 1. 합 구하기
  let sum = x
    .toString()
    .split("")
    .reduce((acc, cur) => acc + Number(cur), 0);
  // 2. 나누기
  return !(x % sum);
}
