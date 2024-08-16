function solution(participant, completion) {
  // 이중 for문 실패 시간복잡도
  // 고차함수 find
  // 객체로 다 더해서 중복 되면 2, 중복 안되면 1 그래서 1만 나오게?? + reduce
  // return participant.find((pre) => completion.includes(pre) !== true);
  // 1. 초기코드el
  // for (let i = 0; i < completion.length; i++) {
  //   for (let b = 0; b < participant.length; b++) {
  //     if (completion[i] === participant[b]) {
  //       participant.splice(b, 1)
  //       break;
  //     }
  //   }
  //   return participant.join('');
  // }
  // 2. sort()
  // participant.sort();
  // completion.sort();
  // return participant.find((pre, idx) => pre !== completion[idx]);
  // 3. 해시를 이용한 map
  const map = new Map();

  for (let i = 0; i < participant.length; i++) {
    let iPart = participant[i],
      iComp = completion[i];
    map.set(iPart, (map.get(iPart) || 0) + 1);
    map.set(iComp, (map.get(iComp) || 0) - 1);
  }
  for (let [a, b] of map) {
    if (b === 1) {
      return a;
    }
  }
  return undefined;
}
