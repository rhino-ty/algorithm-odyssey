// 해쉬 계열 사용 최적화

function solution(points, routes) {
  // Map을 사용해 포인트 번호 -> 좌표 매핑, 0-indexing
  const pointToCoord = new Map();
  for (let i = 0; i < points.length; i++) {
    pointToCoord.set(i + 1, points[i]);
  }

  // 시간별 좌표에 위치한 로봇 집합을 저장하는 Map
  // Map<시간, Map<좌표키, Set<로봇ID>>>
  const timeToCoordRobots = new Map();

  // 각 로봇의 경로 시뮬레이션
  for (let robotIdx = 0; robotIdx < routes.length; robotIdx++) {
    const route = routes[robotIdx];
    let curTime = 0;

    // 시작 위치 처리
    const startPointNum = route[0];
    const [startR, startC] = pointToCoord.get(startPointNum);
    addRobotPosition(0, [startR, startC], robotIdx);

    // 경로 계산
    for (let i = 0; i < route.length - 1; i++) {
      const currentPointNum = route[i];
      const nextPointNum = route[i + 1];

      const [currentR, currentC] = pointToCoord.get(currentPointNum);
      const [nextR, nextC] = pointToCoord.get(nextPointNum);

      // r 좌표 이동
      let r = currentR;
      while (r !== nextR) {
        r += r < nextR ? 1 : -1;
        curTime++;
        addRobotPosition(curTime, [r, currentC], robotIdx);
      }

      // c 좌표 이동
      let c = currentC;
      while (c !== nextC) {
        c += c < nextC ? 1 : -1;
        curTime++;
        addRobotPosition(curTime, [r, c], robotIdx);
      }
    }
  }

  function addRobotPosition(time, coord, robotIdx) {
    const coordKey = coord.join(','); // 여전히 문자열 키 사용 (성능 이유)

    if (!timeToCoordRobots.has(time)) {
      timeToCoordRobots.set(time, new Map());
    }

    const coordMap = timeToCoordRobots.get(time);

    if (!coordMap.has(coordKey)) {
      coordMap.set(coordKey, new Set());
    }

    coordMap.get(coordKey).add(robotIdx);
  }

  // 위험 상황 집계
  let dangerCount = 0;

  // 각 시간별로 충돌 체크
  timeToCoordRobots.forEach((coordMap) => {
    coordMap.forEach((robotSet) => {
      if (robotSet.size >= 2) {
        dangerCount++;
      }
    });
  });

  return dangerCount;
}

// function solution(points, routes) {
//   // 1-indexed 매핑 생성
//   const pointToCoord = {};
//   for (let i = 0; i < points.length; i++) {
//     pointToCoord[i + 1] = points[i];
//   }

//   // 시간별 각 좌표에 위치한 로봇 수를 바로 기록하는 맵
//   // { 시간: { 좌표키: 로봇 수 } }
//   const timeToCoordCount = {};

//   // 각 로봇의 경로 시뮬레이션 및 시간별 위치 맵에 바로 추가
//   for (let robotIdx = 0; robotIdx < routes.length; robotIdx++) {
//     const route = routes[robotIdx];
//     let curTime = 0;

//     // 시작 위치 처리 (시간 0)
//     const startPointNum = route[0];
//     const [startR, startC] = pointToCoord[startPointNum];
//     addRobotPosition(0, [startR, startC]);

//     // 경로상의 각 연속된 포인트 쌍에 대해 이동 경로 계산
//     for (let i = 0; i < route.length - 1; i++) {
//       const currentPointNum = route[i];
//       const nextPointNum = route[i + 1];

//       const [currentR, currentC] = pointToCoord[currentPointNum];
//       const [nextR, nextC] = pointToCoord[nextPointNum];

//       // r 좌표 이동
//       let r = currentR;
//       while (r !== nextR) {
//         r += r < nextR ? 1 : -1;
//         curTime++;
//         addRobotPosition(curTime, [r, currentC]);
//       }

//       // c 좌표 이동
//       let c = currentC;
//       while (c !== nextC) {
//         c += c < nextC ? 1 : -1;
//         curTime++;
//         addRobotPosition(curTime, [r, c]);
//       }
//     }
//   }

//   // 로봇의 위치를 시간별 맵에 추가하는 함수
//   function addRobotPosition(time, coord) {
//     const coordKey = coord.join(',');

//     if (!timeToCoordCount[time]) {
//       timeToCoordCount[time] = {};
//     }

//     if (!timeToCoordCount[time][coordKey]) {
//       timeToCoordCount[time][coordKey] = 0;
//     }

//     timeToCoordCount[time][coordKey]++;
//   }

//   // 위험 상황(충돌 가능성) 집계
//   let dangerCount = 0;

