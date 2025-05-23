function solution(priorities, location) {
  // 해시로 만들기
  let hashPrior = priorities.map((el, idx) => [idx, el]);
  // 큐 넣어줄 그릇
  let queue = [];

  // 큐 작업 해주기, hash 배열 다 없어질 때 까지 큐에 넣기
  while (hashPrior.length !== 0) {
    let front = hashPrior.shift();
    // hashPrior 최댓값 구하기
    let hashMax = Math.max(...hashPrior.map((el) => el[1]));
    // 조건1: hashPrior의 최댓값이 아니면 맨 뒤로 가기!
    // 조건2: 최댓값이면 그대로 푸쉬
    front[1] < hashMax ? hashPrior.push(front) : queue.push(front);
  }
  let result = 0;
  // location과 같은 값을 찾은 뒤 0번째 인덱스 도출
  // for (let i = 0; i < hashPrior.length; i++) {
  //   if (hashPrior[i][0] === location) {
  //     result = i;
  //   }
  // }
  // return result + 1;
  return queue.findIndex((el) => el[0] === location) + 1;
}
