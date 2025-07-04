// 왼쪽 포트와 연결될 오른쪽 포트를 비교해 겹치지 않으면서 최대의 연결을 알아내야함
// 교차하지 않으려면 왼쪽에서 위에 있는 포트가 오른쪽에서도 위에 있어야함 => 연결될 오른쪽 포트 번호가 증가해야함! 낮아지면 안됨

function getLIS(N, ports) {
  const lis = [];

  // 더 작은 값으로 교체해서 더 긴 LIS 만들기
  for (let i = 0; i < N; i++) {
    const pos = lowerBound(lis, ports[i]);

    if (pos === lis.length) {
      lis.push(ports[i]);
    } else {
      lis[pos] = ports[i];
    }
  }

  return lis.length;
}

// 정렬된 배열 => target보다 크거나 같은 첫 번째 원소의 위치 찾기
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

const input = require('fs').readFileSync(0, 'utf8').trim().split('\n');
const N = parseInt(input[0]);
const ports = input[1].split(' ').map(Number);
console.log(getLIS(N, ports));
