// filter로 해결할 수 있을 거 같아 추가 작성함
function solution(arr, divisor) {
    arr.sort((a, b) => a - b)
    const arrFilter = arr.filter(num => num % divisor === 0)
    return arrFilter.length ? arrFilter : [-1]
}

// 2022-09-07 19:09:03
// function solution(arr, divisor) {
//     let answer = [];
//     if (arr.length > 0) {
//         for (i = 0; i < arr.length; i++) {
//             if (arr[i] % divisor === 0) {
//                 answer.push(arr[i])
//             }
//         }
//     }
//     if (answer.length === 0) {
//         answer.push(-1)
//     }
//     answer.sort((a, b) => a - b)
//     return answer;
// }