// 가장 최소 거리의 우체국을 세울 위치를 구하는 문제, 마을이 아닌 사람이 기준이니 사람이 많을 수록 그쪽으로 세워야함
// 일직선이라 중간사람을 구해서 그 중간값과 가까운 마을을 출력하면 되는 문제

function getMinDistance(N, village, total) {
  village.sort((a, b) => a[0] - b[0]);

  let half = Math.floor((total + 1) / 2);
  let count = 0;
  for (let [location, people] of village) {
    count += people;
    if (count >= half) return location;
  }

  return -1;
}

const input = require('fs').readFileSync(0).toString().trim().split('\n');
const N = parseInt(input[0]);
let total = 0;
const village = input.slice(1).map((line) => {
  const [x, a] = line.split(' ').map(Number);
  total += a;
  return [x, a];
});
console.log(getMinDistance(N, village, total));
