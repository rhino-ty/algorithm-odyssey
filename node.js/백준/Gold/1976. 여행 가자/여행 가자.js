// 여행 계획 문제 => 연결성 확인 => Union-Find
//   - BFS, DFS 같은 일반 탐색으로는 비효율적임: 매번 경로 탐색해야함, '1에서 2로 가는 경로를 찾아라'
//   - 도시들이 서로 연결되어 있는지 그룹(집합)으로 관리
//   - 두 도시가 같은 그룹에 속하면 경로가 존재함을 의미
//   - 예: A-B, B-C 연결 → A,B,C는 같은 그룹 → A에서 C로 갈 수 있음
// 여행 계획의 모든 도시가 하나의 연결된 그룹에 속하는지 확인해야함!
// 중간 경유 가능 = 같은 연결 컴포넌트에 속하면 갈 수 있음

// 1. find(x): x가 속한 그룹의 대표(루트) 찾기
// 2. union(x, y): x와 y가 속한 그룹을 하나로 합치기
// 3. 경로 압축: find 과정에서 트리 높이를 줄여 성능 향상

function canTravel(N, M, lines) {
  const cities = lines.map((i) => i.split(' ').map(Number));

  // parent 배열 초기화
  const parent = [...Array(N + 1).keys()];

  // find 함수
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));

  // union 함수
  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootY] = rootX;
    }
  };

  // 연결 정보 처리
  for (let i = 0; i < N; i++) {
    const row = cities[i];
    for (let j = 0; j < N; j++) {
      if (row[j] === 1) union(i + 1, j + 1);
    }
  }

  // 여행 계획 확인
  const plan = cities[N];
  const root = find(plan[0]);

  return plan.every((city) => find(city) === root) ? 'YES' : 'NO';
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
const N = parseInt(input[0]);
const M = parseInt(input[1]);
const lines = input.slice(2);
console.log(canTravel(N, M, lines));
