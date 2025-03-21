function solution(progresses, speeds) {
  // 큐, 새 배열에 끝나는 날을 넣고 그 날을 순회하여 비교하는 식으로?
  // 1. 작업이 끝난 날짜를 새 배열 넣기
  let doneQ = [];
  for (let i = 0; i < progresses.length; i++) {
    // 작업 날짜 구하기? 100에 빼기
    doneQ.push(Math.ceil((100 - progresses[i]) / speeds[i]));
  }
  console.log(doneQ)
  // 2. 날짜들을 순회하여 기준(0번째)보다 작다면 카운트++, 크다면 그동안의 카운트를 새 배열로 옮기고 초기화
  let count = 1;
  let standard = doneQ[0];
  let result = [];
  for (let i = 1; i < doneQ.length; i++) {
    if (doneQ[i] > standard) {
      result.push(count);
      standard = doneQ[i];
      count = 1;
    } else {
      count++;
    }
  }
  // 주의! 마지막 날 카운트까지 추가
  result.push(count);
  return result;
}