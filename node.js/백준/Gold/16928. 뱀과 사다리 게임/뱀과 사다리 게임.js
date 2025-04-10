// 최소 주사위 => 한 번에 6만 갈 수 있으면서 최단 경로를 찾아야함 + 사다리 => 완탐-BFS
// 여기에 방문했는지/주사위굴린 횟수도 있어야한다. 이미 계산한 결과를 저장하고 최소 주사위 굴린 횟수를 구해야함

function getMinRollDice(N, M, gameEleArr) {
  const board = Array(101).fill(null);
  for (let i = 0; i < gameEleArr.length; i++) {
    // 특정 칸에 도착했을 때 다른 칸으로 이동하는 것이기 때문에 뱀이든 사다리든 그냥 설정
    const [start, end] = gameEleArr[i].split(' ').map(Number);
    board[start] = end;
  }

  // 방문 배열: 각 요소(주사위 굴린 결과)는 주사위 굴린 횟수가 들어갈 예정
  const visited = Array(101).fill(-1);
  visited[1] = 0;

  // BFS: 1부터 시작해 주사위 1-6까지 시도
  const queue = [1];
  while (queue.length > 0) {
    const current = queue.shift();

    if (current === 100) {
      return visited[current];
    }

    for (let dice = 1; dice <= 6; dice++) {
      let next = current + dice;

      if (next > 100) continue;

      // 사다리나 뱀이 있으면 해당 위치로 이동
      if (board[next] !== null) {
        next = board[next];
      }

      // 아직 방문하지 않은 위치라면 방문 표시하고 큐에 추가
      if (visited[next] === -1) {
        visited[next] = visited[current] + 1;
        queue.push(next);
      }
    }
  }
  return -1;
}

const fs = require('fs');
const [NM, ...gameEleArr] = fs.readFileSync(0).toString().split('\n');
const [N, M] = NM.split(' ').map(Number);

console.log(getMinRollDice(N, M, gameEleArr));
