function solution(s) {
  // 공백 기준 나누고 공백으로 나눴으면 문자열인지 숫자인지에 따라 나누기
  let newS = s.split(" ").map((el) => (typeof el[0] === "string" ? el[0].toUpperCase() + el.slice(1).toLowerCase() : el));
  return newS.join(" ");
}
