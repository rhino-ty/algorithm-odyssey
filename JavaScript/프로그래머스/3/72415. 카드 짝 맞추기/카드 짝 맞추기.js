//와 아예 모르겠는데;;;;;

// 키 조작 횟수의 최솟값 => 완전 탐색 후 최솟값을 만들어 반환, 입력값이 그리 크지 않아서 가능
// '어떤 순서로 카드 쌍을 제거할 것인가'에 대한 모든 경우의 수를 탐색하고, 각 경우마다 필요한 키 조작 횟수를 계산해서 최솟값

// 1. 보드에서 카드 종류별 위치 파악 (각 숫자마다 2개의 위치)
// 2. 모든 가능한 카드 제거 순서에 대해 DFS로 탐색
//    - 현재 커서 위치에서 선택 가능한 카드 쌍들에 대해
//    - 첫 번째 카드로 이동 -> 뒤집기 -> 두 번째 카드로 이동 -> 뒤집기
//    - 해당 카드 쌍을 제거하고 재귀적으로 남은 카드에 대해 탐색
// 3. 커서 이동 함수 구현 (일반 이동, Ctrl+방향키 이동 => BFS)
// 4. 두 좌표 사이의 최소 이동 횟수 계산 함수 구현

function solution(board, r, c) {
    // 카드 종류별 위치 저장
    const cardPosMap = new Map();
    let cardPairCnt = 0;
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const card = board[i][j];
            if (card > 0) {
                if (!cardPosMap.has(card)) {
                    cardPosMap.set(card, []);
                    cardPairCnt++;
                }
                cardPosMap.get(card).push([i, j]);
            }
        }
    }
    
    // DFS: 모든 카드 제거 순서 탐색
    function dfs(curBoard, curR, curC, remainCardPairs) {
        // 모든 카드가 제거된 경우
        if (remainCardPairs === 0) {
            return 0;
        }
        
        let minOperations = Infinity;
        
        // 각 카드 종류 계산
        for (const [card, pos] of cardPosMap.entries()) {
            // 가지치기: 이미 제거된 카드는 건너뜀
            if (curBoard[pos[0][0]][pos[0][1]] === 0) {
                continue;
            }
            
            // 카드 선택 비용
            // 첫 번째 카드 -> 두 번째 카드 순서로 제거
            const moves1 = getMinMoves(curBoard, curR, curC, pos[0][0], pos[0][1]); // 첫 번째 카드로 이동
            const moves2 = getMinMoves(curBoard, pos[0][0], pos[0][1], pos[1][0], pos[1][1]); // 두 번째 카드로 이동
            const ops1 = moves1 + 1 + moves2 + 1; // +1은 Enter 키
            
            // 두 번째 카드 -> 첫 번째 카드 순서로 제거
            const moves3 = getMinMoves(curBoard, curR, curC, pos[1][0], pos[1][1]); // 두 번째 카드로 이동
            const moves4 = getMinMoves(curBoard, pos[1][0], pos[1][1], pos[0][0], pos[0][1]); // 첫 번째 카드로 이동
            const ops2 = moves3 + 1 + moves4 + 1; // +1은 Enter 키
            
            // 현재 카드 제거한 새 보드 상태 생성: 깊은 복사
            const newBoard = JSON.parse(JSON.stringify(curBoard));
            newBoard[pos[0][0]][pos[0][1]] = 0;
            newBoard[pos[1][0]][pos[1][1]] = 0;
            
            // 첫 번째 -> 두 번째 순서로 제거한 경우
            const remainOps1 = dfs(newBoard, pos[1][0], pos[1][1], remainCardPairs - 1);
            
            // 두 번째 -> 첫 번째 순서로 제거한 경우
            const remainOps2 = dfs(newBoard, pos[0][0], pos[0][1], remainCardPairs - 1);
            
            // 최소 조작 횟수 갱신
            minOperations = Math.min(
                minOperations,
                ops1 + remainOps1,
                ops2 + remainOps2
            );
        }
        
        return minOperations;
    }
    
    return dfs(board, r, c, cardPairCnt);
}

// 두 위치 사이의 최소 조작 횟수 계산 (커서 이동 포함)
function getMinMoves(curBoard, startR, startC, endR, endC) {
    // 이미 같은 위치에 있는 경우
    if (startR === endR && startC === endC) {
        return 0;
    }

    // BFS로 최소 이동 횟수 찾기
    const queue = [[startR, startC, 0]]; // [row, col, moves]
    const visited = Array(4).fill().map(() => Array(4).fill(false));
    visited[startR][startC] = true;

    // 상, 하, 좌, 우
    const dr = [-1, 1, 0, 0]; 
    const dc = [0, 0, -1, 1];

    while (queue.length > 0) {
        const [r, c, moves] = queue.shift();

        if (r === endR && c === endC) {
            return moves;
        }

        // 4가지 방향에 대해 이동 시도
        for (let i = 0; i < 4; i++) {
            // 1. 한 칸 이동
            const nr = r + dr[i];
            const nc = c + dc[i];

            if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4 && !visited[nr][nc]) {
                visited[nr][nc] = true;
                queue.push([nr, nc, moves + 1]);
            }

            // 2. Ctrl + 방향키 이동
            let ctrlR = r;
            let ctrlC = c;

            while (true) {
                const nextR = ctrlR + dr[i];
                const nextC = ctrlC + dc[i];

                // 범위를 벗어나면 멈춤
                if (nextR < 0 || nextR >= 4 || nextC < 0 || nextC >= 4) {
                    break;
                }

                ctrlR = nextR;
                ctrlC = nextC;

                // 카드를 만나면 멈춤
                if (curBoard[ctrlR][ctrlC] > 0) {
                    break;
                }
            }

            // 새 위치 추가: 원래 위치와 다르고 방문하지 않았으면 큐에 추가
            if ((ctrlR !== r || ctrlC !== c) && !visited[ctrlR][ctrlC]) {
                visited[ctrlR][ctrlC] = true;
                queue.push([ctrlR, ctrlC, moves + 1]);
            }
        }
    }

    return Infinity; // 도달할 수 없는 경우 (실제로는 발생하지 않음)
}