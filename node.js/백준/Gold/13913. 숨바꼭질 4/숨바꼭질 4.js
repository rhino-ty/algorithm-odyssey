// -1, +1, 2*X에 해당하는 3가지 경우의 수를 전체 탐색 후 몇 초가 가장 최소인지 반환하는 프로그램

function findShortestPath(N, K) {
  // 이미 같은 위치에 있는 경우
  if (N === K) {
    return `0\n${N}`;
  }

  // BFS를 위한 큐와 방문 체크 배열
  // const queue = [[N, 0, [N]]]; // [현재위치, 시간, 경로]
  const queue = [[N, 0]]; // [현재위치, 시간] - 경로는 저장하지 않음!
  const parent = new Array(100001).fill(-1);
  const visited = new Array(100001).fill(false);
  visited[N] = true;

  while (queue.length > 0) {
    const [curPos, time] = queue.shift();

    // 가능한 다음 위치들을 계산
    const nextPosArr = [];

    // 2. X+1
    if (curPos + 1 <= 100000) nextPosArr.push(curPos + 1);
    // 1. X-1
    if (curPos - 1 >= 0) nextPosArr.push(curPos - 1);
    // 3. 2*X
    if (curPos << 1 <= 100000) nextPosArr.push(curPos << 1);

    // 각 다음 위치를 확인
    for (const nextPos of nextPosArr) {
      if (nextPos === K) {
        // 목표 도달!@부모 정보 설정 후 경로 역추적
        parent[nextPos] = curPos;

        // 경로 역추적
        const path = [];
        let cur = nextPos;
        while (cur !== -1) {
          path.unshift(cur);
          cur = parent[cur];
        }

        return `${time + 1}\n${path.join(' ')}`;
      }

      if (!visited[nextPos]) {
        visited[nextPos] = true;
        parent[nextPos] = curPos;
        queue.push([nextPos, time + 1]);

        // queue.push([nextPos, time + 1, [...path, nextPos]]);
      }
    }
  }

  return null; // 실제로는 발생 X
}

const [N, K] = require('fs').readFileSync(0).toString().split(' ').map(Number);
console.log(findShortestPath(N, K));
