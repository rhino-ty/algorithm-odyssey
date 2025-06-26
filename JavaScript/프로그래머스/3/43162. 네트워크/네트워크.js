function solution(n, computers) {
    const visited = new Array(n).fill(false);
    let networkCount = 0;
    
    function dfs(computerId) {
        // DFS: 연결된 모든 컴퓨터 방문
        visited[computerId] = true;
        
        // 현재 컴퓨터와 연결된 모든 컴퓨터 확인
        for (let i = 0; i < n; i++) {
            // 연결, 아직 방문 x
            if (computers[computerId][i] === 1 && !visited[i]) {
                dfs(i);
            }
        }
    }
    
    // 모든 컴퓨터를 확인, 네트워크 찾기
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
            networkCount++;
        }
    }
    
    return networkCount;
}