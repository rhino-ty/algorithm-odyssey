function printTestCan(T, setArr) {
  const results = [];

  // 각 테스트케이스마다 판별 함수 호출
  for (let i = 0; i < parseInt(T); i++) {
    const [word1, word2, target] = setArr[i].split(' ');

    // 예외: 기본 길이 체크
    if (word1.length + word2.length !== target.length) {
      results.push(`Data set ${i + 1}: no`);
      continue;
    }

    // 재귀 함수로 판별
    const canMake = canInterleave(word1, word2, target);
    results.push(`Data set ${i + 1}: ${canMake ? 'yes' : 'no'}`);
  }

  return results.join('\n');
}

// DP 방식으로 구현된 canInterleave 함수
function canInterleave(word1, word2, target) {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] = word1의 처음 i개 문자와 word2의 처음 j개 문자로
  //            target의 처음 (i+j)개 문자를 만들 수 있는가?
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(false));

  // 초기값: 빈 문자열들로 빈 문자열 만들기 가능
  dp[0][0] = true;

  // 첫 번째 행: word1만 사용하는 경우
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && word1[i - 1] === target[i - 1];
  }

  // 첫 번째 열: word2만 사용하는 경우
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && word2[j - 1] === target[j - 1];
  }

  // 나머지 테이블 채우기
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const targetIndex = i + j - 1;

      // word1에서 문자를 가져온 경우
      if (word1[i - 1] === target[targetIndex]) {
        dp[i][j] = dp[i][j] || dp[i - 1][j];
      }

      // word2에서 문자를 가져온 경우
      if (word2[j - 1] === target[targetIndex]) {
        dp[i][j] = dp[i][j] || dp[i][j - 1];
      }
    }
  }

  return dp[m][n];
}

// 재귀,, 시간초과,,

// 첫 번째, 두 번째를 각각 순회(재귀)하면서, 현재 확인할 위치를 확인한 다음 타겟 str 검증
// 1. 입력 처리 부분
// 2. 각 테스트케이스마다 판별 함수 호출
// 3. 판별 함수 구현
//   - 재귀 함수로 구현
//   - 기저 조건: 모든 문자를 다 확인했을 때
//   - 현재 세 번째 단어의 문자가 첫 번째 단어와 같다면?
//   - 현재 세 번째 단어의 문자가 두 번째 단어와 같다면?
// 4. 결과 출력

// function canInterleave(word1, word2, target, idx1, idx2, targetIdx) {
//   // 기저 조건: 모든 문자를 다 확인했을 때, 세 번째 단어의 끝까지 도달했다면 성공
//   if (targetIdx === target.length) {
//     return true;
//   }

//   // 현재 목표 문자
//   const curTargetChar = target[targetIdx];

//   // 경우 1: 현재 세 번째 단어의 문자가 첫 번째 단어와 같다면?
//   if (idx1 < word1.length && word1[idx1] === curTargetChar) {
//     // 첫 번째 단어에서 문자를 선택하고 다음 단계로 재귀 호출
//     if (canInterleave(word1, word2, target, idx1 + 1, idx2, targetIdx + 1)) {
//       return true;
//     }
//   }

//   // 경우 2: 현재 세 번째 단어의 문자가 두 번째 단어와 같다면?
//   if (idx2 < word2.length && word2[idx2] === curTargetChar) {
//     // 두 번째 단어에서 문자를 선택하고 다음 단계로 재귀 호출
//     if (canInterleave(word1, word2, target, idx1, idx2 + 1, targetIdx + 1)) {
//       return true;
//     }
//   }

//   // 두 경우 모두 실패했다면 false 반환: 현재 위치에서는 목표 문자를 만들 수 없음
//   return false;
// }

const fs = require('fs');
const [T, ...setArr] = fs.readFileSync(0).toString().trim().split('\n');
console.log(printTestCan(T, setArr));
