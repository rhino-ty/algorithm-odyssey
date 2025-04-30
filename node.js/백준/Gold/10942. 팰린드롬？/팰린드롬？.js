// 팰린드롬 알고리즘, 회문인지 알9아야함
// 1. S, E를 뺀 값은 짝수여야 함 => 짝수여도 팰린드롬이 가능함... 수정
// 2. 투포인터로 시작과 마지막부터 시작해 (S - E) / 2 미만까지 비교, 안맞는다면 바로 break
// 3. 그러면 각각 O(N)인데, M이 백만이라 시간 초과 날 거 같음
// 4. 각각의 결과를 담은 DP를 선언해 최적화 진행
//  - 칠판 숫자들을 미리 계산해 DP에 넣음 => 2,000 * 2,000인데 가능함
//    - i부터 j까지의 부분 수열, DP[i][j]까지의 팰린드롬 여부를 담음
//  - 순회를 하며 DP[i][j]에 0인지, 1인지 탐색, 중앙값부터 시작할예정
//    - 1, 2는 따로 하고, 3부터 모든 시작점 i에 대해 끝점 j = i+len-1 계산
//    - DP[i][j] = (arr[i]==arr[j] && DP[i+1][j-1])

function isNumbersPalindrome(N, boardNumbers, M, questions) {
  const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

  for (let i = 0; i < N; i++) {
    // 길이 1인 부분 수열은 항상 팰린드롬
    dp[i][i] = 1;

    // 길이 2인 부분 수열
    if (boardNumbers[i] === boardNumbers[i + 1] && i < N - 1) {
      dp[i][i + 1] = 1;
    }
  }

  // 길이 3 이상인 부분 수열, 3부터 N까지 쌓이고, 1과2가 이미 적용됐으니 직전 -1만 계산해주면 됨
  for (let len = 3; len <= N; len++) {
    for (let i = 0; i <= N - len; i++) {
      const j = i + len - 1; // 0-indexed
      if (boardNumbers[i] === boardNumbers[j] && dp[i + 1][j - 1] === 1) {
        dp[i][j] = 1;
      }
    }
  }

  // 질문에 답변
  let answer = '';
  for (let q = 0; q < M; q++) {
    const [S, E] = questions[q];
    // 입력은 1-base, 배열은 0-base이므로 인덱스 조정
    answer += dp[S - 1][E - 1] + '\n';
  }

  return answer.trim();
}

const fs = require('fs');
const [N, boardNumbers, M, ...questions] = fs
  .readFileSync(0)
  .toString()
  .split('\n')
  .map((i) => i.split(' ').map(Number));

console.log(isNumbersPalindrome(N, boardNumbers, M, questions));
