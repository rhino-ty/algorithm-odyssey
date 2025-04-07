// 재생 로그 확인 후 가장 많은 시간대에 공익광고를 삽입하는 위치를 결정하는 문제: 일반 배열 순회는 O(L * P)를 가짐(시청 로그*평균 플레이 시간), 시간 초과
//   => 누적합? 구간합? 슬라이딩 윈도우 최적화 진행해 O(L + N)로 줄임(N은 전체 동영상 길이)
//   => sum(i, j) = prefixSum[j] - prefixSum[i-1]
// 초로 변환해서 각 시청 길이만큼의 배열이 나오고, 슬라이딩 윈도우 사용해 공익광고 max인 부분 확인

function solution(play_time, adv_time, logs) {    
    // 초 단위로 변환
    const playTimeInSeconds = timeToSeconds(play_time);
    const advTimeInSeconds = timeToSeconds(adv_time);
    
    // 동영상 전체 길이만큼의 배열 생성 => 슬라이딩 윈도우 사용 예정
    const timeLine = new Array(playTimeInSeconds + 1).fill(0);
    
    // 각 시청 로그에 대해 시작 지점에 +1, 종료 지점에 -1로 표시
    // 전체 순회가 아닌, 일정 구간만 순회하도록 하기 위함
    logs.forEach(log => {
        const [start, end] = log.split('-').map(timeToSeconds);
        timeLine[start]++;
        timeLine[end]--;
    });
    
    // 각 시간대별 시청자 수 누적 계산
    for (let i = 1; i <= playTimeInSeconds; i++) {
        timeLine[i] += timeLine[i - 1];
    }
    // 각 시간대별 누적 시청 시간 계산
    for (let i = 1; i <= playTimeInSeconds; i++) {
        timeLine[i] += timeLine[i - 1];
    }
    
    // 광고 시간만큼의 구간에서 최대 시청 시간을 갖는 시작점 찾기
    let maxViewTime = timeLine[advTimeInSeconds - 1];
    let maxViewStartTime = 0;
    
    for (let i = advTimeInSeconds; i <= playTimeInSeconds; i++) {
        const curViewTime = timeLine[i] - timeLine[i - advTimeInSeconds];
        
        if (curViewTime > maxViewTime) {
            maxViewTime = curViewTime;
            maxViewStartTime = i - advTimeInSeconds + 1;
        }
    }
    
    return secondsToTime(maxViewStartTime);
}

// 초=>시간문자열, 시간문자열=>초로 변환
function timeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}
function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
        .map(num => num.toString().padStart(2, '0'))
        .join(':');
}