// CCTV 8개 정도이므로, 최솟값 저장 후 완전탐색으로 접근할 예정
// 각 CCTV 타입별로 가능한 모든 회전 패턴을 2차원 배열 상수로 정의

function getMinBlindSpot(N, M, office) {
  let blindSpotCount = 0;

  // CCTV 위치 찾기: 공간 복잡도++, 따로 빼서 이걸로 순회할 예정
  const cctvs = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (office[i][j] >= 1 && office[i][j] <= 5) {
        cctvs.push({ type: office[i][j], x: i, y: j });
      } else if (office[i][j] === 0) {
        blindSpotCount++; // 초기 사각지대 개수 계산
      }
    }
  }
  let minBlindSpot = blindSpotCount; // 초기값은 현재 사각지대 수

  // DFS: CCTV 방향 조합 완전 탐색
  function dfs(cctvIdx, curOffice) {
    // 기저: 모든 CCTV 방향을 설정됐음!
    if (cctvIdx === cctvs.length) {
      // 사각지대 (0인 칸) 계산
      let blindSpot = 0;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (curOffice[i][j] === 0) blindSpot++;
        }
      }
      minBlindSpot = Math.min(minBlindSpot, blindSpot);
      return;
    }

    const cctv = cctvs[cctvIdx];
    const type = cctv.type;

    // 현재 CCTV의 가능한 모든 방향에 대해 반복
    for (let directionSet of CCTV_DIRECTIONS[type]) {
      // 객체는 가변성을 지녀 현재 사무실 상태 복사, 2차원 배열 깊은 복사 사용
      const newOffice = deepCopy(curOffice);

      for (let dir of directionSet) {
        markWatchArea(newOffice, cctv.x, cctv.y, dir);
      }

      dfs(cctvIdx + 1, newOffice);
    }
  }

  // DFS 호출 시작 - 초기 사무실 상태 복사
  dfs(0, deepCopy(office));

  return minBlindSpot;
}

// 감시 영역 표시 함수
function markWatchArea(office, x, y, direction) {
  let nx = x,
    ny = y;

  while (true) {
    nx += DX[direction];
    ny += DY[direction];

    // 범위를 벗어나거나 벽을 만나면 중단
    if (nx < 0 || nx >= N || ny < 0 || ny >= M || office[nx][ny] === 6) break;

    // CCTV는 통과, 빈 칸은 감시 영역으로 표시 (#으로 표시)
    if (office[nx][ny] === 0) office[nx][ny] = '#';
  }
}

// 상, 우, 하, 좌 방향
const DX = [-1, 0, 1, 0];
const DY = [0, 1, 0, -1];

// CCTV 종류별 감시 방향 패턴
const CCTV_DIRECTIONS = [
  [], // CCTV 입력값과 맞춰주기 위해 0 안씀
  [
    // 1번: 상, 우, 하, 좌
    [0],
    [1],
    [2],
    [3],
  ],
  [
    // 2번: 상하, 좌우
    [0, 2],
    [1, 3],
  ],
  [
    // 3번: 상우, 우하, 하좌, 좌상
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  [
    // 4번: 좌상우, 상우하, 우하좌, 하좌상
    [0, 1, 3],
    [0, 1, 2],
    [1, 2, 3],
    [0, 2, 3],
  ],
  [
    // 5번: 상우하좌 1개
    [0, 1, 2, 3],
  ],
];

// N차원 배열 깊은 복사 유틸 함수
function deepCopy(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.map((item) => deepCopy(item));
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const office = input.slice(1).map((i) => i.split(' ').map(Number));
console.log(getMinBlindSpot(N, M, office));