//   // 각 시간별로 좌표에 2대 이상 로봇이 있는 경우 카운트
//   for (const time in timeToCoordCount) {
//     const coordCounts = timeToCoordCount[time];

//     for (const coordKey in coordCounts) {
//       if (coordCounts[coordKey] >= 2) {
//         dangerCount++;
//       }
//     }
//   }

//   return dangerCount;
// }

// ----------------------------------------------------------------------------------------------------------------
// 각각의 이동, 충돌 확인을 포함한 과정을 말해야함 => 그냥 시뮬레이션 문제인 듯
// 입력값도 작아서 3차원 반복문도 괜찮을 듯?

// 1. 포인트 정보를 좌표(r, c)로 매핑할 맵 생성 (포인트 번호 -> 좌표) => indexing이 0인지, 1인지 주의
// 2. 각 로봇의 이동 경로 계산
//    - 각 로봇마다 시간대별 위치를 저장할 배열 생성
//    - 각 로봇의 경로 순회하기
//      a. 현재 포인트에서 다음 포인트까지의 최단 경로 계산 => 두 포인트 사이의 최단 경로는 맨해튼 거리
//      b. 최단 경로 이동 시 r 좌표 먼저 조정 후 c 좌표 조정 => 주의!!  "r 좌표가 변하는 이동을 c 좌표가 변하는 이동보다 먼저 합니다."
//      c. 경로상의 모든 중간 좌표와 시간 기록
// 3. 충돌 체크
//    - 각 시간대별로 맵 생성 (좌표 -> 로봇 수)
//    - 모든 로봇의 위치를 시간별로 순회하면서 맵에 카운트 기록
//    - 각 시간대에서 로봇 수가 2 이상인 좌표의 개수 합산
// 4. 총 충돌 위험 횟수 반환

// function solution(points, routes) {
//   // 포인트 번호 -> 좌표 매핑, 1-indexed
//   const pointToCoord = {};
//   for (let i = 0; i < points.length; i++) {
//     pointToCoord[i + 1] = points[i];
//   }

//   // 각 로봇의 시간별 위치 기록 배열
//   const robotPositions = [];

//   // 각 로봇마다 경로 계산
//   for (let robotIdx = 0; robotIdx < routes.length; robotIdx++) {
//     const route = routes[robotIdx];
//     const positions = []; // 해당 로봇의 시간별 위치

//     let curTime = 0;

//     // 시작 위치 추가 (시간 0)
//     const startPointNum = route[0];
//     const [startR, startC] = pointToCoord[startPointNum];
//     positions.push({ time: 0, coord: [startR, startC] });

//     // 경로의 각 포인트를 순회
//     for (let i = 0; i < route.length - 1; i++) {
//       const currentPointNum = route[i];
//       const nextPointNum = route[i + 1];

//       const [currentR, currentC] = pointToCoord[currentPointNum];
//       const [nextR, nextC] = pointToCoord[nextPointNum];

//       // r 좌표 조정
//       let r = currentR;
//       while (r !== nextR) {
//         r += r < nextR ? 1 : -1;
//         curTime++;
//         positions.push({ time: curTime, coord: [r, currentC] });
//       }

//       // c 좌표 조정
//       let c = currentC;
//       while (c !== nextC) {
//         c += c < nextC ? 1 : -1;
//         curTime++;
//         positions.push({ time: curTime, coord: [r, c] });
//       }
//     }

//     robotPositions.push(positions);
//   }

//   let dangerCount = 0;

//   // 최대 시간 찾기
//   // 모든 로봇이 마지막 경로 지점에 도착하는 시간 중 가장 늦은 시간까지만 체크하면 됨
//   let maxTime = 0;
//   for (const positions of robotPositions) {
//     if (positions.length > 0) {
//       maxTime = Math.max(maxTime, positions[positions.length - 1].time);
//     }
//   }

//   // 각 시간대별로 충돌 체크
//   for (let time = 0; time <= maxTime; time++) {
//     // 좌표 -> 로봇 수 매핑
//     const coordToRobots = {};

//     // 각 로봇의 해당 시간 위치 확인
//     for (let robotIdx = 0; robotIdx < robotPositions.length; robotIdx++) {
//       const positions = robotPositions[robotIdx];

//       // 해당 시간에 로봇이 어디에 있는지 찾기
//       const position = positions.find((pos) => pos.time === time);

//       if (position) {
//         const coordKey = position.coord.join(',');
//         if (!coordToRobots[coordKey]) {
//           coordToRobots[coordKey] = [];
//         }
//         coordToRobots[coordKey].push(robotIdx);
//       }
//     }

//     // 위험 상황 카운트 (같은 좌표에 2대 이상의 로봇이 있는 경우)
//     for (const coordKey in coordToRobots) {
//       if (coordToRobots[coordKey].length >= 2) {
//         dangerCount++;
//       }
//     }
//   }

//   return dangerCount;
// }
