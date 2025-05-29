// 입력(2,000 이내) 내에서, 어떤 수 = 다른 두 수의 합이 이뤄지는 숫자 카운트가 이뤄져야함
// => 즉, 정렬 후 어느 하나의 수를 고른다면, 그 이전만 보면 됨.
//    또한, 투포인터를 사용해서 두 수 합을 반환하고 타겟 값과 비교를 통해 left right를 줄이거나 늘리면 됨

// 1. 결과카운트 초기화
// 2. sortedNumArr 가공: numStr.split(' ').sort((a, b) => a - b)
// 3. sortedNumArr 순회: i = 2부터 순회(제일 작은 값 2개는 합칠 것도 없으니)
//    - 0을 left, i-1을 right (인덱스)
//    - left >= right가 될 때 까지 순회(while)
//       - 기저: sortedNumArr[left] + sortedNumArr[right]이 sortedNumArr[i]와 같다면 카운트 및 break
//       - sortedNumArr[left] + sortedNumArr[right]를 했는데 타겟보다 크다면 right--, 작다면 left++
// 4. 결과 카운트 반환

function getGoodCount(N, numStr) {
  let goodCnt = 0;
  const sortedNumArr = numStr
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  // 정수 생각을 하지 않았음.
  // for (let i = 2; i < N; i++) {
  //   let left = 0;
  //   let right = i - 1;

  for (let i = 0; i < N; i++) {
    const target = sortedNumArr[i];
    let left = 0;
    let right = N - 1;

    while (left < right) {
      if (left === i) {
        left++;
        continue;
      }
      if (right === i) {
        right--;
        continue;
      }

      const leftNum = sortedNumArr[left];
      const rightNum = sortedNumArr[right];

      if (target === leftNum + rightNum) {
        goodCnt++;
        break;
      } else if (target > leftNum + rightNum) {
        left++;
      } else if (target < leftNum + rightNum) {
        right--;
      }
    }
  }

  return goodCnt;
}

const fs = require('fs');
const [N, numStr] = fs.readFileSync(0).toString().split('\n');
console.log(getGoodCount(N, numStr));
