function solution(arr) {
  // Math.min 사용 후 인덱스 찾기, 제거
  arr.splice(arr.indexOf(Math.min(...arr)), 1);
  // undefined면 -1 제출
  return arr.length ? arr : [-1];
}
