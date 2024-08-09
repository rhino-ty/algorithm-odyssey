// 2022-10-22 20:44:11
function solution(strings, n) {
    return strings.sort((a, b) => {
      if (a[n] > b[n]) {
        return 1
      } else if (a[n] < b[n]) {
        return -1
      } else {
        return (a > b) - (a < b)
      }
    })
}
// function solution(strings, n) {
//   let newArr = [];
//   let idx = [];
//   strings.forEach((str, i) => {
//     newArr.push(str.slice(n));
//     idx.push(i);
//   });
//   newArr.sort();
//   let veryNewArr = [];
//   newArr.map((newStr, j) => {
//     veryNewArr.push(`${strings[idx[j]].slice(0, n)}${newStr}`);
//   });
//   return veryNewArr
// }
