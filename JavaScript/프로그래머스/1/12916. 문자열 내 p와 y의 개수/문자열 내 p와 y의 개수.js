function solution(s) {
  return s.toLowerCase().split("p").length === s.toLowerCase().split("y").length;
}

// 2022-10-17 18:14:51
// function solution(s) {
//   let count = 0;
//   let sLower = s.toLowerCase();
//   for (i = 0; i < sLower.length; i++) {
//     if (sLower[i] === "p") {
//       count += 1;
//     }
//     if (sLower[i] === "y") {
//       count -= 1;
//     }
//   }
//   return count === 0 ? true : false;
// }
