// 불량 사용자에서, 가능한 조합을 뽑은 뒤 user_id에서 각각 가능한 개수를 가져옴 => 매칭되는 사용자 ID들의 인덱스를 저장
// 중복이 존재하기 때문에, 각 조합을 문자열로 join해 만든 뒤, Set으로 걸러줌

// 1. 각 불량 사용자 패턴마다 매칭되는 사용자 ID를 매치할 배열 초기화
// 2. banned_id 순회하며 매칭되는 배열 찾고 배열에 사입
//

function solution(user_id, banned_id) {
    const matchList = [];
    
    // 각 불량 사용자 패턴마다 매칭되는 사용자 ID의 인덱스 찾기
    for (let i = 0; i < banned_id.length; i++) {
        const matches = [];
        
        for (let j = 0; j < user_id.length; j++) {
            if (isMatch(user_id[j], banned_id[i])) {
                matches.push(j);
            }
        }
        
        matchList.push(matches);
    }
    
    // 중복 방지 조합: string으로 넣을 예정
    const combinations = new Set();
    
    // DFS: 가능한 모든 조합 찾기
    function findCombinations(depth, selected) {
        // 기저 조건: 모든 패턴에 대해 매칭 완료
        if (depth === banned_id.length) {
            // 선택된 ID들을 정렬하여 문자열로 변환 (순서에 관계없이 동일한 조합 식별)
            const key = [...selected].sort().join(',');
            combinations.add(key);
            return;
        }
        
        // 현재 패턴에 매칭되는 모든 사용자 ID 시도
        for (const idx of matchList[depth]) {
            if (selected.has(idx)) continue;
            
            selected.add(idx);
            findCombinations(depth + 1, selected);
            // 백트래킹: ID 선택 취소
            selected.delete(idx);
        }
    }
    
    findCombinations(0, new Set());
    
    return combinations.size;
}

function isMatch(id, pattern) {
    if (id.length !== pattern.length) return false;

    for (let i = 0; i < id.length; i++) {
        if (pattern[i] !== '*' && pattern[i] !== id[i]) return false;
    }

    return true;
}