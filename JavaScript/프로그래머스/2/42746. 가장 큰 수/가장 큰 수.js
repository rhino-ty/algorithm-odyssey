function solution(numbers) {
  /*
   * 1. 정렬: 문자열 정렬하듯 sort() 하기
   * 2. 반전: reverse 시켜 큰 수 부터 해주기
   * 3. 붙이기: join("")
   */
  // 1트 실패,, 기본으로 `sort()` 이렇게 하면 유니코드로 정렬되는 걸 이용해서 했는데 엉망진창으로 틀렸다 ㅠㅠ
  // return numbers.sort().reverse().join("");

  // 2트: 문자열 치환 후 이어붙여 -를 하면 빼진다는 js 특성을 이용해 sort() 안에 기입해 해결하기 - 3, 30이 있다면 303 - 330 < 0 이기에 30, 3

  const sortedNums = numbers.map((el) => String(el)).sort((a, b) => `${b}${a}` - `${a}${b}`);
  // [0,0,0...] 인 경우도 있어 제외
  return sortedNums[0] === "0" ? "0" : sortedNums.join("");
}