
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
// a 도둑 흔적 최소화
function solution(info, n, m) {
    var answer = Infinity;

    // [index][a 흔적][b 흔적]
    const visited = Array.from({length:info.length},()=>Array.from({length:n},()=>Array.from({length:m},()=>false)))

    const dfs = (idx,trailA,trailB) => {

        if(idx === info.length) {
            answer = Math.min(answer,trailA)
            return 
        }
        if(visited[idx][trailA][trailB]) return

        const [costA,costB] = info[idx]

        // b가 훔친다.
        if(trailB + costB<m) {
            dfs(idx+1,trailA,trailB+costB)
        }
        // a가 훔친다.
        if(trailA + costA <n) {
            dfs(idx+1,trailA+costA,trailB)
        }    

        return visited[idx][trailA][trailB] = true
    }

    dfs(0,0,0)

    return answer === Infinity ? -1 : answer ;
}