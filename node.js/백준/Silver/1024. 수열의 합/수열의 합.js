function findSequence(N, L) {
  // 길이 L부터 100까지 시도
  for (let len = L; len <= 100; len++) {
    // 등차수열의 합 공식을 이용하여 시작값 a 계산
    // N = len * a + (len-1)*len/2
    // a = (N - (len-1)*len/2) / len
    const numerator = N - ((len - 1) * len) / 2;

    // a가 정수이고 음이 아닌지 확인
    if (numerator % len === 0 && numerator / len >= 0) {
      const a = numerator / len;

      // 수열 생성
      const sequence = [];
      for (let i = 0; i < len; i++) {
        sequence.push(a + i);
      }

      return sequence.join(' ');
    }
  }

  // 조건을 만족하는 수열이 없는 경우
  return -1;
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf-8').trim();
const [N, L] = input.split(' ').map(Number);

console.log(findSequence(N, L));
