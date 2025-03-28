// 단순 순회로 간단히 할 수 있음 => 하지만 행렬이 최대 1,000 × 1,000 + skill이 최대 250,000개이다 보니 효율성을 극대화해야됨
// 그래서 메모이제이션 최적화를 위해 DP - 누적합을 사용해 효율성을 얻어야함

// DP-누적합 사용
function solution(board, skill) {
    const n = board.length;
    const m = board[0].length;
    const prefixSum = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));
    
    // 스킬 적용
    for (const [type, r1, c1, r2, c2, degree] of skill) {
        const value = type === 1 ? -degree : degree;
        prefixSum[r1][c1] += value;
        if (r2 + 1 < n + 1) prefixSum[r2 + 1][c1] -= value;
        if (c2 + 1 < m + 1) prefixSum[r1][c2 + 1] -= value;
        if (r2 + 1 < n + 1 && c2 + 1 < m + 1) prefixSum[r2 + 1][c2 + 1] += value;
    }
    
    // 누적합 계산
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < m; j++) {
            prefixSum[i][j] += prefixSum[i][j-1];
        }
    }
    for (let j = 0; j < m; j++) {
        for (let i = 1; i < n; i++) {
            prefixSum[i][j] += prefixSum[i-1][j];
        }
    }
    
    // 살아남은 건물 카운트
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] + prefixSum[i][j] > 0) {
                count++;
            }
        }
    }
    
    return count;
}

// 단순 구현: 만약 네이버 코테라면 이거부터라도 정확성 챙겨야됨..

// function solution(board, skill) {
//     const n = board.length;
//     const m = board[0].length;
    
//     // 모든 스킬 적용
//     for (const [type, r1, c1, r2, c2, degree] of skill) {
//         const value = type === 1 ? -degree : degree;
        
//         // 직사각형 영역에 스킬 직접 적용
//         for (let i = r1; i <= r2; i++) {
//             for (let j = c1; j <= c2; j++) {
//                 board[i][j] += value;
//             }
//         }
//     }
    
//     // 살아남은 건물 카운트
//     let count = 0;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < m; j++) {
//             if (board[i][j] > 0) {
//                 count++;
//             }
//         }
//     }
    
//     return count;
// }