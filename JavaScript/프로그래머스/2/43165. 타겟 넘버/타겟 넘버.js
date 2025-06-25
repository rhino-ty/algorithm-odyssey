function solution(numbers, target) {
    let answer = 0;

    // DFS
    function dfs(i, sum) {
        // 기저: 모든 숫자를 다 사용했을 때
        if (i === numbers.length) {
            if (sum === target) {
                answer++;
            }
            return;
        }

        // 현재 숫자를 더하는 경우
        dfs(i + 1, sum + numbers[i]);
        // 현재 숫자를 빼는 경우
        dfs(i + 1, sum - numbers[i]);
    }

    // 인덱스 0 초기 합계 0으로 시작
    dfs(0, 0);

    return answer;
}