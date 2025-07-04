function solution(begin, target, words) {
    // 예외 처리: target이 words에 없으면 변환 X
    if (!words.includes(target)) {
        return 0;
    }
    
    // 두 단어가 한 글자만 다른지 확인
    function isOneCharDifferent(word1, word2) {
        let diffCount = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) {
                diffCount++;
                // 2개 이상 다르면 바로 false
                if (diffCount > 1) return false; 
            }
        }
        return diffCount === 1;
    }
    
    // [현재단어, 단계수]
    const queue = [[begin, 0]];
    // 방문한 단어들을 저장 (중복 방문 방지)
    const visited = new Set([begin]);
    
    // BFS
    while (queue.length > 0) {
        const [currentWord, steps] = queue.shift();
        
        // 현재 단어에서 다른 애들 찾기
        for (const word of words) {
            if (visited.has(word)) continue;
            
            // 한 글자만 다른 단어인지 확인
            if (isOneCharDifferent(currentWord, word)) {
                // 기저: target에 도달했으면 단계 수 + 1 반환
                if (word === target) {
                    return steps + 1;
                }
                
                // 큐에 추가하고 방문 처리
                queue.push([word, steps + 1]);
                visited.add(word);
            }
        }
    }
    
    return 0;
}