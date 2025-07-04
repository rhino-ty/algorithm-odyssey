function solution(citations) {
    citations.sort((a, b) => a - b);
    const n = citations.length;
    
    // 이진탐색: 조건을 만족하는 첫 번째 인덱스 탐색
    let left = 0;
    let right = n;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // mid 위치에서 "인용횟수 >= 남은 논문 수" 조건 확인
        if (citations[mid] >= n - mid) {
            right = mid; // 조건 만족하면 더 앞쪽 탐색
        } else {
            left = mid + 1; // 조건 불만족하면 뒤쪽 탐색
        }
    }
    
    return n - left; // h-index 반환
}

// function solution(citations) {
//   // 정렬하고 그 뒤에 개수만큼 결과가 도출된다? 만약 [2, 2, 2]라면 2(h)번 인용된 2(h)개의 논문이 된다. 개수? 인덱스랑 상관?
//   // [0, 1, 3, 5, 6] => 0번 이상이 5개, 1번 이상이 4개, 3번 이상이 3개 5번 이상이 2개, 6번 이상이 1개
//   // 즉, 정렬 뒤 반복을 통하여 배열의 Value와 그 개수가 반전될 때 h의 최댓값이 나온다! (중간)

//   /*
//    * 1. 정렬: 정렬해야 비교 가능
//    * 2. 비교: 반복을 통해 그 인덱스의 값과 그 인덱스를 포함해 뒤 배열의 길이를 구하기
//    * 3. 도출: 인덱스 값과 길이를 비교해 반전되면 그때 결과 도출하고 반복 끝
//    *   3-1. 도출할 때 기준을 개수로 하기, 왜냐면 인용 횟수가 횟수를 충족하는 논문의 개수보다 많을 경우를 대비하기 위해
//    *   3-2. 논문들의 인용 횟수가 단 한번도 없을 경우도 대비해야함,, 그래서 변수를 지정해 초깃값을 설정하는 것이 바람직함
//    */

//   // 1
//   citations.sort((a, b) => a - b);
//   // 2
//   const citationLen = citations.length;
//   // 3-2
//   let result = 0;
//   for (i = 0; i < citationLen; i++) {
//     // 3
//     if (citations[i] >= citationLen - i) {
//       result = citationLen - i;
//       break;
//     }
//   }
//   return result;
// }
