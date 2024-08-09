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