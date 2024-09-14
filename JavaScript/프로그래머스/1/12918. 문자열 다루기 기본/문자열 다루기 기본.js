function solution(s) {
  return (s.length === 4 || s.length === 6) && !isNaN(Number(s)) && !s.includes("e")
}

// function solution(s) {
//   let result = false;
//   let num = "0123456789";
//   if (s.length === 4 || s.length === 6) {
//     for (i = 0; i < s.length; i++) {
//       if (num.includes(s[i])) {
//         result = true;
//       } else {
//         result = false;
//         break;
//       }
//     }
//   }
//   return result;
// }
