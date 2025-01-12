const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const T = parseInt(input[0]);

    for (let i = 1; i <= T; i++) {
        const [a, b] = input[i].split(' ').map(Number);
        const result = calculateLastComputer(a, b);
        console.log(result);
    }

    process.exit();
});

// Math.pow(a, b)를 사용하면 문제가 되는 이유
// 1. 부동 소수점의 정밀도 한계 : 64비트 부동 소수점 형식 (IEEE 754 표준) 표현, 15~17자리의 십진수 정밀도, 그래서 a, b가 클 경우 부동 소수점의 정밀도 한계를 초과
// 2. 계산 시간 및 자원 문제 : b가 최대 999,999일 때, Math.pow(a, b)는 매우 큰 수를 계산해야 하므로 시간 복잡도와 메모리 사용량 측면에서도 비효율적, 실행 시간을 크게 증가 + 메모리 초과

// 모듈러 거듭제곱 사용 : 결과값이 항상 0에서 9 사이의 값으로 유지
function calculateLastComputer(a, b) {
    if (b === 0) return 1; // 어떤 수의 0승은 1
    a = a % 10; // 마지막 자리만 신경쓰면 되므로 10으로 나눈 나머지
    let result = 1;
    while (b > 0) {
        if (b % 2 === 1) {
            result = (result * a) % 10;
        }
        a = (a * a) % 10;
        b = Math.floor(b / 2);
    }
    return result === 0 ? 10 : result;
}
