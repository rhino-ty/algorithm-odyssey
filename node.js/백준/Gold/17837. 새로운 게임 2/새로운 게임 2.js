// 구현-시뮬레이션 문제: 체스판 위 말들이 특정 규칙에 따라 이동하며, 4개 이상 쌓이는 순간을 카운팅

// 1. 체스판 정보와 말들의 위치/방향 정보를 저장
//    - board: 각 칸의 색깔 정보 (0:흰색, 1:빨간색, 2:파란색)
//    - pieces: 각 칸에 쌓인 말들의 번호를 저장하는 2차원 배열
//    - horseInfo: 각 말의 현재 위치와 방향 정보
// 2. 방향 배열 설정: 좌우상하
//    - dx, dy 배열로 방향벡터 구현
//    - 반대 방향으로 바꾸는 함수도 구현
// 3. 1부터 1000턴까지 시뮬레이션
//    - 각 턴마다 1번 말부터 K번 말까지 순서대로 이동
// 4. 말 이동 로직 구현
//    - 현재 말의 위치에서 해당 말이 몇 번째로 쌓여있는지 찾기
//    - 해당 말부터 위에 있는 모든 말들을 함께 이동시키기
//    - 이동할 칸의 색깔에 따라 처리
//      * 흰색(0): 그대로 이동하여 쌓기
//      * 빨간색(1): 이동 후 순서 뒤집어서 쌓기
//      * 파란색(2) 또는 범위밖: 방향 반대로 바꾸고 한 칸 이동
//        (만약 바뀐 방향도 파란색이면 이동하지 않음)
// 5. 매번 이동 후 4개 이상 쌓인 칸이 있는지 체크
//    - 있으면 현재 턴 번호 반환
//    - 1000턴 넘어가면 -1 반환

function solveHorseGame(N, K, input) {
  // 체스판 색깔 정보 (처음 N줄)
  const chessBoard = [];
  for (let i = 0; i < N; i++) {
    chessBoard.push(input[i].split(' ').map(Number));
  }

  // 각 칸의 말들: 말 번호로 저장, 3차원 배열
  const stackedHorses = Array(N)
    .fill()
    .map(() =>
      Array(N)
        .fill()
        .map(() => []),
    );

  // 각 말의 현 위치/방향
  const horsePos = {};
  const horseDir = {};

  // 말 정보 입력받기: K줄
  for (let i = 0; i < K; i++) {
    const [row, col, dir] = input[N + i].split(' ').map(Number);
    const horseNum = i + 1;
    horsePos[horseNum] = [row - 1, col - 1]; // 0-indexed
    horseDir[horseNum] = dir;
    stackedHorses[row - 1][col - 1].push(horseNum);
  }

  // 방향 벡터
  const moveX = [0, 0, 0, -1, 1];
  const moveY = [0, 1, -1, 0, 0];

  // 반대 방향
  const oppositeDir = [0, 2, 1, 4, 3];

  // 말 이동
  function moveHorse(horseNum) {
    const [curRow, curCol] = horsePos[horseNum];
    const curDir = horseDir[horseNum];

    const nextRow = curRow + moveX[curDir];
    const nextCol = curCol + moveY[curDir];

    // 범위를 벗어나거나 파란색인 경우
    if (nextRow < 0 || nextRow >= N || nextCol < 0 || nextCol >= N || chessBoard[nextRow][nextCol] === 2) {
      // 방향 바꾸기
      horseDir[horseNum] = oppositeDir[curDir];
      const newNextRow = curRow + moveX[horseDir[horseNum]];
      const newNextCol = curCol + moveY[horseDir[horseNum]];

      // 이동X: 바뀐 방향도 파란색이거나 범위밖
      if (
        newNextRow < 0 ||
        newNextRow >= N ||
        newNextCol < 0 ||
        newNextCol >= N ||
        chessBoard[newNextRow][newNextCol] === 2
      ) {
        return;
      }

      // 바뀐 방향으로 이동
      return moveHorseToPos(horseNum, curRow, curCol, newNextRow, newNextCol);
    }

    // 정상적인 이동
    return moveHorseToPos(horseNum, curRow, curCol, nextRow, nextCol);
  }

  function moveHorseToPos(horseNum, fromRow, fromCol, toRow, toCol) {
    // 현재 말 - 스택 찾기
    const stackIndex = stackedHorses[fromRow][fromCol].indexOf(horseNum);

    // 이동할 말들: 현재 말부터 위에 있는 모든 말
    const movingHorses = stackedHorses[fromRow][fromCol].slice(stackIndex);

    // 원래 위치에서 제거
    stackedHorses[fromRow][fromCol] = stackedHorses[fromRow][fromCol].slice(0, stackIndex);

    // 빨간색인 경우 순서 뒤집기
    if (chessBoard[toRow][toCol] === 1) {
      movingHorses.reverse();
    }

    // 새 위치로 이동
    stackedHorses[toRow][toCol].push(...movingHorses);

    // 각 말의 위치 정보 업데이트
    for (const horse of movingHorses) {
      horsePos[horse] = [toRow, toCol];
    }
  }

  // 게임 시뮬레이션 실행!!
  for (let turn = 1; turn <= 1000; turn++) {
    // 1번 말부터 K번 말까지 순서대로 이동
    for (let horseNum = 1; horseNum <= K; horseNum++) {
      moveHorse(horseNum);

      // 4개 이상 쌓였는지 확인
      if (checkGameEnd(stackedHorses)) {
        return turn;
      }
    }
  }

  return -1;
}

// 4개 이상 쌓였는지 확인
function checkGameEnd(stackedHorses) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (stackedHorses[i][j].length >= 4) {
        return true;
      }
    }
  }
  return false;
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
console.log(solveHorseGame(N, K, input.slice(1)));
