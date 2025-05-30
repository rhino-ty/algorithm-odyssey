// 내부가 아닌 외부 공기에 2변 이상 노출된 치즈마다 치즈가 녹음, 이에 대해 경과에 대한 결과값을 반환하는 문제
// 구현-시뮬레이션, 하지만 치즈에 사변중 2개 이상 빈공간이 있을 경우 외부 공기인지 판단하기 위한 그래프 탐색 실행
// 외부 공기 식별: 가장자리가 모두 0이니 그 0에 연결된 모든 공기가 외부
// 1. 치즈 개수 추적으로 반복 제어
// 2. 0,0에서 BFS로 외부 공기 찾기
// 3. 각 치즈의 외부 공기 접촉면 세기
// 4. 녹을 치즈 좌표 수집 후 일괄 처리

// 1. 치즈 개수, 시간 변수, 4방향 이동 초기화
// 2. matrix i, j로 2차원 반복하며 치즈 개수 세기
// 3. while (치즈개수 > 0) 반복
//    - (0,0)에서 BFS로 외부 공기 찾기
//      - 큐, visited, 외부공기 배열 초기화
//      - (0,0)에서 시작하여 연결된 모든 빈 공간(0) 탐색
//      - 범위 체크 후 방문하지 않은 빈 공간들을 외부공기 배열에 표시
//    - 없어질 치즈 좌표 배열 초기화
//    - 각 치즈의 외부 공기 접촉면 세기
//      - matrix i, j로 2차원 반복
//      - 치즈(1) 발견 시 사방향 체크하여 외부공기와 접촉한 면의 개수 계산
//      - 접촉면이 2개 이상이면 없어질 치즈 좌표 배열에 추가
//    - 녹을 치즈 좌표들을 일괄 처리
//      - 없어질 치즈 좌표 배열을 순회하며 해당 위치를 0으로 변경
//      - 변경할 때마다 치즈 개수 감소
//    - 시간 변수 증가
// 4. 시간 변수 반환

function getCheeseMeltedTime(N, M, matrix) {
  let time = 0;
  let cheeseCnt = 0;

  // 치즈 세기: 가장자리는 항상 0이므로 제외
  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      if (matrix[i][j] === 1) cheeseCnt++;
    }
  }

  // 4방향 이동을 위한 배열
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (cheeseCnt > 0) {
    // BFS: 외부 공기 찾기
    const queue = [[0, 0]]; // 0,0은 항상 외부 공기
    // const visited = Array.from({ length: N }, () => Array(M).fill(false));
    const outsideAir = Array.from({ length: N }, () => Array(M).fill(false));

    outsideAir[0][0] = true;

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (canVisit(nx, ny, N, M, outsideAir, matrix)) {
          outsideAir[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }

    // 녹을 치즈
    const meltingCheese = [];
    // 각 치즈의 외부 공기 접촉면 세기
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (matrix[i][j] === 1) {
          let contactCnt = 0;

          // 4방향 체크
          for (let k = 0; k < 4; k++) {
            const nx = i + dx[k];
            const ny = j + dy[k];

            // 범위 내이고 외부 공기와 접촉한 경우
            if (nx >= 0 && nx < N && ny >= 0 && ny < M && outsideAir[nx][ny]) {
              contactCnt++;
            }
          }

          // 외부 공기와 2면 이상 접촉하면 녹음
          if (contactCnt >= 2) {
            meltingCheese.push([i, j]);
          }
        }
      }
    }

    // batch: 녹을 치즈 좌표
    for (const [x, y] of meltingCheese) {
      matrix[x][y] = 0;
      cheeseCnt--;
    }

    // 시간 증가
    time++;
  }

  return time;
}

function canVisit(x, y, N, M, outsideAir, matrix) {
  return x >= 0 && x < N && y >= 0 && y < M && !outsideAir[x][y] && matrix[x][y] === 0;
}

const fs = require('fs');
const [[N, M], ...matrix] = fs
  .readFileSync(0)
  .toString()
  .split('\n')
  .map((i) => i.split(' ').map(Number));
console.log(getCheeseMeltedTime(N, M, matrix));
