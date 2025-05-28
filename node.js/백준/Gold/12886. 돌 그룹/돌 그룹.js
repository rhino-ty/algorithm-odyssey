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

// 최적화
function canEqualizeStones(stones) {
  const [A, B, C] = stones;
  const total = A + B + C;

  if (total % 3 !== 0) return 0;
  const target = total / 3;

  // 이미 목표 상태인지 확인
  if (A === target && B === target && C === target) return 1;

  // 메모리 최적화: Set 사용으로 메모리 사용량 대폭 감소
  const visited = new Set();
  const queue = [];

  // 초기 상태를 정렬하여 일관성 유지
  const sortedStones = stones.slice().sort((a, b) => a - b);
  const initialKey = `${sortedStones[0]},${sortedStones[1]}`;

  queue.push(sortedStones);
  visited.add(initialKey);

  // 성능 최적화: shift() 대신 인덱스 사용
  let head = 0;

  while (head < queue.length) {
    const [s1, s2, s3] = queue[head++];

    // 목표 달성 확인
    if (s1 === target && s2 === target && s3 === target) {
      return 1;
    }

    // 직접 3가지 경우를 처리 (배열 생성 오버헤드 제거)
    const operations = [
      [s1, s2, s3], // s1, s2 연산
      [s1, s3, s2], // s1, s3 연산
      [s2, s3, s1], // s2, s3 연산
    ];

    for (const [x, y, z] of operations) {
      if (x === y) continue;

      const small = x < y ? x : y; // Math.min 대신 삼항연산자
      const large = x < y ? y : x; // Math.max 대신 삼항연산자

      const newSmall = small << 1; // small * 2 대신 비트시프트
      const newLarge = large - small;

      // 새로운 상태 생성 및 정렬
      const newState = [newSmall, newLarge, z].sort((a, b) => a - b);
      const stateKey = `${newState[0]},${newState[1]}`;

      // 정렬된 전체 상태 검증
      if (!visited.has(stateKey)) {
        visited.add(stateKey);
        queue.push(newState);
      }
    }
  }

  return 0;
}

// function canEqualizeStones(stones) {
//   let [A, B, C] = stones;
//   const total = A + B + C;
//   if (total % 3 !== 0) return 0;
//   const target = total / 3;

//   const queue = [];
//   const visited = new Array(total + 1).fill().map(() => new Array(total + 1).fill(false));

//   const sortedStones = stones.sort((a, b) => a - b);
//   queue.push(sortedStones);
//   visited[sortedStones[0]][sortedStones[1]] = true;

//   while (queue.length > 0) {
//     const [curA, curB, curC] = queue.shift();

//     // 기저: 목표 달성 확인
//     if (curA === target && curB === target && curC === target) return 1;

//     const combi = [
//       [curA, curB],
//       [curA, curC],
//       [curB, curC],
//     ];

//     for (const [X, Y] of combi) {
//       if (X === Y) continue;

//       let small = Math.min(X, Y);
//       let large = Math.max(X, Y);

//       const newSmall = small * 2;
//       const newLarge = large - small;
//       const newThird = total - newSmall - newLarge;

//       const newState = [newSmall, newLarge, newThird].sort((a, b) => a - b);
//       const [newA, newB, newC] = newState;

//       if (newA >= 0 && newB >= 0 && newA <= total && newB <= total && !visited[newA][newB]) {
//         visited[newA][newB] = true;
//         queue.push([newA, newB, newC]);
//       }
//     }
//   }

//   return 0;
// }

const fs = require('fs');
const stones = fs.readFileSync(0).toString().trim().split(' ').map(Number);
console.log(canEqualizeStones(stones));
