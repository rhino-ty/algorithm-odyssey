function solution(word) {
  arrAlpha = ["A", "E", "I", "O", "U"];
  arrSum = [781, 156, 31, 6, 1];
  return [...word].reduce((acc, cur, idx) => acc + arrSum[idx] * arrAlpha.indexOf(cur) + 1, 0);
}