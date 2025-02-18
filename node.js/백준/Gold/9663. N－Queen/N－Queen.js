// 1. 퀸은 행, 열, 대각선 이동할 수 있으니 검사 => 완전 탐색? ++ 백트래킹?
// 2. 체스를 모방한 2차원 배열 구현 ++ 1차원 배열로도 가능하다고 함.
// 3. 첫 번째 행부터 순회 시작
// 4. 각 열에 퀸을 놓아보며 DFS 진행 => 퀸의 공격 범위 고려한 백트래킹 사용해야함,,
//   - 상하, 좌우, 대각선(좌상->우하, 좌하->우상) 조건 체크
//   - 만일, 공격이 가능하지 않다면 그 자리에 true, DFS +1을 실행
// 5. 마지막 행까지 도달하면 해답 카운트

function putQueens(N) {
  let count = 0;
  const board = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  // 퀸의 공격 가능 경로 체크
  function isAttack(row, col) {
    // 상하 체크
    for (let i = 0; i < N; i++) {
      if (board[i][col]) return true;
    }

    // 좌우 체크
    for (let j = 0; j < N; j++) {
      if (board[row][j]) return true;
    }

    // 대각선 체크 (좌상 -> 우하)
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return true;
    }
    for (let i = row, j = col; i < N && j < N; i++, j++) {
      if (board[i][j]) return true;
    }

    // 대각선 체크 (좌하 -> 우상)
    for (let i = row, j = col; i >= 0 && j < N; i--, j++) {
      if (board[i][j]) return true;
    }
    for (let i = row, j = col; i < N && j >= 0; i++, j--) {
      if (board[i][j]) return true;
    }

    return false;
  }

  function dfs(row) {
    if (row === N) {
      count++;
      return;
    }

    for (let col = 0; col < N; col++) {
      if (!isAttack(row, col)) {
        board[row][col] = true;
        dfs(row + 1);
        board[row][col] = false;
      }
    }
  }

  dfs(0);
  return count;
}

const fs = require('fs');
const N = parseInt(fs.readFileSync('/dev/stdin').toString());
console.log(putQueens(N));
