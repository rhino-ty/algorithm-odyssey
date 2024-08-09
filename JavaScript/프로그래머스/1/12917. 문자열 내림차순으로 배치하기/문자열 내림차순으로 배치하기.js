// 문자열 대소문자 정렬의 이해도 부족 + reverse() 메소드를 모르고 있어 미숙함 발생

function solution(s) {
  const strUpperArr = s
    .split('')
    .filter((s) => s === s.toUpperCase())
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
    .join('');
  const strLowerArr = s
    .split('')
    .filter((s) => s === s.toLowerCase())
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
    .join('');

  return strLowerArr + strUpperArr;
}