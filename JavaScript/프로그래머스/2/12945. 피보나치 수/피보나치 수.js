// function solution(n) {
//     let rhino = [0, 1]
//     for (i = 2; i <= n; i++) {
//         rhino.push((rhino[i-2] + rhino[i-1]) % 1234567)
//     }
//     // 왜 리턴에서 % 1234567은 안됨?
//     return rhino[n];
// }
function solution(n) {
  if (!(n >= 2 && n <= 100000)) return 'n은 2 이상 100,000 이하인 자연수입니다.'

  let first = 0;
  let second = 1;

  for (let i = 2; i <= n; i++) {
    let temp = (first + second) % 1234567;
    first = second;
    second = temp;
  }

  return second;
}