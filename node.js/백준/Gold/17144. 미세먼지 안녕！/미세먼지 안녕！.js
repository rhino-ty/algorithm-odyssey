// 2차원 배열에서 미먼 확산 => 공청 작동이 일어나는 단순 시뮬레이션 문제
// 단순히 미세먼지 확산이 "동시에" 일어나고, 바람에 이동하게끔 하면 되는데, 미먼 확산에서는 2차원 배열 순회는 하지 못할 듯
// 원본 배열은 그대로 두고, 새로운 배열에 확산된 결과를 기록하는 방법을 사용해보는 건 어떨까
// 미먼 확산 + 공청 작동 함수로 나타내서 합치면 시간 복잡도도 그렇게 크지 않을 듯

function getRemainingFineDust(R, C, T, roomGrid) {
  // 공기청정기 위치 찾기
  const airCleaner = [];
  for (let i = 0; i < R; i++) {
    if (roomGrid[i][0] === -1) {
      airCleaner.push(i);
    }
  }

  // T번 반복: 미세먼지 확산 + 공기청정기 작동
  for (let t = 0; t < T; t++) {
    diffuseDust(R, C, roomGrid, airCleaner);
    operateAirCleaner(R, C, roomGrid, airCleaner);
  }

  // 남은 미세먼지 총량 계산
  let totalDust = 0;
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (roomGrid[i][j] > 0) {
        totalDust += roomGrid[i][j];
      }
    }
  }

  return totalDust;
}

function diffuseDust(R, C, roomGrid, airCleaner) {
  const diffused = Array.from({ length: R }, () => Array(C).fill(0));

  for (const pos of airCleaner) {
    diffused[pos][0] = -1;
  }

  // 상하좌우 방향
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // 미세먼지 확산 계산
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (roomGrid[i][j] > 0) {
        const dust = Math.floor(roomGrid[i][j] / 5);
        let spreadCount = 0;

        // 네 방향 확산
        for (let dir = 0; dir < 4; dir++) {
          const nx = i + dx[dir];
          const ny = j + dy[dir];

          if (nx >= 0 && nx < R && ny >= 0 && ny < C && roomGrid[nx][ny] !== -1) {
            diffused[nx][ny] += dust;
            spreadCount++;
          }
        }

        // 현재 칸에 남은 미세먼지
        diffused[i][j] += roomGrid[i][j] - dust * spreadCount;
      }
    }
  }

  // 원본 배열에 확산 결과 복사
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      roomGrid[i][j] = diffused[i][j];
    }
  }
}

function operateAirCleaner(R, C, roomGrid, airCleaner) {
  const [top, bottom] = airCleaner;

  // 위쪽 공기청정기: 반시계 방향
  // 아래로 당기기
  for (let i = top - 1; i > 0; i--) {
    roomGrid[i][0] = roomGrid[i - 1][0];
  }
  // 왼쪽으로 당기기
  for (let j = 0; j < C - 1; j++) {
    roomGrid[0][j] = roomGrid[0][j + 1];
  }
  // 위로 당기기
  for (let i = 0; i < top; i++) {
    roomGrid[i][C - 1] = roomGrid[i + 1][C - 1];
  }
  // 오른쪽으로 당기기
  for (let j = C - 1; j > 1; j--) {
    roomGrid[top][j] = roomGrid[top][j - 1];
  }
  roomGrid[top][1] = 0; // 공기청정기에서 나오는 바람은 미세먼지 없음

  // 아래쪽 공기청정기: 시계 방향
  // 위로 당기기
  for (let i = bottom + 1; i < R - 1; i++) {
    roomGrid[i][0] = roomGrid[i + 1][0];
  }
  // 왼쪽으로 당기기
  for (let j = 0; j < C - 1; j++) {
    roomGrid[R - 1][j] = roomGrid[R - 1][j + 1];
  }
  // 아래로 당기기
  for (let i = R - 1; i > bottom; i--) {
    roomGrid[i][C - 1] = roomGrid[i - 1][C - 1];
  }
  // 오른쪽으로 당기기
  for (let j = C - 1; j > 1; j--) {
    roomGrid[bottom][j] = roomGrid[bottom][j - 1];
  }
  roomGrid[bottom][1] = 0;
}

const fs = require('fs');
const [RCT, ...roomGrid] = fs
  .readFileSync(0)
  .toString()
  .split('\n')
  .map((i) => i.split(' ').map(Number));
const [R, C, T] = RCT;
console.log(getRemainingFineDust(R, C, T, roomGrid));
