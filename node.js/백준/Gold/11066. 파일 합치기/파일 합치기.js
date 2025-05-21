// 챕터 => 임시파일 => 파일 글부터가 DP임
// 비용 더하기 => 연속된 두 파일 크기 합 => 최종적으로 필요한 비용의 최소 총합 계산
// 구간을 구해야하니, 2차원 DP로 가야함. 또한 DP는 i부터 j까지의 최소 비용이 들어가야함
// 점화식: DP[i][j] = min(DP[i][k] + DP[k+1][j] + sum(i~j))
//   - i부터 k까지 합치는 비용 (DP[i][k])
//   - k+1부터 j까지 합치는 비용 (DP[k+1][j])
//   - 위 두 결과를 합치는 비용 (i부터 j까지 모든 파일 크기의 합)
//   - 상향식으로 아래에서부터 위까지 모아서 해주면 됨. 즉, DP[i][i], DP[j][j]는 입력 돼 있어야함

// DP[i][j]: i번째 파일부터 j번째 파일까지 합치는 최소 비용
// 추가 - sum[i][j]: i번째 파일부터 j번째 파일까지의 크기 합

// 1. 모든 i에 대해 DP[i][i] = 0으로 초기화
// 2. 구간 합 배열 sum 계산
// 3. 구간 길이 len = 2부터 n 반복
//    - 시작점 i = 1부터 n-len+1 반복
//       - 끝점 j = i + len - 1 계산
//       - DP[i][j] = 무한대로 초기화
//       - 분할점 k = i부터 j-1 반복
//          - cost = DP[i][k] + DP[k+1][j] + sum[i][j] 계산
//          - DP[i][j] = min(DP[i][j], cost)
// 4. DP[1][n] 반환: 전체 구간의 최소 비용

function getMinSize(T, novelInfoArr) {
  const results = [];

  for (let t = 0; t < T; t++) {
    const K = novelInfoArr[t * 2][0];
    const files = novelInfoArr[t * 2 + 1];

    // 0-indexed
    const dp = Array.from({ length: K }, (_, i) => Array.from({ length: K }, (_, j) => (i === j ? 0 : Infinity)));
    const sum = calcRangeSum(K, files);

    for (let len = 2; len <= K; len++) {
      for (let i = 0; i <= K - len; i++) {
        const j = i + len - 1;
        // 점화식: 모든 가능한 분할점에 대해 최소 비용 계산
        for (let k = i; k < j; k++) {
          const cost = dp[i][k] + dp[k + 1][j] + sum[i][j];
          dp[i][j] = Math.min(dp[i][j], cost);
        }
      }
    }

    // 결과 저장
    results.push(dp[0][K - 1]);
  }

  return results.join('\n');
}

function calcRangeSum(K, files) {
  const sum = Array.from({ length: K }, () => Array(K).fill(0));

  // 대각선(자기 자신) 초기화
  for (let i = 0; i < K; i++) {
    sum[i][i] = files[i];
  }

  // 구간 합 계산
  for (let len = 2; len <= K; len++) {
    for (let i = 0; i <= K - len; i++) {
      const j = i + len - 1;
      sum[i][j] = sum[i][j - 1] + files[j];
      // 또는 sum[i][j] = sum[i][i] + sum[i+1][j];
    }
  }

  return sum;
}

const fs = require('fs');
const [T, ...novelInfoArr] = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.split(' ').map(Number));
console.log(getMinSize(T, novelInfoArr));
