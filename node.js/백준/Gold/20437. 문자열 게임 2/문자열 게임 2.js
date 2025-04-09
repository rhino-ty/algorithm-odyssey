// 연속된 부분 문자열, 슬라이딩 윈도우? 아님 그냥 문자열 순회하며 3, 4번을 충족시키게끔 ?
// 인덱싱도 괜찮을 듯 각 문자의 인덱스를 구해서 나열 후 충족하는 부분들만 가져오면 될 듯?

// 0. T개의 테스트 케이스를 반복 처리 시작, 각 테스트케이스 결과 배열도 초기화
// 1. 각 테스트 시작
//   a. 문자열 W, 정수 K, 최소 길이, 최대 길이 변수 초기화
//   b. 각 문자열에 대해 인덱싱화를 위한 26개 알파벳 배열 초기화
//   c. 문자열 W 순회: b의 26개 배열에 해당 문자열 삽입
//   d. 알파벳 배열 순회: K개 미만이면 건너뛰고, K개 이상이면 3 4번 조건 실행 및 변수 업데이트
//   e. 최소, 최대 길이 변수가 각각 Infinity, -1 이라면 -1 출력, 아니면 join(' ')으로 출력

function playStrGame(T, testCase) {
  const results = [];
  const maxTestIdx = T * 2;

  for (let i = 0; i < maxTestIdx; i += 2) {
    const W = testCase[i];
    const K = parseInt(testCase[i + 1]);

    // 특별한 경우: K가 1이면 항상 최소 길이 1, 최대 길이 1
    if (K === 1) {
      results.push('1 1');
      continue;
    }

    // char: 단일 문자 <=> str: 복수 문자, 문자열
    // 각 문자의 등장 위치 인덱싱
    const charIndices = Array.from({ length: 26 }, () => []);
    for (let j = 0; j < W.length; j++) {
      const charCode = W.charCodeAt(j) - 97; // 'a'는 유니코드로 97
      charIndices[charCode].push(j);
    }

    let minLen = Infinity;
    let maxLen = -1;

    // 각 문자에 대해 조건 확인
    for (let j = 0; j < 26; j++) {
      const indices = charIndices[j];

      // K개 미만
      if (indices.length < K) continue;

      // 3번 조건: 어느 문자에 대해, 정확히 K개를 포함하는 가장 짧은 연속 부분 문자열
      for (let l = 0; l <= indices.length - K; l++) {
        const curLen = indices[l + K - 1] - indices[l] + 1;
        minLen = Math.min(minLen, curLen);
      }

      // 4번 조건: 어느 문자에 대해, 정확히 K개를 포함하고 첫/끝 글자가 같은 가장 긴 연속 부분 문자열
      for (let l = 0; l <= indices.length - K; l++) {
        // 첫 번째와 마지막 인덱스가 같은 문자여야 함
        const startIdx = indices[l];
        const endIdx = indices[l + K - 1];

        // 첫/끝이 모두 현재 문자이므로 조건 만족
        const curLen = endIdx - startIdx + 1;
        maxLen = Math.max(maxLen, curLen);
      }
    }

    if (minLen === Infinity || maxLen === -1) {
      results.push('-1');
    } else {
      results.push(`${minLen} ${maxLen}`);
    }
  }

  return results.join('\n');
}

const fs = require('fs');
const [T, ...testCase] = fs.readFileSync(0).toString().trim().split('\n');

console.log(playStrGame(parseInt(T), testCase));
