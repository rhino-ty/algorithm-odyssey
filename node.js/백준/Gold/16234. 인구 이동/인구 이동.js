// 인접 지역, 요소 검사 => BFS로 접근

// 1. 날짜 카운터 변수 초기화
// 2. 인구 이동이 없을 때까지 반복
//    1. 인구 이동 감지 변수, 방문 배열 초기화
//    2. 모든 칸에 대해
//       1. 이미 방문했다면 건너뛰기
//       2. BFS로 연합 찾기 => 각 연합별로 인구 이동 처리
//       3. 연합의 평균 인구 계산하고 적용
//    3. 인구 이동이 있었다면 날짜 카운터 증가, 아니면 루프 종료
// 4. 날짜 카운터 반환

function getMigrationDays(N, L, R, countries) {
  let days = 0;

  // break로 더 이상 인구 이동이 없을 때까지 반복
  while (true) {
    // 인구 이동 감지 변수
    let isMoved = false;
    // 방문 배열, countries와 같은 모양의 배열
    const visited = Array.from({ length: N }, () => Array(N).fill(false));

    // 모든 국가 순회
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // 미방문 국가부터 BFS 시작
        if (!visited[i][j]) {
          const union = bfs(i, j, N, L, R, countries, visited);

          // 연합 크기가 2 이상 => 인구 이동 발생
          if (union.length > 1) {
            isMoved = true;

            // 연합의 총 인구와 평균 계산
            const totalPopulation = union.reduce((sum, [x, y]) => sum + countries[x][y], 0);
            const newPopulation = Math.floor(totalPopulation / union.length);

            // 연합 내 모든 국가에 새 인구 적용
            for (const [x, y] of union) {
              countries[x][y] = newPopulation;
            }
          }
        }
      }
    }

    // 인구 이동이 없으면 종료 및 일수 증가
    if (!isMoved) break;
    days++;
  }

  return days;
}

// BFS: 연합 찾기
function bfs(startX, startY, N, L, R, countries, visited) {
  const union = [[startX, startY]];
  const queue = [[startX, startY]];
  visited[startX][startY] = true;

  // 상하좌우 방향
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, -1, 1];

  let idx = 0;
  while (idx < queue.length) {
    const [x, y] = queue[idx++];

    // 인접 국가 확인
    for (let dir = 0; dir < 4; dir++) {
      const nx = x + DX[dir];
      const ny = y + DY[dir];

      // 범위 내이고 미방문 체크
      if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
        // 인구 차이
        const diff = Math.abs(countries[x][y] - countries[nx][ny]);

        // L 이상 R 이하 => 연합에 추가 및 방문 처리
        if (L <= diff && diff <= R) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
          union.push([nx, ny]);
        }
      }
    }
  }

  return union;
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().split('\n');
const [N, L, R] = input[0].split(' ').map(Number);
const countries = input.slice(1).map((country) => country.split(' ').map(Number));

console.log(getMigrationDays(N, L, R, countries));
