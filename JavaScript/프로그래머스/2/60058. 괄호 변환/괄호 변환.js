function solution(p) {
  // 재귀 종료 및 빈 문자열 도출
  if (!p) {
    return "";
  }
  // 변수 정의
  let u, v;
  let count = 0;
  let str = "";
  // 분리 및 카운트로 균형 잡힌 괄호 잘라 u, v 정의
  for (let i = 0; i < p.length; i++) {
    p[i] === "(" ? count++ : count--;
    if (!count) {
      u = p.slice(0, i + 1);
      v = p.slice(i + 1);
      break;
    }
  }
  // u가 올바른 괄호라면
  if (check(u)) {
    str = u + solution(v);
    return str;
  }
  // u가 올바른 괄호 아니라면
  else {
    // () 안에 재귀 v
    str = `(${solution(v)})`;
    // u 떼고 반대로 붙이기
    for (let j = 1; j < u.length - 1; j++) {
      u[j] === "(" ? (str += ")") : (str += "(");
    }
    // 여기에 조건에 맞게 꼭 생성된 문자열 반환
    return str;
  }
}

function check(p) {
  let stack = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i] === "(") {
      stack.push("(");
    } else {
      if (!stack.length) {
        return false;
      }
      stack.pop();
    }
  }
  return true;
}
