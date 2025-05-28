// 돌 수를 기준으로 작은 그룹 X, 큰 그룹 Y라고 했을 때, X+X, Y-X로 동일해질 수 있는지 확인하는 문제
// 완전탐색: 각 A,B,C를 정점, 연산 결과 과정을 간선으로 볼 수 있음
//   - A,B,C 순서는 '상관 없음'
//   - [A,B,C]로 방문하고 안하고를 만들 수 있을 듯
//   - 계산도 두개의 돌 그룹만 하고, 총합은 변하지 않으니 Z = S - (X + Y)로 축약할 수 있을 듯
// 그룹 총합(S=A+B+C)에 대해서 S/3에 나머지가 있다면 바로 return 0, S/3로 목표 타겟 설정

// 1. 타겟 및 조건 설정
//   - total = A + B + C
//   - if (total % 3 !== 0)이면, 0을 출력하고 종료
//   - target = total / 3 계산
// 2. BFS를 위한 큐와 2차원 배열 visited 초기화
// 3. ABC 중 최솟값 최댓값 찾은 후 큐에 초깃값을 넣고, visited에 합친 작큰값을 넣음 => AB만 알아도 C는 알 수 있기에
// 4. BFS 실행: 큐가 빌 때까지
//   - 큐에서 현재 ABC를 꺼냄
//   - 기저: ABC가 타겟과 전부 같으면 return 1
//   - ABC에서 두 개를 추출해 만들 수 있는 조합을 만듦 => (A,B), (A,C), (B,C)
//   - 만든 조합 배열을 가지고 순회
//     - 만약 두 값이 같다면 continue
//     - 앞의 요소가 X, 뒤의 요소가 Y
//     - newX = X + X, newY = Y - X
//     - 나머지 값은 total - newX - newY로 계산
//     - 새로운 [newX, newY, newC]를 만듦
//     - visited[newA][newB]가 false 라면
//        - queue에 (newA,newB) push
//        - visited[newA][newB]에 true
// 5. 큐가 비어서 BFS가 끝났다면 찾지 못했기에 return 0

function canEqualizeStones(stones) {
  let [A, B, C] = stones;
  const total = A + B + C;
  if (total % 3 !== 0) return 0;
  const target = total / 3;

  const queue = [];
  const visited = new Array(total + 1).fill().map(() => new Array(total + 1).fill(false));
  const sortedStones = stones.sort((a, b) => a - b);
  queue.push(sortedStones);
  visited[sortedStones[0]][sortedStones[1]] = true;

  while (queue.length > 0) {
    const [curA, curB, curC] = queue.shift();

    // 기저: 목표 달성 확인
    if (curA === target && curB === target && curC === target) {
      return 1;
    }

    const combi = [
      [curA, curB, curC],
      [curA, curC, curB],
      [curB, curC, curA],
    ];

    for (const [X, Y, Z] of combi) {
      if (X === Y) continue;

      let small = Math.min(X, Y);
      let large = Math.max(X, Y);

      const newSmall = small * 2;
      const newLarge = large - small;
      const newThird = Z;

      const newState = [newSmall, newLarge, newThird].sort((a, b) => a - b);
      const [newA, newB, newC] = newState;

      if (newA >= 0 && newB >= 0 && newA <= total && newB <= total && !visited[newA][newB]) {
        visited[newA][newB] = true;
        queue.push([newA, newB, newC]);
      }
    }
  }

  return 0;
}

const fs = require('fs');
const stones = fs.readFileSync(0).toString().trim().split(' ').map(Number);
console.log(canEqualizeStones(stones));
