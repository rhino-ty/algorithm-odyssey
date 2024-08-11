const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(parseInt(line));
}).on('close', function () {
  const [N, ...nums] = input;
  const result = main(N, nums);
  console.log(result);
});

function main(N, nums) {
  let result = '';

  // 산술평균 : N개의 수들의 합을 N으로 나눈 값
  const avg = Math.round(nums.reduce((acc, cur) => acc + cur, 0) / N);
  result += `${avg === -0 ? 0 : avg}\n`;

  // 중앙값 : N개의 수들을 증가하는 순서로 나열했을 경우 그 중앙에 위치하는 값
  nums.sort((a, b) => a - b);
  const middleIndex = Math.floor(N / 2);
  const median = nums[middleIndex];
  result += `${median}\n`;

  // 최빈값 : N개의 수들 중 가장 많이 나타나는 값, 여러 개 있을 때에는 최빈값 중 두 번째로 작은 값을 출력
  const freqMap = new Map();
  nums.forEach((num) => {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  });

  let maxFreq = Math.max(...freqMap.values());
  let modes = [];

  freqMap.forEach((value, key) => {
    if (value === maxFreq) {
      modes.push(key);
    }
  });

  modes.sort((a, b) => a - b);
  const mode = modes.length > 1 ? modes[1] : modes[0];
  result += `${mode}\n`;

  // 범위 : N개의 수들 중 최댓값과 최솟값의 차이
  const range = nums[nums.length - 1] - nums[0];
  result += `${range}\n`;

  return result;
}