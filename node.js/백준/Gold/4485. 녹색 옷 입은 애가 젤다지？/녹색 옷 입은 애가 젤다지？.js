// 최단거리 하면서 '최소 루피' 이므로 가중치 존재 => 다익스트라로 풀면 될 듯
// 검은 루피를 최소한으로 밟아야 하기 때문에 최단 거리로 봄

// 최단 거리(루피도) 저장할 배열, 방문여부 등 초기화
// 미니멈힙 구현 및 힙 초기화
// 시작점을 최소힙에 추가한 다음, 최소힙이 비어있지 않을 동안 반복

function getGoalWithMinRuppe(input) {
  let lineIdx = 0;
  let problemCount = 1;
  let result = [];

  while (true) {
    const N = parseInt(input[lineIdx++]);
    // 입력값 끝나면 break
    if (N === 0) break;

    // 동굴 지도 입력 받기
    const cave = [];
    for (let i = 0; i < N; i++) {
      cave.push(input[lineIdx++].split(' ').map(Number));
    }

    // 최단거리 메모이제이션
    const distance = Array.from({ length: N }, () => Array(N).fill(Infinity));
    const visited = Array.from({ length: N }, () => Array(N).fill(false));

    // 방향 배열 (상, 우, 하, 좌): 이렇게 나눈 이유는 newRow,Col을 수월하게 뽑기 위해서
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];

    const minHeap = new MinHeap();

    // 시작점 설정 (첫 칸의 비용도 포함)
    distance[0][0] = cave[0][0];
    minHeap.push([distance[0][0], [0, 0]]);

    // 다익스트라 알고리즘 시작!
    while (!minHeap.isEmpty()) {
      const [cost, [row, col]] = minHeap.pop();

      if (visited[row][col]) continue;

      if (row === N - 1 && col === N - 1) {
        result.push(`Problem ${problemCount}: ${cost}`);
        break;
      }

      // 방문 처리
      visited[row][col] = true;

      // 네 방향 탐색
      for (let i = 0; i < 4; i++) {
        const newRow = row + dr[i];
        const newCol = col + dc[i];

        // 범위 체크 및 이미 방문했음 탈락
        if (newRow < 0 || newRow >= N || newCol < 0 || newCol >= N) continue;
        if (visited[newRow][newCol]) continue;

        // 새로운 비용 계산
        const newCost = cost + cave[newRow][newCol];

        // 더 적은 비용으로 이동할 수 있으면 갱신
        if (newCost < distance[newRow][newCol]) {
          distance[newRow][newCol] = newCost;
          minHeap.push([newCost, [newRow, newCol]]);
        }
      }
    }

    problemCount++;
  }

  return result.join('\n');
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 힙의 크기 반환
  size() {
    return this.heap.length;
  }

  // 힙이 비어있는지 확인
  isEmpty() {
    return this.size() === 0;
  }

  // 새 요소 삽입: push 후 heapifyUp
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  // 최소값(루트) 제거 및 반환
  pop() {
    if (this.isEmpty()) return null;

    const root = this.heap[0];
    const last = this.heap.pop();

    // 힙이 비어있지 않다면 마지막 요소를 루트로 이동하고 아래로 내려보냄
    if (this.size() > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return root;
  }

  // 최소값(루트) 확인 (제거하지 않음)
  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }

  // 요소를 위로 이동시켜 힙 속성 유지: 추가된 요소와 부모 노드 비교 → 작으면 교환
  heapifyUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      // 부모가 현재 요소보다 작거나 같으면 중단
      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;

      // 부모와 현재 요소 교환
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  // 요소를 아래로 이동시켜 힙 속성 유지: 루트 교체 후, 자식 노드와 비교 → 더 작은 자식과 교환
  heapifyDown() {
    let index = 0;
    const length = this.size();

    while (true) {
      const leftChildIdx = 2 * index + 1;
      const rightChildIdx = 2 * index + 2;
      let smallestChildIdx = index;

      // 왼쪽 자식이 더 작은 경우
      if (leftChildIdx < length && this.heap[leftChildIdx][0] < this.heap[smallestChildIdx][0]) {
        smallestChildIdx = leftChildIdx;
      }

      // 오른쪽 자식이 더 작은 경우
      if (rightChildIdx < length && this.heap[rightChildIdx][0] < this.heap[smallestChildIdx][0]) {
        smallestChildIdx = rightChildIdx;
      }

      // 교환할 필요가 없으면 중단
      if (smallestChildIdx === index) break;

      // 현재 노드와 가장 작은 자식 교환
      [this.heap[index], this.heap[smallestChildIdx]] = [this.heap[smallestChildIdx], this.heap[index]];
      index = smallestChildIdx;
    }
  }
}

const fs = require('fs');
const input = fs.readFileSync(0).toString().split('\n');
console.log(getGoalWithMinRuppe(input));
