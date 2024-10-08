function solution(bridge_length, weight, truck_weights) {
  // 시간, 다리 순서, 다리 합계 만들기
  let time = 0;
  let bridgeMatrix = Array(bridge_length).fill(0);

  // 반복- 트럭이 다 없어질 때까지
  while (truck_weights.length !== 0) {
    // 합계에서 빼기
    bridgeMatrix.shift();

    // weight 조건을 충족하기위해 다리 위 합계 + 트럭 0번째 더한 값을 조건으로
    let bridgeSum = bridgeMatrix.reduce((acc, cur) => acc + cur, 0);
    // weight 조건문
    if (bridgeSum + truck_weights[0] > weight) {
      bridgeMatrix.push(0);
    } else {
      // bridgeSum += truck_weights[0];
      bridgeMatrix.push(truck_weights.shift());
    }

    // 1초씩 time 증가 계산
    time++;
  }

  return time + bridge_length;
}
