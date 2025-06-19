// 체육대회 대표 선수 선발 문제 해결, 각 반에서 한 명씩 선택하여 최댓값과 최솟값의 차이를 최소화
// 정렬 + 슬라이딩 윈도우 + 완탐으로 풀면 될 듯

// 1. 모든 학생을 (능력치, 반번호)로 통합
// 2. 각 반 학생들을 능력치 순으로 정렬
// 3. 전체 학생을 능력치 순으로 정렬
// 4. 슬라이딩 윈도우로 N개 반 포함하는 최소 구간 찾기
// 5. 최댓값과 최솟값의 최소 차이 출력

function getMinDiffRepresentative(N, M, classArr) {
  // 모든 학생을 (능력치, 반번호) 형태로 저장
  const studentArr = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      studentArr.push({ ability: classArr[i][j], classId: i });
    }
  }

  // 능력치 순으로 정렬
  studentArr.sort((a, b) => a.ability - b.ability);

  let minDiff = Infinity;
  let l = 0;
  const classCnt = new Array(N).fill(0);
  let validClasses = 0; // 현재 윈도우에 포함된 반의 개수

  // 슬라이딩 윈도우
  for (let r = 0; r < studentArr.length; r++) {
    // 오른쪽 포인터 확장: 새로운 학생 추가
    const rStudent = studentArr[r];
    if (classCnt[rStudent.classId] === 0) {
      validClasses++; // 새로운 반 추가됨
    }
    classCnt[rStudent.classId]++;

    // 조건 만족: 모든 반에서 적어도 한 명씩 포함됨
    while (validClasses === N) {
      // 현재 윈도우의 차이 계산
      const currentDiff = studentArr[r].ability - studentArr[l].ability;
      minDiff = Math.min(minDiff, currentDiff);

      // 왼쪽 포인터 축소: 윈도우 크기 줄이기
      const lStudent = studentArr[l];
      classCnt[lStudent.classId]--;
      if (classCnt[lStudent.classId] === 0) {
        validClasses--; // 해당 반의 학생이 모두 제거됨
      }
      l++;
    }
  }

  return minDiff;
}

const input = require('fs').readFileSync(0).toString().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const classArr = input.slice(1).map((i) => i.split(' ').map(Number));
console.log(getMinDiffRepresentative(N, M, classArr));
