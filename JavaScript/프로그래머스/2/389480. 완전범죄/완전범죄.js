// DP 사용: i마다의 누적에 해단 최솟값을 반환해야함, 각 i마다 최적해를 구해 넣는 그리디 방식은 안 될 듯
// 모든 경우의 수 중 A의 최솟값을 구하도록 설계할 예정
// 점화식: 물건 i까지 처리 했을 때, A의 흔적이 a이고 B의 흔적이 b인 상태
//   => dp[i][a][b]에 i-1에서의 a, b 선택 시 갱신 되도록 만듦
//      i번째 물건을 A가 훔치면: dp[i][a][b] = dp[i-1][a-info[i][0]][b]
//      i번째 물건을 B가 훔치면: dp[i][a][b] = dp[i-1][a][b-info[i][1]]

// 1. DP 초기화: [물건][a 흔적][b 흔적], n과 m만큼 넣도록 해서 각 물건마다 false를 넣음. 이후 a의 최소 true 일 때가 최솟값임.
// 2. 초기 상태 설정: 물건 1부터 계산하기 위해 인덱스 0에 초깃값 주입

function solution(info, n, m) {
    const itemCount = info.length;
    
    // DP[i][a][b] = 물건 i까지 처리했을 때, A의 흔적이 a이고 B의 흔적이 b인 상태가 가능한지 여부
    const dp = Array(itemCount + 1).fill(null).map(() => 
        Array(121).fill(null).map(() => Array(121).fill(false)));
    
    dp[0][0][0] = true;

    for (let i = 1; i <= itemCount; i++) {
        const [aTrace, bTrace] = info[i-1]; // (0-based)
        
        for (let a = 0; a <= 120; a++) {
            for (let b = 0; b <= 120; b++) {
                // A가 물건을 훔치는 경우
                if (a >= aTrace && dp[i-1][a-aTrace][b]) {
                    dp[i][a][b] = true;
                }
                
                // B가 물건을 훔치는 경우
                if (b >= bTrace && dp[i-1][a][b-bTrace]) {
                    dp[i][a][b] = true;
                }
            }
        }
    }
    
    // 결과 찾기: 가능한 상태 중 A의 흔적이 최소인 값
    let minA = Infinity;
    for (let a = 0; a < n; a++) { 
        for (let b = 0; b < m; b++) {
            if (dp[itemCount][a][b]) {
                minA = Math.min(minA, a);
            }
        }
    }
    
    // 가능한 상태가 없으면 -1 반환
    return minA === Infinity ? -1 : minA;
}



// i번째 물건은 A가 훔치면 흔적이 2 남는다고 가정
// 현재 A의 흔적이 5인 상태가 가능한가? => dp[i][5][b]
// 그렇다면 i-1번째 물건까지 처리했을 때 A의 흔적이 3 (= 5-2)
// 즉, dp[i][5][b] = dp[i-1][3][b]로 할당