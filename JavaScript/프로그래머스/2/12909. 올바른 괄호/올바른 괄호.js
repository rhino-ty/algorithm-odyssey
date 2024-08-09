function solution(s) {
  // 1. 0과 마지막은 각각 (와 )인 것만 걸러주기
  // 2. 괄호 개수 같음
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    s[i] === "(" ? count++ : count--;
    if (count < 0) {
      return false;
    }
  }
  return count === 0 ? true : false;
} 
